import { publishedCategories } from '../data/categories.js';
import { icon } from '../lib/icons.js';
import { esc, pageHero, ctaBand, checkList, categoryCards } from '../lib/layout.js';

const index = {
  path: 'product-categories/',
  title: 'Product Categories',
  description:
    'Products Axisax supplies in Zimbabwe: medical, office and POS, cleaning, PPE, education, packaging, electrical, hardware, agriculture, catering and more.',
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Products & supplies',
    title: 'Product Categories',
    lead: 'Browse the products we supply. Availability, lead time and price for each item are confirmed on your quotation.',
    crumbs: [['products-supply/', 'Product Supply'], ['product-categories/', 'Product Categories']],
  },
  L,
)}
<section class="section">
  <div class="container">
    ${categoryCards(L, publishedCategories())}
    <div class="card card-wide">
      <span class="card-icon">${icon('layers')}</span>
      <div>
        <h2 class="h3"><a href="${L('institutional-contract-supply/')}">Institutional, Contract &amp; Project Supply</a></h2>
        <p>Bulk, recurring and multi-category supply for institutions, contracts and <a href="${L('special-projects/')}">special projects</a>.</p>
      </div>
    </div>
    <p class="muted center">Can't find your category? <a href="${L('request-a-quote/?category=other')}">Send us your requirement</a> and we will tell you whether we can supply it.</p>
  </div>
</section>
${ctaBand(L)}`,
};

const detail = (c) => ({
  path: `product-categories/${c.slug}/`,
  title: c.seoTitle,
  description: `${c.name}: ${c.short} Supplied to your specification by Axisax in Zimbabwe. Request a quotation with sizes, quantities and delivery location.`,
  body: (L) => `
${pageHero(
  {
    eyebrow: 'Product category',
    title: c.name,
    lead: esc(c.intro),
    crumbs: [['product-categories/', 'Product Categories'], [`product-categories/${c.slug}/`, c.name]],
    actions: `<a class="btn btn-primary btn-lg" href="${L(`request-a-quote/?category=${c.slug}`)}">Request a Quote</a>`,
  },
  L,
)}
<section class="section">
  <div class="container split split-top">
    <div class="prose">
      <h2>Products we supply</h2>
      ${checkList(c.items.map(esc))}
      <p class="small muted">Examples of products in this category; other items are available on request. Some items may be available from stock, others are ordered for you after you confirm. Brands, availability, lead times and prices are confirmed on each quotation.</p>
    </div>
    <aside class="info-card">
      <h2>${icon('clipboard')} Information to include</h2>
      <p>To quote accurately, please tell us:</p>
      ${checkList(c.specify.map(esc))}
      <p class="small">Plus your delivery town and required-by date. You can attach a list, specification or photo.</p>
      <a class="btn btn-primary btn-block" href="${L(`request-a-quote/?category=${c.slug}`)}">Submit Your Requirements</a>
    </aside>
  </div>
</section>
${
  c.note
    ? `<section class="section section-tint section-tight"><div class="container narrow"><div class="notice notice-info"><p>${esc(c.note)}</p></div></div></section>`
    : ''
}
<section class="section">
  <div class="container">
    <div class="section-head"><h2>Other categories</h2></div>
    ${categoryCards(
      L,
      publishedCategories()
        .filter((x) => x.slug !== c.slug)
        .slice(0, 3),
    )}
    <p class="center"><a class="btn btn-secondary" href="${L('product-categories/')}">View all categories</a></p>
  </div>
</section>
${ctaBand(L, { title: `Need ${c.name.toLowerCase()}?`, primary: [`request-a-quote/?category=${c.slug}`, 'Request a Quote'] })}`,
});

export default [index, ...publishedCategories().map(detail)];
