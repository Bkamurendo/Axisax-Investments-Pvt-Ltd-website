# AXISAX INVESTMENTS (PRIVATE) LIMITED — Website

Corporate website for Axisax, a Zimbabwean general supplies, procurement and business-services company. **Procurement Made Simple.**

Built from the *Website Concept, Business Positioning & Development Blueprint*. It is a fast, mobile-first static site with no runtime dependencies, so it can be hosted almost anywhere.

## Quick start

Requires Node.js 18 or later. There is nothing to install.

```bash
npm run serve   # build and preview at http://localhost:8080/Axisax-Investments-Pvt-Ltd-website/
npm run build   # build the site into dist/
npm run check   # build, then check for broken links, duplicate ids and unlabelled form fields
```

Upload the contents of `dist/` to any web host, or let the included GitHub Actions workflow publish it to GitHub Pages (see Deployment).

## What's included

| Page | Path |
| --- | --- |
| Home | `/` |
| About Axisax | `/about/` |
| General Supplies & Procurement | `/general-supplies-procurement/` |
| Product Categories (index + 13 category pages) | `/product-categories/…` |
| Business Consultancy | `/business-consultancy/` |
| Connectivity & ICT | `/connectivity-ict/` |
| Institutional & Project Procurement | `/institutional-project-procurement/` |
| Construction & Property Services (**off by default**) | `/construction-property-services/` |
| Suppliers & Partnerships (supplier form) | `/suppliers-partnerships/` |
| Request a Quote (RFQ form) | `/request-a-quote/` |
| Contact (contact form) | `/contact/` |
| Privacy Notice, Terms & Conditions | `/privacy-notice/`, `/terms-and-conditions/` |
| 404 page, `sitemap.xml`, `robots.txt` | |

Features: responsive layout and mobile menu, keyboard and screen-reader support, skip link, accessible form errors, SEO titles and descriptions, canonical URLs, Organization and FAQ structured data, and a print stylesheet. Category links pre-select the category on the quote form (e.g. `/request-a-quote/?category=cleaning-hygiene`), and the RFQ form supports up to 20 line items plus attachments.

## Where to edit things

| To change… | Edit |
| --- | --- |
| Company details, phone, email, WhatsApp, hours, site URL, form endpoints, optional service lines | `src/data/site.js` |
| Product categories (names, items, hide/show, featured on home) | `src/data/categories.js` |
| Page wording | `src/pages/*.js` |
| Header, footer, shared blocks | `src/lib/layout.js` |
| Colours, fonts, spacing | `src/assets/css/styles.css` (brand colours are at the top) |

Run `npm run check` after editing.

## Connecting the forms (required before launch)

The forms will not send anything until an endpoint is configured. Until then, after a visitor fills in a form the site tells them plainly that **nothing has been sent**, and offers pre-filled email and WhatsApp messages instead. The site never says an enquiry was submitted unless the endpoint confirms it, as the blueprint requires (§8).

To enable online sending:

1. Create a form endpoint with a provider that accepts `multipart/form-data` with file uploads and returns a 2xx response, for example [Formspree](https://formspree.io) (file uploads need a paid plan) or your own backend.
2. Put the endpoint URLs in `src/data/site.js` → `forms.quote`, `forms.supplier`, `forms.contact`.
3. Send it to a **monitored** inbox and, ideally, a lead tracker or CRM.
4. Test each form, including attachments and the error state, before launch.

Spam protection: each form has a hidden honeypot field named `_gotcha`, which Formspree recognises. Add the provider's CAPTCHA if spam gets through.

## Deployment

**GitHub Pages:** `.github/workflows/deploy.yml` builds, checks and publishes the site on every push to `main`. Enable it under *Settings → Pages → Build and deployment → Source: GitHub Actions*.

**Custom domain:** once Axisax owns a domain, set `url` in `src/data/site.js` (e.g. `https://www.example.co.zw/`) so canonical links, the sitemap and the 404 page use it. Then configure the domain with your host.

**Other hosts:** upload `dist/` and configure the host to serve `404.html` for missing pages.

## Decisions to confirm before launch (Blueprint §15–16)

The site is written to avoid unverified claims, but these items still need the company's confirmation:

- [ ] **Registration details:** check the company number, incorporation date (9 July 2025) and registered address against company records.
- [ ] **Launch divisions and categories:** set `published: false` in `src/data/categories.js` for any category Axisax is not ready to support.
- [ ] **Construction & Property Services:** off by default. Set `features.constructionProperty: true` only if the service is genuinely offered.
- [ ] **Connectivity & ICT:** the page makes no reseller or authorised-provider claims (for example for Starlink). Add one only with written authorisation.
- [ ] **Business consultancy scope:** confirm which PRAZ, ZIMRA and NSSA tasks Axisax performs directly.
- [ ] **WhatsApp:** confirm 0785 170 918 uses WhatsApp, or set `contact.whatsapp` to `''`.
- [ ] **Business hours and response time:** add to `contact.hours` and `contact.responseTime`. They stay hidden until set.
- [ ] **Logo:** the header uses a text wordmark. Replace it with the approved logo (`brand` markup in `src/lib/layout.js`). Don't invent subsidiary logos.
- [ ] **Photography:** none is used. Add only genuine, licensed images that don't suggest stock, warehouses or facilities Axisax doesn't have.
- [ ] **Privacy Notice and Terms:** review the drafts against the company's actual quotation, payment, delivery, returns and warranty rules, and get advice where needed.
- [ ] **Company email domain:** move from Gmail to a company-domain address with SPF, DKIM and DMARC when practical.
- [ ] **Analytics:** add a privacy-friendly analytics tool if wanted, and update the Privacy Notice to match.

## Future growth

The data is kept separate from the templates so the site can grow into a procurement portal. Categories are ready to take a `products` list for future product pages (description, specifications, unit of measure, pack basis, and a price only when current and approved). Later releases can add a CRM, catalogue, quotations and order tracking (Blueprint §13) without a redesign.
