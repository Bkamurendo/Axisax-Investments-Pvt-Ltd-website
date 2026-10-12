import { site } from '../data/site.js';
import { publishedCategories } from '../data/categories.js';
import { icon } from '../lib/icons.js';
import { esc, pageHero, checkList, whatsappLink } from '../lib/layout.js';
import { input, textarea, select, radios, checkboxes, fileInput, consent, formShell } from '../lib/forms.js';

const units = ['Each', 'Box', 'Pack', 'Carton', 'Ream', 'Roll', 'Pair', 'Set', 'Litre', 'Kilogram', 'Metre', 'Other'];

function requestOptions() {
  const services = [
    { value: 'general-supplies', label: 'Mixed products or not sure' },
    { value: 'business-consultancy', label: 'Business Consultancy' },
    { value: 'connectivity-ict', label: 'Connectivity & ICT' },
    { value: 'institutional-contract', label: 'Institutional & contract supply' },
    { value: 'special-projects', label: 'Special project' },
  ];
  if (site.features.constructionProperty) services.push({ value: 'construction-property', label: 'Construction & Property Services' });
  return [
    { group: 'Product categories', options: publishedCategories().map((c) => ({ value: c.slug, label: c.name })) },
    { group: 'Services', options: services },
    { group: 'Other', options: [{ value: 'other', label: 'Something else' }] },
  ];
}

function lineItem(n) {
  return `<fieldset class="line-item" data-line-item>
    <legend>Item <span data-item-num>${n}</span></legend>
    <div class="grid-2">
      ${input({ name: `item_${n}_description`, label: 'Item or service needed', required: n === 1, hint: 'For example: thermal till rolls, nitrile gloves, company registration.', cls: 'span-2' })}
      ${textarea({ name: `item_${n}_specification`, label: 'Brand, size, specification, standard or model', rows: 3, hint: 'Add as much detail as you know.', cls: 'span-2' })}
      ${input({ name: `item_${n}_quantity`, label: 'Quantity', required: n === 1, attrs: 'inputmode="decimal"' })}
      ${select({ name: `item_${n}_unit`, label: 'Unit of measure', options: units, placeholder: 'Choose a unit' })}
    </div>
    <button class="btn btn-text remove-item" type="button" data-remove-item hidden>Remove this item</button>
  </fieldset>`;
}

const sideContact = (title = 'Prefer to talk?') => {
  const wa = whatsappLink('Hello Axisax, I would like a quotation for:');
  return `<aside class="info-card form-aside">
    <h2>${title}</h2>
    <ul class="contact-list">
      <li>${icon('phone')}<a href="tel:${site.contact.phoneIntl}">${esc(site.contact.phoneDisplay)}</a></li>
      ${wa ? `<li>${icon('chat')}<a href="${wa}" rel="noopener">WhatsApp us</a></li>` : ''}
      <li>${icon('mail')}<a href="mailto:${site.contact.email}">${esc(site.contact.email)}</a></li>
    </ul>
  </aside>`;
};

const quote = {
  path: 'request-a-quote/',
  title: 'Request a Quote',
  description: 'Request a quotation from Axisax. Share your product or service requirement, specification, quantity, delivery location and required date. Attach a BOQ or RFQ.',
  scripts: ['assets/js/forms.js'],
  body: (L) => `
${pageHero({ eyebrow: 'Get a quotation', title: 'Request a Supply or Service Quote', lead: 'Order products, book a service or request a contract or project quotation. We will confirm the details and send you a written quotation.', crumbs: [['request-a-quote/', 'Request a Quote']] }, L)}
<section class="section">
  <div class="container form-layout">
    <div>
      ${formShell({
        id: 'quote-form',
        name: 'Request a Quote',
        endpoint: site.forms.quote,
        subject: 'New quotation request – Axisax website',
        submitLabel: 'Submit Your Requirements',
        L,
        fields: `
        <h2 class="form-section">1. About you</h2>
        <div class="grid-2">
          ${select({
            name: 'customer_type',
            label: 'Customer type',
            required: true,
            options: ['Business / company', 'Government or public institution', 'NGO / development organisation', 'School or education institution', 'Healthcare facility', 'SME / entrepreneur', 'Individual', 'Other'],
          })}
          ${input({ name: 'organisation', label: 'Organisation name', autocomplete: 'organization', hint: 'If you are buying for an organisation.' })}
          ${input({ name: 'name', label: 'Contact person', required: true, autocomplete: 'name' })}
          ${input({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}
          ${input({ name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: true, autocomplete: 'tel', hint: 'For example: 0785 170 918' })}
        </div>
        ${radios({ name: 'preferred_contact', legend: 'Preferred way to contact you', options: ['Email', 'Phone call', 'WhatsApp'] })}

        <h2 class="form-section">2. What you need</h2>
        ${radios({ name: 'request_type', legend: 'What would you like to do?', required: true, options: ['Order products', 'Book a service', 'Set up contract or recurring supply', 'Discuss a project'] })}
        ${select({ name: 'category', label: 'Product category or service', required: true, options: requestOptions(), placeholder: 'Choose a category or service' })}
        <div data-line-items>${lineItem(1)}</div>
        <button class="btn btn-secondary add-item" type="button" data-add-item hidden>+ Add another item</button>

        <h2 class="form-section">3. Delivery</h2>
        <div class="grid-2">
          ${input({ name: 'delivery_town', label: 'Delivery town or city', required: true, autocomplete: 'address-level2' })}
          ${input({ name: 'required_by', label: 'Required-by date', type: 'date' })}
          ${textarea({ name: 'delivery_address', label: 'Delivery address', rows: 2, cls: 'span-2', attrs: 'autocomplete="street-address"' })}
        </div>
        ${radios({ name: 'fulfilment', legend: 'Delivery, collection or installation', options: ['Delivery', 'Collection', 'Installation or setup needed', 'Not sure yet'] })}

        <h2 class="form-section">4. Attachments and notes</h2>
        ${fileInput({ name: 'attachments', label: 'Attachments', hint: 'BOQ, specification sheet, product photo or RFQ document. PDF, Word, Excel, CSV, JPG or PNG; up to 5 MB in total.' })}
        ${textarea({ name: 'notes', label: 'Anything else we should know?', rows: 4, hint: 'For example: submission deadline, budget, reference number or preferred brands.' })}
        <div class="field">
          <label class="choice" for="f-request_documents"><input type="checkbox" id="f-request_documents" name="request_documents" value="yes"><span>Please include company registration documents with the quotation.</span></label>
        </div>
        ${consent(L, 'I agree that Axisax may use these details to respond to my request.')}`,
      })}
    </div>
    <div class="form-side">
      <aside class="info-card">
        <h2>What happens next</h2>
        ${checkList(['We review your request and contact you if anything needs clarifying.', 'We prepare a written quotation or service proposal.', 'The quotation states price, currency, validity, availability and delivery.', 'We proceed only after you confirm.'])}
      </aside>
      ${sideContact()}
    </div>
  </div>
</section>`,
};

const supplier = {
  path: 'suppliers-partnerships/',
  title: 'Suppliers & Partnerships',
  description: 'Manufacturers, wholesalers and distributors: share your catalogue, price list, MOQs, lead times and terms with Axisax.',
  scripts: ['assets/js/forms.js'],
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Work with us',
    title: 'Suppliers & Partnerships',
    lead: 'We welcome manufacturers, wholesalers, importers and distributors who can supply our customers reliably. Share your details and catalogue below.',
    crumbs: [['suppliers-partnerships/', 'Suppliers & Partnerships']],
  },
  L,
)}
<section class="section">
  <div class="container form-layout">
    <div>
      ${formShell({
        id: 'supplier-form',
        name: 'Supplier enquiry',
        endpoint: site.forms.supplier,
        subject: 'New supplier enquiry – Axisax website',
        submitLabel: 'Submit Supplier Details',
        L,
        fields: `
        <h2 class="form-section">1. Company details</h2>
        <div class="grid-2">
          ${input({ name: 'company', label: 'Company name', required: true, autocomplete: 'organization' })}
          ${input({ name: 'name', label: 'Contact person', required: true, autocomplete: 'name' })}
          ${input({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}
          ${input({ name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: true, autocomplete: 'tel' })}
          ${input({ name: 'website', label: 'Website', type: 'url', autocomplete: 'url', hint: 'Include https://' })}
          ${input({ name: 'location', label: 'Town and country', autocomplete: 'address-level2' })}
        </div>

        <h2 class="form-section">2. What you supply</h2>
        ${checkboxes({ name: 'categories', legend: 'Product categories supplied', options: [...publishedCategories().map((c) => c.name), 'ICT & connectivity equipment', 'Other'] })}
        ${input({ name: 'brands', label: 'Brands supplied' })}
        ${select({ name: 'supplier_status', label: 'Your status', required: true, options: ['Manufacturer', 'Distributor', 'Wholesaler', 'Importer', 'Retailer', 'Service provider', 'Other'], hint: 'If you are an authorised distributor for a brand, please attach evidence below.' })}

        <h2 class="form-section">3. Commercial terms</h2>
        <div class="grid-2">
          ${input({ name: 'moq', label: 'Minimum order quantity (MOQ)' })}
          ${input({ name: 'pack_size', label: 'Pack / carton size' })}
          ${select({ name: 'stock_status', label: 'Stock status', options: ['Stock held in Zimbabwe', 'Stock held outside Zimbabwe', 'Made or imported to order', 'Mixed'] })}
          ${input({ name: 'lead_time', label: 'Typical lead time' })}
          ${input({ name: 'delivery_area', label: 'Delivery area' })}
          ${select({ name: 'export_capability', label: 'Can you deliver into Zimbabwe from outside the country?', options: ['Yes', 'No', 'Not applicable (based in Zimbabwe)'] })}
          ${input({ name: 'payment_terms', label: 'Payment terms' })}
          ${input({ name: 'quote_validity', label: 'Quotation / price list validity' })}
        </div>

        <h2 class="form-section">4. Documents</h2>
        ${fileInput({ name: 'catalogue', label: 'Catalogue and wholesale price list', hint: 'PDF, Word, Excel, CSV, JPG or PNG; up to 5 MB in total across all attachments.' })}
        ${fileInput({ name: 'quality_documents', label: 'Quality, regulatory or authorisation documents', hint: 'For example: certificates, registrations or distributor authorisation letters.' })}
        ${textarea({ name: 'message', label: 'Message', rows: 4 })}
        ${consent(L, 'I agree that Axisax may store and use these details to assess and contact my company about supply opportunities.')}`,
      })}
    </div>
    <div class="form-side">
      <aside class="info-card">
        <h2>What we look for</h2>
        ${checkList(['Clear product specifications and pack sizes', 'Current, dated price lists', 'Reliable lead times and delivery areas', 'Relevant quality and regulatory documents', 'Permission before we use your product images or logos'])}
        <p class="small">Submitting your details does not create a supply agreement. We contact suppliers as customer requirements arise.</p>
      </aside>
      ${sideContact('Questions?')}
    </div>
  </div>
</section>`,
};

const contact = {
  path: 'contact/',
  title: 'Contact Axisax',
  description: `Contact AXISAX INVESTMENTS (PRIVATE) LIMITED in Binga, Zimbabwe. Phone ${site.contact.phoneDisplay}, email ${site.contact.email}, WhatsApp or our enquiry form.`,
  scripts: ['assets/js/forms.js'],
  body: (L) => {
    const k = site.contact;
    const wa = whatsappLink();
    return `
${pageHero({ eyebrow: 'Get in touch', title: 'Contact Axisax', lead: 'Questions, requirements or partnership ideas – we would like to hear from you.', crumbs: [['contact/', 'Contact']] }, L)}
<section class="section">
  <div class="container form-layout">
    <div class="form-side form-side-first">
      <aside class="info-card">
        <h2>Contact details</h2>
        <ul class="contact-list">
          <li>${icon('phone')}<span><strong>Phone</strong><a href="tel:${k.phoneIntl}">${esc(k.phoneDisplay)}</a></span></li>
          ${wa ? `<li>${icon('chat')}<span><strong>WhatsApp</strong><a href="${wa}" rel="noopener">${esc(k.phoneDisplay)}</a></span></li>` : ''}
          <li>${icon('mail')}<span><strong>Email</strong><a href="mailto:${k.email}">${esc(k.email)}</a></span></li>
          <li>${icon('pin')}<span><strong>Registered address</strong>${site.company.address.map(esc).join(', ')}</span></li>
          <li>${icon('building')}<span><strong>Service area</strong>${esc(k.serviceArea)}</span></li>
          ${k.hours ? `<li>${icon('clock')}<span><strong>Business hours</strong>${esc(k.hours)}</span></li>` : ''}
        </ul>
        ${k.responseTime ? `<p class="small">We aim to respond ${esc(k.responseTime)}.</p>` : ''}
      </aside>
      <aside class="info-card">
        <h2>Looking for a quotation?</h2>
        <p>The quote form lets you add items, quantities and attachments.</p>
        <a class="btn btn-primary btn-block" href="${L('request-a-quote/')}">Request a Quote</a>
      </aside>
    </div>
    <div>
      <h2>Send us a message</h2>
      ${formShell({
        id: 'contact-form',
        name: 'Contact',
        endpoint: site.forms.contact,
        subject: 'New contact message – Axisax website',
        submitLabel: 'Send Message',
        L,
        fields: `
        <div class="grid-2">
          ${input({ name: 'name', label: 'Your name', required: true, autocomplete: 'name' })}
          ${input({ name: 'organisation', label: 'Organisation', autocomplete: 'organization' })}
          ${input({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}
          ${input({ name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autocomplete: 'tel' })}
        </div>
        ${select({ name: 'topic', label: 'Topic', required: true, options: ['General question', 'Quotation follow-up', 'Business consultancy', 'Connectivity & ICT', 'Supplier or partnership', 'Privacy request', 'Other'] })}
        ${textarea({ name: 'message', label: 'Message', required: true, rows: 6 })}
        ${consent(L, 'I agree that Axisax may use these details to respond to my message.')}`,
      })}
    </div>
  </div>
</section>`;
  },
};

const thanks = {
  path: 'thank-you/',
  noindex: true,
  title: 'Thank you',
  description: 'Your enquiry has been sent to Axisax.',
  body: (L) => `
${pageHero({ eyebrow: 'Enquiry sent', title: 'Thank you – your enquiry has been sent', lead: 'We have received your details and will contact you using the information you provided.' }, L)}
<section class="section">
  <div class="container narrow">
    <div class="hero-actions">
      <a class="btn btn-primary btn-lg" href="${L()}">Back to the homepage</a>
      <a class="btn btn-secondary btn-lg" href="${L('product-categories/')}">Browse categories</a>
    </div>
  </div>
</section>`,
};

export default [quote, supplier, contact, thanks];
