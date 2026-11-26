import sys,pathlib,urllib.request,json,xml.etree.ElementTree as ET
ROOT=pathlib.Path(__file__).resolve().parents[1]
CACHE=ROOT/'research/fulltext';CACHE.mkdir(exist_ok=True)
def fetch(pmc):
 if not pmc or not pmc.startswith('PMC') or not pmc[3:].isdigit():raise ValueError('Valid PMCID required')
 path=CACHE/(pmc+'.xml');out=CACHE/(pmc+'.txt');err=CACHE/(pmc+'.error.json')
 if out.exists():return str(out)
 url='https://www.ebi.ac.uk/europepmc/webservices/rest/'+pmc+'/fullTextXML'
 try:
  if not path.exists():
   with urllib.request.urlopen(url,timeout=25) as r:path.write_bytes(r.read())
  root=ET.fromstring(path.read_bytes())
  parts=root.findall('./body')+root.findall('./floats-group')+root.findall('./back/sec')+root.findall('./sub-article/body')
  if not parts:raise ValueError('Article body unavailable')
  lines=['SOURCE '+url]
  for part in parts:
   for node in part.iter():
    if node.tag in ['title','p','table-wrap']:
     if node.tag == 'table-wrap':
      content=' | '.join(' '.join(''.join(cell.itertext()).split()) for cell in node.iter()
                         if cell.tag in ('caption','th','td','table-wrap-foot'))
     else:
      content=' '.join(''.join(node.itertext()).split())
     if content:lines.append(f'[{node.tag} {node.get("id","")}] '+content)
  out.write_text('\n'.join(lines)+'\n');return str(out)
 except Exception as e:
  err.write_text(json.dumps({'url':url,'error':str(e)}));return str(err)
if __name__=='__main__':
 for pmc in sys.argv[1:]:print(fetch(pmc),flush=True)
