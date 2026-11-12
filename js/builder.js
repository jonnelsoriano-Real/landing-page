// [headline, subtext, button, layout, font, color, radius, features]
const D={
product:["Meet Your New Favorite Product","A short, clear description of what makes it special.","Learn More","split","sans","#7c3aed","1rem",["Quality | Made with care and tested to last","Easy to Use | Simple from the first day","Great Value | Everything you need, nothing you don't"]],
event:["Join Us for an Unforgettable Event","Save the date and be part of something great.","See Details","center","sans","#e11d48","1.5rem",["Date and Time | Add when your event starts","Location | Tell guests where to go","Schedule | Share what happens and when"]],
portfolio:["Hi, I'm a Creative Designer","A collection of my best work and recent projects.","View My Work","split","serif","#0ea5e9","0.4rem",["Design | Clean and thoughtful visuals","Development | Fast and reliable builds","Branding | Identities that stand out"]],
business:["Grow Your Business Online","Professional services built around your needs.","Get in Touch","bold","sans","#2563eb","0.5rem",["Experience | Years of trusted service","Quality | Careful work on every job","Support | Friendly help when you need it"]],
app:["The App You've Been Waiting For","Simple, fast and made to fit your day.","Learn More","split","sans","#6366f1","1.8rem",["Fast | Opens instantly and runs smoothly","Secure | Your data stays protected","Free to Try | Download and start today"]],
restaurant:["Fresh Food, Made With Love","Explore our menu and find us easily.","View Menu","center","serif","#b45309","0.3rem",["Fresh Ingredients | Prepared daily with care","Open Daily | Visit us any day of the week","Easy to Find | Come say hello"]],
home:["Find Your Dream Home","Browse beautiful properties in great locations.","See Listings","bold","sans","#059669","0.6rem",["Great Locations | Neighborhoods you will love","Verified Listings | Clear photos and details","Friendly Agents | Guidance at every step"]],
course:["Learn New Skills Online","Join our class and learn at your own pace.","See Lessons","split","sans","#f59e0b","1rem",["Learn Anywhere | Study from any device","Step by Step | Lessons that are easy to follow","Certificate | Show what you learned"]],
link:["All My Links in One Place","Follow me and explore everything I share.","Visit My Page","stack","sans","#a855f7","2rem",["My Website | Visit my main page","My Latest Work | See what I made recently","Contact Me | Say hello"]],
wedding:["We're Getting Married","Join us as we celebrate our special day.","See Details","center","serif","#be185d","0.2rem",["The Ceremony | Add time and place","The Reception | Dinner, music and dancing","RSVP | Let us know you are coming"]],
soon:["Something Big Is Coming","We are working on something new. Stay tuned.","Notify Me","center","sans","#06b6d4","1rem",["Fresh Ideas | Something new is on the way","Early Access | Be the first to know","Stay Tuned | Updates are coming soon"]],
donation:["Together We Can Make a Difference","Learn about our cause and how you can help.","Learn More","bold","sans","#dc2626","0.8rem",["Our Mission | Why we do this work","Your Impact | How every gift helps","Transparency | Clear and honest reporting"]],
agency:["We Build Brands That Get Noticed","Strategy, design and development under one roof.","See Our Work","bold","sans","#8b5cf6","0.6rem",["Strategy | Plans built around your goals","Creative | Ideas that get noticed","Delivery | On time and on budget"]],
fitness:["Stronger Every Single Day","Coaching and classes for every fitness level.","Join Today","bold","sans","#f97316","0.5rem",["Personal Coaching | Plans made for you","Group Classes | Train with a community","Real Results | Track your progress"]],
photo:["Moments Worth Remembering","Portrait, event and lifestyle photography.","View Gallery","center","serif","#14b8a6","0.2rem",["Portraits | Natural and timeless","Events | Moments captured as they happen","Prints | High quality finishes"]],
saas:["Work Smarter With Less Effort","One simple tool to organize your whole workflow.","Try It Now","split","sans","#2563eb","0.7rem",["Automation | Save hours every week","Dashboard | See everything in one place","Integrations | Works with your tools"]]
};
const N={product:"Product",event:"Event",portfolio:"Portfolio",business:"Business",app:"App Launch",restaurant:"Restaurant",home:"Real Estate",course:"Course / Webinar",link:"Link-in-Bio",wedding:"Wedding",soon:"Coming Soon",donation:"Donation",agency:"Agency",fitness:"Fitness",photo:"Photography",saas:"Software / SaaS"};
const KEYS=["type","lay","fnt","brand","color","pt","head","sub","cta","link","f1","f2","f3","ss","stt","sa","ab","sg","st","quote","qname","sf","fq","sb","cta2","sc","email","tg","fb","ig","web"];
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const url=u=>{u=String(u||"").trim();if(/^(https?:\/\/|mailto:|#)/i.test(u))return esc(u);if(/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(u))return esc("https://"+u);return"#"};
const lines=id=>$(id).value.split("\n").map(s=>s.trim()).filter(Boolean).map(s=>{const a=s.split("|");return[esc(a[0].trim()),esc(a.slice(1).join("|").trim())]});
const S={logo:"",hero:"",gal:[]};
const say=(t,err)=>{const m=$("msg");m.textContent=t;m.className=err?"err":""};

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

function load(k){
 const p=D[k];
 $("head").value=p[0];$("sub").value=p[1];$("cta").value=p[2];$("color").value=p[5];
 p[7].forEach((f,i)=>$("f"+(i+1)).value=f);
 $("lay").value="auto";$("fnt").value="auto";
 render();
}

function build(){
 const def=D[$("type").value],v=k=>esc($(k).value),on=k=>$(k).checked;
 const lay=$("lay").value==="auto"?def[3]:$("lay").value;
 const fk=$("fnt").value==="auto"?def[4]:$("fnt").value;
 const FF={sans:"system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",serif:"Georgia,'Times New Roman',serif",mono:"ui-monospace,Menlo,Consolas,monospace"}[fk];
 const rad=def[6],c=$("color").value,d=$("pt").value==="dark";
 const link=url($("link").value);
 const F=["f1","f2","f3"].map(k=>{const a=$(k).value.split("|");return[esc((a[0]||"").trim()),esc(a.slice(1).join("|").trim())]});
 const soc=[["tg","Telegram"],["fb","Facebook"],["ig","Instagram"],["web","Website"]].filter(x=>$(x[0]).value.trim()).map(x=>[x[1],url($(x[0]).value)]);
 const socHtml=soc.length?`<div class="soc">${soc.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join("")}</div>`:"";
 const logo=S.logo?`<img class="lg" src="${S.logo}" alt="">`:"";
 const btn=`<a class="btn" href="${link}">${v("cta")}</a>`;
 const himg=S.hero?`<img class="himg" src="${S.hero}" alt="">`:`<div class="himg ph"></div>`;
 const nav=[[on("sa"),"about","About"],[on("sg"),"gallery","Gallery"],[on("sf"),"faq","FAQ"],[on("sc"),"contact","Contact"]].filter(x=>x[0]).map(x=>`<a href="#${x[1]}">${x[2]}</a>`).join("");

 let hero;
 if(lay==="split")hero=`<section class="hero split"><div><h1>${v("head")}</h1><p>${v("sub")}</p>${btn}</div>${himg}</section>`;
 else if(lay==="stack")hero=`<section class="hero">${S.hero?`<img class="av" src="${S.hero}" alt="">`:`<div class="av ph"></div>`}<h1>${v("head")}</h1><p>${v("sub")}</p></section>`;
 else hero=`<section class="hero ${lay}"><h1>${v("head")}</h1><p>${v("sub")}</p>${btn}${lay==="center"&&S.hero?`<img class="wide" src="${S.hero}" alt="">`:""}</section>`;

 const feats=lay==="stack"
  ?`<section class="sec links">${F.map(x=>`<a class="lk" href="${link}">${x[0]}</a>`).join("")}${soc.map(s=>`<a class="lk" href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join("")}</section>`
  :`<section class="sec"><div class="f">${F.map(x=>`<div class="c"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join("")}</div></section>`;
 const stats=on("ss")?`<section class="sec"><div class="st">${lines("stt").map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div></section>`:"";
 const about=on("sa")?`<section class="sec" id="about"><h2>About</h2><p class="m">${v("ab")}</p></section>`:"";
 const gal=on("sg")?`<section class="sec" id="gallery"><h2>Gallery</h2><div class="gal">${(S.gal.length?S.gal.map(s=>`<img src="${s}" alt="">`):[1,2,3].map(()=>`<div class="ph"></div>`)).join("")}</div></section>`:"";
 const tes=on("st")?`<section class="sec"><blockquote>&ldquo;${v("quote")}&rdquo;</blockquote><b class="qn">${v("qname")}</b></section>`:"";
 const faq=on("sf")?`<section class="sec" id="faq"><h2>FAQ</h2><div class="faq">${lines("fq").map(x=>`<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join("")}</div></section>`:"";
 const band=on("sb")?`<section class="band"><h2>${v("cta2")}</h2><a class="btn inv" href="${on("sc")?"#contact":link}">${v("cta")}</a></section>`:"";
 const con=on("sc")?`<section class="sec" id="contact"><h2>Contact</h2><div style="text-align:center"><a class="btn" href="mailto:${v("email")}">${v("email")}</a></div>${lay==="stack"?"":socHtml}</section>`:"";

 const body=lay==="stack"?hero+feats+about+stats+gal+tes+faq+band+con:hero+stats+feats+about+gal+tes+faq+band+con;
 const heroBg=lay==="bold"?`.hero.bold{color:#fff;background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6))${S.hero?`,url("${S.hero}") center/cover`:""},linear-gradient(135deg,${c},#111)}.hero.bold p{color:#eee}`:"";
 const splitCss=lay==="split"?".hero.split{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;text-align:left;max-width:70rem;margin:auto}.hero.split h1,.hero.split p{margin-left:0}.himg{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--r)}@media(max-width:700px){.hero.split{grid-template-columns:1fr;text-align:center}.hero.split h1,.hero.split p{margin-inline:auto}}":"";
 const stackCss=lay==="stack"?"body{max-width:30rem;margin:auto}nav{display:none}.av{width:6.5rem;height:6.5rem;border-radius:50%;object-fit:cover;margin:0 auto 1rem}.links{display:grid;gap:.8rem}.lk{display:block;text-align:center;padding:1rem;border:2px solid var(--a);border-radius:var(--r);color:var(--t);text-decoration:none;font-weight:700}":"";
 const fav=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='${c.replace("#","%23")}'/%3E%3C/svg%3E`;

 return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${v("brand")}</title><meta name="description" content="${v("sub")}"><link rel="icon" href="${fav}"><style>
:root{--a:${c};--r:${rad};--bg:${d?"#07060f":"#f8f7ff"};--card:${d?"#12101f":"#fff"};--t:${d?"#f4f2ff":"#14112b"};--m:${d?"#a09cc0":"#5d5a7e"};--l:${d?"#26233a":"#dedaf3"}}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth}
body{font-family:${FF};background:var(--bg);color:var(--t);line-height:1.6}
img{max-width:100%;display:block}
header{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1rem 5%}
.brand{display:flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.2rem}
.lg{height:2rem;width:auto}
nav{display:flex;gap:1.1rem;flex-wrap:wrap}
nav a{text-decoration:none;color:var(--m)}
.hero{text-align:center;padding:clamp(3rem,9vw,6rem) 5%}
h1{font-size:clamp(2rem,6vw,3.5rem);line-height:1.15;max-width:20ch;margin:0 auto 1rem}
.hero p{max-width:36rem;margin:0 auto 1.5rem;color:var(--m)}
.btn{display:inline-block;background:var(--a);color:#fff;padding:.8rem 1.6rem;border-radius:var(--r);text-decoration:none;font-weight:700}
.wide{width:100%;max-width:60rem;margin:2.5rem auto 0;border-radius:var(--r)}
.sec{max-width:70rem;margin:auto;padding:2.5rem 5%}
h2{font-size:1.7rem;margin-bottom:1rem;text-align:center}
.m{color:var(--m);text-align:center;max-width:40rem;margin:auto}
.f{display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem}
.c{background:var(--card);border:1px solid var(--l);border-radius:var(--r);padding:1.3rem}
.c h3{color:var(--a);margin-bottom:.3rem}.c p{color:var(--m)}
.st{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:1rem;text-align:center}
.st b{display:block;font-size:2rem;color:var(--a)}.st span{color:var(--m)}
.gal{display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:.8rem}
.gal img,.gal .ph{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--r)}
.ph{background:linear-gradient(135deg,var(--a),transparent);background-color:var(--l);opacity:.55}
blockquote{font-size:1.3rem;text-align:center;max-width:40rem;margin:0 auto 1rem;font-style:italic}
.qn{display:block;text-align:center;color:var(--a)}
.faq{max-width:46rem;margin:auto}
.faq details{background:var(--card);border:1px solid var(--l);border-radius:var(--r);padding:.9rem 1.1rem;margin-bottom:.6rem}
.faq summary{cursor:pointer;font-weight:600}.faq p{color:var(--m);margin-top:.5rem}
.band{background:var(--a);color:#fff;text-align:center;padding:3rem 5%}
.band h2{color:#fff}.btn.inv{background:#fff;color:var(--a)}
.soc{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem;margin-top:1.2rem}
.soc a{padding:.5rem 1rem;border:1px solid var(--l);border-radius:var(--r);text-decoration:none}
footer{text-align:center;color:var(--m);padding:2rem}
${heroBg}${splitCss}${stackCss}
</style></head><body><header><div class="brand">${logo}${v("brand")}</div><nav>${nav}</nav></header>${body}<footer>&copy; ${new Date().getFullYear()} ${v("brand")}</footer></body></html>`;
}
function render(){$("pf").srcdoc=build()}

function save(){
 try{const o={};KEYS.forEach(k=>{const e=$(k);o[k]=e.type==="checkbox"?e.checked:e.value});localStorage.setItem("pc_project",JSON.stringify(o))}catch(e){}
}
$("type").onchange=e=>{load(e.target.value);save()};
$("form").addEventListener("input",()=>{render();save()});
$("form").addEventListener("change",()=>{render();save()});
document.querySelectorAll(".devs button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".devs button").forEach(x=>x.classList.remove("on"));
 b.classList.add("on");$("pf").style.width=b.dataset.w;
});

$("dl").onclick=()=>{
 const a=document.createElement("a");
 a.href=URL.createObjectURL(new Blob([build()],{type:"text/html"}));
 a.download="index.html";
 document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(a.href),1000);
 say("Downloaded as index.html");
};
$("cp").onclick=async()=>{
 try{await navigator.clipboard.writeText(build());say("HTML copied to clipboard.")}
 catch(e){say("Copy is blocked by this browser. Use Download HTML instead.",1)}
};
$("rs").onclick=()=>{
 if(!confirm("Clear everything and start over?"))return;
 try{localStorage.removeItem("pc_project")}catch(e){}
 location.href=location.pathname;
};

/* Publish to the user's own Netlify account */
const NF="https://api.netlify.com/api/v1";
async function nf(path,opt,tk){
 opt=opt||{};
 const r=await fetch(NF+path,{method:opt.method||"GET",body:opt.body,headers:Object.assign({"Authorization":"Bearer "+tk},opt.headers||{})});
 let j=null;try{j=await r.json()}catch(e){}
 return{ok:r.ok,status:r.status,j};
}
async function sha1(bytes){
 const h=await crypto.subtle.digest("SHA-1",bytes);
 return[...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
$("pub").onclick=async()=>{
 const name=$("nfn").value.trim().toLowerCase(),tk=$("nft").value.trim();
 if(!tk)return say("Enter your Netlify token.",1);
 if(name&&!/^[a-z0-9][a-z0-9-]{1,62}$/.test(name))return say("Site name can only use lowercase letters, numbers and dashes.",1);
 const btn=$("pub");btn.disabled=true;
 try{
  say("Checking your Netlify account...");
  const list=await nf("/sites?filter=owner&per_page=100",{},tk);
  if(!list.ok)throw new Error("Token is invalid or expired.");
  let site=name?(list.j||[]).find(s=>s.name===name):null;
  if(site){
   if(!confirm("You already have a site named "+name+". Replace its content with this page?")){say("Publish cancelled.");btn.disabled=false;return}
  }else{
   say("Creating your site...");
   const c=await nf("/sites",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(name?{name:name}:{})},tk);
   if(!c.ok)throw new Error(c.status===422?"That site name is already taken. Try another name.":((c.j&&c.j.message)||"Could not create the site."));
   site=c.j;
  }
  say("Uploading your page...");
  const bytes=new TextEncoder().encode(build());
  const hash=await sha1(bytes);
  const d=await nf("/sites/"+site.id+"/deploys",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({files:{"/index.html":hash}})},tk);
  if(!d.ok)throw new Error((d.j&&d.j.message)||"Could not start the deploy.");
  const up=await nf("/deploys/"+d.j.id+"/files/index.html",{method:"PUT",headers:{"Content-Type":"application/octet-stream"},body:bytes},tk);
  if(!up.ok)throw new Error((up.j&&up.j.message)||"Upload failed.");
  const link=site.ssl_url||site.url||("https://"+site.name+".netlify.app");
  const m=$("msg");m.className="";m.textContent="Published! Your site is live: ";
  const a=document.createElement("a");a.href=link;a.textContent=link;a.target="_blank";a.rel="noopener";m.appendChild(a);
  $("nft").value="";
 }catch(e){say((e.message==="Failed to fetch"?"Could not reach Netlify. Check your connection and token.":e.message)||"Something went wrong.",1)}
 btn.disabled=false;
};

/* Start */
const q=new URLSearchParams(location.search).get("type");
let saved=null;try{saved=JSON.parse(localStorage.getItem("pc_project")||"null")}catch(e){}
if(D[q]){$("type").value=q;load(q)}
else if(saved&&D[saved.type]){
 KEYS.forEach(k=>{if(k in saved){const e=$(k);if(e.type==="checkbox")e.checked=saved[k];else e.value=saved[k]}});
 render();
}else{$("type").value="product";load("product")}
