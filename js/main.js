/* ============================================================
   DES Global — main.js
   Fully functional: tabs, deep-links, card navigation,
   inline article expanders, theme, counters, animations
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ────────────────────────────────────────
     1. THEME (day / night)
  ──────────────────────────────────────── */
  var root = document.documentElement;

  // Apply saved theme immediately (inline script in <head> already does this,
  // but we repeat here in case it was blocked)
  var savedTheme = localStorage.getItem('des-theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  // Toggle handler — use both direct click and event delegation for reliability
  function applyThemeToggle() {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('des-theme', next);
  }

  // Direct click on button (works after layout.js injects it)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#themeToggle') || e.target.closest('#mobileThemeToggle');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      applyThemeToggle();
    }
  }, true); // useCapture: true — fires before any other handler

  /* ────────────────────────────────────────
     2. STICKY HEADER
  ──────────────────────────────────────── */
  var header = document.querySelector('header');
  if (header) {
    function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ────────────────────────────────────────
     3. ACTIVE NAV LINK
  ──────────────────────────────────────── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  // Pages that belong under the "Solutions" nav item
  var solutionPages = ['emrs.html','optimaxx.html','multimaxx.html','combustion.html','variability.html','audit.html','services.html'];
  var isSolutionPage = solutionPages.indexOf(currentPage) !== -1;

  document.querySelectorAll('nav a, .mobile-nav a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('#')[0].split('?')[0];
    var isMatch = href === currentPage || (currentPage === '' && href === 'index.html');
    // Highlight "services.html" nav link when on any solution sub-page
    var isSolutionParent = isSolutionPage && href === 'services.html';
    if (isMatch || isSolutionParent) {
      a.classList.add('active');
    }
  });

  /* ────────────────────────────────────────
     4. MOBILE MENU
  ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var hamburger = document.getElementById('hamburgerBtn');
    var mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;
    if (e.target.closest('#hamburgerBtn')) {
      mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open');
    } else if (e.target.closest('#mobileClose')) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
  document.querySelectorAll('.mobile-nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      var nav = document.getElementById('mobileNav');
      var btn = document.getElementById('hamburgerBtn');
      if (nav) nav.classList.remove('open');
      if (btn) btn.classList.remove('open');
    });
  });

  /* ────────────────────────────────────────
     5. TAB SYSTEM — THE DEFINITIVE FIX
     
     Strategy: use ONLY document.getElementById()
     to find panels. No scope traversal, no
     closest() guessing. Pure ID lookup.
     Buttons live anywhere; panels live anywhere.
  ──────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabId = this.dataset.tab || this.dataset.target;
        if (!tabId) return;

        // Deactivate all buttons
        var tabBar = this.closest('section, .container') || this.parentElement;
        tabBar.querySelectorAll('.tab-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        // Deactivate all panels in this section
        tabBar.querySelectorAll('.tab-content, .tab-panel').forEach(function (p) {
          p.classList.remove('active');
        });

        // Try tab-{tabId} first, then tabId directly
        var panel = document.getElementById('tab-' + tabId) || document.getElementById(tabId);
        if (panel) panel.classList.add('active');

        // Update URL hash without scrolling
        if (history.replaceState) {
          history.replaceState(null, '', '#' + tabId);
        }
      });
    });
  }
  initTabs();

  /* ────────────────────────────────────────
     6. DEEP-LINK: open specific tab from URL hash
  ──────────────────────────────────────── */

  // Map of element IDs → which tab they live inside
  var idToTab = {
    'powerhouses': 'industries',
    'pulp-paper':  'industries',
    'oil-gas':     'industries',
    'chemicals':   'industries',
    'mining-steel':'industries',
    'commercial':  'industries',
    'tab-processes':'processes',
    'tab-applications':'applications'
  };

  function activateTab(tabId) {
    var btn = document.querySelector('.tab-btn[data-tab="' + tabId + '"]');
    if (!btn) return;
    // Deactivate all
    document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
    document.querySelectorAll('.tab-content').forEach(function(p){ p.classList.remove('active'); });
    // Activate target
    btn.classList.add('active');
    var panel = document.getElementById('tab-' + tabId);
    if (panel) panel.classList.add('active');
  }

  function activateFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) return;

    // 1. Check if hash matches a tab button directly
    var tabBtn = document.querySelector('.tab-btn[data-tab="' + hash + '"]');
    if (tabBtn) {
      activateTab(hash);
      setTimeout(function() {
        var section = tabBtn.closest('section');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return;
    }

    // 2. Check if hash is a card/element inside a tab
    var parentTab = idToTab[hash];
    if (parentTab) {
      activateTab(parentTab);
      setTimeout(function() {
        var el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight the card briefly
          el.style.transition = 'box-shadow 0.3s';
          el.style.boxShadow = '0 0 0 3px var(--accent)';
          setTimeout(function() { el.style.boxShadow = ''; }, 1800);
        }
      }, 120);
      return;
    }

    // 3. Generic scroll to any element with that ID
    var el = document.getElementById(hash);
    if (el) {
      setTimeout(function() {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }
  activateFromHash();
  window.addEventListener('hashchange', activateFromHash);

  /* ────────────────────────────────────────
     7. MAKE EVERY CARD CLICKABLE
     
     Market cards → markets.html#tabId
     Service cards → services.html#anchorId
     Story cards → expand inline detail
     News cards → expand inline article
     Training cards → contact.html
  ──────────────────────────────────────── */

  // --- Service cards: make whole card clickable ---
  document.querySelectorAll('.svc-card').forEach(function (card) {
    // Priority: .svc-link → .btn-primary → first <a> in card
    var link = card.querySelector('.svc-link') ||
               card.querySelector('.btn-primary') ||
               card.querySelector('a[href]');
    if (!link) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // let actual links handle themselves
      window.location.href = link.href;
    });
  });

  // --- Market cards: make whole card clickable using existing svc-link href ---
  document.querySelectorAll('.mkt-card').forEach(function (card) {
    var link = card.querySelector('.svc-link, a');
    if (link) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (e) {
        if (!e.target.closest('a')) window.location.href = link.href;
      });
    }
  });

  // --- Career apply buttons ---
  document.querySelectorAll('.career-item').forEach(function (item) {
    var role = (item.querySelector('h4') || {}).textContent || '';
    var btn = item.querySelector('a.btn');
    if (btn) btn.href = 'contact.html?role=' + encodeURIComponent(role);
  });

  // Pre-fill contact form from URL params
  var urlParams = new URLSearchParams(window.location.search);
  var roleParam = urlParams.get('role');
  var inquiryParam = urlParams.get('inquiry');
  var msgBox = document.querySelector('#contactForm textarea');
  if (msgBox && !msgBox.value) {
    if (roleParam) msgBox.value = 'Application for: ' + roleParam + '\n\nPlease find my details below:\n';
    if (inquiryParam) msgBox.value = 'I\'m interested in: ' + inquiryParam + '\n\nPlease send me more information.\n';
  }

  /* ────────────────────────────────────────
     8. SUCCESS STORY CARDS — inline expander
  ──────────────────────────────────────── */

  // Story cards handled via svc-card handler above

  /* ────────────────────────────────────────
     9. NEWS CARDS — inline article expander
  ──────────────────────────────────────── */


  // News cards handled via svc-card handler

  // Hash-based card auto-open removed (cards now use svc-card handler)

  /* ────────────────────────────────────────
     10. COUNTERS
  ──────────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var end = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var isFloat = String(end).indexOf('.') !== -1;
        var cur = 0;
        var t = setInterval(function () {
          cur = Math.min(cur + end / 60, end);
          el.textContent = (isFloat ? cur.toFixed(1) : Math.floor(cur)) + suffix;
          if (cur >= end) clearInterval(t);
        }, 1600 / 60);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cObs.observe(el); });
  }

  /* ────────────────────────────────────────
     11. SCROLL REVEAL
  ──────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(function () { entry.target.classList.add('on'); }, delay);
        rObs.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el, i) {
      if (!el.dataset.delay) el.dataset.delay = (i % 4) * 90;
      rObs.observe(el);
    });
  }

  /* ────────────────────────────────────────
     12. CONTACT FORM
  ──────────────────────────────────────── */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var orig = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent — We\'ll be in touch shortly!';
      btn.disabled = true;
      btn.style.background = 'var(--teal)';
      setTimeout(function () {
        btn.innerHTML = orig;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 5000);
    });
  }

  /* ────────────────────────────────────────
     13. HERO PARALLAX
  ──────────────────────────────────────── */
  var heroDots = document.querySelector('.hero-dots');
  if (heroDots) {
    window.addEventListener('scroll', function () {
      heroDots.style.transform = 'translateY(' + (window.scrollY * 0.18) + 'px)';
    }, { passive: true });
  }

});
