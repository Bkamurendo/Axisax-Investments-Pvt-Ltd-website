import { site } from '../data/site.js';
import { publishedCategories } from '../data/categories.js';
import { icon } from '../lib/icons.js';
import { esc, pageHero, ctaBand, checkList, categoryCards, processSteps, faqList, faqJsonLd } from '../lib/layout.js';

const quoteBtn = (L, cat, label = 'Request a Quote') => `<a class="btn btn-primary btn-lg" href="${L(`request-a-quote/?category=${cat}`)}">${label}</a>`;

function serviceBlocks(blocks) {
  return `<ul class="card-grid card-grid-3">${blocks
    .map(([ic, t, d]) => `<li class="card">${ic ? `<span class="card-icon">${icon(ic)}</span>` : ''}<h3>${t}</h3><p>${d}</p></li>`)
    .join('')}</ul>`;
}

function scopeNote(title, html) {
  return `<div class="notice notice-info"><h2 class="notice-title">${title}</h2>${html}</div>`;
}

const supplies = {
  path: 'general-supplies-procurement/',
  title: 'General Supplies & Procurement',
  description:
    'Sourcing, bulk supply, source-on-demand and multi-category quotations for businesses and institutions in Zimbabwe. Send your list and get a written quotation.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Service line',
    title: 'General Supplies & Procurement',
    lead: 'Send one list, get one quotation. We source general supplies across many categories for businesses, institutions and organisations.',
    crumbs: [['general-supplies-procurement/', 'General Supplies & Procurement']],
    actions: `${quoteBtn(L, 'general-supplies')}<a class="btn btn-outline-light btn-lg" href="${L('product-categories/')}">Browse Categories</a>`,
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>How we can help</h2></div>
    ${serviceBlocks([
      ['search', 'Sourcing', 'We find suitable products and suppliers for your specification, including items you are struggling to find.'],
      ['boxes', 'Bulk supply', 'Quotations for larger quantities, recurring orders and consolidated deliveries.'],
      ['clipboard', 'Source-on-demand', 'Items are sourced when you need them, so you are not paying for stock held on your behalf.'],
      ['building', 'Institutional procurement', 'RFQs, specifications and documentation for public and private institutions.'],
      ['layers', 'Multi-category quotes', 'Combine stationery, cleaning, PPE and other items in one request and one quotation.'],
      ['scale', 'Supplier comparison', 'Where possible, we compare suppliers on price, lead time and suitability.'],
    ])}
  </div>
</section>
<section class="section section-tint">
  <div class="container">
    <div class="section-head section-head-split">
      <div><h2>Product categories</h2><p>Examples of what we can source. Availability and pricing are confirmed per quotation.</p></div>
    </div>
    ${categoryCards(L, publishedCategories())}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><h2>How procurement works</h2></div>
    ${processSteps()}
  </div>
</section>
<section class="section section-tint">
  <div class="container narrow">
    ${scopeNote(
      'How we describe availability',
      `<p>Unless a quotation says otherwise, items are <strong>supplier-sourced</strong> or <strong>sourced on demand</strong>. We do not claim to hold stock, warehouses or vehicles for listed items. Prices are only given on written quotations, with currency, validity and conditions stated.</p>`,
    )}
  </div>
</section>
${ctaBand(L, { primary: ['request-a-quote/?category=general-supplies', 'Request a Quote'] })}`,
};

const consultancyFaqs = [
  ['Do you issue registrations or certificates?', 'No. Registrations, certificates and clearances are issued by the relevant authority. We help you prepare and submit the required documents and follow up where possible.'],
  ['Are government fees included in your fee?', 'We show our service fee separately from official fees and third-party costs, so you know what each part of the price covers.'],
  ['Do you give legal or tax advice?', 'Our support is administrative and documentation-focused. Where legal, tax or accounting advice is needed, we recommend you consult a qualified professional, and we can help you find one.'],
  ['How long does registration take?', 'Timelines depend on the authority and the completeness of documents. We give an estimate when we quote and keep you updated.'],
];

const consultancy = {
  path: 'business-consultancy/',
  title: 'Business Consultancy',
  description:
    'Help with company registration, shelf-company enquiries and PRAZ, ZIMRA and NSSA-related documentation in Zimbabwe. Clear scope and separate official fees.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Service line',
    title: 'Business Consultancy',
    lead: 'Practical help with company registration, compliance paperwork and business documentation for SMEs, entrepreneurs and organisations.',
    crumbs: [['business-consultancy/', 'Business Consultancy']],
    actions: `${quoteBtn(L, 'business-consultancy', 'Request Assistance')}<a class="btn btn-outline-light btn-lg" href="${L('contact/')}">Ask a Question</a>`,
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>What we help with</h2></div>
    ${serviceBlocks([
      ['file', 'Company registration', 'Guidance and documentation support for registering a private limited company, including name search and incorporation documents.'],
      ['briefcase', 'Shelf-company enquiries', 'Enquiries about available shelf companies and the documentation involved in a transfer.'],
      ['clipboard', 'PRAZ-related assistance', 'Help preparing and organising documents for supplier registration with the Procurement Regulatory Authority of Zimbabwe.'],
      ['scale', 'ZIMRA-related assistance', 'Help preparing documentation for tax registration and tax clearance applications.'],
      ['users', 'NSSA-related assistance', 'Help with employer registration documentation for the National Social Security Authority.'],
      ['layers', 'Returns, amendments &amp; documents', 'Support with annual returns, changes of directors or address, and general business paperwork.'],
    ])}
  </div>
</section>
<section class="section section-tint">
  <div class="container narrow">
    ${scopeNote(
      'Scope of our service',
      checkList([
        'We assist with preparing, organising and submitting documents. Decisions, registrations, certificates and clearances are issued by the relevant authority.',
        'Our service fee is quoted separately from official fees and third-party costs.',
        'We do not provide legal, tax or audit opinions. Where these are needed, consult a qualified professional.',
        'The exact scope of each engagement is confirmed in writing before work starts.',
      ]),
    )}
  </div>
</section>
<section class="section">
  <div class="container narrow">
    <div class="section-head"><h2>Questions about consultancy</h2></div>
    ${faqList(consultancyFaqs)}
  </div>
</section>
${faqJsonLd(consultancyFaqs)}
${ctaBand(L, { title: 'Need help with business paperwork?', text: 'Tell us what you need to register, renew or amend and we will explain the steps and our fee.', primary: ['request-a-quote/?category=business-consultancy', 'Request Assistance'] })}`,
};

const ict = {
  path: 'connectivity-ict/',
  title: 'Connectivity & ICT',
  description:
    'Procurement of connectivity, networking and ICT equipment in Zimbabwe, with network setup enquiries coordinated. Send your requirement for a quotation.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Service line',
    title: 'Connectivity & ICT',
    lead: 'Procurement of connectivity, networking and ICT equipment for offices, schools, clinics, remote sites and homes, with setup enquiries coordinated.',
    crumbs: [['connectivity-ict/', 'Connectivity & ICT']],
    actions: `${quoteBtn(L, 'connectivity-ict')}<a class="btn btn-outline-light btn-lg" href="${L('contact/')}">Ask a Question</a>`,
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>What we can help with</h2></div>
    ${serviceBlocks([
      ['wifi', 'Connectivity procurement', 'Sourcing internet and connectivity equipment such as routers, satellite and wireless kits, as specified for your site.'],
      ['network', 'Networking equipment', 'Switches, access points, cabling and accessories for offices and sites.'],
      ['office', 'ICT equipment &amp; accessories', 'Computers, printers, UPS units, storage and accessories, sourced to specification.'],
      ['tools', 'Setup enquiries', 'We discuss your setup needs and coordinate installation and configuration with suitable technicians.'],
    ])}
  </div>
</section>
<section class="section section-tint">
  <div class="container narrow">
    ${scopeNote(
      'Axisax services and third-party services',
      checkList([
        'Axisax is not an internet service provider. Internet and connectivity subscriptions are supplied by third-party providers under their own terms, prices and licences.',
        'We do not claim to be an authorised reseller, agent or licensed provider for any brand or network unless this is confirmed in writing on your quotation.',
        'Where installation is needed, we state on the quotation who carries out the work and what is included.',
        'Equipment prices and our service fees are shown separately where helpful.',
      ]),
    )}
  </div>
</section>
${ctaBand(L, { title: 'Planning a connectivity or ICT setup?', text: 'Tell us about your site, number of users and what you need connected.', primary: ['request-a-quote/?category=connectivity-ict', 'Request a Quote'] })}`,
};

const institutional = {
  path: 'institutional-project-procurement/',
  title: 'Institutional & Project Procurement',
  description:
    'Bulk RFQs, BOQs, project specifications and specialist sourcing for government, NGOs, schools, clinics and companies in Zimbabwe.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Service line',
    title: 'Institutional & Project Procurement',
    lead: 'Bulk RFQs, project specifications and specialist sourcing for government departments, NGOs, schools, healthcare facilities and companies.',
    crumbs: [['institutional-project-procurement/', 'Institutional & Project Procurement']],
    actions: `${quoteBtn(L, 'institutional-project', 'Discuss a Project')}<a class="btn btn-outline-light btn-lg" href="${L('about/')}">Company Details</a>`,
  },
  L,
)}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>What we handle</h2></div>
    ${serviceBlocks([
      ['clipboard', 'Bulk RFQs', 'Respond to requests for quotation covering large quantities or many line items.'],
      ['file', 'BOQs &amp; specifications', 'Send your bill of quantities or specification sheet and we quote line by line.'],
      ['layers', 'Multi-category projects', 'Consolidated quotations for projects that need items from several categories.'],
      ['search', 'Specialist sourcing', 'Hard-to-find or unusual items sourced through suitable manufacturers and distributors.'],
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
        'Quantities and units of measure',
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
${ctaBand(L, { title: 'Have an RFQ or project list?', text: 'Upload your BOQ or specification and we will respond with a consolidated quotation.', primary: ['request-a-quote/?category=institutional-project', 'Discuss a Project'] })}`,
};

const construction = {
  path: 'construction-property-services/',
  title: 'Construction & Property Services',
  description: 'Construction material sourcing and project coordination enquiries in Zimbabwe.',
  enabled: () => site.features.constructionProperty,
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Service line',
    title: 'Construction & Property Services',
    lead: 'Sourcing of construction materials and coordination support for building and property projects.',
    crumbs: [['construction-property-services/', 'Construction & Property Services']],
    actions: quoteBtn(L, 'construction-property', 'Discuss a Project'),
  },
  L,
)}
<section class="section">
  <div class="container">
    ${serviceBlocks([
      ['boxes', 'Materials sourcing', 'Building materials, fittings and finishes sourced to your BOQ.'],
      ['construction', 'Project coordination', 'Coordination of deliveries and suppliers for your project.'],
      ['users', 'Third-party professionals', 'Where architects, engineers, surveyors or contractors are needed, they are engaged as independent professionals.'],
    ])}
  </div>
</section>
<section class="section section-tint">
  <div class="container narrow">
    ${scopeNote(
      'Scope of our service',
      `<p>Axisax provides consultancy, sourcing and coordination. Professional design, certification and construction work is carried out by appropriately registered third parties under their own responsibility.</p>`,
    )}
  </div>
</section>
${ctaBand(L, { primary: ['request-a-quote/?category=construction-property', 'Discuss a Project'] })}`,
};

export default [supplies, consultancy, ict, institutional, construction];
