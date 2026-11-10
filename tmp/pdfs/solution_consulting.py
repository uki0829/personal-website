import sys,io
sys.path.insert(0,'/private/tmp/resume-pymupdf')
import pymupdf as f
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
src='/Users/zhanghefeng/Documents/Documents/Resume_General/Hefeng Zhang_Resume_Product_Analyst.pdf'
out='/Users/zhanghefeng/personal website/output/pdf/Hefeng_Zhang_Resume_Solution_Consulting_Analyst.pdf'
f.TOOLS.set_small_glyph_heights(True)
d=f.open(src);p=d[0]
for n,file in [('T','Times New Roman.ttf'),('TB','Times New Roman Bold.ttf')]:pdfmetrics.registerFont(TTFont(n,'/System/Library/Fonts/Supplemental/'+file))
pdfmetrics.registerFontFamily('T',normal='T',bold='TB')
b=io.BytesIO();c=canvas.Canvas(b,pagesize=(612,792));checks=[]
def replace(rect,t,x,top,width,leading,limit,align=0):
 p.add_redact_annot(f.Rect(*rect),fill=(1,1,1))
 q=Paragraph(t,ParagraphStyle('p',fontName='T',fontSize=9.12,leading=leading,alignment=align));w,h=q.wrap(width,100)
 assert h<=limit+.01,(h,t)
 q.drawOn(c,x,792-top+1.968-h);checks.append(t.replace('<b>','').replace('</b>','').replace('&amp;','&').replace('<br/>',' '))
replace((43,69,570,110.5),'I’m a curious and collaborative graduate student interested in solution consulting and solving customer business problems. I combine a design background with AI development and data analysis to translate user needs into practical solutions. My experience includes customer-facing AI workflows, client demos, and business reporting. I enjoy clarifying requirements, explaining technical ideas, and working across teams to refine solutions around customer feedback and measurable business value.',44,71.968,524,9.5,38,1)
replace((64,263,570,284.5),'Developed a Python toolkit spanning 10 causal inference methods to help the client evaluate business outcomes, reducing the time needed to produce analytical results by 60%.',64.9,263.98,502,10.32,20.64)
replace((64,285,570,305),'Built a method recommendation system that helps users navigate analytical options and select an appropriate approach, translating technical complexity into a more accessible workflow.',64.9,285.18,502,10.32,20.64)
replace((64,305.7,570,327),'Building controlled evaluation datasets and documenting methods and APIs to help users understand toolkit capabilities, interpret results, and integrate the solution into their workflows.',64.9,306.38,502,10.32,20.64)
replace((64,360,570,380),'Translated customer restocking needs into a Python AI inventory-monitoring solution, achieving 90% shelf-status detection accuracy across 10K images and videos and improving restocking speed and accuracy by 30%.',64.9,361.71,502,9.12,18.24)
replace((64,380.1,570,399),'Used AI tools to build prototypes and client demos, gathering feedback and iterating on the inventory workflow to connect visual detections with reports and restocking recommendations for store employees.',64.9,380.45,502,9.12,18.24)
replace((64,398.9,570,427),'Designed a cloud solution combining RF-DETR, vision-language models, and FFmpeg live stream processing for race car identification across 3K+ clips; recommended smaller server-side models to help reduce client costs by 30%.',64.9,399.19,502,9.12,27.36)
replace((64,455,570,476),'Led A/B testing and user-intent analysis for retail search improvements, increasing click-through rate by 12% and translating results into recommendations for product and business stakeholders.',64.9,456.30,502,10.32,20.64)
replace((64,477,570,487),'Analyzed 100K+ interaction records to identify customer intent and drop-off points, informing priorities for product improvements.',64.9,477.18,502,10.32,10.32)
replace((64,487.7,570,508),'Partnered with product, engineering, and business teams to translate user behavior findings into solution recommendations and align feature decisions with customer needs and measurable outcomes.',64.9,487.74,502,10.32,20.64)
replace((64,508.5,570,519),'Built SQL/Python reporting pipelines for engagement, conversion, and retention KPIs, reducing manual analysis time by 30%.',64.9,508.62,502,10.32,10.32)
replace((64,519,570,529.5),'Built a Power BI dashboard and analyzed 30K customer records to make business insights accessible to stakeholders.',64.9,519.18,502,10.32,10.32)
replace((43,548,570,579.8),'<b>Consulting &amp; Product:</b> Requirements Analysis, Solution Design, Prototyping, Client Demos, Cross-Functional Collaboration<br/><b>Business &amp; Analytics:</b> Business Intelligence, Customer Insights, KPI Reporting, A/B Testing, Project Management<br/><b>Technical Tools:</b> SQL, Python, Power BI, Tableau, Excel, Figma, Pandas, R, Databricks, LangChain, Ollama, Git/GitHub',43.8,549.42,524,10.32,30.96)
p.apply_redactions();c.save();ov=f.open(stream=b.getvalue(),filetype='pdf');p.show_pdf_page(p.rect,ov,0)
d.set_metadata({**d.metadata,'title':'Hefeng Zhang | Solution Consulting Analyst','author':'Hefeng Zhang'});d.save(out,garbage=4,deflate=True)
check=f.open(out);txt=' '.join(check[0].get_text().split())
for t in checks:assert t in txt,t
for t in ['Expected May 2027','Available June 2027','AI Engineer Intern','Product Data Analyst Intern']:assert t in txt
assert len(check)==1 and len(check[0].get_links())==len(d[0].get_links())
check[0].get_pixmap(matrix=f.Matrix(1.4,1.4)).save('/private/tmp/solution-consulting.png')
print(out)
