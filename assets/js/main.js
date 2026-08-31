/* LogicFit landing interactions */
(function () {
  'use strict';

  var root = document.documentElement;
  var isAr = root.lang === 'ar';
  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduce = reduceQuery.matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var themeStorageKey = 'logicfit_theme';
  var themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var themeLinks = Array.prototype.slice.call(document.querySelectorAll('[data-theme-link]'));
  var numberFormat;

  try {
    numberFormat = new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US');
  } catch (error) {
    numberFormat = null;
  }

  function toArabic(value) {
    return String(value).replace(/[0-9]/g, function (digit) {
      return '٠١٢٣٤٥٦٧٨٩'[Number(digit)];
    });
  }

  function localise(value) {
    return isAr ? toArabic(value) : String(value);
  }

  function formatNumber(value) {
    if (numberFormat) return numberFormat.format(value);
    return localise(value);
  }

  function readStoredTheme() {
    try {
      return localStorage.getItem(themeStorageKey);
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch (error) {}
  }

  function preferredTheme() {
    var stored = readStoredTheme();
    if (stored === 'dark' || stored === 'light') return stored;
    return themeMedia.matches ? 'dark' : 'light';
  }

  function updateThemeToggle(theme) {
    var nextKey = theme === 'dark' ? 'data-label-light' : 'data-label-dark';

    if (themeToggle) {
      var nextLabel = themeToggle.getAttribute(nextKey);
      themeToggle.setAttribute('aria-label', nextLabel);
      themeToggle.setAttribute('title', nextLabel);
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }

    themeLinks.forEach(function (link) {
      var label = link.getAttribute(nextKey);
      if (label) link.textContent = label;
    });
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    updateThemeToggle(theme);
  }

  applyTheme(root.dataset.theme === 'dark' || root.dataset.theme === 'light' ? root.dataset.theme : preferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      writeStoredTheme(next);
    });
  }

  themeLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      writeStoredTheme(next);
    });
  });

  if (themeMedia.addEventListener) {
    themeMedia.addEventListener('change', function () {
      if (readStoredTheme()) return;
      applyTheme(preferredTheme());
    });
  } else if (themeMedia.addListener) {
    themeMedia.addListener(function () {
      if (readStoredTheme()) return;
      applyTheme(preferredTheme());
    });
  }

  var siteNav = document.querySelector('.nav-v2');
  var menuButton = document.querySelector('[data-menu]');
  var navLinks = document.getElementById('navLinks');
  var navItems = navLinks ? Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]')) : [];

  function setActiveNav(hash) {
    var targetHash = hash || window.location.hash || '#home';
    var matched = false;

    navItems.forEach(function (link) {
      var isActive = link.getAttribute('href') === targetHash;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
        matched = true;
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (!matched && navItems.length && targetHash === '#home') {
      navItems[0].classList.add('is-active');
      navItems[0].setAttribute('aria-current', 'location');
    }
  }

  function closeMenu() {
    if (!menuButton || !navLinks) return;
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
    });

    navLinks.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (!link || !navLinks.contains(link)) return;
      if (link.getAttribute('href').charAt(0) === '#') {
        setActiveNav(link.getAttribute('href'));
      }
      closeMenu();
    });
  }

  Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (link) {
    if (link.hasAttribute('data-theme-link')) return;

    link.addEventListener('click', function (event) {
      var hash = link.getAttribute('href');
      var target = hash && hash.length > 1 ? document.querySelector(hash) : null;
      if (!target) return;

      event.preventDefault();
      setActiveNav(hash);
      closeMenu();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', hash);
      } else {
        window.location.hash = hash;
      }
    });
  });

  setActiveNav();
  window.addEventListener('hashchange', function () {
    setActiveNav();
  });

  function initScrollProgress() {
    var progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
    return progress;
  }

  var scrollProgress = initScrollProgress();
  var tickingScroll = false;

  function updateScrollEffects() {
    var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    scrollProgress.style.transform = 'scaleX(' + current + ')';
    if (siteNav) siteNav.classList.toggle('is-scrolled', window.scrollY > 18);
    tickingScroll = false;
  }

  function requestScrollEffects() {
    if (tickingScroll) return;
    tickingScroll = true;
    requestAnimationFrame(updateScrollEffects);
  }

  window.addEventListener('scroll', requestScrollEffects, { passive: true });
  window.addEventListener('resize', requestScrollEffects);
  updateScrollEffects();

  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  revealItems.forEach(function (item, index) {
    item.style.setProperty('--rv-delay', Math.min((index % 7) * 65, 390) + 'ms');
  });

  if ('IntersectionObserver' in window && !reduce) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('in');
    });
  }

  function animateCount(el) {
    if (el.dataset.countAnimated === 'true') return;
    el.dataset.countAnimated = 'true';

    var target = Number(el.getAttribute('data-count') || 0);
    var prefix = el.getAttribute('data-count-prefix') || '';
    var suffix = el.getAttribute('data-count-suffix') || '';

    if (!target || reduce) {
      el.textContent = prefix + formatNumber(target) + suffix;
      return;
    }

    var startedAt = null;
    var duration = Number(el.getAttribute('data-count-duration') || 1200);

    function step(timestamp) {
      if (startedAt === null) startedAt = timestamp;
      var progress = Math.min((timestamp - startedAt) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + formatNumber(Math.round(target * eased)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.classList.add('count-pop');
        window.setTimeout(function () {
          el.classList.remove('count-pop');
        }, 420);
      }
    }

    requestAnimationFrame(step);
  }

  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if ('IntersectionObserver' in window && !reduce) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.56 });

    counters.forEach(function (counter) {
      countObserver.observe(counter);
    });
  } else {
    counters.forEach(animateCount);
  }

  function initHeroMotion() {
    var hero = document.querySelector('.hero-canvas');
    if (!hero || reduce || !finePointer) return;

    var raf = null;
    var nextX = 0;
    var nextY = 0;

    function write() {
      hero.style.setProperty('--hero-x', nextX.toFixed(3));
      hero.style.setProperty('--hero-y', nextY.toFixed(3));
      raf = null;
    }

    hero.addEventListener('pointermove', function (event) {
      var rect = hero.getBoundingClientRect();
      nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(write);
    });

    hero.addEventListener('pointerleave', function () {
      nextX = 0;
      nextY = 0;
      if (!raf) raf = requestAnimationFrame(write);
    });
  }

  function initTiltCards() {
    if (reduce || !finePointer) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll([
      '.outcome-card',
      '.feature-card',
      '.benefit-card',
      '.visual-card',
      '.role-tile',
      '.faq-card',
      '.cta-card',
      '.dashboard-frame',
      '.showcase-frame',
      '.app-mock',
      '.story-photo',
      '.live-insight',
      '.proof-badge'
    ].join(',')));

    cards.forEach(function (card) {
      card.classList.add('tilt-card');

      card.addEventListener('pointermove', function (event) {
        var rect = card.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        var y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        card.style.setProperty('--tilt-x', (-y * 4.2).toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', (x * 5.4).toFixed(2) + 'deg');
      });

      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  function initMagneticButtons() {
    if (reduce || !finePointer) return;

    Array.prototype.slice.call(document.querySelectorAll('.btn')).forEach(function (button) {
      button.addEventListener('pointermove', function (event) {
        var rect = button.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        var y = ((event.clientY - rect.top) / rect.height - 0.5) * 7;
        button.style.setProperty('--magnet-x', x.toFixed(2) + 'px');
        button.style.setProperty('--magnet-y', y.toFixed(2) + 'px');
      });

      button.addEventListener('pointerleave', function () {
        button.style.setProperty('--magnet-x', '0px');
        button.style.setProperty('--magnet-y', '0px');
      });
    });
  }

  function initRipples() {
    if (reduce) return;

    var targets = Array.prototype.slice.call(document.querySelectorAll('.btn, .nav-links a, .nav-language, .nav-login'));
    targets.forEach(function (target) {
      target.addEventListener('click', function (event) {
        var rect = target.getBoundingClientRect();
        var ripple = document.createElement('span');
        ripple.className = 'tap-ripple';
        ripple.style.left = (event.clientX - rect.left) + 'px';
        ripple.style.top = (event.clientY - rect.top) + 'px';
        target.appendChild(ripple);
        window.setTimeout(function () {
          ripple.remove();
        }, 680);
      });
    });
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function setStatus(form, message, ok) {
    var status = form.querySelector('.form-status');
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status ' + (ok ? 'ok' : 'error');
  }

  document.querySelectorAll('.lead-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var emailField = form.querySelector('[name="email"]');
      var email = emailField ? emailField.value.trim() : '';

      if (!validEmail(email)) {
        setStatus(form, isAr ? 'أدخل بريدًا إلكترونيًا صحيحًا.' : 'Enter a valid email address.', false);
        return;
      }

      localStorage.setItem('logicfit_trial_lead', JSON.stringify({
        email: email,
        locale: root.lang || 'en',
        createdAt: new Date().toISOString()
      }));
      setStatus(form, isAr ? 'تم استلام طلبك. سنرسل لك خطوات البدء.' : 'Request received. We will send your next steps.', true);
      form.reset();
    });
  });

  initHeroMotion();
  initTiltCards();
  initMagneticButtons();
  initRipples();

  requestAnimationFrame(function () {
    document.body.classList.add('is-ready');
  });
})();
