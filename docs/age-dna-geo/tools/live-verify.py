"""Live-Verifikation eines Blogartikels: HTTP, FAQPage, Sperrwoerter, interne Links, dateModified."""
import sys,re,json,subprocess,urllib.parse
BASE="https://www.lifetime-health.de"
BLOCK=[r'\bMuhdo', r'MuhdoAge', r'\bMAISIE\b', r'ISO\s*9001', r'ISO\s*13485',
       r'GLP-zertifiziert', r'medizinischer Standard', r'Deutsches Labor',
       r'nur du hast Zugriff', r'anonymisiert analysiert',
       r'jederzeit vollständig löschbar', r'hochaufgelöste DNA-Sequenzierung',
       r'CpG-Gene', r'kehrt (die )?Alterung um', r'zurückdrehen']
def get(u, head=False):
    cmd=["curl","-sS","-L","-o","-","-w","\n@@%{http_code}@@%{num_redirects}"]
    if head: cmd=["curl","-sS","-o","/dev/null","-w","%{http_code} %{num_redirects} %{redirect_url}"]
    r=subprocess.run(cmd+[u],capture_output=True,text=True)
    return r.stdout
url=sys.argv[1] if sys.argv[1].startswith('http') else BASE+sys.argv[1]
expect_faq=int(sys.argv[2]) if len(sys.argv)>2 else None
body=get(url)
m=re.search(r'@@(\d+)@@(\d+)$',body)
code,redir=(m.group(1),m.group(2)) if m else ('?','?')
html=body[:m.start()] if m else body
print(f"URL   : {url}")
print(f"HTTP  : {code} (redirects: {redir})")
ok = code=='200'
# FAQPage
faq=None
for blk in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>',html,flags=re.S):
    try: d=json.loads(blk.strip())
    except Exception: continue
    for node in (d if isinstance(d,list) else [d]):
        if isinstance(node,dict) and node.get('@type')=='FAQPage':
            faq=node
print(f"FAQPage: {'parsebar, '+str(len(faq.get('mainEntity',[])))+' Fragen' if faq else 'FEHLT'}")
if expect_faq is not None:
    good = bool(faq) and len(faq.get('mainEntity',[]))==expect_faq
    print(f"         erwartet {expect_faq} -> {'ok' if good else 'ABWEICHUNG'}")
    ok = ok and good
# dateModified
dm=set(re.findall(r'"dateModified"\s*:\s*"([^"]+)"',html))
print(f"dateModified: {sorted(dm) or 'keins'}")
# Sperrwoerter im sichtbaren Text
text=re.sub(r'<script.*?</script>','',html,flags=re.S)
text=re.sub(r'<style.*?</style>','',text,flags=re.S)
text=re.sub(r'<[^>]+>',' ',text); text=re.sub(r'\s+',' ',text)
hits=[]
for p in BLOCK:
    for mm in re.finditer(p,text,flags=re.I):
        hits.append(f"{p} -> ...{text[max(0,mm.start()-50):mm.end()+50]}...")
print(f"Sperrwoerter: {'KEINE' if not hits else len(hits)}")
for h in hits: print("   ",h); ok=False
# interne Links aus dem Artikel-Body
# nur Links im Artikel-Body, nicht Header/Footer/Menue
mbody=re.search(r'class="lt-article__content rte"(.*?)</article>',html,flags=re.S) or re.search(r'class="lt-article__content rte"(.*)',html,flags=re.S)
scope=mbody.group(1) if mbody else html
links=sorted(set(re.findall(r'href="(/(?:pages|products|blogs)/[^"#?]+)"',scope)))
print(f"Interne Ziele ({len(links)}):")
for l in links:
    r=get(BASE+l,head=True).split()
    st=r[0] if r else '?'; nr=r[1] if len(r)>1 else '?'
    flag='ok' if st=='200' and nr=='0' else 'PRUEFEN'
    print(f"   {st} redir={nr} {flag}  {l}")
    if not(st=='200' and nr=='0'): ok=False
print("\nERGEBNIS:", "OK" if ok else "NACHARBEIT NOETIG")
sys.exit(0 if ok else 1)
