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

/* ---- Connect modal (opens from any nav Connect link) ---- */
(function(){
  var css=document.createElement('style');
  css.textContent='.cx-ov{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;padding:20px;}'+
  '.cx-ov.on{display:flex;}'+
  '.cx-bg{position:absolute;inset:0;background:rgba(10,10,9,.62);backdrop-filter:blur(4px);}'+
  '.cx-p{position:relative;width:100%;max-width:480px;background:var(--parchment,#F7F4EE);border:1px solid rgba(181,136,31,.25);padding:44px 40px;opacity:0;transform:translateY(16px);transition:opacity .35s ease,transform .35s cubic-bezier(.16,1,.3,1);}'+
  '.cx-ov.on .cx-p{opacity:1;transform:translateY(0);}'+
  '.cx-x{position:absolute;top:16px;right:16px;width:34px;height:34px;background:none;border:none;cursor:pointer;color:rgba(26,23,18,.45);font-size:20px;line-height:1;}'+
  '.cx-x:hover{color:var(--gold,#B5881F);}'+
  '.cx-eye{font-family:var(--sans,Inter);font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--gold,#B5881F);}'+
  '.cx-h{font-family:var(--serif,"Playfair Display");font-size:42px;font-weight:500;color:var(--ink,#1A1712);margin:14px 0 10px;line-height:1;}'+
  '.cx-s{font-family:var(--sans,Inter);font-size:13px;line-height:1.7;color:rgba(26,23,18,.55);margin-bottom:26px;}'+
  '.cx-mail{display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--gold,#B5881F);color:#fff;padding:15px 18px;font-family:var(--sans,Inter);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;margin-bottom:12px;transition:background .25s;}'+
  '.cx-mail:hover{background:#9a7318;}'+
  '.cx-row{display:flex;flex-wrap:wrap;gap:10px;}'+
  '.cx-a{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(26,23,18,.18);padding:11px 16px;font-family:var(--sans,Inter);font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ink,#1A1712);text-decoration:none;transition:all .25s;}'+
  '.cx-a:hover{background:var(--ink,#1A1712);color:#fff;border-color:var(--ink,#1A1712);}';
  document.head.appendChild(css);

  var ov=document.createElement('div');
  ov.className='cx-ov';
  ov.innerHTML='<div class="cx-bg"></div><div class="cx-p" role="dialog" aria-modal="true" aria-label="Connect with Tanuj Shori">'+
  '<button class="cx-x" aria-label="Close">\u2715</button>'+
  '<div class="cx-eye">Connect</div>'+
  '<div class="cx-h">Let\u2019s talk.</div>'+
  '<div class="cx-s">Founder &amp; CEO, Square Yards. For investors, media inquiries, speaking engagements and partnerships.</div>'+
  '<a class="cx-mail" href="mailto:tanuj.s@squareyards.com"><span>tanuj.s@squareyards.com</span><span>Email \u2197</span></a>'+
  '<div class="cx-row">'+
  '<a class="cx-a" href="https://www.linkedin.com/in/tanuj-shori-420b402/" target="_blank" rel="noopener">LinkedIn</a>'+
  '<a class="cx-a" href="https://www.youtube.com/channel/UCA9dt3sQlYdMNg7EwJvCCUQ" target="_blank" rel="noopener">YouTube</a>'+
  '<a class="cx-a" href="https://www.squareyards.com" target="_blank" rel="noopener">Square Yards</a>'+
  '</div></div>';
  document.body.appendChild(ov);

  function open(){ov.classList.add('on');document.body.style.overflow='hidden';}
  function close(){ov.classList.remove('on');document.body.style.overflow='';}
  ov.querySelector('.cx-bg').addEventListener('click',close);
  ov.querySelector('.cx-x').addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  document.querySelectorAll('a[href$="#connect"]').forEach(function(a){
    a.addEventListener('click',function(e){e.preventDefault();open();});
  });
})();
