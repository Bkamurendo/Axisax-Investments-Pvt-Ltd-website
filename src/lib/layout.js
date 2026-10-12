import { site } from '../data/site.js';
import { publishedCategories } from '../data/categories.js';
import { icon } from './icons.js';

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const basePath = new URL(site.url).pathname;

// Builds a link helper for a page at `pagePath` (e.g. 'about/').
// Links are relative so the site works on any host or sub-path. The 404 page
// is served from arbitrary URLs, so it uses root-absolute links instead.
export function linker(pagePath, absolute = false) {
  const depth = pagePath.split('/').filter(Boolean).length;
  const prefix = absolute ? basePath : depth ? '../'.repeat(depth) : './';
  return (target = '') => prefix + target;
}

export function whatsappLink(text = '') {
  if (!site.contact.whatsapp) return '';
  return `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

function serviceLinks() {
  const links = [
    ['products-supply/', 'Product Supply'],
    ['business-consultancy/', 'Business Consultancy'],
    ['connectivity-ict/', 'Connectivity & ICT'],
    ['institutional-contract-supply/', 'Institutional & Contract Supply'],
    ['special-projects/', 'Special Projects'],
  ];
  if (site.features.constructionProperty) links.push(['construction-property-services/', 'Construction & Property Services']);
  return links;
}

function nav(L, current) {
  const isCurrent = (p) => (current === p ? ' aria-current="page"' : '');
  const inSection = (prefixes) => prefixes.some((p) => current.startsWith(p));
  const cats = publishedCategories();
  const sub = (id, label, active, items, footer = '') => `
      <li class="nav-item has-sub">
        <button class="nav-link sub-toggle${active ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="${id}">
          ${label}<span class="chev" aria-hidden="true"></span>
        </button>
        <div class="subnav" id="${id}">
          <ul>${items.map(([href, text]) => `<li><a href="${L(href)}"${isCurrent(href)}>${esc(text)}</a></li>`).join('')}</ul>
          ${footer}
        </div>
      </li>`;
  return `
  <nav class="main-nav" id="main-nav" aria-label="Main">
    <ul class="nav-list">
      <li class="nav-item"><a class="nav-link" href="${L()}"${isCurrent('')}>Home</a></li>
      <li class="nav-item"><a class="nav-link" href="${L('about/')}"${isCurrent('about/')}>About</a></li>
      ${sub(
        'sub-products',
        'Products',
        inSection(['product-categories', 'products-supply']),
        [['products-supply/', 'Product Supply overview'], ['product-categories/', 'All product categories'], ...cats.map((c) => [`product-categories/${c.slug}/`, c.name])],
      )}
      ${sub('sub-services', 'Services', inSection(['business-consultancy', 'connectivity', 'institutional', 'special-projects', 'construction']), serviceLinks().slice(1))}
      <li class="nav-item"><a class="nav-link" href="${L('suppliers-partnerships/')}"${isCurrent('suppliers-partnerships/')}>Suppliers</a></li>
      <li class="nav-item"><a class="nav-link" href="${L('contact/')}"${isCurrent('contact/')}>Contact</a></li>
      <li class="nav-item nav-cta"><a class="btn btn-primary" href="${L('request-a-quote/')}">Request a Quote</a></li>
    </ul>
  </nav>`;
}

function header(L, current) {
  return `
<a class="skip-link" href="#main">Skip to main content</a>
<div class="topbar">
  <div class="container topbar-inner">
    <span class="topbar-tag">${esc(site.company.tagline)}</span>
    <span class="topbar-contact">
      <a href="tel:${site.contact.phoneIntl}">${icon('phone')}<span>${esc(site.contact.phoneDisplay)}</span></a>
      <a href="mailto:${site.contact.email}">${icon('mail')}<span>${esc(site.contact.email)}</span></a>
    </span>
  </div>
</div>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${L()}" aria-label="${esc(site.company.legalName)} – home">
      <span class="brand-mark" aria-hidden="true">AX</span>
      <span class="brand-text"><span class="brand-name">AXISAX</span><span class="brand-sub">Investments (Private) Limited</span></span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">
      <span class="when-closed">${icon('menu')}</span><span class="when-open">${icon('close')}</span><span class="menu-label">Menu</span>
    </button>
    ${nav(L, current)}
  </div>
</header>`;
}

function footer(L) {
  const c = site.company;
  const k = site.contact;
  const wa = whatsappLink();
  const cats = publishedCategories().slice(0, 6);
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-about">
      <p class="footer-brand">AXISAX</p>
      <p>${esc(c.legalName)}</p>
      <p class="muted-light">A Zimbabwean supplier and service provider.</p>
      <p class="muted-light">Company number: ${esc(c.number)}</p>
    </div>
    <div>
      <h2 class="footer-heading">Services</h2>
      <ul class="footer-links">${serviceLinks().map(([h, t]) => `<li><a href="${L(h)}">${esc(t)}</a></li>`).join('')}
        <li><a href="${L('suppliers-partnerships/')}">Suppliers &amp; Partnerships</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer-heading">Categories</h2>
      <ul class="footer-links">${cats.map((x) => `<li><a href="${L(`product-categories/${x.slug}/`)}">${esc(x.name)}</a></li>`).join('')}
        <li><a href="${L('product-categories/')}">All categories</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer-heading">Contact</h2>
      <ul class="footer-contact">
        <li>${icon('phone')}<a href="tel:${k.phoneIntl}">${esc(k.phoneDisplay)}</a></li>
        ${wa ? `<li>${icon('chat')}<a href="${wa}" rel="noopener">WhatsApp</a></li>` : ''}
        <li>${icon('mail')}<a href="mailto:${k.email}">${esc(k.email)}</a></li>
        <li>${icon('pin')}<span>${c.address.map(esc).join(', ')}</span></li>
        ${k.hours ? `<li>${icon('clock')}<span>${esc(k.hours)}</span></li>` : ''}
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(c.legalName)}. All rights reserved.</p>
    <ul class="footer-legal">
      <li><a href="${L('privacy-notice/')}">Privacy Notice</a></li>
      <li><a href="${L('terms-and-conditions/')}">Terms &amp; Conditions</a></li>
      <li><a href="${L('contact/')}">Contact Axisax</a></li>
    </ul>
  </div>
</footer>`;
}

function orgJsonLd() {
  const c = site.company;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: c.legalName,
    alternateName: 'Axisax',
    url: site.url,
    description: c.description,
    email: site.contact.email,
    telephone: site.contact.phoneIntl,
    slogan: c.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${c.address[0]}, ${c.address[1]}`,
      addressLocality: c.address[2],
      addressCountry: 'ZW',
    },
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function renderPage({ path, title, description, body, scripts = [], is404 = false, noindex = false }) {
  const L = linker(path, is404);
  const fullTitle = path === '' ? `${site.company.shortName} | ${title}` : `${title} | ${site.company.shortName} Investments`;
  const canonical = new URL(path, site.url).href;
  return `<!doctype html>
<html lang="en-ZW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${is404 || noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#102B4E">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.company.legalName)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
${is404 ? '' : `<meta property="og:url" content="${canonical}">`}
<link rel="icon" href="${L('assets/favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="${L('assets/css/styles.css')}">
${path === '' ? orgJsonLd() : ''}
</head>
<body>
${header(L, path)}
<main id="main" tabindex="-1">
${body(L)}
</main>
${footer(L)}
<script src="${L('assets/js/main.js')}" defer></script>
${scripts.map((s) => `<script src="${L(s)}" defer></script>`).join('\n')}
</body>
</html>
`;
}

// ---------- Shared content blocks ----------

export function pageHero({ eyebrow, title, lead, crumbs = [], actions = '' }, L) {
  const trail = crumbs.length
    ? `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>
        <li><a href="${L()}">Home</a></li>
        ${crumbs.map(([href, text], i) => (i === crumbs.length - 1 ? `<li><span aria-current="page">${esc(text)}</span></li>` : `<li><a href="${L(href)}">${esc(text)}</a></li>`)).join('')}
      </ol></nav>`
    : '';
  return `
<section class="page-hero">
  <div class="container">
    ${trail}
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h1>${esc(title)}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${actions ? `<div class="hero-actions">${actions}</div>` : ''}
  </div>
</section>`;
}

export function ctaBand(L, { title = 'Ready to order or engage Axisax?', text = 'Send us your product list, specification or service requirement. We will confirm availability, price and timelines in a written quotation.', primary = ['request-a-quote/', 'Request a Quote'], secondary = ['contact/', 'Contact Axisax'] } = {}) {
  return `
<section class="cta-band">
  <div class="container cta-inner">
    <div>
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-primary btn-lg" href="${L(primary[0])}">${esc(primary[1])}</a>
      ${secondary ? `<a class="btn btn-outline-light btn-lg" href="${L(secondary[0])}">${esc(secondary[1])}</a>` : ''}
    </div>
  </div>
</section>`;
}

export function checkList(items) {
  return `<ul class="check-list">${items.map((i) => `<li>${icon('check')}<span>${i}</span></li>`).join('')}</ul>`;
}

export function processSteps() {
  const steps = [
    ['search', 'Browse products or services', 'Explore our product categories and services, or tell us what you are looking for.'],
    ['clipboard', 'Select or describe your need', 'Send your product list, specification, BOQ or service requirement by form, email or WhatsApp.'],
    ['file', 'Receive a quotation or proposal', 'We confirm price, availability and lead time, or send a service proposal with scope and deliverables.'],
    ['checkCircle', 'Confirm your order', 'You approve the quotation or engagement terms before we proceed.'],
    ['boxes', 'We supply or deliver', 'Axisax supplies the goods or delivers the agreed service, as set out in your quotation.'],
  ];
  return `<ol class="steps">${steps
    .map(([ic, t, d], i) => `<li class="step"><span class="step-num" aria-hidden="true">${i + 1}</span>${icon(ic, 'icon step-icon')}<h3>${t}</h3><p>${d}</p></li>`)
    .join('')}</ol>
  <p class="steps-note">Need something we don't usually carry? When an item needs special sourcing, we find suitable supply options and manage it through to delivery.</p>`;
}

export function categoryCards(L, cats) {
  return `<ul class="card-grid card-grid-3">${cats
    .map(
      (c) => `<li class="card card-link">
        <span class="card-icon">${icon(c.icon)}</span>
        <h3><a href="${L(`product-categories/${c.slug}/`)}">${esc(c.name)}</a></h3>
        <p>${esc(c.short)}</p>
        <span class="card-more" aria-hidden="true">View category ${icon('arrow')}</span>
      </li>`,
    )
    .join('')}</ul>`;
}

export function faqList(faqs) {
  return `<div class="faq">${faqs
    .map(([q, a]) => `<details class="faq-item"><summary>${esc(q)}</summary><div class="faq-body"><p>${a}</p></div></details>`)
    .join('')}</div>`;
}

export function faqJsonLd(faqs) {
  const strip = (s) => s.replace(/<[^>]+>/g, '');
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })),
  })}</script>`;
}
