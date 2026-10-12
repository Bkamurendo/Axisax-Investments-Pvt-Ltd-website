import { site } from '../data/site.js';
import { publishedCategories } from '../data/categories.js';
import { icon } from '../lib/icons.js';
import { pageHero, ctaBand, checkList, categoryCards, processSteps, faqList, faqJsonLd } from '../lib/layout.js';

const quoteBtn = (L, cat, label = 'Request a Quote') => `<a class="btn btn-primary btn-lg" href="${L(`request-a-quote/?category=${cat}`)}">${label}</a>`;

function serviceBlocks(blocks) {
  return `<ul class="card-grid card-grid-3">${blocks
    .map(([ic, t, d]) => `<li class="card">${ic ? `<span class="card-icon">${icon(ic)}</span>` : ''}<h3>${t}</h3><p>${d}</p></li>`)
    .join('')}</ul>`;
}

function scopeNote(title, html) {
  return `<div class="notice notice-info"><h2 class="notice-title">${title}</h2>${html}</div>`;
}

// "What you receive" and "How to engage us" (revised blueprint: service pages
// explain the work, the deliverables and how to engage the company).
function deliverables(receive, engage) {
  return `
<section class="section section-tint">
  <div class="container split split-top split-even">
    <div class="prose">
      <h2>What you receive</h2>
      ${checkList(receive)}
    </div>
    <div class="prose">
      <h2>How to engage us</h2>
      <ol class="engage-steps">${engage.map((s) => `<li>${s}</li>`).join('')}</ol>
    </div>
  </div>
</section>`;
}

const supplies = {
  path: 'products-supply/',
  title: 'Product Supply',
  description:
    'Axisax supplies business, office, medical, cleaning, PPE and other products to businesses, institutions and individuals in Zimbabwe, for once-off, bulk and repeat orders.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Products & supplies',
    title: 'Product Supply',
    lead: 'Buy the goods your business, institution or home needs from one company: everyday consumables, specialist supplies, bulk and repeat orders.',
    crumbs: [['products-supply/', 'Product Supply']],
    actions: `<a class="btn btn-primary btn-lg" href="${L('product-categories/')}">Browse Products &amp; Supplies</a><a class="btn btn-outline-light btn-lg" href="${L('request-a-quote/?category=general-supplies')}">Request a Supply Quote</a>`,
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>How we supply</h2></div>
    ${serviceBlocks([
      ['boxes', 'Product orders', 'Order individual items or complete lists across our product categories.'],
      ['layers', 'Bulk & repeat supply', 'Larger quantities and scheduled repeat orders for consumables you use every month.'],
      ['clipboard', 'Multi-category orders', 'Combine stationery, cleaning, PPE and other items in one order and one quotation.'],
      ['building', 'Institutional & contract supply', `Supply under RFQs, tenders and contracts. <a href="${L('institutional-contract-supply/')}">Learn more</a>.`],
      ['search', 'Procurement & sourcing', 'When a requirement calls for special sourcing, we identify suitable supply options and manage the process through to delivery.'],
      ['scale', 'Specification-led supply', 'We confirm sizes, standards, brands and quantities so you receive exactly what you ordered.'],
    ])}
  </div>
</section>
<section class="section section-tint">
  <div class="container">
    <div class="section-head section-head-split">
      <div><h2>Product categories</h2><p>Availability, lead time and price for each item are confirmed on your quotation.</p></div>
    </div>
    ${categoryCards(L, publishedCategories())}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><h2>How to order</h2></div>
    ${processSteps()}
  </div>
</section>
<section class="section section-tint">
  <div class="container narrow">
    ${scopeNote(
      'Clear fulfilment status',
      `<p>Some items may be available from stock; others are ordered for you after you confirm. Your quotation states the availability and lead time of each item, together with price, currency, validity and delivery arrangements.</p>`,
    )}
  </div>
</section>
${ctaBand(L, { primary: ['request-a-quote/?category=general-supplies', 'Request a Supply Quote'], secondary: ['product-categories/', 'Browse Products'] })}`,
};

const consultancyFaqs = [
  ['Do you issue registrations or certificates?', 'No. Registrations, certificates and clearances are issued by the relevant authority. We prepare and submit the required documents and follow up on your behalf where possible.'],
  ['Are government fees included in your fee?', 'We show our service fee separately from official fees and third-party costs, so you know what each part of the price covers.'],
  ['Do you give legal or tax advice?', 'Our service is administrative and documentation-focused. Where legal, tax or accounting advice is needed, we recommend you consult a qualified professional, and we can help you find one.'],
  ['How long does registration take?', 'Timelines depend on the authority and the completeness of documents. We give an estimate when we quote and keep you updated.'],
];

const consultancy = {
  path: 'business-consultancy/',
  title: 'Business Consultancy',
  description:
    'Company registration, shelf-company enquiries and PRAZ, ZIMRA and NSSA-related documentation services in Zimbabwe, with clear deliverables and separate official fees.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Service delivery',
    title: 'Business Consultancy',
    lead: 'We prepare, organise and submit company registration, compliance and business documentation for SMEs, entrepreneurs and organisations.',
    crumbs: [['business-consultancy/', 'Business Consultancy']],
    actions: `${quoteBtn(L, 'business-consultancy', 'Book This Service')}<a class="btn btn-outline-light btn-lg" href="${L('contact/')}">Ask a Question</a>`,
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>Services we deliver</h2></div>
    ${serviceBlocks([
      ['file', 'Company registration', 'Name search, preparation of incorporation documents and lodging of the application for a private limited company.'],
      ['briefcase', 'Shelf-company enquiries', 'Information on available shelf companies and preparation of the transfer documentation.'],
      ['clipboard', 'PRAZ-related documentation', 'Preparing and organising documents for supplier registration with the Procurement Regulatory Authority of Zimbabwe.'],
      ['scale', 'ZIMRA-related documentation', 'Preparing documentation for tax registration and tax clearance applications.'],
      ['users', 'NSSA-related documentation', 'Preparing employer registration documentation for the National Social Security Authority.'],
      ['layers', 'Returns, amendments &amp; documents', 'Annual returns, changes of directors or address, and general business paperwork.'],
    ])}
  </div>
</section>
${deliverables(
  [
    'A written quotation showing our service fee separately from official fees',
    'A checklist of the documents and information required from you',
    'Completed application forms and supporting documents, prepared for signature',
    'Submission to the relevant authority and follow-up on progress',
    'Copies of the submitted documents and any certificates or outcomes issued',
  ],
  [
    'Tell us what you need to register, renew or amend, using the quote form or WhatsApp.',
    'We send a quotation with scope, deliverables, fees and estimated timelines.',
    'You confirm, then provide the documents on our checklist.',
    'We prepare, submit and follow up, keeping you updated until completion.',
  ],
)}
<section class="section">
  <div class="container narrow">
    ${scopeNote(
      'Scope of our service',
      checkList([
        'Decisions, registrations, certificates and clearances are issued by the relevant authority. We cannot guarantee their outcomes or timelines.',
        'We do not provide legal, tax or audit opinions. Where these are needed, consult a qualified professional.',
        'The exact scope of each engagement is confirmed in writing before work starts.',
      ]),
    )}
  </div>
</section>
<section class="section section-tint">
  <div class="container narrow">
    <div class="section-head"><h2>Questions about consultancy</h2></div>
    ${faqList(consultancyFaqs)}
  </div>
</section>
${faqJsonLd(consultancyFaqs)}
${ctaBand(L, { title: 'Need business paperwork done?', text: 'Tell us what you need to register, renew or amend and we will send you the scope, deliverables and fee.', primary: ['request-a-quote/?category=business-consultancy', 'Book This Service'] })}`,
};

const ict = {
  path: 'connectivity-ict/',
  title: 'Connectivity & ICT',
  description:
    'Connectivity, networking and ICT equipment supplied in Zimbabwe, with setup and configuration where agreed. Request a quote for your office, school, clinic or site.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Supply & service delivery',
    title: 'Connectivity & ICT',
    lead: 'Connectivity, networking and ICT equipment for offices, schools, clinics, remote sites and homes, supplied to specification, with setup where agreed.',
    crumbs: [['connectivity-ict/', 'Connectivity & ICT']],
    actions: `${quoteBtn(L, 'connectivity-ict')}<a class="btn btn-outline-light btn-lg" href="${L('contact/')}">Ask a Question</a>`,
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>What we supply and deliver</h2></div>
    ${serviceBlocks([
      ['wifi', 'Connectivity equipment', 'Routers, satellite and wireless kits and accessories, as specified for your site.'],
      ['network', 'Networking equipment', 'Switches, access points, cabling and accessories for offices and sites.'],
      ['office', 'ICT equipment &amp; accessories', 'Computers, printers, UPS units, storage and accessories, supplied to specification.'],
      ['tools', 'Setup &amp; configuration', 'Installation and configuration where agreed in your quotation, which names who carries out the work.'],
    ])}
  </div>
</section>
${deliverables(
  [
    'A quotation listing each item, its availability and lead time',
    'Equipment supplied to the agreed specification',
    'Installation and configuration, where included in the quotation',
    'Basic handover: what was installed, settings and next steps',
    'Manufacturer warranty details, where available',
  ],
  [
    'Tell us about your site, number of users and what you need connected.',
    'We recommend suitable equipment and send a quotation with scope and timelines.',
    'You confirm the quotation.',
    'We supply the equipment and complete the agreed setup.',
  ],
)}
<section class="section">
  <div class="container narrow">
    ${scopeNote(
      'Axisax services and third-party services',
      checkList([
        'Axisax is not an internet service provider. Internet and connectivity subscriptions are supplied by third-party providers under their own terms, prices and licences.',
        'We do not claim to be an authorised reseller, agent or licensed provider for any brand or network unless this is confirmed in writing on your quotation.',
        'Equipment prices and our service fees are shown separately where helpful.',
      ]),
    )}
  </div>
</section>
${ctaBand(L, { title: 'Planning a connectivity or ICT setup?', text: 'Tell us about your site, number of users and what you need connected.', primary: ['request-a-quote/?category=connectivity-ict', 'Request a Quote'] })}`,
};

const institutional = {
  path: 'institutional-contract-supply/',
  title: 'Institutional & Contract Supply',
  description:
    'Bulk, recurring and multi-category supply for government, NGOs, schools, clinics and companies in Zimbabwe. Send your RFQ, BOQ or contract requirement.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Institutional supply',
    title: 'Institutional & Contract Supply',
    lead: 'Bulk, recurring and multi-category supply for government departments, NGOs, schools, healthcare facilities and companies.',
    crumbs: [['institutional-contract-supply/', 'Institutional & Contract Supply']],
    actions: `${quoteBtn(L, 'institutional-contract', 'Discuss a Contract')}<a class="btn btn-outline-light btn-lg" href="${L('about/')}">Company Details</a>`,
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>What we supply</h2></div>
    ${serviceBlocks([
      ['clipboard', 'Bulk supply &amp; RFQs', 'Quotations for large quantities or many line items, in response to your RFQ or tender.'],
      ['layers', 'Recurring supply', 'Scheduled deliveries of consumables you use every month or term.'],
      ['boxes', 'Multi-category supply', 'One consolidated quotation and delivery across several product categories.'],
      ['file', 'Contract supply', 'Supply under agreed contract terms, prices and delivery schedules.'],
      ['search', 'Specialist sourcing', 'Hard-to-find items identified and supplied through suitable manufacturers and distributors.'],
      ['users', 'Single point of contact', 'One account contact for quotations, orders, delivery updates and documentation.'],
    ])}
  </div>
</section>
<section class="section section-tint">
  <div class="container split split-top">
    <div class="prose">
      <h2>What to include in your RFQ</h2>
      ${checkList([
        'Your organisation name, contact person and reference number',
        'Item descriptions, specifications, standards or models',
        'Quantities and units of measure, and delivery frequency for recurring supply',
        'Delivery location and required-by date',
        'Submission deadline and any required format',
        'Attachments: BOQ, specification sheet or RFQ document',
      ])}
    </div>
    <aside class="info-card">
      <h2>${icon('file')} Company information</h2>
      <p>Our registered details are available on the <a href="${L('about/')}">About page</a>. Tick “include company documents” on the quote form and we will send the documents relevant to your request.</p>
      <p class="small">We only provide documents that are current and applicable. We do not claim approved-supplier status with any organisation unless confirmed in writing.</p>
    </aside>
  </div>
</section>
${ctaBand(L, { title: 'Have an RFQ or contract requirement?', text: 'Upload your BOQ or specification and we will respond with a consolidated quotation.', primary: ['request-a-quote/?category=institutional-contract', 'Discuss a Contract'] })}`,
};

const projects = {
  path: 'special-projects/',
  title: 'Special Projects',
  description:
    'Project solutions from Axisax: the products, services and delivery coordination your agreed project requires, from one company in Zimbabwe.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Project solutions',
    title: 'Special Projects',
    lead: 'We support agreed projects with the required products, services and delivery coordination, within a clearly defined scope.',
    crumbs: [['special-projects/', 'Special Projects']],
    actions: quoteBtn(L, 'special-projects', 'Discuss a Project'),
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>How we support projects</h2></div>
    ${serviceBlocks([
      ['boxes', 'Project supply', 'All the products on your project list or BOQ, supplied and delivered to site.'],
      ['briefcase', 'Defined services', 'Services within our capability, such as documentation, ICT setup and coordination, with agreed deliverables.'],
      ['layers', 'Delivery coordination', 'Scheduling and coordinating deliveries and suppliers to your project timeline.'],
      ['search', 'Specialist requirements', 'Unusual or specialist items identified and supplied as the project requires.'],
    ])}
  </div>
</section>
${deliverables(
  [
    'A project quotation or proposal with scope, deliverables, prices and timelines',
    'Products supplied to the agreed specification',
    'Agreed services delivered, with clear responsibilities',
    'Delivery coordination and progress updates',
    'Delivery notes and project documentation',
  ],
  [
    'Share your project brief, BOQ or specification.',
    'We agree the scope, what Axisax delivers and what is handled by others.',
    'We send a proposal with prices and timelines for your approval.',
    'We supply and deliver as agreed, keeping you updated throughout.',
  ],
)}
<section class="section">
  <div class="container narrow">
    ${scopeNote(
      'Clear scope',
      `<p>Each project proposal states what Axisax supplies and delivers. Professional work that needs registered specialists, such as engineering, architecture or certified installations, is done by appropriately qualified third parties and named in the proposal.</p>`,
    )}
  </div>
</section>
${ctaBand(L, { title: 'Planning a project?', text: 'Share your brief or BOQ and we will propose the products, services and timelines.', primary: ['request-a-quote/?category=special-projects', 'Discuss a Project'] })}`,
};

const construction = {
  path: 'construction-property-services/',
  title: 'Construction & Property Services',
  description: 'Construction material supply and project coordination in Zimbabwe.',
  enabled: () => site.features.constructionProperty,
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Service line',
    title: 'Construction & Property Services',
    lead: 'Supply of construction materials and coordination support for building and property projects.',
    crumbs: [['construction-property-services/', 'Construction & Property Services']],
    actions: quoteBtn(L, 'construction-property', 'Discuss a Project'),
  },
  L,
)}
<section class="section">
  <div class="container">
    ${serviceBlocks([
      ['boxes', 'Materials supply', 'Building materials, fittings and finishes supplied to your BOQ.'],
      ['construction', 'Project coordination', 'Coordination of deliveries and suppliers for your project.'],
      ['users', 'Third-party professionals', 'Where architects, engineers, surveyors or contractors are needed, they are engaged as independent professionals.'],
    ])}
  </div>
</section>
<section class="section section-tint">
  <div class="container narrow">
    ${scopeNote(
      'Scope of our service',
      `<p>Axisax provides consultancy, supply and coordination. Professional design, certification and construction work is carried out by appropriately registered third parties under their own responsibility.</p>`,
    )}
  </div>
</section>
${ctaBand(L, { primary: ['request-a-quote/?category=construction-property', 'Discuss a Project'] })}`,
};

export default [supplies, consultancy, ict, institutional, projects, construction];
