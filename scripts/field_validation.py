"""Re-runnable heuristic checks; flags indicate review, not incorrectness."""
import json,re

def norm(text):
 return re.sub(r'(?<=\d)[,\u2008\u2009\u00a0\u202f](?=\d{3}\b)', '',text)
ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']
NUMBER_WORDS=set(ONES+TENS[2:]+['hundred','thousand','million'])
def number_words(n):
 if n<0 or n>=1000000:return None
 if n<20:return ONES[n]
 if n<100:return TENS[n//10]+((' '+ONES[n%10]) if n%10 else '')
 if n<1000:return ONES[n//100]+' hundred'+((' '+number_words(n%100)) if n%100 else '')
 return number_words(n//1000)+' thousand'+((' '+number_words(n%1000)) if n%1000 else '')

def number_word_spans(text,n):
 words=number_words(n)
 if not words:return []
 # Accept ordinary hyphenation and an optional British "and" after hundred/thousand.
 parts=words.split();pattern=r'[\s-]+'.join(re.escape(w) for w in parts)
 pattern=pattern.replace(r'hundred[\s-]+',r'hundred[\s-]+(?:and[\s-]+)?').replace(r'thousand[\s-]+',r'thousand[\s-]+(?:and[\s-]+)?')
 spans=[]
 for m in re.finditer(r'(?<![\w-])'+pattern+r'(?![\w-])',text,re.I):
  before=re.search(r'([A-Za-z]+)[\s-]+$',text[:m.start()]);after=re.match(r'[\s-]+([A-Za-z]+)',text[m.end():])
  if before and before.group(1).lower() in NUMBER_WORDS:continue
  if re.search(r'\b(?:hundred|thousand|million)\s+and\s*$',text[:m.start()],re.I):continue
  if after and after.group(1).lower() in NUMBER_WORDS:continue
  spans.append(m.span())
 return spans

def has_number(text,n):
 return bool(re.search(rf'(?<![\d.]){n}(?!\d|\.\d)',norm(text))) or bool(number_word_spans(text,n))
def female_count_in_quote(q,n):
 q=norm(q)
 # Replace exact written numbers before applying the existing proximity filter.
 for start,end in reversed(number_word_spans(q,n)):q=q[:start]+str(n)+q[end:]
 number=rf'(?<![\d.]){n}(?!\d|\.\d)';female=r'(?:females?|women|girls?)'
 return any(re.search(p,q,re.I) for p in [rf'{number}\)?\s+(?:[\w-]+\s+)?{female}\b',rf'\b{female}\b\s*[:,(]*\s*(?:n\s*=\s*)?{number}'])
def validate(result,source):
 errors=[];field=result['field']
 try:
  raw=result['raw_response']
  if not isinstance(raw,str):raise TypeError('not text')
  text=raw.strip()
  fence=re.fullmatch(r'```(?:json)?[ \t]*\r?\n([\s\S]*?)\r?\n```[ \t]*',text,re.I)
  if fence:text=fence.group(1)
  obj=json.loads(text)
 except (ValueError,TypeError,KeyError):return None,['unparseable model output']
 if not isinstance(obj,dict) or set(obj)!={'answer','quote','reason'}:return obj,['unexpected output structure']
 a,q,reason=obj['answer'],obj['quote'],obj['reason']
 if field=='eligibility':
  if a not in ('include','exclude','uncertain',None):errors.append('invalid eligibility')
 elif a is not None and (type(a)!=int or a<0 or (field=='sex_reporting' and a not in (1,2,3))):errors.append('invalid answer')
 if q is not None and (not isinstance(q,str) or not q.strip() or q not in source):errors.append('quote not verbatim')
 if a is not None and not q:errors.append('answer lacks evidence')
 if field in ('n_total','n_female') and type(a)==int and isinstance(q,str):
  if not has_number(q,a):errors.append('number missing from quote')
  if field=='n_female' and not female_count_in_quote(q,a):errors.append('female count not directly linked in quote')
 if field=='sex_reporting' and a is not None and isinstance(q,str):
  f=bool(re.search(r'\b(?:females?|women|girls?)\b',q,re.I));m=bool(re.search(r'\b(?:males?|men|boys?)\b',q,re.I))
  if not re.search(r'\b(?:females?|males?|women|men|girls?|boys?|sex|gender)\b',q,re.I):errors.append('sex term missing from quote')
  if a==1 and f==m:errors.append('single-sex evidence unclear')
 if not isinstance(reason,str):errors.append('invalid reason')
 elif a is not None and re.search(r'\b(?:not reported|not stated|does not mention|not mentioned|not specified|not provided|not available|cannot be determined|unclear)\b',reason,re.I):errors.append('possible contradiction')
 if field=='n_total' and type(a)==int:
  arms=re.search(r'randomi[sz]ed[^\n]{0,300}?\(\s*n\s*=\s*(\d+)\s*\)[^\n]{0,200}?\bor\b[^\n]{0,150}?\(\s*n\s*=\s*(\d+)\s*\)',source,re.I)
  if arms and a!=sum(map(int,arms.groups())):errors.append('possible randomized arm-sum mismatch; inspect context')
 return obj,errors
