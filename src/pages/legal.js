import { site } from '../data/site.js';
import { esc, pageHero } from '../lib/layout.js';

// Review both documents with the company (and an adviser where appropriate)
// before launch, and update LAST_UPDATED whenever the wording changes.
const LAST_UPDATED = '12 October 2026';

const c = site.company;
const k = site.contact;
const contactLine = `<a href="mailto:${k.email}">${esc(k.email)}</a> or ${esc(k.phoneDisplay)}`;

const privacy = {
  path: 'privacy-notice/',
  title: 'Privacy Notice',
  description: 'How AXISAX INVESTMENTS (PRIVATE) LIMITED collects, uses, shares, keeps and protects personal information submitted through this website.',
  body: (L) => `
${pageHero({ title: 'Privacy Notice', lead: `Last updated: ${LAST_UPDATED}`, crumbs: [['privacy-notice/', 'Privacy Notice']] }, L)}
<section class="section">
  <div class="container narrow prose">
    <h2>Who we are</h2>
    <p>This website is operated by ${esc(c.legalName)} (company number ${esc(c.number)}), ${c.address.map(esc).join(', ')} (“Axisax”, “we”, “us”). We are responsible for the personal information you give us through this website.</p>

    <h2>Information we collect</h2>
    <ul>
      <li><strong>Enquiry and quotation details:</strong> your name, organisation, email, phone or WhatsApp number, delivery town and address, and details of the products or services you need.</li>
      <li><strong>Supplier details:</strong> company and contact details, product and commercial information, and documents you choose to upload.</li>
      <li><strong>Attachments:</strong> files you upload, such as BOQs, specifications, photos, catalogues or certificates.</li>
      <li><strong>Technical information:</strong> our hosting and form providers may record basic technical data such as IP address, browser type and the time of a request, for security and to prevent spam.</li>
    </ul>
    <p>Please do not include sensitive personal information (such as health information, identity numbers or banking details) in website forms unless we specifically ask for it.</p>

    <h2>How we use your information</h2>
    <ul>
      <li>to respond to enquiries and prepare quotations;</li>
      <li>to source products and services from suppliers on your behalf;</li>
      <li>to process, deliver and follow up on orders you confirm;</li>
      <li>to assess and contact suppliers and partners;</li>
      <li>to keep business records and meet legal obligations;</li>
      <li>to protect the website against spam and misuse.</li>
    </ul>
    <p>We do not sell your personal information. We will only send you marketing messages if you ask us to, and you can opt out at any time.</p>

    <h2>Sharing</h2>
    <p>We share information only where needed for the purposes above, for example:</p>
    <ul>
      <li>with suppliers, when we need to share specifications, quantities or delivery locations to obtain a quotation (we share contact details only where necessary for delivery);</li>
      <li>with service providers who host this website, deliver form submissions or provide email services;</li>
      <li>with authorities, where you have asked us to help with a registration or compliance submission, or where the law requires it.</li>
    </ul>
    <p>Some service providers may store information outside Zimbabwe. Where this happens, we use reputable providers and take reasonable steps to protect your information.</p>

    <h2>How long we keep information</h2>
    <p>We keep enquiry information for as long as needed to respond and follow up, and quotation, order and accounting records for as long as required for business and legal purposes. Supplier information is kept while it remains relevant, and you can ask us to remove it at any time.</p>

    <h2>Security</h2>
    <p>This website uses HTTPS. We limit access to enquiry information to people who need it, use strong passwords on our accounts and choose providers with appropriate security measures. No system is completely secure, so please avoid sending information you do not need to share.</p>

    <h2>Your choices and rights</h2>
    <p>You can ask us to tell you what personal information we hold about you, to correct it, or to delete it where we are not required to keep it. You can also object to how we use it. These requests are handled in line with applicable Zimbabwean law, including the Cyber and Data Protection Act [Chapter 12:07].</p>

    <h2>Privacy requests and questions</h2>
    <p>Contact us at ${contactLine}, or use the <a href="${L('contact/')}">contact form</a> and choose “Privacy request”.</p>

    <h2>Changes to this notice</h2>
    <p>We may update this notice from time to time. The date at the top shows when it was last changed.</p>
  </div>
</section>`,
};

const terms = {
  path: 'terms-and-conditions/',
  title: 'Terms & Conditions',
  description: 'Terms covering quotations, availability, pricing, payment, delivery, cancellation, returns, warranties and service limitations for Axisax.',
  body: (L) => `
${pageHero({ title: 'Terms & Conditions', lead: `Last updated: ${LAST_UPDATED}`, crumbs: [['terms-and-conditions/', 'Terms & Conditions']] }, L)}
<section class="section">
  <div class="container narrow prose">
    <p>These terms apply to your use of this website and to quotations, orders and services provided by ${esc(c.legalName)} (company number ${esc(c.number)}) (“Axisax”). Where a written quotation, order confirmation or service agreement states different terms, those written terms apply to that transaction.</p>

    <h2>1. Website information</h2>
    <p>Product categories and item lists on this website describe what we can source. They are not a stock list or an offer to sell. Product images, where shown, are for illustration only.</p>

    <h2>2. Quotations</h2>
    <ul>
      <li>Prices are only valid when given in a written quotation from Axisax.</li>
      <li>Each quotation states its currency, validity period, what is included and any conditions.</li>
      <li>After the validity period, prices and availability must be reconfirmed.</li>
      <li>Where helpful, quotations show Axisax service fees separately from third-party product, service or official fees.</li>
    </ul>

    <h2>3. Availability</h2>
    <p>Most items are sourced from suppliers on request. Availability, brands and lead times are confirmed on the quotation and again when an order is placed. If a supplier cannot fulfil an item, we will tell you promptly and offer an alternative or adjust the order.</p>

    <h2>4. Orders and payment</h2>
    <ul>
      <li>An order is accepted only when you confirm a quotation and we confirm the order in writing.</li>
      <li>Payment terms, accepted payment methods and any deposit are stated on the quotation.</li>
      <li>We do not accept payments through this website. Only use payment details provided on an official Axisax quotation or invoice, and contact us on ${contactLine} if you are unsure.</li>
    </ul>

    <h2>5. Delivery and collection</h2>
    <p>Delivery, collection or coordination arrangements, costs and estimated timelines are stated on the quotation. Estimated timelines depend on suppliers and transport and are not guaranteed unless agreed in writing. Please check goods on delivery or collection and report any shortage or damage as soon as possible.</p>

    <h2>6. Cancellation</h2>
    <p>Because many items are sourced or ordered specifically for you, cancellation after order confirmation may not be possible or may incur costs already committed to suppliers. Any cancellation terms are stated on the quotation.</p>

    <h2>7. Returns</h2>
    <p>If goods are faulty, damaged in transit or do not match the confirmed order, contact us promptly with photos and your order details and we will work with you and the supplier on a replacement, credit or other remedy. Items ordered to your specification, consumables that have been opened and hygiene or medical products may not be returnable unless faulty. Return conditions are stated on the quotation where they differ.</p>

    <h2>8. Warranties</h2>
    <p>Manufacturer or supplier warranties pass to you where they are available. We will help you make warranty claims. Any warranty given by Axisax itself will be stated in writing on the quotation or invoice.</p>

    <h2>9. Services and limitations</h2>
    <ul>
      <li><strong>Business consultancy:</strong> we help prepare and submit documents. Registrations, certificates and approvals are issued by the relevant authorities, and we cannot guarantee their decisions or timelines. We do not give legal, tax or audit opinions.</li>
      <li><strong>Connectivity &amp; ICT:</strong> connectivity subscriptions are provided by third-party providers under their own terms. Installation by third parties is the responsibility of the party named on the quotation.</li>
      <li><strong>Specialised products:</strong> for medical, safety and regulated products, documentation and regulatory status are confirmed for the specific product and transaction. You remain responsible for ensuring products are suitable for your intended use.</li>
    </ul>

    <h2>10. Liability</h2>
    <p>Nothing in these terms limits rights you have under applicable law. Subject to that, Axisax is not responsible for losses that were not reasonably foreseeable or that arise from information supplied incorrectly by the customer.</p>

    <h2>11. Governing law</h2>
    <p>These terms are governed by the laws of Zimbabwe.</p>

    <h2>12. Contact</h2>
    <p>Questions about these terms: ${contactLine}, or <a href="${L('contact/')}">use our contact form</a>.</p>
  </div>
</section>`,
};

const notFound = {
  path: '404.html',
  is404: true,
  title: 'Page not found',
  description: 'The page you were looking for could not be found.',
  body: (L) => `
<section class="page-hero page-hero-404">
  <div class="container narrow center">
    <p class="eyebrow eyebrow-light">Error 404</p>
    <h1>We could not find that page</h1>
    <p class="lead">The page may have moved, or the link may be incorrect. Try one of these instead:</p>
    <div class="hero-actions hero-actions-center">
      <a class="btn btn-primary btn-lg" href="${L()}">Go to the homepage</a>
      <a class="btn btn-outline-light btn-lg" href="${L('request-a-quote/')}">Request a Quote</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="container narrow">
    <ul class="link-list">
      <li><a href="${L('general-supplies-procurement/')}">General Supplies &amp; Procurement</a></li>
      <li><a href="${L('product-categories/')}">Product Categories</a></li>
      <li><a href="${L('business-consultancy/')}">Business Consultancy</a></li>
      <li><a href="${L('contact/')}">Contact Axisax</a></li>
    </ul>
  </div>
</section>`,
};

export default [privacy, terms, notFound];
