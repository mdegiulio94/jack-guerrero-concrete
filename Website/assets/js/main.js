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

  const fields = [
    { id: 'name', message: 'Please enter your full name.' },
    { id: 'phone', message: 'Please enter a valid phone number.' },
    { id: 'email', message: 'Please enter a valid email address.' },
    { id: 'service', message: 'Please select a service.' },
    { id: 'location', message: 'Please enter the project location.' },
    { id: 'details', message: 'Please provide project details.' }
  ];

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (!input || !error) return;
    input.setAttribute('aria-invalid', 'true');
    error.textContent = message;
  }

  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (!input || !error) return;
    input.removeAttribute('aria-invalid');
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

    if (field.id === 'phone') {
      const phoneOk = /^[0-9+()\-\s]{7,}$/.test(value);
      if (!phoneOk) {
        showError(field.id, field.message);
        return false;
      }
    }

    if (field.id === 'email') {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (!emailOk) {
        showError(field.id, field.message);
        return false;
      }
    }

    clearError(field.id);
    return true;
  }

  fields.forEach(function (field) {
    const input = document.getElementById(field.id);
    if (!input) return;
    input.addEventListener('input', function () {
      validateField(field);
    });
    input.addEventListener('blur', function () {
      validateField(field);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const allValid = fields.map(validateField).every(Boolean);
    const status = form.querySelector('.form-status');

    if (!allValid) {
      if (status) {
        status.textContent = 'Please fix the highlighted fields and submit again.';
      }
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.reset();
    fields.forEach(function (field) { clearError(field.id); });
    if (status) {
      status.textContent = 'Thanks. Your quote request has been received. We will contact you soon.';
    }
  });
})();