// Enquiry forms: validation, line items, file checks and honest submission.
// The visitor is only told an enquiry was sent if the endpoint confirms it.
(function () {
  var MAX_ITEMS = 20;
  var ALLOWED = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'jpg', 'jpeg', 'png'];

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function labelText(el) {
    var group = el.closest('fieldset.choice-group');
    var node = group && (el.type === 'radio' || el.type === 'checkbox') ? $('legend', group) : $('label[for="' + el.id + '"]');
    if (!node) return el.name;
    var clone = node.cloneNode(true);
    $$('.req, .opt, a', clone).forEach(function (n) { n.remove(); });
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function errorTarget(el) {
    var group = el.type === 'radio' ? el.closest('fieldset.choice-group') : null;
    return group || el;
  }

  function errorNode(el) {
    var t = errorTarget(el);
    return document.getElementById(t.id + '-error');
  }

  function setError(el, msg) {
    var node = errorNode(el);
    var t = errorTarget(el);
    if (msg) {
      if (node) { node.textContent = msg; node.hidden = false; }
      if (t.tagName === 'FIELDSET') $$('input', t).forEach(function (i) { i.setAttribute('aria-invalid', 'true'); });
      else el.setAttribute('aria-invalid', 'true');
    } else {
      if (node) { node.textContent = ''; node.hidden = true; }
      if (t.tagName === 'FIELDSET') $$('input', t).forEach(function (i) { i.removeAttribute('aria-invalid'); });
      else el.removeAttribute('aria-invalid');
    }
  }

  function filesOf(form) {
    var files = [];
    $$('input[type="file"]', form).forEach(function (i) { files = files.concat(Array.prototype.slice.call(i.files || [])); });
    return files;
  }

  function validateField(el, form) {
    var name = labelText(el).toLowerCase();
    var v = (el.value || '').trim();
    if (el.type === 'radio') {
      if (!el.required) return '';
      return $$('input[name="' + el.name + '"]', form).some(function (r) { return r.checked; }) ? '' : 'Please choose ' + name + '.';
    }
    if (el.type === 'checkbox') {
      if (el.required && !el.checked) return el.name === 'consent' ? 'Please confirm you agree so we can respond.' : 'Please tick this box.';
      return '';
    }
    if (el.type === 'file') {
      var max = parseFloat(el.getAttribute('data-max-mb') || '5') * 1024 * 1024;
      var bad = Array.prototype.slice.call(el.files || []).filter(function (f) {
        return ALLOWED.indexOf(f.name.split('.').pop().toLowerCase()) === -1;
      });
      if (bad.length) return bad[0].name + ' is not an accepted file type. Use PDF, Word, Excel, CSV, JPG or PNG.';
      var total = filesOf(form).reduce(function (s, f) { return s + f.size; }, 0);
      if (total > max) return 'Attachments total ' + (total / 1048576).toFixed(1) + ' MB. Please keep them under ' + el.getAttribute('data-max-mb') + ' MB in total, or email larger files.';
      return '';
    }
    if (!v) {
      if (!el.required) return '';
      return (el.tagName === 'SELECT' ? 'Please choose ' : 'Please enter ') + name + '.';
    }
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address, like name@example.com.';
    if (el.type === 'tel' && v.replace(/\D/g, '').length < 7) return 'Enter a valid phone number, like 0785 170 918.';
    if (el.type === 'url' && !/^https?:\/\/\S+\.\S+/.test(v)) return 'Enter a full website address starting with https://';
    if (el.type === 'date') {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var d = new Date(v + 'T00:00:00');
      if (isNaN(d)) return 'Enter a valid date.';
      if (d < today) return 'Choose a date that is today or later.';
    }
    return '';
  }

  function fields(form) {
    return $$('input, select, textarea', form).filter(function (el) {
      return el.name && el.type !== 'hidden' && el.name.charAt(0) !== '_';
    });
  }

  function validate(form) {
    var errors = [];
    var seen = {};
    fields(form).forEach(function (el) {
      if (el.type === 'radio' || el.type === 'checkbox' && el.closest('fieldset.choice-group')) {
        if (seen[el.name]) return;
        seen[el.name] = true;
      }
      var msg = validateField(el, form);
      setError(el, msg);
      if (msg) errors.push({ el: el, msg: msg });
    });
    var summary = $('.error-summary', form);
    var list = $('ul', summary);
    list.innerHTML = '';
    if (errors.length) {
      errors.forEach(function (e) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        var target = e.el.type === 'radio' ? $('input[name="' + e.el.name + '"]', form) : e.el;
        a.href = '#' + target.id;
        a.textContent = e.msg;
        a.addEventListener('click', function (ev) { ev.preventDefault(); target.focus(); });
        li.appendChild(a);
        list.appendChild(li);
      });
      summary.hidden = false;
      summary.focus();
    } else {
      summary.hidden = true;
    }
    return errors.length === 0;
  }

  // Plain-text version of the form for email/WhatsApp fallback.
  function summaryText(form) {
    var lines = [form.getAttribute('data-form-name') + ' – Axisax website', ''];
    var done = {};
    fields(form).forEach(function (el) {
      if (el.type === 'file' || el.name === 'consent' || done[el.name + el.value]) return;
      if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) return;
      var v = el.tagName === 'SELECT' && el.value ? el.options[el.selectedIndex].text : (el.value || '').trim();
      if (!v) return;
      done[el.name + el.value] = true;
      var label = labelText(el);
      if (el.type === 'checkbox' && el.name === 'request_documents') v = 'Yes';
      lines.push(label + ': ' + v);
    });
    var files = filesOf(form);
    if (files.length) {
      lines.push('');
      lines.push('Attachments to send separately: ' + files.map(function (f) { return f.name; }).join(', '));
    }
    return lines.join('\n');
  }

  function fallbackButtons(form) {
    var text = summaryText(form);
    var subject = ($('input[name="_subject"]', form) || {}).value || 'Website enquiry';
    var email = form.getAttribute('data-email');
    var wa = form.getAttribute('data-whatsapp');
    var mail = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
    var html = '<a class="btn btn-primary" href="' + mail + '">Send by email</a>';
    if (wa) {
      var waUrl = wa.split('?')[0] + '?text=' + encodeURIComponent(text.slice(0, 1800));
      html += '<a class="btn btn-secondary" href="' + waUrl + '" rel="noopener">Send by WhatsApp</a>';
    }
    if (navigator.clipboard) html += '<button class="btn btn-secondary" type="button" data-copy>Copy details</button>';
    return { html: html, text: text };
  }

  function showStatus(form, type, title, body, withFallback) {
    var status = $('.form-status', form);
    var fb = withFallback ? fallbackButtons(form) : null;
    var hasFiles = filesOf(form).length > 0;
    status.innerHTML =
      '<div class="notice notice-' + type + '" tabindex="-1" role="' + (type === 'success' ? 'status' : 'alert') + '">' +
      '<h2 class="notice-title"></h2><p class="notice-body"></p>' +
      (fb ? '<p>' + fb.html + '</p>' + (hasFiles ? '<p class="small">Please attach your files to the email yourself; they cannot be added automatically.</p>' : '') : '') +
      '</div>';
    $('.notice-title', status).textContent = title;
    $('.notice-body', status).textContent = body;
    var copy = $('[data-copy]', status);
    if (copy) {
      copy.addEventListener('click', function () {
        navigator.clipboard.writeText(fb.text).then(function () { copy.textContent = 'Copied'; }, function () { copy.textContent = 'Copy failed'; });
      });
    }
    $('.notice', status).focus();
  }

  // FormSubmit's AJAX endpoint takes JSON; other providers get multipart data.
  function requestFor(form, endpoint) {
    var data = new FormData(form);
    if (!/formsubmit\.co\/ajax\//.test(endpoint)) return { method: 'POST', body: data, headers: { Accept: 'application/json' } };
    var json = {};
    data.forEach(function (v, k) {
      if (typeof v !== 'string') return;
      json[k] = k in json ? json[k] + ' | ' + v : v;
    });
    return { method: 'POST', body: JSON.stringify(json), headers: { 'Content-Type': 'application/json', Accept: 'application/json' } };
  }

  function submit(form) {
    var endpoint = form.getAttribute('data-endpoint');
    var btn = $('button[type="submit"]', form);
    var label = btn.textContent;

    if (!endpoint) {
      showStatus(
        form,
        'warn',
        'Your enquiry has not been sent yet',
        'Online sending is not available at the moment, so nothing has been submitted. Please send your details by email or WhatsApp using the buttons below – we have prepared the message for you.',
        true,
      );
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';
    $('.form-status', form).innerHTML = '';

    // Files can't go through FormSubmit's AJAX endpoint: submit the form
    // normally instead. FormSubmit only redirects to our thank-you page once
    // it has accepted the submission.
    if (/formsubmit\.co\/ajax\//.test(endpoint) && filesOf(form).length) {
      $('input[name="_next"]', form).value = new URL(form.getAttribute('data-thanks'), window.location.href).href;
      HTMLFormElement.prototype.submit.call(form);
      return;
    }

    fetch(endpoint, requestFor(form, endpoint))
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          // FormSubmit answers 200 with success "false" e.g. before activation.
          if (!res.ok || data.success === false || data.success === 'false' || data.ok === false) throw new Error(data.message || 'HTTP ' + res.status);
        });
      })
      .then(function () {
        form.reset();
        $$('[data-line-item]', form).slice(1).forEach(function (n) { n.remove(); });
        syncItems(form);
        showStatus(form, 'success', 'Thank you – your enquiry has been sent', 'We have received your details and will contact you using the information you provided.', false);
      })
      .catch(function () {
        showStatus(
          form,
          'error',
          'Sorry, your enquiry could not be sent',
          'Nothing has been submitted. Please check your connection and try again, or send your details by email or WhatsApp instead.',
          true,
        );
      })
      .then(function () {
        btn.disabled = false;
        btn.textContent = label;
      });
  }

  // ----- Repeatable RFQ line items -----
  function renumber(node, n) {
    $$('[name], [id], [for], [aria-describedby]', node).forEach(function (el) {
      ['name', 'id', 'for', 'aria-describedby'].forEach(function (attr) {
        var v = el.getAttribute(attr);
        if (v) el.setAttribute(attr, v.replace(/item_\d+_/g, 'item_' + n + '_'));
      });
    });
    var num = $('[data-item-num]', node);
    if (num) num.textContent = n;
  }

  function syncItems(form) {
    var items = $$('[data-line-item]', form);
    items.forEach(function (node, i) {
      renumber(node, i + 1);
      var rm = $('[data-remove-item]', node);
      if (rm) rm.hidden = items.length === 1;
    });
    var add = $('[data-add-item]', form);
    if (add) add.hidden = items.length >= MAX_ITEMS;
  }

  function initItems(form) {
    var wrap = $('[data-line-items]', form);
    var add = $('[data-add-item]', form);
    if (!wrap || !add) return;
    add.addEventListener('click', function () {
      var items = $$('[data-line-item]', wrap);
      var clone = items[0].cloneNode(true);
      $$('input, textarea, select', clone).forEach(function (el) {
        el.value = '';
        el.required = false;
        el.removeAttribute('aria-invalid');
      });
      $$('.field-error', clone).forEach(function (e) { e.hidden = true; e.textContent = ''; });
      $$('.req', clone).forEach(function (r) {
        var opt = document.createElement('span');
        opt.className = 'opt';
        opt.textContent = '(optional)';
        r.replaceWith(opt);
      });
      wrap.appendChild(clone);
      syncItems(form);
      $('input', clone).focus();
    });
    wrap.addEventListener('click', function (e) {
      var rm = e.target.closest('[data-remove-item]');
      if (!rm) return;
      rm.closest('[data-line-item]').remove();
      syncItems(form);
      add.focus();
    });
    syncItems(form);
  }

  function prefill(form) {
    var params = new URLSearchParams(window.location.search);
    var cat = params.get('category');
    var sel = $('select[name="category"]', form);
    if (cat && sel && $$('option', sel).some(function (o) { return o.value === cat; })) sel.value = cat;
  }

  $$('form.enquiry-form').forEach(function (form) {
    initItems(form);
    prefill(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var hp = $('input[name="_honey"]', form);
      if (hp && hp.value) return; // likely spam
      if (validate(form)) submit(form);
    });

    // Re-check a field once the visitor corrects it.
    form.addEventListener('change', function (e) {
      var el = e.target;
      if (!el.name || el.name.charAt(0) === '_') return;
      if (el.getAttribute('aria-invalid') === 'true' || el.type === 'file') setError(el, validateField(el, form));
    });
  });
})();
