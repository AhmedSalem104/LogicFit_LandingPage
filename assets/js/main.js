/* ============================================================
   LogicFit landing page — interactions
   Shared by both language pages. Reads the page language from
   <html lang> so counters localise their numerals.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var isAr = root.getAttribute('lang') === 'ar';
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  function toArabic(v) {
    return String(v).replace(/[0-9]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[+d]; });
  }
  function localise(n) { return isAr ? toArabic(n) : String(n); }

  /* Theme toggle -------------------------------------------- */
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme');
      if (!cur) {
        cur = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
      }
      root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
    });
  }

  /* Scroll reveal (+ trigger the console chart) -------------- */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.classList.contains('console')) drawSpark();
      revealIO.unobserve(e.target);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.rv').forEach(function (el) { revealIO.observe(el); });

  /* Count-up metrics ---------------------------------------- */
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = +el.getAttribute('data-count');
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = reduce ? 0 : 1100;
      var t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var val = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = prefix + localise(val) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { countIO.observe(el); });

  /* Subscription-growth sparkline (Canvas) ------------------ */
  var drawn = false;
  function drawSpark() {
    if (drawn) return;
    drawn = true;
    var c = document.getElementById('spark');
    if (!c || !c.getContext) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = c.clientWidth, h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    var ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);

    var d = [18, 24, 22, 31, 29, 40, 44, 52, 49, 63, 72, 88];
    var n = d.length, mx = 90, pad = 6;
    var ember = getComputedStyle(root).getPropertyValue('--ember').trim() || '#F0400F';

    function px(i) { return pad + i * (w - 2 * pad) / (n - 1); }
    function py(v) { return h - pad - (v / mx) * (h - 2 * pad); }

    function render(prog) {
      ctx.clearRect(0, 0, w, h);
      for (var g = 0; g < 3; g++) {
        var yy = pad + g * (h - 2 * pad) / 2;
        ctx.strokeStyle = 'rgba(255,255,255,.06)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pad, yy); ctx.lineTo(w - pad, yy); ctx.stroke();
      }
      var count = Math.max(1, Math.floor(prog * (n - 1))) + 1;

      var grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, hexA(ember, 0.3));
      grad.addColorStop(1, hexA(ember, 0));
      ctx.beginPath(); ctx.moveTo(px(0), h - pad);
      for (var i = 0; i < count; i++) ctx.lineTo(px(i), py(d[i]));
      ctx.lineTo(px(count - 1), h - pad); ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();

      ctx.beginPath(); ctx.moveTo(px(0), py(d[0]));
      for (var j = 1; j < count; j++) ctx.lineTo(px(j), py(d[j]));
      ctx.strokeStyle = ember; ctx.lineWidth = 2.4; ctx.lineJoin = 'round'; ctx.stroke();

      var ei = count - 1;
      ctx.beginPath(); ctx.arc(px(ei), py(d[ei]), 3.4, 0, 7); ctx.fillStyle = ember; ctx.fill();
      ctx.beginPath(); ctx.arc(px(ei), py(d[ei]), 6.5, 0, 7);
      ctx.strokeStyle = hexA(ember, 0.35); ctx.lineWidth = 2; ctx.stroke();
    }

    if (reduce) { render(1); return; }
    var start = null;
    (function anim(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 900, 1);
      render(p);
      if (p < 1) requestAnimationFrame(anim);
    })(window.performance && performance.now ? performance.now() : 0);
  }

  function hexA(hex, a) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.replace(/./g, '$&$&');
    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  /* White-label live recolour demo -------------------------- */
  var phone = document.querySelector('.phone');
  var appName = document.getElementById('appName');
  var appInitial = document.getElementById('appInitial');
  document.querySelectorAll('.sw').forEach(function (sw) {
    sw.addEventListener('click', function () {
      document.querySelectorAll('.sw').forEach(function (s) { s.setAttribute('aria-pressed', 'false'); });
      sw.setAttribute('aria-pressed', 'true');
      if (phone) phone.style.setProperty('--brand', sw.getAttribute('data-c'));
      if (appName) appName.textContent = sw.getAttribute('data-name');
      if (appInitial) appInitial.textContent = sw.getAttribute('data-i');
    });
  });

  /* Conversion forms: separate self-serve trial from sales demo. */
  function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim()); }
  function setStatus(form, message, ok) {
    var status = form && form.querySelector('.form-status');
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status ' + (ok ? 'ok' : 'error');
  }
  var trial = document.getElementById('trialForm');
  if (trial) trial.addEventListener('submit', function (event) {
    event.preventDefault();
    var email = trial.querySelector('[name="email"]').value;
    if (!validEmail(email)) { setStatus(trial, isAr ? 'أدخل بريدًا إلكترونيًا صحيحًا.' : 'Enter a valid work email.', false); return; }
    localStorage.setItem('logicfit_trial_lead', JSON.stringify({ email: email.trim(), createdAt: new Date().toISOString() }));
    setStatus(trial, isAr ? 'تم استلام طلبك. سنرسل لك خطوات البدء.' : 'Request received. We will send your next steps.', true);
    trial.reset();
  });
  var demo = document.getElementById('demoModal');
  function closeDemo() { if (!demo) return; demo.classList.remove('open'); demo.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  document.querySelectorAll('[data-open-demo]').forEach(function (button) { button.addEventListener('click', function () { if (!demo) return; demo.classList.add('open'); demo.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; var first = demo.querySelector('input'); if (first) first.focus(); }); });
  document.querySelectorAll('[data-close-demo]').forEach(function (el) { el.addEventListener('click', closeDemo); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeDemo(); });
  var demoForm = document.getElementById('demoForm');
  if (demoForm) demoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var email = demoForm.querySelector('[name="email"]').value;
    var gym = demoForm.querySelector('[name="gym"]').value.trim();
    if (!gym || !validEmail(email)) { setStatus(demoForm, isAr ? 'أكمل اسم الجيم والبريد الصحيح.' : 'Add your gym name and a valid email.', false); return; }
    localStorage.setItem('logicfit_demo_lead', JSON.stringify({ gym: gym, email: email.trim(), branches: demoForm.querySelector('[name="branches"]').value, createdAt: new Date().toISOString() }));
    setStatus(demoForm, isAr ? 'تم إرسال طلب العرض. سيتواصل معك فريقنا.' : 'Demo request sent. Our team will be in touch.', true);
    demoForm.reset();
  });
})();
