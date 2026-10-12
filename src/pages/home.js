import { site } from '../data/site.js';
import { featuredCategories } from '../data/categories.js';
import { icon } from '../lib/icons.js';
import { esc, categoryCards, processSteps, faqList, faqJsonLd, checkList, whatsappLink } from '../lib/layout.js';

export const homeFaqs = [
  [
    'Do you keep every listed item in stock?',
    'No. Our category pages show the kinds of items we can source. We work on a sourcing basis, so availability, brand options and lead times are confirmed on each quotation.',
  ],
  [
    'How do I get a quotation?',
    'Use the Request a Quote form, email us or send a WhatsApp message with the item, specification, quantity and delivery location. You can attach a BOQ, specification sheet, product photo or RFQ document.',
  ],
  [
    'How long is a quotation valid?',
    'Each quotation states its validity period and currency. Supplier prices and availability can change, so we confirm both again before an order is placed.',
  ],
  [
    'Do you deliver?',
    'Delivery, collection or coordination is agreed per quotation. Delivery costs and estimated timelines are stated in the quotation and depend on the item, quantity and location.',
  ],
  [
    'How does payment work?',
    'Payment terms and accepted payment methods are set out on each quotation and must be agreed before we order. We do not take payments through this website.',
  ],
  [
    'Is there a minimum order?',
    'It depends on the product and supplier. If a minimum order quantity or pack size applies, we will tell you when we quote.',
  ],
  [
    'Can you source items that are not listed?',
    'Often, yes. Send us the details, a photo or a specification and we will tell you whether we can source it.',
  ],
];

const services = [
  ['boxes', 'General Supplies & Procurement', 'Sourcing, bulk supply, source-on-demand and multi-category quotations across our product categories.', 'general-supplies-procurement/'],
  ['briefcase', 'Business Consultancy', 'Help with company registration, compliance documentation and business paperwork.', 'business-consultancy/'],
  ['wifi', 'Connectivity & ICT', 'Procurement of connectivity, networking and ICT equipment, with setup enquiries coordinated.', 'connectivity-ict/'],
  ['building', 'Institutional & Project Procurement', 'Bulk RFQs, project specifications and specialist sourcing for institutions and projects.', 'institutional-project-procurement/'],
];

export default {
  path: '',
  title: 'Procurement Made Simple – General Supplies & Business Services in Zimbabwe',
  description:
    'AXISAX INVESTMENTS (PRIVATE) LIMITED is a Zimbabwean general supplies, procurement and business-services company. Request a quotation for medical, office, cleaning, PPE and other supplies.',
  body: (L) => {
    const wa = whatsappLink('Hello Axisax, I would like a quotation for:');
    return `
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="eyebrow eyebrow-light">${esc(site.company.tagline)}</p>
      <h1>One Company.<br>Multiple Solutions.</h1>
      <p class="lead">${esc(site.company.legalName)} helps businesses, institutions and organisations source general supplies, manage procurement requirements and access practical business services.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="${L('request-a-quote/')}">Request a Quote</a>
        <a class="btn btn-outline-light btn-lg" href="#services">Explore Our Services</a>
      </div>
      <ul class="hero-points">
        <li>${icon('check')}Specification-led sourcing</li>
        <li>${icon('check')}Multi-category quotations</li>
        <li>${icon('check')}Clear, written quotations</li>
      </ul>
    </div>
    <div class="hero-panel" aria-label="How to send a requirement">
      <h2>Send us your requirement</h2>
      <p>Tell us what you need, how many, and where. Attach a list, BOQ or photo if you have one.</p>
      <ul class="hero-contact">
        <li><a href="${L('request-a-quote/')}">${icon('clipboard')}<span><strong>Online RFQ form</strong><small>Include attachments</small></span></a></li>
        ${wa ? `<li><a href="${wa}" rel="noopener">${icon('chat')}<span><strong>WhatsApp</strong><small>${esc(site.contact.phoneDisplay)}</small></span></a></li>` : ''}
        <li><a href="mailto:${site.contact.email}">${icon('mail')}<span><strong>Email</strong><small>${esc(site.contact.email)}</small></span></a></li>
        <li><a href="tel:${site.contact.phoneIntl}">${icon('phone')}<span><strong>Call</strong><small>${esc(site.contact.phoneDisplay)}</small></span></a></li>
      </ul>
    </div>
  </div>
</section>

<section class="section" id="services" aria-labelledby="services-h">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">What we do</p>
      <h2 id="services-h">Our services</h2>
      <p>One company with clearly organised service lines. Choose the one that matches your requirement.</p>
    </div>
    <ul class="card-grid card-grid-4">
      ${services
        .map(
          ([ic, t, d, href]) => `<li class="card card-link card-service">
            <span class="card-icon">${icon(ic)}</span>
            <h3><a href="${L(href)}">${t}</a></h3>
            <p>${d}</p>
            <span class="card-more" aria-hidden="true">Learn more ${icon('arrow')}</span>
          </li>`,
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="section section-tint" aria-labelledby="cats-h">
  <div class="container">
    <div class="section-head section-head-split">
      <div>
        <p class="eyebrow">General supplies</p>
        <h2 id="cats-h">Featured product categories</h2>
        <p>Items shown are examples of what we can source. Availability and pricing are confirmed per quotation.</p>
      </div>
      <a class="btn btn-secondary" href="${L('product-categories/')}">All categories</a>
    </div>
    ${categoryCards(L, featuredCategories())}
  </div>
</section>

<section class="section" aria-labelledby="how-h">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">How it works</p>
      <h2 id="how-h">From requirement to delivery in five steps</h2>
    </div>
    ${processSteps()}
  </div>
</section>

<section class="section section-tint" aria-labelledby="why-h">
  <div class="container split">
    <div>
      <p class="eyebrow">Why Axisax</p>
      <h2 id="why-h">Practical procurement, clearly communicated</h2>
      <p>We focus on getting the specification right, finding suitable suppliers and keeping you informed at each step.</p>
      <a class="btn btn-secondary" href="${L('about/')}">About Axisax</a>
    </div>
    <ul class="feature-list">
      <li>${icon('layers')}<div><h3>Broad sourcing scope</h3><p>One point of contact for requirements across many product categories and services.</p></div></li>
      <li>${icon('clipboard')}<div><h3>Specification-led procurement</h3><p>We confirm sizes, standards, brands and quantities before we quote, so you get what you asked for.</p></div></li>
      <li>${icon('scale')}<div><h3>Supplier comparison where possible</h3><p>Where more than one supplier is available, we compare options on price, lead time and suitability.</p></div></li>
      <li>${icon('chat')}<div><h3>Clear communication</h3><p>Written quotations that state price, currency, validity, availability and delivery arrangements.</p></div></li>
    </ul>
  </div>
</section>

<section class="section" aria-label="Institutions and suppliers">
  <div class="container panel-pair">
    <div class="panel panel-navy">
      ${icon('building', 'icon panel-icon')}
      <h2>Institutional &amp; project procurement</h2>
      <p>Government departments, NGOs, schools, clinics and companies can send bulk RFQs, BOQs and project specifications for consolidated quotations.</p>
      <div class="panel-actions">
        <a class="btn btn-primary" href="${L('institutional-project-procurement/')}">Discuss a Project</a>
      </div>
    </div>
    <div class="panel panel-light">
      ${icon('users', 'icon panel-icon')}
      <h2>Suppliers &amp; partnerships</h2>
      <p>Manufacturers, wholesalers and distributors are welcome to share catalogues, price lists, MOQs, lead times and terms.</p>
      <div class="panel-actions">
        <a class="btn btn-secondary" href="${L('suppliers-partnerships/')}">Become a Supplier</a>
      </div>
    </div>
  </div>
</section>

<section class="section section-tint" aria-labelledby="faq-h">
  <div class="container narrow">
    <div class="section-head">
      <p class="eyebrow">FAQs</p>
      <h2 id="faq-h">Frequently asked questions</h2>
    </div>
    ${faqList(homeFaqs)}
  </div>
</section>

<section class="section" aria-labelledby="contact-h">
  <div class="container split">
    <div>
      <p class="eyebrow">Contact</p>
      <h2 id="contact-h">Talk to Axisax</h2>
      <p>Send your requirement or question and we will respond with next steps.</p>
      ${checkList([`Phone: <a href="tel:${site.contact.phoneIntl}">${esc(site.contact.phoneDisplay)}</a>`, `Email: <a href="mailto:${site.contact.email}">${esc(site.contact.email)}</a>`, `Address: ${site.company.address.map(esc).join(', ')}`])}
    </div>
    <div class="cta-card">
      <h3>Ready to send your list?</h3>
      <p>Submit your requirements and we will clarify the details and send a quotation.</p>
      <a class="btn btn-primary btn-lg btn-block" href="${L('request-a-quote/')}">Submit Your Requirements</a>
      <a class="btn btn-secondary btn-block" href="${L('contact/')}">Contact Axisax</a>
    </div>
  </div>
</section>
${faqJsonLd(homeFaqs)}`;
  },
};
