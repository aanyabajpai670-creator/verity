#!/usr/bin/env python3
"""Small hosted abstract-only trial. Enter the API key privately at runtime."""
import argparse,datetime,getpass,hashlib,json,os,random,subprocess,sys,time,urllib.request,urllib.error
from pathlib import Path
from local_fields import RULES,BASE,SHORT_BASE,SHORT_RULES,ROOT
from field_validation import validate

MODEL='deepseek-v4.1-flash-free'
URL='https://100milionseek.top/v1/chat/completions'
OUT=ROOT/'research/hosted-pilot'
CONDITIONS={
 'adhd':'ADHD', 'sleep-apnea':'sleep apnea', 'heart-disease':'heart disease',
 'autism':'autism', 'depression':'depression', 'chronic-pain':'chronic pain',
 'autoimmune-disorders':'autoimmune disorders', 'endometriosis':'endometriosis',
 'pcos':'polycystic ovary syndrome (PCOS)', 'iron-deficiency':'iron deficiency',
}

def main():
 p=argparse.ArgumentParser();p.add_argument('--condition',nargs='+',default=['adhd'],help='condition name, e.g. sleep-apnea or sleep apnea (default: adhd)');p.add_argument('--limit',type=int,default=1);p.add_argument('--prompt',choices=['short','current'],default='short');p.add_argument('--timeout',type=int,default=180);p.add_argument('--evaluation-set',action='store_true');p.add_argument('--pmid',action='append',help='select specific PMIDs');p.add_argument('--evaluation-file',type=Path,help='select records from a label JSON file');p.add_argument('--background',action='store_true',help='detach after private key entry and write progress log');p.add_argument('--dry-run',action='store_true');p.add_argument('--check',action='store_true',help='check model access without sending an abstract');a=p.parse_args()
 condition='-'.join(' '.join(a.condition).lower().split()).replace('_','-')
 if condition not in CONDITIONS:p.error('unknown condition; choose: '+', '.join(CONDITIONS))
 if condition!='adhd' and a.evaluation_set and not a.evaluation_file:p.error('--evaluation-set defaults to ADHD labels; specify --evaluation-file for this condition')
 if not 1<=a.limit<=300:p.error('batch limit must be between 1 and 300 papers')
 rows=json.loads((ROOT/'research'/condition/'study-records.json').read_text())
 if a.pmid:
  if len(set(a.pmid))>10:p.error('select at most ten PMIDs')
  matching={r['pmid']:r for r in rows};missing=[v for v in a.pmid if v not in matching]
  if missing:p.error('PMID not found in '+condition+' sample: '+', '.join(missing))
  rows=[matching[v] for v in dict.fromkeys(a.pmid)]
 if a.evaluation_set or a.evaluation_file:
  path=a.evaluation_file or ROOT/'research/evaluation/adhd-labels.json'
  ids={x['pmid'] for x in json.loads(path.read_text())['items']};rows=[r for r in rows if r['pmid'] in ids]
 base=SHORT_BASE if a.prompt=='short' else BASE
 rules={k:(t,c,SHORT_RULES[k] if a.prompt=='short' else rule) for k,(t,c,rule) in RULES.items()}
 if condition!='adhd':
  t,c,rule=rules['eligibility']
  rule=rule.replace('ADHD-relevant',CONDITIONS[condition]+'-relevant')
  if condition!='adhd':rule=rule.replace('Pregnancy exposure followed by childhood ADHD outcomes is not automatically excluded.','')
  rules['eligibility']=(t,c,rule)
  if condition in ('pcos','endometriosis'):
   t,c,rule=rules['sex_reporting']
   rules['sex_reporting']=(t,c,rule+' For this sex-defined condition, also use 2 if the abstract explicitly compares condition outcomes to normative data stratified by sex. Do not infer comparisons.')
 config='stream-v1:'+a.prompt+base+json.dumps(rules,sort_keys=True)
 if condition!='adhd':config+=':condition='+condition
 run_id=hashlib.sha256((URL+MODEL+config).encode()).hexdigest()[:12];folder=(OUT if condition=='adhd' else OUT/condition)/run_id
 chosen=[r for r in rows if not all((folder/(r['pmid']+'-'+f+'.json')).exists() for f in rules)][:a.limit]
 if a.check: print('Checking model-list access; no abstract will be sent.',flush=True)
 else:
  print(f'Condition: {condition}; hosted model: {MODEL}; run {run_id}; papers {len(chosen)}; provider receives each title and abstract.',flush=True)
  for r in chosen:print(r['pmid'],r['title'])
 if a.dry_run or (not chosen and not a.check):return 0
 try: key=getpass.getpass('Paste API key (input hidden; press Enter): ').strip()
 except (EOFError,KeyboardInterrupt): print('\nCancelled.');return 1
 if not key: print('No key entered. Nothing sent.',file=sys.stderr);return 1
 if a.check:
  request=urllib.request.Request('https://100milionseek.top/v1/models',headers={'Authorization':'Bearer '+key})
  try:
   with urllib.request.urlopen(request,timeout=a.timeout) as response:
    response.read(1024);print('Model-list request: HTTP',response.status)
  except urllib.error.HTTPError as e:
   raw=e.read(16384).decode('utf-8',errors='replace');code=None
   try:
    data=json.loads(raw);error=data.get('error',{});code=error.get('code') if isinstance(error,dict) else None
   except (ValueError,AttributeError):pass
   allowed={'missing_api_key','invalid_api_key','daily_quota_exceeded','session_limit_reached','model_not_found','upstream_saturated','upstream_busy','access_denied','forbidden'}
   print('Model-list request: HTTP',e.code)
   if code in allowed:print('Known error code:',code)
   print('Response type:',e.headers.get('Content-Type','unknown').split(';')[0])
   if e.headers.get('cf-ray'):print('Cloudflare response header present')
   return 1
  except OSError as e:print('Connection failed:',type(e).__name__,file=sys.stderr);return 1
  finally:key=None
  return 0
 folder.mkdir(parents=True,exist_ok=True)
 if a.background:
  log=folder/'overnight.log'
  pid=os.fork()
  if pid:
   print(f'Background run started. PID: {pid}. Log: {log}',flush=True)
   return 0
  os.setsid()
  sys.stdout.flush();sys.stderr.flush()
  with open(os.devnull,'r') as nullin,open(log,'a',buffering=1) as logfile:
   os.dup2(nullin.fileno(),0);os.dup2(logfile.fileno(),1);os.dup2(logfile.fileno(),2)
  print(f'\nBackground run PID {os.getpid()} started at {datetime.datetime.now().astimezone().isoformat()}; selected {len(chosen)} papers',flush=True)
  try:subprocess.Popen(['caffeinate','-i','-w',str(os.getpid())],stdin=subprocess.DEVNULL,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,start_new_session=True)
  except OSError:print('Could not start caffeinate: prevent idle sleep manually.',flush=True)
 for i,r in enumerate(chosen,1):
  source=r['title']+'\n\n'+(r.get('abstract') or '')
  for field,(typ,choices,rule) in rules.items():
   dest=folder/(r['pmid']+'-'+field+'.json')
   if dest.exists():continue
   values='string: include, exclude, uncertain, or null' if field=='eligibility' else ('integer 1, 2, 3, or null' if field=='sex_reporting' else 'nonnegative integer or null')
   system=base+' '+rule+' Return only a JSON object with keys quote, reason, answer; answer must be '+values+'.'
   payload={'model':MODEL,'stream':True,'messages':[{'role':'system','content':system},{'role':'user','content':source}]}
   print(f'{i}/{len(chosen)} {r["pmid"]}: {field}...',flush=True)
   try:
    start = time.monotonic()
    parts = []
    usage = None
    finish = None
    max_attempts = 8
    body = ''

    for attempt in range(max_attempts):
      try:
        cfg = (
            'url = ' + json.dumps(URL) + '\n'
            'header = ' + json.dumps('Authorization: Bearer ' + key) + '\n'
            'header = "Content-Type: application/json"\n'
            'data = ' + json.dumps(json.dumps(payload, ensure_ascii=True)) + '\n'
        )

        proc = subprocess.run(
            [
                'curl', '--silent', '--show-error',
                '--no-buffer', '--max-time', str(a.timeout),
                '--config', '-',
                '--write-out', '\nVERITY_HTTP_STATUS:%{http_code}'
            ],
            input=cfg,
            text=True,
            capture_output=True,
            timeout=a.timeout + 10
        )

        body, sep, status = proc.stdout.rpartition('\nVERITY_HTTP_STATUS:')
        http_status = status.strip() if sep else 'unknown'

        if proc.returncode == 0 and http_status == '200':
            break

        retryable = (
            proc.returncode != 0
            or http_status in ('429', '500', '502', '503', '504')
        )

        if not retryable:
            print(f'Stopped: non-retryable HTTP {http_status}.', file=sys.stderr)
            return 1

        if attempt == max_attempts - 1:
            print(f'Stopped: request failed after {max_attempts} attempts. Earlier responses saved.', file=sys.stderr)
            return 1

        delay = min(2 ** attempt + random.uniform(0, 1), 120)
        print(f'HTTP {http_status}, curl exit {proc.returncode}. Retrying in {delay:.1f}s ({attempt + 1}/{max_attempts - 1})...', flush=True)
        time.sleep(delay)

      except (OSError, TimeoutError, subprocess.TimeoutExpired) as e:
        if attempt == max_attempts - 1:
            raise
        delay = min(2 ** attempt + random.uniform(0, 1), 120)
        print(f'{type(e).__name__}. Retrying in {delay:.1f}s...', flush=True)
        time.sleep(delay)

    quota={}
    for line in body.splitlines():
     line=line.strip()
     if not line.startswith('data:'):continue
     chunk=line[5:].strip()
     if chunk=='[DONE]':break
     try:event=json.loads(chunk)
     except json.JSONDecodeError:continue
     usage=event.get('usage') or usage
     for choice in event.get('choices',[]):
      piece=choice.get('delta',{}).get('content')
      if isinstance(piece,str):parts.append(piece)
      finish=choice.get('finish_reason') or finish
    raw=''.join(parts)
    out={'pmid':r['pmid'],'condition':condition,'field':field,'model':MODEL,'provider':'100milionseek','prompt_variant':a.prompt,'run_id':run_id,'source_url':r['source_url'],'source_sha256':hashlib.sha256(source.encode()).hexdigest(),'created_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'raw_response':raw,'timing':{'elapsed_seconds':round(time.monotonic()-start,2),'finish_reason':finish},'usage':usage,'quota':quota}
    tmp=dest.with_suffix('.tmp');tmp.write_text(json.dumps(out,indent=2)+'\n');os.replace(tmp,dest)
    _,errors=validate(out,source);print('  '+('invalid_needs_review' if errors else 'passed_format_checks_only'),flush=True)
   except urllib.error.HTTPError as e:
    print(f'Stopped: provider returned HTTP {e.code}. Earlier responses saved. Check the provider dashboard or retry later.',file=sys.stderr);return 1
   except (OSError,TimeoutError,subprocess.TimeoutExpired) as e:
    print(f'Stopped: connection failed ({type(e).__name__}). Earlier responses saved.',file=sys.stderr);return 1
 key=None
 print('Done. Suggestions remain unreviewed; no website or research records changed.')
 return 0
if __name__=='__main__':sys.exit(main())
