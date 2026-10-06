(() => {
  const header=document.querySelector('[data-header]');
  const menu=document.querySelector('.menu-btn');
  const mobileNav=document.querySelector('#mobile-nav');
  const toast=document.querySelector('.toast');
  const showToast=(msg)=>{toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),2600)};
  const track=(event,params={})=>{if(typeof window.gtag==='function')window.gtag('event',event,params)};
  window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>12),{passive:true});
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));mobileNav.hidden=open;document.body.classList.toggle('menu-open',!open)});
  mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');mobileNav.hidden=true;document.body.classList.remove('menu-open')}));
  document.querySelectorAll('[data-analytics]').forEach(el=>el.addEventListener('click',()=>track('cta_click',{placement:el.dataset.analytics})));
  document.querySelectorAll('[data-project]').forEach(btn=>btn.addEventListener('click',()=>{const name=btn.dataset.project;track('project_demo_click',{project:name});showToast(name==='sarari'?'You are already on the SARARI Digital build.':name==='triage'?'AI email triage demo is queued for the live demo route.':'Spreadsheet cleaner demo is queued for the live demo route.')}));
  document.querySelectorAll('details.faq').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)track('faq_open',{question:d.querySelector('summary')?.textContent.trim()})}));
  document.querySelector('[data-lang-toggle]')?.addEventListener('click',()=>{track('language_toggle',{language:'ha'});showToast('Hausa-ready mode is part of the production build. Add translated copy when the Hausa content set is approved.')});
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
})();
