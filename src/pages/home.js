import { site } from '../data/site.js';
import { featuredCategories } from '../data/categories.js';
import { icon } from '../lib/icons.js';
import { esc, categoryCards, processSteps, faqList, faqJsonLd, checkList, whatsappLink } from '../lib/layout.js';

export const homeFaqs = [
  [
    'Are products available from stock?',
    'Some items may be available from stock; others are ordered for you after you confirm your order. Each quotation states the availability and lead time of every item, so you know exactly what to expect.',
  ],
  [
    'How do I order or get a quotation?',
    'Use the Request a Quote form, email us or send a WhatsApp message with the product or service, specification, quantity and delivery location. You can attach a list, BOQ, specification sheet, product photo or RFQ document.',
  ],
  [
    'How long is a quotation valid?',
    'Each quotation states its validity period and currency. After that, prices and availability are confirmed again before an order is placed.',
  ],
  [
    'Do you deliver?',
    'Delivery, collection or coordination is agreed per quotation. Delivery costs and estimated timelines are stated in the quotation and depend on the item, quantity and location.',
  ],
  [
    'How does payment work?',
    'Payment terms and accepted payment methods are set out on each quotation and must be agreed before we proceed. We do not take payments through this website.',
  ],
  [
    'Is there a minimum order?',
    'It depends on the product. If a minimum order quantity or pack size applies, we will tell you when we quote.',
  ],
  [
    'Can you supply items that are not listed?',
    'Often, yes. Send us the details, a photo or a specification. When an item needs special sourcing, we find suitable supply options and confirm what we can deliver.',
  ],
];

// Service selector (revised blueprint: lead with product supply and service delivery).
const services = [
  ['boxes', 'Product Categories & Supply', 'Business, office, medical, cleaning, PPE and other supplies for once-off, bulk and repeat orders.', 'products-supply/'],
  ['briefcase', 'Business Consultancy', 'Company registration, compliance documentation and business paperwork with clear scope and deliverables.', 'business-consultancy/'],
  ['wifi', 'Connectivity & ICT', 'Connectivity, networking and ICT equipment supplied to specification, with setup where agreed.', 'connectivity-ict/'],
  ['building', 'Institutional & Contract Supply', 'Bulk, recurring and multi-category supply for institutions, organisations and contracts.', 'institutional-contract-supply/'],
  ['layers', 'Special Projects', 'Agreed project requirements supplied and delivered, with delivery coordination.', 'special-projects/'],
];

// Core capability statements (revised blueprint).
const capabilities = [
  ['boxes', 'Product Supply', 'We supply a broad range of goods for business, institutional and individual requirements.'],
  ['briefcase', 'Service Delivery', 'We provide defined business and specialist services with clear scope and deliverables.'],
  ['building', 'Institutional & Contract Supply', 'We respond to bulk, recurring and multi-category supply requirements.'],
  ['layers', 'Project Solutions', 'We support agreed projects with the required products, services and delivery coordination.'],
  ['search', 'Procurement & Sourcing', 'When a requirement calls for special sourcing, we identify suitable supply options and manage the process through fulfilment.'],
];

export default {
  path: '',
  title: 'Supplies. Services. Solutions. – Supplier & Service Provider in Zimbabwe',
  description:
    'AXISAX INVESTMENTS (PRIVATE) LIMITED supplies products and delivers services for businesses, institutions and organisations across Zimbabwe. Business consumables, medical, cleaning, PPE, consultancy and project services.',
  body: (L) => {
    const wa = whatsappLink('Hello Axisax, I would like a quotation for:');
    return `
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="eyebrow eyebrow-light">${esc(site.company.tagline)}</p>
      <h1 class="hero-title"><span>Your Supplier.</span> <span>Your Service Provider.</span> <span>Your Business Partner.</span></h1>
      <p class="lead">${esc(site.company.legalName)} supplies products and delivers services for businesses, institutions and organisations across Zimbabwe. From everyday business consumables and specialist supplies to consultancy and project services, we help customers get the goods and support they need from one company.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="${L('product-categories/')}">Browse Products &amp; Supplies</a>
        <a class="btn btn-outline-light btn-lg" href="#services">Explore Our Services</a>
      </div>
      <p class="hero-links">
        <a href="${L('request-a-quote/')}">Request a Supply Quote ${icon('arrow')}</a>
        <a href="${L('request-a-quote/?category=special-projects')}">Discuss a Contract or Project ${icon('arrow')}</a>
      </p>
    </div>
    <div class="hero-panel" aria-label="Ways to order">
      <h2>Order or request a quote</h2>
      <p>Tell us what you need, how many, and where. Attach a list, BOQ or photo if you have one.</p>
      <ul class="hero-contact">
        <li><a href="${L('request-a-quote/')}">${icon('clipboard')}<span><strong>Online quote form</strong><small>Products, services and attachments</small></span></a></li>
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
      <h2 id="services-h">Products and services from one company</h2>
      <p>${esc(site.company.supportingLine)} Choose the area that matches what you need.</p>
    </div>
    <ul class="card-grid card-grid-5">
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
        <p class="eyebrow">Products &amp; supplies</p>
        <h2 id="cats-h">Featured product categories</h2>
        <p>Availability, lead time and price for each item are confirmed on your quotation.</p>
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
      <h2 id="how-h">How to buy from or engage Axisax</h2>
    </div>
    ${processSteps()}
  </div>
</section>

<section class="section section-tint" aria-labelledby="why-h">
  <div class="container split split-top">
    <div>
      <p class="eyebrow">Why Axisax</p>
      <h2 id="why-h">One dependable company for supplies and services</h2>
      <p>Buy goods, book services and arrange contract or project supply through one point of contact. We confirm specifications, give clear written quotations and state the fulfilment status of every item honestly.</p>
      <a class="btn btn-secondary" href="${L('about/')}">About Axisax</a>
    </div>
    <ul class="feature-list">
      ${capabilities.map(([ic, t, d]) => `<li>${icon(ic)}<div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-label="Contracts, projects and suppliers">
  <div class="container panel-pair">
    <div class="panel panel-navy">
      ${icon('building', 'icon panel-icon')}
      <h2>Institutional, contract &amp; project supply</h2>
      <p>Government departments, NGOs, schools, clinics and companies can send bulk, recurring and project requirements, BOQs and RFQs for a consolidated quotation.</p>
      <div class="panel-actions">
        <a class="btn btn-primary" href="${L('institutional-contract-supply/')}">Discuss a Contract or Project</a>
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
      <p>Place an order, request a quotation or ask about a service, and we will respond with next steps.</p>
      ${checkList([`Phone: <a href="tel:${site.contact.phoneIntl}">${esc(site.contact.phoneDisplay)}</a>`, `Email: <a href="mailto:${site.contact.email}">${esc(site.contact.email)}</a>`, `Address: ${site.company.address.map(esc).join(', ')}`])}
    </div>
    <div class="cta-card">
      <h3>Ready to order?</h3>
      <p>Send your product list or service requirement and we will confirm price, availability and timelines.</p>
      <a class="btn btn-primary btn-lg btn-block" href="${L('request-a-quote/')}">Request a Supply Quote</a>
      <a class="btn btn-secondary btn-block" href="${L('contact/')}">Contact Axisax</a>
    </div>
  </div>
</section>
${faqJsonLd(homeFaqs)}`;
  },
};
