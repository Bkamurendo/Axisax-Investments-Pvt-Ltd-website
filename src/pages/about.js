import { site } from '../data/site.js';
import { icon } from '../lib/icons.js';
import { esc, pageHero, ctaBand, checkList } from '../lib/layout.js';

const values = [
  ['Dependable', 'We do what we say and confirm details in writing.'],
  ['Transparent', 'Clear quotations, honest availability and no unsupported claims.'],
  ['Practical', 'Plain-language advice focused on getting the job done.'],
  ['Responsive', 'We acknowledge requests promptly and keep you updated.'],
  ['Organised', 'Specifications, quantities and timelines are tracked carefully.'],
];

export default {
  path: 'about/',
  title: 'About Axisax',
  description:
    'About AXISAX INVESTMENTS (PRIVATE) LIMITED: a Zimbabwean supplier and service provider registered in Binga, Zimbabwe.',
  body: (L) => {
    const c = site.company;
    const k = site.contact;
    return `
${pageHero({ eyebrow: 'About us', title: 'About Axisax', lead: esc(c.description), crumbs: [['about/', 'About']] }, L)}

<section class="section">
  <div class="container split split-top">
    <div class="prose">
      <h2>Company overview</h2>
      <p>${esc(c.legalName)} is a diversified Zimbabwean supplier and service provider. Businesses, institutions, organisations and individuals buy goods from us and engage us to deliver services, all under one brand.</p>
      <p>Our work is organised into clear divisions: <a href="${L('products-supply/')}">Product Supply</a>, <a href="${L('business-consultancy/')}">Business Consultancy</a>, <a href="${L('connectivity-ict/')}">Connectivity &amp; ICT</a>, <a href="${L('institutional-contract-supply/')}">Institutional &amp; Contract Supply</a> and <a href="${L('special-projects/')}">Special Projects</a>. These are divisions of one company, not separate legal entities.</p>

      <h2>What we do</h2>
      ${checkList([
        '<strong>Product supply:</strong> a broad range of goods for business, institutional and individual requirements.',
        '<strong>Service delivery:</strong> defined business and specialist services with clear scope and deliverables.',
        '<strong>Institutional &amp; contract supply:</strong> bulk, recurring and multi-category supply requirements.',
        '<strong>Project solutions:</strong> the products, services and delivery coordination agreed projects need.',
        '<strong>Procurement &amp; sourcing:</strong> when a requirement calls for special sourcing, we identify suitable supply options and manage the process through fulfilment.',
      ])}
      <p>We are open about fulfilment: some items may be available from stock, while others are ordered for you after you confirm. Every quotation states price, currency, validity, availability, lead time and delivery arrangements, and we proceed only after you confirm.</p>

      <h2>Mission</h2>
      <p>To be a dependable supplier, service provider and business partner, giving our customers the goods and support they need from one company, with clear communication at every step.</p>

      <h2>Values</h2>
      <ul class="value-list">${values.map(([t, d]) => `<li><strong>${t}.</strong> ${d}</li>`).join('')}</ul>
    </div>

    <aside class="info-card" aria-labelledby="reg-h">
      <h2 id="reg-h">${icon('file')} Registration details</h2>
      <dl class="details">
        <div><dt>Registered name</dt><dd>${esc(c.legalName)}</dd></div>
        <div><dt>Company number</dt><dd>${esc(c.number)}</dd></div>
        <div><dt>Incorporated</dt><dd>${esc(c.incorporated)}</dd></div>
        <div><dt>Registered address</dt><dd>${c.address.map(esc).join('<br>')}</dd></div>
        <div><dt>Phone</dt><dd><a href="tel:${k.phoneIntl}">${esc(k.phoneDisplay)}</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:${k.email}">${esc(k.email)}</a></dd></div>
      </dl>
      <p class="small">Procurement officers and buyers can request company documents with a quotation via the <a href="${L('request-a-quote/')}">Request a Quote</a> form.</p>
    </aside>
  </div>
</section>
${ctaBand(L)}`;
  },
};
