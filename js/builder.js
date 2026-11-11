// [headline, subtext, button, layout, font, color, radius]
const D={
product:["Meet Your New Favorite Product","A short, clear description of what makes it special.","Learn More","split","sans","#7c3aed","1rem"],
event:["Join Us for an Unforgettable Event","Save the date and be part of something great.","See Details","center","sans","#e11d48","1.5rem"],
portfolio:["Hi, I'm a Creative Designer","A collection of my best work and recent projects.","View My Work","split","serif","#0ea5e9","0.4rem"],
business:["Grow Your Business Online","Professional services built around your needs.","Get in Touch","bold","sans","#2563eb","0.5rem"],
app:["The App You've Been Waiting For","Simple, fast and made to fit your day.","Learn More","split","sans","#6366f1","1.8rem"],
restaurant:["Fresh Food, Made With Love","Explore our menu and find us easily.","View Menu","center","serif","#b45309","0.3rem"],
home:["Find Your Dream Home","Browse beautiful properties in great locations.","See Listings","bold","sans","#059669","0.6rem"],
course:["Learn New Skills Online","Join our class and learn at your own pace.","See Lessons","split","sans","#f59e0b","1rem"],
link:["All My Links in One Place","Follow me and explore everything I share.","Visit My Page","stack","sans","#a855f7","2rem"],
wedding:["We're Getting Married","Join us as we celebrate our special day.","See Details","center","serif","#be185d","0.2rem"],
soon:["Something Big Is Coming","We are working on something new. Stay tuned.","Notify Me","center","sans","#06b6d4","1rem"],
donation:["Together We Can Make a Difference","Learn about our cause and how you can help.","Learn More","bold","sans","#dc2626","0.8rem"]
};
const N={product:"Product",event:"Event",portfolio:"Portfolio",business:"Business",app:"App Launch",restaurant:"Restaurant",home:"Real Estate",course:"Course / Webinar",link:"Link-in-Bio",wedding:"Wedding",soon:"Coming Soon",donation:"Donation"};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const S={logo:"",hero:"",gal:[]};

Object.keys(N).forEach(k=>$("type").insertAdjacentHTML("beforeend",`<option value="${k}">${N[k]}</option>`));

function shrink(file,max,type){
 return new Promise(res=>{
  const r=new FileReader();
  r.onload=()=>{const i=new Image();i.onload=()=>{
   const k=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement("canvas");
   c.width=Math.round(i.width*k);c.height=Math.round(i.height*k);
   c.getContext("2d").drawImage(i,0,0,c.width,c.height);
   res(c.toDataURL(type,.78));
  };i.onerror=()=>res("");i.src=r.result};
  r.readAsDataURL(file);
 });
}
$("logo").onchange=async e=>{S.logo=e.target.files[0]?await shrink(e.target.files[0],300,"image/png"):"";render()};
$("hero").onchange=async e=>{S.hero=e.target.files[0]?await shrink(e.target.files[0],1400,"image/jpeg"):"";render()};
$("gal").onchange=async e=>{S.gal=[];for(const f of [...e.target.files].slice(0,6))S.gal.push(await shrink(f,900,"image/jpeg"));render()};

function load(k){const p=D[k];$("head").value=p[0];$("sub").value=p[1];$("cta").value=p[2];$("color").value=p[5];render()}

function build(){
 const v=k=>esc($(k).value),[, , ,lay,font,,rad]=D[$("type").value],c=$("color").value,d=$("pt").value==="dark";
 const F=["f1","f2","f3"].map(k=>{const a=$(k).value.split("|");return[esc((a[0]||"").trim()),esc((a[1]||"").trim())]});
 const logo=S.logo?`<img class="lg" src="${S.logo}" alt="">`:"";
 const himg=S.hero?`<img class="himg" src="${S.hero}" alt="">`:`<div class="himg ph"></div>`;
 const href=$("sc").checked?"#contact":"#";
 const feats=lay==="stack"
  ?`<section class="sec f">${F.map(x=>`<a class="lk" href="#">${x[0]}</a>`).join("")}</section>`
  :`<section class="sec f">${F.map(x=>`<div class="c"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join("")}</section>`;
 const about=$("sa").checked?`<section class="sec" id="about"><h2>About</h2><p class="m">${v("ab")}</p></section>`:"";
 const gal=$("sg").checked?`<section class="sec"><h2>Gallery</h2><div class="gal">${(S.gal.length?S.gal.map(s=>`<img src="${s}" alt="">`):[1,2,3].map(()=>`<div class="ph"></div>`)).join("")}</div></section>`:"";
 const tes=$("st").checked?`<section class="sec"><blockquote>&ldquo;${v("quote")}&rdquo;</blockquote><b>${v("qname")}</b></section>`:"";
 const con=$("sc").checked?`<section class="sec" id="contact"><h2>Contact</h2><a class="btn" href="mailto:${v("email")}">${v("email")}</a></section>`:"";
 const heroBg=lay==="bold"?`background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55))${S.hero?`,url("${S.hero}") center/cover`:""},linear-gradient(135deg,var(--a),#111);color:#fff;`:"";
 const hero=lay==="split"
  ?`<section class="hero"><div><h1>${v("head")}</h1><p>${v("sub")}</p><a class="btn" href="${href}">${v("cta")}</a></div>${himg}</section>`
  :lay==="stack"
  ?`<section class="hero">${S.hero?`<img class="av" src="${S.hero}" alt="">`:`<div class="av ph"></div>`}<h1>${v("head")}</h1><p>${v("sub")}</p></section>`
  :`<section class="hero"><h1>${v("head")}</h1><p>${v("sub")}</p><a class="btn" href="${href}">${v("cta")}</a></section>`;
 const body=lay==="stack"?hero+feats+about+gal+tes+con:hero+feats+about+gal+tes+con;
 return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${v("brand")}</title><style>
:root{--a:${c};--r:${rad};--bg:${d?"#07060f":"#f8f7ff"};--card:${d?"#12101f":"#fff"};--t:${d?"#f4f2ff":"#14112b"};--m:${d?"#a09cc0":"#5d5a7e"};--l:${d?"#26233a":"#dedaf3"}}
*{box-sizing:border-box;margin:0}
body{font-family:${font==="serif"?"Georgia,'Times New Roman',serif":"system-ui,sans-serif"};background:var(--bg);color:var(--t);line-height:1.6}
img{max-width:100%;display:block}
header{display:flex;align-items:center;gap:.6rem;padding:1rem 5%;font-weight:800;font-size:1.2rem}
.lg{height:2rem;width:auto}
.hero{text-align:center;padding:clamp(3rem,9vw,6rem) 5%;${heroBg}}
h1{font-size:clamp(2rem,6vw,3.5rem);line-height:1.15;max-width:20ch;margin:0 auto 1rem}
.hero p{max-width:36rem;margin:0 auto 1.5rem;opacity:.85}
.btn{display:inline-block;background:var(--a);color:#fff;padding:.8rem 1.6rem;border-radius:var(--r);text-decoration:none;font-weight:700}
.sec{max-width:70rem;margin:auto;padding:2.5rem 5%}
h2{font-size:1.7rem;margin-bottom:1rem;text-align:center}
.m{color:var(--m);text-align:center;max-width:40rem;margin:auto}
.f{display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem}
.c{background:var(--card);border:1px solid var(--l);border-radius:var(--r);padding:1.3rem}
.c h3{color:var(--a);margin-bottom:.3rem}.c p{color:var(--m)}
.gal{display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:.8rem}
.gal img,.gal .ph{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--r)}
.ph{background:linear-gradient(135deg,var(--a),transparent);opacity:.5;background-color:var(--l)}
blockquote{font-size:1.3rem;text-align:center;max-width:40rem;margin:0 auto 1rem;font-style:italic}
.sec>b{display:block;text-align:center;color:var(--a)}
#contact{text-align:center}
.split .hero,.hero{}
${lay==="split"?".hero{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;text-align:left;max-width:70rem;margin:auto}.hero h1,.hero p{margin-left:0}.himg{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--r)}@media(max-width:700px){.hero{grid-template-columns:1fr;text-align:center}.hero h1,.hero p{margin-inline:auto}}":""}
${lay==="stack"?"body{max-width:30rem;margin:auto}.av{width:6rem;height:6rem;border-radius:50%;object-fit:cover;margin:0 auto 1rem}.f{grid-template-columns:1fr}.lk{display:block;text-align:center;padding:1rem;border:2px solid var(--a);border-radius:var(--r);color:var(--t);text-decoration:none;font-weight:700}":""}
footer{text-align:center;color:var(--m);padding:2rem}
</style></head><body><header>${logo}${v("brand")}</header>${body}<footer>&copy; 2026 ${v("brand")}</footer></body></html>`;
}
function render(){$("pf").srcdoc=build()}

$("type").onchange=e=>load(e.target.value);
$("form").addEventListener("input",render);
$("form").addEventListener("change",render);
document.querySelectorAll(".devs button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".devs button").forEach(x=>x.classList.remove("on"));
 b.classList.add("on");$("pf").style.width=b.dataset.w;
});
$("dl").onclick=()=>{
 const a=document.createElement("a");
 a.href=URL.createObjectURL(new Blob([build()],{type:"text/html"}));
 a.download="my-landing-page.html";
 document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(a.href),1000);
};
const q=new URLSearchParams(location.search).get("type");
const start=D[q]?q:"product";
$("type").value=start;load(start);
