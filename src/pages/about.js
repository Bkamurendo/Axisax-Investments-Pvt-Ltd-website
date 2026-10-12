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
    'About AXISAX INVESTMENTS (PRIVATE) LIMITED: a Zimbabwean general supplies, procurement and business-services company registered in Binga, Zimbabwe.',
  body: (L) => {
    const c = site.company;
    const k = site.contact;
    return `
${pageHero({ eyebrow: 'About us', title: 'About Axisax', lead: esc(c.description), crumbs: [['about/', 'About']] }, L)}

<section class="section">
  <div class="container split split-top">
    <div class="prose">
      <h2>Company overview</h2>
      <p>${esc(c.legalName)} is a diversified Zimbabwean company that brings general supplies, procurement and practical business services together under one brand. Our customers include businesses, institutions, organisations, SMEs and individuals.</p>
      <p>We operate through clearly organised service lines: <a href="${L('general-supplies-procurement/')}">General Supplies &amp; Procurement</a>, <a href="${L('business-consultancy/')}">Business Consultancy</a>, <a href="${L('connectivity-ict/')}">Connectivity &amp; ICT</a> and <a href="${L('institutional-project-procurement/')}">Institutional &amp; Project Procurement</a>. These are divisions of one company, not separate legal entities.</p>

      <h2>Our operating model</h2>
      <p>Axisax works on a sourcing model. We do not hold stock of every item we list. When you send a requirement, we:</p>
      ${checkList([
        'confirm the specification, quantity and delivery details with you;',
        'source from manufacturers, wholesalers and distributors suited to the requirement;',
        'compare supplier options where more than one is available;',
        'send a written quotation stating price, currency, validity, availability and delivery arrangements;',
        'place the order only after you confirm, then deliver or coordinate as agreed.',
      ])}

      <h2>Mission</h2>
      <p>To make procurement simple for our customers by combining careful specification, dependable sourcing and clear communication.</p>

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
      <p class="small">Procurement officers can request company documents with a quotation via the <a href="${L('request-a-quote/')}">Request a Quote</a> form.</p>
    </aside>
  </div>
</section>
${ctaBand(L)}`;
  },
};
