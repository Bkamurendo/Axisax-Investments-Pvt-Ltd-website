// Navigation: mobile menu and sub-menus. Keyboard and screen-reader friendly.
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var subToggles = Array.prototype.slice.call(document.querySelectorAll('.sub-toggle'));
  var desktop = window.matchMedia('(min-width: 1100px)');

  function closeSubs(except) {
    subToggles.forEach(function (b) {
      if (b !== except) b.setAttribute('aria-expanded', 'false');
    });
  }

  function setMenu(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!open) closeSubs();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
  }

  subToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      if (desktop.matches) closeSubs(btn);
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  // Close open menus on Escape or when clicking elsewhere (desktop dropdowns).
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = subToggles.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (open && desktop.matches) { closeSubs(); open.focus(); return; }
    if (header.classList.contains('nav-open')) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (desktop.matches && !e.target.closest('.has-sub')) closeSubs();
  });
  // Close a desktop dropdown once focus leaves it.
  document.addEventListener('focusin', function (e) {
    if (!desktop.matches) return;
    subToggles.forEach(function (b) {
      if (!b.parentNode.contains(e.target)) b.setAttribute('aria-expanded', 'false');
    });
  });
  desktop.addEventListener('change', function () { setMenu(false); });

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
