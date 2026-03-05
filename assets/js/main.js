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

  const form = document.querySelector('.quote-form');
  if (!form) return;

  const requiredFields = [
    { id: 'name', message: 'Please enter your name.' },
    { id: 'phone', message: 'Please enter a valid phone number.' },
    { id: 'email', message: 'Please enter a valid email address.' },
    { id: 'city', message: 'Please enter your city.' },
    { id: 'project-type', message: 'Please select a project type.' },
    { id: 'message', message: 'Please include project details.' }
  ];

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    if (field) field.setAttribute('aria-invalid', 'true');
    error.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    if (field) field.removeAttribute('aria-invalid');
    error.textContent = '';
  }

  function validateField(field) {
    const input = document.getElementById(field.id);
    if (!input) return true;

    const value = input.value.trim();
    if (!value) {
      showError(field.id, field.message);
      return false;
    }

    if (field.id === 'phone' && !/^[0-9+()\-\s]{7,}$/.test(value)) {
      showError(field.id, field.message);
      return false;
    }

    if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      showError(field.id, field.message);
      return false;
    }

    clearError(field.id);
    return true;
  }

  function validateServices() {
    const boxes = form.querySelectorAll('input[name="services"]');
    const error = document.getElementById('services-error');
    if (!boxes.length || !error) return true;

    const selected = Array.from(boxes).some(function (box) { return box.checked; });
    error.textContent = selected ? '' : 'Please select at least one service.';
    return selected;
  }

  requiredFields.forEach(function (field) {
    const input = document.getElementById(field.id);
    if (!input) return;
    input.addEventListener('blur', function () { validateField(field); });
    input.addEventListener('input', function () { validateField(field); });
  });

  form.querySelectorAll('input[name="services"]').forEach(function (box) {
    box.addEventListener('change', validateServices);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const validFields = requiredFields.map(validateField).every(Boolean);
    const validServices = validateServices();
    const status = form.querySelector('.form-status');

    if (!validFields || !validServices) {
      if (status) status.textContent = 'Please fix the highlighted fields and submit again.';
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.reset();
    requiredFields.forEach(function (field) { clearError(field.id); });
    const servicesError = document.getElementById('services-error');
    if (servicesError) servicesError.textContent = '';

    if (status) {
      status.textContent = 'Thanks. Your quote request has been received. We respond within 1 business day.';
    }
  });
})();
