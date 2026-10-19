const hd=document.querySelector('header');
const onScroll=()=>{hd.classList.toggle('sc',scrollY>20);document.querySelectorAll('.par').forEach(e=>e.style.transform=`translateY(${scrollY*(+e.dataset.s||.05)}px)`)};
addEventListener('scroll',onScroll,{passive:true});onScroll();
const bg=document.querySelector('.burger'),mn=document.querySelector('.menu');
bg.onclick=()=>{bg.classList.toggle('open');mn.classList.toggle('open')};
mn.querySelectorAll('a').forEach(a=>a.onclick=()=>{mn.classList.remove('open');bg.classList.remove('open')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv,.head,.why').forEach(e=>io.observe(e));
// hide broken images so the gradient placeholder shows
document.querySelectorAll('.imgbox img,.person').forEach(i=>i.addEventListener('error',()=>i.style.display='none'));
// contact form
const f=document.getElementById('qf');
if(f)f.addEventListener('submit',async e=>{
 e.preventDefault();
 if(f.website.value)return;
 const ok=f.querySelector('.ok'),b=f.querySelector('button');
 b.disabled=true;
 try{
  // Replace FORM_ENDPOINT with a Formspree/Web3Forms URL that delivers to kskhandymanservices@gmail.com
  const ep=f.dataset.endpoint;
  if(ep&&!ep.includes('FORM_ENDPOINT')){
   const r=await fetch(ep,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
   if(!r.ok)throw 0;
  }else{
   const d=new FormData(f);
   location.href=`mailto:kskhandymanservices@gmail.com?subject=${encodeURIComponent('Quote request: '+d.get('service'))}&body=${encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\n\n${d.get('details')}`)}`;
  }
  ok.style.display='block';ok.textContent='Thank you! Your request has been sent. Mr. Kevin will be in touch soon.';f.reset();
 }catch{ok.style.display='block';ok.style.background='#fde2e2';ok.style.color='#8a1f1f';ok.textContent='Something went wrong. Please call (419) 905-7931.'}
 b.disabled=false;
});
