const T=[
["product","Product","Showcase a product"],
["event","Event","Birthday, seminar, concert"],
["portfolio","Portfolio","Showcase your work"],
["business","Business","Company or shop website"],
["app","App Launch","Introduce your app"],
["restaurant","Restaurant","Menu and location"],
["home","Real Estate","Property listings"],
["course","Course / Webinar","Present your online class"],
["link","Link-in-Bio","All your links in one page"],
["wedding","Wedding","Invitation and details"],
["soon","Coming Soon","Teaser before launch"],
["donation","Donation","Charity and causes"],
["agency","Agency","Present your services","code"],
["fitness","Fitness","Gym, coach or classes","bolt"],
["photo","Photography","Gallery-first portfolio","eye"],
["saas","Software / SaaS","Present a web tool","chart"]
];
const $=id=>document.getElementById(id);

const grid=$("grid");
if(grid)T.forEach(t=>grid.insertAdjacentHTML("beforeend",
`<div class="card"><div class="ico"><svg class="i"><use href="#i-${t[3]||t[0]}"/></svg></div><h3>${t[1]}</h3><p>${t[2]}</p><a href="pages/builder.html?type=${t[0]}" class="btn sm">Use Template</a></div>`));

const menu=$("menu"),menuBtn=$("menuBtn");
if(menu&&menuBtn){
 const setMenu=o=>{menu.classList.toggle("open",o);menuBtn.setAttribute("aria-expanded",o)};
 menuBtn.onclick=()=>setMenu(!menu.classList.contains("open"));
 menu.querySelectorAll("a").forEach(a=>a.onclick=()=>setMenu(false));
}

const tb=$("themeBtn");
if(tb)tb.onclick=()=>{
 const n=document.documentElement.dataset.theme==="dark"?"light":"dark";
 document.documentElement.dataset.theme=n;
 try{localStorage.setItem("theme",n)}catch(e){}
};

const sl=$("slider");
if(sl){
 const cards=[...sl.children],dots=$("dots");
 cards.forEach(()=>dots.appendChild(document.createElement("i")));
 const step=()=>cards[0].offsetWidth+16;
 const mark=()=>{const k=Math.round(sl.scrollLeft/step());[...dots.children].forEach((d,i)=>d.classList.toggle("on",i===k))};
 sl.addEventListener("scroll",mark);mark();
 $("prev").onclick=()=>sl.scrollBy({left:-step(),behavior:"smooth"});
 $("next").onclick=()=>sl.scrollBy({left:step(),behavior:"smooth"});
}
