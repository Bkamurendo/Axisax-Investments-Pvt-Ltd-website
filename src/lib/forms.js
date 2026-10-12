import { site } from '../data/site.js';
import { esc, whatsappLink } from './layout.js';

let uid = 0;
const hintId = (id) => `${id}-hint`;
const errId = (id) => `${id}-error`;

function describedBy(id, hint) {
  return `aria-describedby="${hint ? hintId(id) + ' ' : ''}${errId(id)}"`;
}

function wrap(id, label, required, hint, control, cls = '') {
  return `<div class="field${cls ? ' ' + cls : ''}">
    <label for="${id}">${esc(label)}${required ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(optional)</span>'}</label>
    ${hint ? `<p class="hint" id="${hintId(id)}">${hint}</p>` : ''}
    ${control}
    <p class="field-error" id="${errId(id)}" hidden></p>
  </div>`;
}

export function input({ name, label, type = 'text', required = false, hint = '', autocomplete = '', attrs = '', cls = '' }) {
  const id = `f-${name}`;
  return wrap(
    id,
    label,
    required,
    hint,
    `<input id="${id}" name="${name}" type="${type}"${required ? ' required' : ''}${autocomplete ? ` autocomplete="${autocomplete}"` : ''} ${describedBy(id, hint)} ${attrs}>`,
    cls,
  );
}

export function textarea({ name, label, required = false, hint = '', rows = 5, attrs = '', cls = '' }) {
  const id = `f-${name}`;
  return wrap(id, label, required, hint, `<textarea id="${id}" name="${name}" rows="${rows}"${required ? ' required' : ''} ${describedBy(id, hint)} ${attrs}></textarea>`, cls);
}

export function select({ name, label, options, required = false, hint = '', placeholder = 'Please select', cls = '', attrs = '' }) {
  const id = `f-${name}`;
  const opts = options
    .map((o) => {
      if (o.group) return `<optgroup label="${esc(o.group)}">${o.options.map((x) => `<option value="${esc(x.value ?? x)}">${esc(x.label ?? x)}</option>`).join('')}</optgroup>`;
      return `<option value="${esc(o.value ?? o)}">${esc(o.label ?? o)}</option>`;
    })
    .join('');
  return wrap(
    id,
    label,
    required,
    hint,
    `<select id="${id}" name="${name}"${required ? ' required' : ''} ${describedBy(id, hint)} ${attrs}><option value="">${esc(placeholder)}</option>${opts}</select>`,
    cls,
  );
}

export function radios({ name, legend, options, required = false, hint = '' }) {
  const id = `f-${name}`;
  return `<fieldset class="field choice-group" id="${id}" ${describedBy(id, hint)}>
    <legend>${esc(legend)}${required ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(optional)</span>'}</legend>
    ${hint ? `<p class="hint" id="${hintId(id)}">${hint}</p>` : ''}
    <div class="choices">${options
      .map((o) => {
        const oid = `r${++uid}`;
        return `<label class="choice" for="${oid}"><input type="radio" id="${oid}" name="${name}" value="${esc(o)}"${required ? ' required' : ''}><span>${esc(o)}</span></label>`;
      })
      .join('')}</div>
    <p class="field-error" id="${errId(id)}" hidden></p>
  </fieldset>`;
}

export function checkboxes({ name, legend, options, hint = '' }) {
  const id = `f-${name}`;
  return `<fieldset class="field choice-group" id="${id}" ${describedBy(id, hint)}>
    <legend>${esc(legend)} <span class="opt">(optional)</span></legend>
    ${hint ? `<p class="hint" id="${hintId(id)}">${hint}</p>` : ''}
    <div class="choices choices-cols">${options
      .map((o) => {
        const oid = `c${++uid}`;
        return `<label class="choice" for="${oid}"><input type="checkbox" id="${oid}" name="${name}" value="${esc(o)}"><span>${esc(o)}</span></label>`;
      })
      .join('')}</div>
    <p class="field-error" id="${errId(id)}" hidden></p>
  </fieldset>`;
}

export function fileInput({ name, label, hint }) {
  return input({
    name,
    label,
    type: 'file',
    hint,
    attrs: 'multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png" data-max-mb="5"',
  });
}

export function consent(L, text) {
  const id = 'f-consent';
  return `<div class="field consent">
    <label class="choice" for="${id}"><input type="checkbox" id="${id}" name="consent" value="yes" required aria-describedby="${errId(id)}">
      <span>${text} Read our <a href="${L('privacy-notice/')}">Privacy Notice</a>. <span class="req" aria-hidden="true">*</span></span>
    </label>
    <p class="field-error" id="${errId(id)}" hidden></p>
  </div>`;
}

// Wraps fields in a form wired to /assets/js/forms.js.
export function formShell({ id, name, endpoint, submitLabel, subject, fields, L }) {
  const wa = whatsappLink();
  // FormSubmit's AJAX endpoint cannot take file uploads, so forms with files
  // (and visitors without JavaScript) post to the standard endpoint, which
  // redirects to the thank-you page only after accepting the submission.
  const action = endpoint.replace('formsubmit.co/ajax/', 'formsubmit.co/');
  return `
<form class="enquiry-form" id="${id}" data-form-name="${esc(name)}" data-endpoint="${esc(endpoint)}" data-thanks="${L('thank-you/')}" data-email="${esc(site.contact.email)}" data-whatsapp="${esc(wa)}"
  ${endpoint ? `action="${esc(action)}" method="post" enctype="multipart/form-data"` : ''} novalidate>
  <noscript><div class="notice notice-warn"><p><strong>JavaScript is turned off.</strong> ${endpoint ? 'You can still submit this form.' : `Please email your enquiry to <a href="mailto:${site.contact.email}">${site.contact.email}</a> or call ${site.contact.phoneDisplay}.`}</p></div></noscript>
  <div class="error-summary" tabindex="-1" role="alert" hidden>
    <h2>Please check the following</h2>
    <ul></ul>
  </div>
  <input type="hidden" name="_subject" value="${esc(subject)}">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_next" value="${new URL('thank-you/', site.url).href}">
  <div class="hp" aria-hidden="true">
    <label for="${id}-website-url">Leave this field empty</label>
    <input type="text" id="${id}-website-url" name="_honey" tabindex="-1" autocomplete="off">
  </div>
  ${fields}
  <p class="form-note"><span class="req" aria-hidden="true">*</span> Required field</p>
  <div class="form-actions">
    <button class="btn btn-primary btn-lg" type="submit">${esc(submitLabel)}</button>
  </div>
  <div class="form-status" aria-live="polite"></div>
</form>`;
}
