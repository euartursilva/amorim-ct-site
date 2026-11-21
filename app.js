/* Amorim CT — interações */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* links de WhatsApp com mensagem pronta */
  $$('[data-wa]').forEach(function (a) {
    a.href = 'https://wa.me/5573998121551?text=' + encodeURIComponent(a.getAttribute('data-wa'));
    a.target = '_blank'; a.rel = 'noopener';
  });

  var header = $('.site-header'), bar = $('.progress'), wa = $('.float-wa'), top = $('.float-top');
  var heroPh = $('.hero-frame'), giant = $('.hero-giant'), glow = $('.hero-glow'), hero = $('.hero');
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  /* brilho que segue o mouse no topo */
  if (fine && !reduce && hero) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      glow.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100) + '%');
      glow.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }

  /* cartões 3D com luz */
  $$('.tilt').forEach(function (c) {
    if (!fine || reduce) return;
    c.addEventListener('mousemove', function (e) {
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.classList.add('moving');
      c.style.transform = 'perspective(900px) rotateX(' + ((0.5 - y) * 8).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 10).toFixed(2) + 'deg) translateY(-6px)';
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
    });
    c.addEventListener('mouseleave', function () { c.classList.remove('moving'); c.style.transform = ''; });
  });

  /* botões magnéticos */
  $$('.magnetic').forEach(function (b) {
    if (!fine || reduce) return;
    b.addEventListener('mousemove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.18) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3) + 'px)';
    });
    b.addEventListener('mouseleave', function () { b.style.transform = ''; });
  });

  /* tour em vídeo */
  var phone = $('.phone'), vid = $('.tour-vid'), playBtn = $('.tour-play'), chapters = $$('.tour-list button');
  function playTour(t) {
    if (!vid) return;
    if (typeof t === 'number') vid.currentTime = t;
    vid.controls = true; phone.classList.add('playing');
    var p = vid.play(); if (p && p.catch) p.catch(function () {});
    var hv = $('.hero-vid'); if (hv) hv.pause();
  }
  if (playBtn) playBtn.addEventListener('click', function () { playTour(); });
  chapters.forEach(function (b) {
    b.addEventListener('click', function () {
      playTour(parseFloat(b.getAttribute('data-t')));
      if (innerWidth < 900) phone.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
  });
  if (vid) vid.addEventListener('timeupdate', function () {
    var cur = null;
    chapters.forEach(function (b) { if (vid.currentTime >= parseFloat(b.getAttribute('data-t'))) cur = b; });
    chapters.forEach(function (b) { b.classList.toggle('on', b === cur && !vid.paused); });
  });
  if (vid) vid.addEventListener('pause', function () { chapters.forEach(function (b) { b.classList.remove('on'); }); });
  var heroVid = $('.hero-vid');
  if (heroVid && reduce) { heroVid.removeAttribute('autoplay'); heroVid.pause(); }

  /* fotos ampliadas */
  var lb = document.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Foto ampliada');
  lb.innerHTML = '<img alt=""><p></p><button type="button" aria-label="Fechar">×</button>';
  document.body.appendChild(lb);
  var lbImg = $('img', lb), lbCap = $('p', lb), last = null;
  function closeLb() { lb.classList.remove('open'); if (last) last.focus(); }
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLb(); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  $$('.shot').forEach(function (f) {
    f.tabIndex = 0; f.setAttribute('role', 'button');
    var img = $('img', f), cap = $('figcaption', f);
    f.setAttribute('aria-label', 'Ampliar foto: ' + cap.textContent);
    var open = function () { last = f; lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = cap.textContent; lb.classList.add('open'); $('button', lb).focus(); };
    f.addEventListener('click', open);
    f.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  /* revelar ao rolar */
  if (!reduce && 'IntersectionObserver' in window) {
    var groups = ['.section-head > *', '.cards > *', '.bento > *', '.tour-copy > *', '.phone', '.score > *', '.quotes > *', '.plans > *', '.hours > *', '.hours-list > div', '.map-card', '.route-row > *', '.final-inner > *', '.footer-row > *'];
    var els = [];
    groups.forEach(function (sel) {
      $$(sel).forEach(function (el, i) { el.classList.add('reveal'); el.style.setProperty('--d', Math.min(i, 6) * 90 + 'ms'); els.push(el); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; el.classList.add('in'); io.unobserve(el);
        setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.removeProperty('--d'); }, 1600);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });

    /* números contando + estrelas enchendo */
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; cio.unobserve(el);
        if (el.classList.contains('score-stars')) { el.classList.add('on'); return; }
        var to = parseFloat(el.getAttribute('data-to')), dec = parseInt(el.getAttribute('data-dec') || '0', 10), t0 = null;
        (function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1500, 1), v = to * (1 - Math.pow(1 - p, 3));
          el.textContent = v.toFixed(dec).replace('.', ',');
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.5 });
    $$('.count').forEach(function (el) { el.textContent = '0'; cio.observe(el); });
    var stars = $('.score-stars'); if (stars) cio.observe(stars);

    /* menu marca a seção atual */
    var links = $$('.nav a');
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { sio.observe(s); });
  }

  /* rolagem: progresso, menu, flutuantes, parallax */
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset, h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    header.classList.toggle('scrolled', y > 20);
    wa.classList.toggle('show', y > 500);
    top.classList.toggle('show', y > 1400);
    if (!reduce && y < 1200) {
      if (heroPh) heroPh.style.transform = 'translateY(' + (y * 0.08) + 'px)';
      if (giant) giant.style.transform = 'translateX(calc(-50% - ' + (y * 0.25) + 'px))';
    }
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
