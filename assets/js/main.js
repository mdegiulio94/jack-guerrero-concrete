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

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const form = document.querySelector('.quote-form');
  if (!form) return;

  const requiredFields = [
    { id: 'name', message: 'Please enter your name.' },
    { id: 'phone', message: 'Please enter a valid phone number.' },
    { id: 'email', message: 'Please enter a valid email address.' },
    { id: 'city', message: 'Please enter your city.' },
    { id: 'project-type', message: 'Please select a project type.' },
    { id: 'message', message: 'Please add your project details.' }
  ];

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    if (input) input.setAttribute('aria-invalid', 'true');
    error.textContent = message;
  }

  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    if (input) input.removeAttribute('aria-invalid');
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
    const serviceBoxes = form.querySelectorAll('input[name="services"]');
    const anyChecked = Array.from(serviceBoxes).some(function (box) { return box.checked; });
    const error = document.getElementById('services-error');

    if (!error) return true;

    if (!anyChecked) {
      error.textContent = 'Please select at least one service.';
      return false;
    }

    error.textContent = '';
    return true;
  }

  requiredFields.forEach(function (field) {
    const input = document.getElementById(field.id);
    if (!input) return;
    input.addEventListener('input', function () { validateField(field); });
    input.addEventListener('blur', function () { validateField(field); });
  });

  form.querySelectorAll('input[name="services"]').forEach(function (box) {
    box.addEventListener('change', validateServices);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const fieldsValid = requiredFields.map(validateField).every(Boolean);
    const servicesValid = validateServices();
    const status = form.querySelector('.form-status');

    if (!fieldsValid || !servicesValid) {
      if (status) {
        status.textContent = 'Please fix the highlighted fields and submit again.';
      }
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.reset();
    requiredFields.forEach(function (field) { clearError(field.id); });
    const serviceError = document.getElementById('services-error');
    if (serviceError) serviceError.textContent = '';

    if (status) {
      status.textContent = 'Thanks. Your quote request has been received. We will contact you within 1 business day.';
    }
  });
})();
