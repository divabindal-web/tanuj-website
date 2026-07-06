/* ── SHARED JS ── */
(function(){
  /* CURSOR */
  var cur=document.getElementById('cur'),ring=document.getElementById('ring');
  if(cur&&ring){
    var mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
    (function anim(){rx+=(mx-rx)*.09;ry+=(my-ry)*.09;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim);})();
    document.querySelectorAll('a,button,.a-card,.m-card,.aw-card,.eco-card,.press-card,.v-card,.tl-aw-card').forEach(function(el){
      el.addEventListener('mouseenter',function(){cur.classList.add('big');ring.classList.add('big');});
      el.addEventListener('mouseleave',function(){cur.classList.remove('big');ring.classList.remove('big');});
    });
  }

  /* NAV SCROLL */
  var nav=document.querySelector('.nav');
  if(nav){
    window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>40);},{passive:true});
  }

  /* BURGER */
  var burger=document.getElementById('burger'),drawer=document.getElementById('drawer');
  if(burger&&drawer){
    drawer.classList.add('show');
    burger.addEventListener('click',function(){
      burger.classList.toggle('open');
      drawer.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){burger.classList.remove('open');drawer.classList.remove('open');});
    });
  }

  /* ── REVEAL SYSTEM ──
     1. Anything already in the first viewport reveals immediately on load.
     2. Scroll reveals pre-trigger 18% before entering view, so content is
        never seen popping in.
     3. Safety net: nothing near the viewport can stay invisible. */
  function reveal(el){el.classList.add('vis');}

  var rvObs=('IntersectionObserver' in window)?new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){reveal(e.target);rvObs.unobserve(e.target);}});
  },{threshold:.05,rootMargin:'0px 0px 18% 0px'}):null;

  document.querySelectorAll('.rv').forEach(function(el){
    if(rvObs){rvObs.observe(el);}else{reveal(el);}
  });

  /* instant reveal of the opening viewport */
  setTimeout(function(){
    var vh=window.innerHeight;
    document.querySelectorAll('.rv:not(.vis)').forEach(function(el){
      if(el.getBoundingClientRect().top<vh*1.05)reveal(el);
    });
  },60);

  /* safety net */
  setTimeout(function(){
    var vh=window.innerHeight;
    document.querySelectorAll('.rv:not(.vis)').forEach(function(el){
      if(el.getBoundingClientRect().top<vh*1.35)reveal(el);
    });
  },2000);

  /* ACTIVE NAV LINK */
  var path=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-a').forEach(function(a){
    var href=a.getAttribute('href')||'';
    if(href===path||(path===''&&href==='index.html')||(path==='index.html'&&href==='index.html')){
      a.classList.add('active');
    }
  });
})();
