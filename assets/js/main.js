(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 768) {
          siteNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open menu');
        }
      });
    });
  }

  const yearTargets = document.querySelectorAll('#year');
  yearTargets.forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('[data-accordion]').forEach(function (accordion) {
    accordion.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('#project-gallery .gallery-card');
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filter = button.getAttribute('data-filter');
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        button.classList.add('active');

        galleryItems.forEach(function (item) {
          const category = item.getAttribute('data-category');
          const show = filter === 'all' || category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

})();
