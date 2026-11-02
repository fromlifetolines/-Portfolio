(()=>{'use strict';
const shots=[
['BRAND_HERO','品牌主視覺','Brand hero'],
['BRAND_PHILOSOPHY','品牌定位與日常情境','Brand philosophy'],
['VISUAL_IDENTITY','字體、字標與識別系統','Visual identity'],
['COLOR_AND_MATERIAL','色彩、瓶器與材質研究','Colors and material studies'],
['PRODUCT_COLLECTION','三款保養產品系列','Product collection'],
['DAILY_ESSENCE','Daily Essence 精華水','Daily Essence'],
['BARRIER_SERUM','Barrier Serum 精華液','Barrier Serum'],
['COMFORT_CREAM','Comfort Cream 保養霜','Comfort Cream'],
['PACKAGING_SYSTEM','包裝與盒型結構研究','Packaging system'],
['LABEL_INFORMATION','產品資訊及標籤層級','Product information'],
['EDITORIAL_BOOKLET','品牌編輯刊物','Editorial booklet'],
['CAMPAIGN_EDITORIAL','形象廣告視覺','Campaign editorial'],
['WEBSITE_DESKTOP','網站桌機介面','Website desktop'],
['MOBILE_EXPERIENCE','手機響應式體驗','Mobile experience'],
['ROUTINE_BUILDER_UX','日常保養步驟設計','Routine builder UX'],
['FINAL_BRAND_SYSTEM','完整品牌體驗系統','Final system']
];

const productList=[
{id:'ess',en:'Daily Essence',zh:'日常精華水',size:'120 mL',shot:6,desc:'按壓式霧面瓶身，以清楚的產品資訊協助理解日常使用方式。',descEN:'The frosted pump bottle and clearly structured content present an accessible daily skincare ritual.'},
{id:'ser',en:'Barrier Serum',zh:'保養精華液',size:'30 mL',shot:7,desc:'透明滴管容器與材質攝影，讓使用方式更容易理解。',descEN:'A dropper-format concept supported by accessible product visuals.'},
{id:'crm',en:'Comfort Cream',zh:'日常保養霜',size:'50 g',shot:8,desc:'廣口罐與乳霜質地近拍，傳達容器與觸感設計。',descEN:'A wide-mouth cream jar shown through tactile product storytelling.'}
];

let lang='zh-TW';
let ids=productList.map(p=>p.id),active=0,lastFocus=null;
const q=(s)=>document.querySelector(s),all=(s)=>[...document.querySelectorAll(s)];

// =========================================================================
// V4 SKIN NEEDS GUIDE STATE & LABELS
// =========================================================================
const guideState={
need:null,
steps:null,
time:null,
currentStep:1
};

const needLabels={
dry:{zh:'保濕感',en:'Moisturizing-feel'},
simple:{zh:'精簡步驟',en:'Simpler Routine'},
texture:{zh:'輕盈觸感',en:'Lighter Texture'},
comfort:{zh:'日常舒適感',en:'Everyday Comfort'}
};

const stepsLabels={
minimal:{zh:'精簡 2 步',en:'Minimal: 2 Steps'},
layered:{zh:'完整 3 步',en:'Layered: 3 Steps'}
};

const timeLabels={
am:{zh:'早上 (AM)',en:'Morning (AM)'},
pm:{zh:'晚上 (PM)',en:'Evening (PM)'},
both:{zh:'早晚皆宜',en:'Both (AM & PM)'}
};

function setLang(l){
lang=l==='en'?'en':'zh-TW';
document.documentElement.lang=lang==='en'?'en':'zh-Hant';
all('.fl-zh').forEach(n=>n.hidden=lang==='en');
all('.fl-en').forEach(n=>n.hidden=lang!=='en');
all('[data-lang]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.lang===lang)));
displayProducts();
updateList();
const prod=productList.find(z=>z.id===q('.fl-product-options button.active')?.dataset.product)||productList[0];
if(q('#fl-product-description'))q('#fl-product-description').textContent=prod.desc;
if(q('#fl-product-description-en'))q('#fl-product-description-en').textContent=prod.descEN;
if(guideState.currentStep===4){
renderGuideResults();
}
}

all('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));

function displayProducts(){
const id=q('.fl-product-options button.active')?.dataset.product||'ess';
const p=productList.find(x=>x.id===id);
if(!p)return;
const img=q('#fl-product-image');
if(img){
img.src=`assets/mockups/shot-${String(p.shot).padStart(2,'0')}.jpg?v=fl07-visual-v2-20261022`;
img.alt=p.en+' / '+p.size;
}
const nameEl=q('#fl-product-name');
if(nameEl)nameEl.textContent=p.en;
const zhEl=q('#fl-product-zh');
if(zhEl)zhEl.textContent=p.zh;
const volEl=q('#fl-product-volume');
if(volEl)volEl.textContent=p.size;
const descEl=q('#fl-product-description');
if(descEl)descEl.textContent=p.desc;
const descEnEl=q('#fl-product-description-en');
if(descEnEl)descEnEl.textContent=p.descEN;
}

all('.fl-product-options [data-product]').forEach(b=>b.addEventListener('click',()=>{
all('.fl-product-options [data-product]').forEach(x=>x.classList.toggle('active',x===b));
displayProducts();
}));

const list=q('#fl-plate-list');
if(list){
shots.forEach(([slug,zh,en],idx)=>{
const n=idx+1;
const fig=document.createElement('figure');
fig.className='fl-plate';
const btn=document.createElement('button');
btn.type='button';
btn.className='fl-plate-button';
btn.setAttribute('aria-label',`開啟 SHOT ${n} 原圖檢視`);
const img=document.createElement('img');
img.src=`assets/mockups/shot-${String(n).padStart(2,'0')}.jpg?v=fl07-visual-v2-20261022`;
img.alt=`SHOT ${String(n).padStart(2,'0')}: ${zh}`;
img.loading=n<3?'eager':'lazy';
btn.append(img);
btn.addEventListener('click',()=>openLightbox(idx,btn));
const cap=document.createElement('figcaption');
cap.innerHTML=`<strong class="fl-plate-title">SHOT ${String(n).padStart(2,'0')} / 16</strong><span class="fl-plate-descr"><span class="fl-zh">${zh}</span><span class="fl-en" hidden>${en}</span></span><span class="fl-plate-action">VIEW ORIGINAL ↗</span>`;
fig.append(btn,cap);
list.append(fig);
});
}

const lb=q('#fl-lightbox');
function openLightbox(i,trigger){
lastFocus=trigger;
active=(i+16)%16;
drawLightbox();
if(lb)lb.hidden=false;
document.body.style.overflow='hidden';
q('#fl-lightbox-close')?.focus();
}

function drawLightbox(){
let [slug,zh,en]=shots[active],s=String(active+1).padStart(2,'0');
const lImg=q('#fl-lightbox-image');
if(lImg){
lImg.src=`assets/shots/SHOT_${s}_${slug}.png?v=fl07-visual-v2-20261022`;
lImg.alt=lang==='en'?en:zh;
}
const lCap=q('#fl-lightbox-caption');
if(lCap){
lCap.textContent=`FORME LAB / SHOT ${s} / 16 — 2560 × 1440 px`;
}
}

function closeLightbox(){
if(lb)lb.hidden=true;
document.body.style.overflow='';
lastFocus?.focus();
}

q('#fl-lightbox-close')?.addEventListener('click',closeLightbox);
q('#fl-lightbox-prev')?.addEventListener('click',()=>{active=(active+15)%16;drawLightbox();});
q('#fl-lightbox-next')?.addEventListener('click',()=>{active=(active+1)%16;drawLightbox();});
lb?.addEventListener('click',e=>{if(e.target===lb)closeLightbox();});
document.addEventListener('keydown',e=>{
if(!lb||lb.hidden)return;
if(e.key==='Escape'){
e.preventDefault();
closeLightbox();
}else if(e.key==='ArrowRight'){
e.preventDefault();
active=(active+1)%16;
drawLightbox();
}else if(e.key==='ArrowLeft'){
e.preventDefault();
active=(active+15)%16;
drawLightbox();
}else if(e.key==='Tab'){
const foc=[q('#fl-lightbox-close'),q('#fl-lightbox-prev'),q('#fl-lightbox-next')].filter(Boolean);
const fi=foc.indexOf(document.activeElement);
if(e.shiftKey&&fi===0){
e.preventDefault();
foc[foc.length-1]?.focus();
}else if(!e.shiftKey&&fi===foc.length-1){
e.preventDefault();
foc[0]?.focus();
}
}
});

function updateList(){
const checks=q('#fl-product-checks'),lst=q('#fl-routine-order');
if(!checks||!lst)return;
checks.replaceChildren();
lst.replaceChildren();
for(const p of productList){
const row=document.createElement('label');
row.className='fl-product-check';
const box=document.createElement('span');
box.textContent=p.en;
const sm=document.createElement('small');
sm.textContent=(lang==='en'?'':p.zh+' / ')+p.size;
box.append(sm);
const ch=document.createElement('input');
ch.type='checkbox';
ch.checked=ids.includes(p.id);
ch.setAttribute('aria-label',p.en);
ch.addEventListener('change',()=>{
if(ch.checked){
if(!ids.includes(p.id))ids.push(p.id);
}else{
ids=ids.filter(z=>z!==p.id);
}
updateList();
});
row.append(box,ch);
checks.append(row);
}
ids.forEach((id,i)=>{
const p=productList.find(z=>z.id===id);
if(!p)return;
const li=document.createElement('li');
const t=document.createElement('strong');
t.textContent=`${String(i+1).padStart(2,'0')}  ${p.en}`;
const up=document.createElement('button');
up.type='button';
up.textContent='↑';
up.disabled=i===0;
up.setAttribute('aria-label',`${p.en} 上移`);
up.addEventListener('click',()=>move(i,-1));
const dn=document.createElement('button');
dn.type='button';
dn.textContent='↓';
dn.disabled=i===ids.length-1;
dn.setAttribute('aria-label',`${p.en} 下移`);
dn.addEventListener('click',()=>move(i,1));
li.append(t,up,dn);
lst.append(li);
});
if(!ids.length){
const li=document.createElement('li');
li.textContent=lang==='en'?'No product selected.':'尚未選擇產品。';
lst.append(li);
}
}

function move(i,dir){
const j=i+dir;
if(j<0||j>=ids.length)return;
[ids[i],ids[j]]=[ids[j],ids[i]];
updateList();
}

q('#fl-build-summary')?.addEventListener('click',()=>{
const when=q('input[name=fl-when]:checked')?.value||'am';
const heading=lang==='en'?(when==='am'?'MORNING':'EVENING'):(when==='am'?'早晨':'晚間');
const out=q('#fl-routine-output');
if(!out)return;
out.textContent=ids.length?heading+' / '+(lang==='en'?'Concept routine':'日常保養示範')+'\n'+ids.map((id,i)=>{
const p=productList.find(z=>z.id===id);
return `${i+1}. ${p.en} — ${p.size}`;
}).join('\n'):(lang==='en'?'Select at least one product.':'請至少選擇一款產品。');
});

// =========================================================================
// V4 SKIN NEEDS GUIDE STEP CONTROL & ACTIONS
// =========================================================================
function updateGuideStepIndicator(step){
all('.fl-step-dot').forEach(dot=>{
const s=parseInt(dot.dataset.step,10);
dot.classList.remove('active','completed');
if(s===step){
dot.classList.add('active');
}else if(s<step){
dot.classList.add('completed');
}
});
}

function showGuideStep(step){
guideState.currentStep=step;
const q1=q('#fl-guide-q1');
const q2=q('#fl-guide-q2');
const q3=q('#fl-guide-q3');
const res=q('#fl-guide-result');

if(q1)q1.hidden=step!==1;
if(q2)q2.hidden=step!==2;
if(q3)q3.hidden=step!==3;
if(res)res.hidden=step!==4;

updateGuideStepIndicator(step);

if(step===4){
renderGuideResults();
}
}

// Question 1 options
all('[data-need]').forEach(btn=>{
btn.addEventListener('click',()=>{
all('[data-need]').forEach(b=>{
b.classList.remove('active');
b.setAttribute('aria-checked','false');
});
btn.classList.add('active');
btn.setAttribute('aria-checked','true');
guideState.need=btn.dataset.need;
const err=q('#fl-error-q1');
if(err)err.hidden=true;
});
});

// Question 2 options
all('[data-steps]').forEach(btn=>{
btn.addEventListener('click',()=>{
all('[data-steps]').forEach(b=>{
b.classList.remove('active');
b.setAttribute('aria-checked','false');
});
btn.classList.add('active');
btn.setAttribute('aria-checked','true');
guideState.steps=btn.dataset.steps;
const err=q('#fl-error-q2');
if(err)err.hidden=true;
});
});

// Question 3 options
all('[data-time]').forEach(btn=>{
btn.addEventListener('click',()=>{
all('[data-time]').forEach(b=>{
b.classList.remove('active');
b.setAttribute('aria-checked','false');
});
btn.classList.add('active');
btn.setAttribute('aria-checked','true');
guideState.time=btn.dataset.time;
const err=q('#fl-error-q3');
if(err)err.hidden=true;
});
});

// Next / Prev buttons
q('#fl-btn-next-1')?.addEventListener('click',()=>{
if(!guideState.need){
const err=q('#fl-error-q1');
if(err){
err.hidden=false;
err.focus();
}
return;
}
showGuideStep(2);
});

q('#fl-btn-prev-2')?.addEventListener('click',()=>{
showGuideStep(1);
});

q('#fl-btn-next-2')?.addEventListener('click',()=>{
if(!guideState.steps){
const err=q('#fl-error-q2');
if(err){
err.hidden=false;
err.focus();
}
return;
}
showGuideStep(3);
});

q('#fl-btn-prev-3')?.addEventListener('click',()=>{
showGuideStep(2);
});

q('#fl-btn-submit')?.addEventListener('click',()=>{
if(!guideState.time){
const err=q('#fl-error-q3');
if(err){
err.hidden=false;
err.focus();
}
return;
}
showGuideStep(4);
});

// Edit / Reset buttons
q('#fl-btn-edit-answers')?.addEventListener('click',()=>{
showGuideStep(1);
});

q('#fl-btn-reset-guide')?.addEventListener('click',()=>{
guideState.need=null;
guideState.steps=null;
guideState.time=null;
all('[data-need], [data-steps], [data-time]').forEach(btn=>{
btn.classList.remove('active');
btn.setAttribute('aria-checked','false');
});
all('#fl-error-q1, #fl-error-q2, #fl-error-q3').forEach(e=>e.hidden=true);
showGuideStep(1);
});

function renderGuideResults(){
// Determine recommendation logic:
// minimal + texture => ['ess', 'ser']
// minimal + other => ['ess', 'crm']
// layered => ['ess', 'ser', 'crm']
let orderedIds=['ess','crm'];
let reasonZh='以精華水搭配乳霜示範精簡日常保養程序。';
let reasonEn='A concise essence-and-cream concept routine.';

if(guideState.steps==='minimal'&&guideState.need==='texture'){
orderedIds=['ess','ser'];
reasonZh='以兩道較輕盈的概念步驟示範日常使用順序。';
reasonEn='A two-step concept sequence focused on lighter textures.';
}else if(guideState.steps==='layered'){
orderedIds=['ess','ser','crm'];
reasonZh='示範精華水、精華液、乳霜的三步驟產品閱讀順序。';
reasonEn='An editorial three-step essence, serum and cream sequence.';
}

// Chips
const chipsEl=q('#fl-summary-chips');
if(chipsEl){
chipsEl.replaceChildren();
const needText=needLabels[guideState.need]?(lang==='en'?`Focus: ${needLabels[guideState.need].en}`:`需求：${needLabels[guideState.need].zh}`):'';
const stepsText=stepsLabels[guideState.steps]?(lang==='en'?`Steps: ${stepsLabels[guideState.steps].en}`:`程序：${stepsLabels[guideState.steps].zh}`):'';
const timeText=timeLabels[guideState.time]?(lang==='en'?`Timing: ${timeLabels[guideState.time].en}`:`時段：${timeLabels[guideState.time].zh}`):'';

[needText,stepsText,timeText].filter(Boolean).forEach(t=>{
const chip=document.createElement('span');
chip.className='fl-chip';
chip.textContent=t;
chipsEl.append(chip);
});
}

// Rationale
const ratEl=q('#fl-rationale-text');
if(ratEl){
ratEl.textContent=lang==='en'?reasonEn:reasonZh;
}

// Products
const prodsEl=q('#fl-result-products');
if(prodsEl){
prodsEl.replaceChildren();
orderedIds.forEach((id,idx)=>{
const prod=productList.find(p=>p.id===id);
if(!prod)return;

const card=document.createElement('div');
card.className='fl-rec-card';

const stepBadge=document.createElement('div');
stepBadge.className='fl-rec-card-step';
stepBadge.textContent=`STEP 0${idx+1}`;

const thumb=document.createElement('div');
thumb.className='fl-rec-card-thumb';
const img=document.createElement('img');
img.src=`assets/mockups/shot-${String(prod.shot).padStart(2,'0')}.jpg?v=fl07-visual-v2-20261022`;
img.alt=`${prod.en} / ${prod.size}`;
img.loading='lazy';
thumb.append(img);

const body=document.createElement('div');
body.className='fl-rec-card-body';
const h4=document.createElement('h4');
h4.textContent=`${prod.en} (${lang==='en'?prod.size:prod.zh+' · '+prod.size})`;
const desc=document.createElement('p');
desc.textContent=lang==='en'?prod.descEN:prod.desc;
body.append(h4,desc);

const action=document.createElement('div');
action.className='fl-rec-card-action';
const btn=document.createElement('button');
btn.type='button';
btn.textContent=lang==='en'?'View in Collection ↗':'在系列總覽中查看 ↗';
btn.setAttribute('aria-label',`${prod.en} - ${lang==='en'?'View in Collection':'在系列總覽中查看'}`);
btn.addEventListener('click',()=>{
const colBtn=q(`.fl-product-options button[data-product="${id}"]`);
if(colBtn){
all('.fl-product-options button').forEach(x=>x.classList.toggle('active',x===colBtn));
displayProducts();
}
const colSec=q('#fl-collection');
if(colSec){
colSec.scrollIntoView({behavior:'smooth'});
}
});
action.append(btn);

card.append(stepBadge,thumb,body,action);
prodsEl.append(card);
});
}
}

// Initial setup
setLang('zh-TW');
})();
