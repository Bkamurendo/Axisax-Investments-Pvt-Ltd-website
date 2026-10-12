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

## Forms (FormSubmit — one activation step needed)

All three forms send to **bkamurendo.work1@gmail.com** through [FormSubmit](https://formsubmit.co), a free service that needs no account. **Before submissions arrive, the inbox owner must activate them once:**

1. After the site is live, submit a test enquiry through each form on the live site.
2. FormSubmit emails an **"Activate Form"** link to bkamurendo.work1@gmail.com (check spam too). Click it.
3. Submit another test, including one with an attachment, and confirm the email arrives.

Until activation, visitors are told their enquiry **could not be sent** and are offered pre-filled email and WhatsApp messages instead. The site only confirms that an enquiry was sent once FormSubmit reports success (Blueprint §8).

How it works:
- Text-only submissions are sent in the background, and the visitor sees the result on the same page.
- Submissions with attachments (5 MB in total at most) are posted directly to FormSubmit, which may show a quick spam check and then redirects to `/thank-you/` only after accepting the submission.
- Spam protection comes from FormSubmit's `_honey` honeypot field, plus FormSubmit's CAPTCHA on direct posts.
- Emails arrive as a table, with the visitor's address set as reply-to.

**Changing the address or provider:** edit `forms` in `src/data/site.js`. After activation, FormSubmit also offers a random alias you can use in place of the email address in the URL. To switch to another provider (e.g. Formspree, which adds a dashboard), paste its endpoint URLs there instead. Leaving an endpoint empty turns that form's online sending off.

## Deployment (no GitHub Actions needed)

A domain is only the address. The site also needs a host. Pick one of these:

**Option A: Cloudflare Pages (recommended, free).** It builds on Cloudflare's servers, so it doesn't use GitHub Actions.
1. Create a free Cloudflare account and go to *Workers & Pages → Create → Pages → Connect to Git*. Choose this repository.
2. Set the build command to `npm run build` and the output directory to `dist`. Add the environment variable `SITE_URL` = `https://www.yourdomain.co.zw/`.
3. Under *Custom domains*, add your domain and follow the DNS instructions.
Every change merged to the production branch republishes the site automatically.

**Option B: Netlify (free).** *Add new site → Import from GitHub*, choose this repository, and the settings are read from `netlify.toml`. Set `SITE_URL` under *Environment variables*, then add your domain under *Domain management*.

**Option C: Ordinary web hosting (cPanel / Apache)**, e.g. hosting bought together with a `.co.zw` domain:
1. Set `url` in `src/data/site.js` to your domain, or run `SITE_URL=https://www.yourdomain.co.zw/ npm run package`.
2. Run `npm run package`, which creates `axisax-website.zip`.
3. In cPanel *File Manager*, upload the zip to `public_html`, then *Extract* it. The included `.htaccess` sets the 404 page and forces HTTPS, so turn on the free SSL certificate (AutoSSL / Let's Encrypt) in cPanel.
Repeat steps 2–3 after each change.

**GitHub Pages:** `.github/workflows/deploy.yml` is set to manual-only while Actions is unavailable on this account. Re-enable the `push` trigger to publish automatically again.

After moving to a new address, activate FormSubmit again from the live site (see Forms).

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
- [ ] **Forms:** activate FormSubmit and test all three forms on the live site (see Forms).
- [ ] **Analytics:** add a privacy-friendly analytics tool if wanted, and update the Privacy Notice to match.

## Future growth

The data is kept separate from the templates so the site can grow into a procurement portal. Categories are ready to take a `products` list for future product pages (description, specifications, unit of measure, pack basis, and a price only when current and approved). Later releases can add a CRM, catalogue, quotations and order tracking (Blueprint §13) without a redesign.
