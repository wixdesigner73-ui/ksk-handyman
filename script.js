(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const fine=matchMedia('(pointer:fine)').matches,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
// progress bar, cursor glow, back to top
const bar=document.createElement('div');bar.id='prog';document.body.prepend(bar);
const top=document.createElement('button');top.id='top';top.setAttribute('aria-label','Back to top');top.innerHTML='<svg class="i"><use href="#arrow-up"/></svg>';top.onclick=()=>scrollTo({top:0,behavior:'smooth'});document.body.append(top);
let cg;if(fine){cg=document.createElement('div');cg.id='cg';document.body.prepend(cg);addEventListener('mousemove',e=>{cg.style.left=e.clientX+'px';cg.style.top=e.clientY+'px'},{passive:true})}
const hd=$('header');
function onScroll(){const h=document.documentElement;hd.classList.toggle('sc',scrollY>20);bar.style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+'%';top.classList.toggle('show',scrollY>600)}
addEventListener('scroll',onScroll,{passive:true});onScroll();
// mobile menu
const bg=$('.burger'),mn=$('.menu');
bg.onclick=()=>{bg.classList.toggle('open');mn.classList.toggle('open')};
$$('.menu a').forEach(a=>a.onclick=()=>{mn.classList.remove('open');bg.classList.remove('open')});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv,.head,.why').forEach(e=>io.observe(e));
$$('.imgbox img,.arch img,.sq img,.circ img').forEach(i=>i.addEventListener('error',()=>i.style.display='none'));
if(!reduce&&fine){
 // 3D tilt
 $$('.card,.ccard').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
 // magnetic buttons
 $$('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
 // hero mouse parallax
 const st=$('.stage,.pstage');
 if(st){const ls=$$('.layer',st);st.addEventListener('mousemove',e=>{const r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ls.forEach(l=>{const d=+l.dataset.d||10;l.style.transform=`translate(${x*d}px,${y*d}px)`})});st.addEventListener('mouseleave',()=>$$('.layer',st).forEach(l=>l.style.transform=''))}
}
// scroll parallax for brush shapes
const par=$$('.brush');addEventListener('scroll',()=>{if(!reduce)par.forEach(p=>p.style.translate=`0 ${scrollY*-.04}px`)},{passive:true});
// rotating words
const rw=$('.rot b');
if(rw&&!reduce){const w=['repairs','maintenance','installations','improvements'];let i=0;setInterval(()=>{rw.classList.add('sw');setTimeout(()=>{i=(i+1)%w.length;rw.textContent=w[i];rw.classList.remove('sw')},350)},2400)}
// process steps
const sl=$$('.steps li');
if(sl.length){let n=0,t;const set=k=>{sl.forEach((l,j)=>l.classList.toggle('on',j===k));n=k};set(0);const auto=()=>{t=setInterval(()=>set((n+1)%sl.length),3200)};auto();sl.forEach((l,j)=>{l.onmouseenter=()=>{clearInterval(t);set(j)};l.onclick=()=>set(j);l.onmouseleave=auto})}
// contact form
const qs=new URLSearchParams(location.search).get('service'),sel=$('#s');
if(sel&&qs){const o=[...sel.options].find(x=>x.text.toLowerCase().startsWith(qs.toLowerCase()));if(o)sel.value=o.value}
const f=$('#qf');
if(f)f.addEventListener('submit',async e=>{
 e.preventDefault();if(f.website.value)return;
 const ok=f.querySelector('.ok'),b=f.querySelector('button');b.disabled=true;
 try{
  const ep=f.dataset.endpoint;
  if(ep&&!ep.includes('FORM_ENDPOINT')){const r=await fetch(ep,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});if(!r.ok)throw 0}
  else{const d=new FormData(f);location.href=`mailto:kskhandymanservices@gmail.com?subject=${encodeURIComponent('Quote request: '+d.get('service'))}&body=${encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\n\n${d.get('details')}`)}`}
  ok.style.display='block';ok.textContent='Thank you! Your request has been sent. Mr. Kevin will be in touch soon.';f.reset();
 }catch{ok.style.display='block';ok.style.background='#fde2e2';ok.style.color='#8a1f1f';ok.textContent='Something went wrong. Please call (419) 905-7931.'}
 b.disabled=false;
});
})();
