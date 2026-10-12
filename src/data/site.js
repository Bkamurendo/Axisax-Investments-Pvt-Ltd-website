// Central company and site configuration.
// Check every value against company records before publishing (Blueprint §10).

export const site = {
  // Public URL where the site is hosted. Used for canonical links, the sitemap
  // and the 404 page. Change this when a company domain is set up.
  url: 'https://bkamurendo.github.io/Axisax-Investments-Pvt-Ltd-website/',

  company: {
    legalName: 'AXISAX INVESTMENTS (PRIVATE) LIMITED',
    shortName: 'Axisax',
    number: '50006A0872025',
    incorporated: '9 July 2025',
    address: ['Stand Number 170', 'Binga Business Centre', 'Binga', 'Zimbabwe'],
    tagline: 'Procurement Made Simple.',
    supportingLine: 'One Company. Multiple Solutions.',
    description:
      'AXISAX INVESTMENTS (PRIVATE) LIMITED is a Zimbabwean general supplies, procurement and business-services company helping businesses, institutions and organisations source products and access practical support for their operational requirements.',
  },

  contact: {
    email: 'bkamurendo.work1@gmail.com',
    phoneDisplay: '0785 170 918',
    phoneIntl: '+263785170918',
    // Set to '' to hide WhatsApp links if the number is not WhatsApp-enabled.
    whatsapp: '263785170918',
    // Add confirmed business hours, e.g. 'Monday to Friday, 08:00–17:00'.
    // Left empty so the site does not publish unconfirmed hours.
    hours: '',
    serviceArea: 'Binga and customers across Zimbabwe, subject to delivery arrangements confirmed per quotation',
    responseTime: '', // e.g. 'within one business day' once confirmed
  },

  // Form delivery endpoints (e.g. Formspree, Web3Forms or your own backend).
  // While an endpoint is empty, the form validates input and then tells the
  // visitor plainly that nothing was sent, offering email/WhatsApp instead.
  // The site never claims an enquiry was submitted unless the endpoint
  // responds with success (Blueprint §8).
  forms: {
    quote: '',
    supplier: '',
    contact: '',
  },

  // Optional service lines. Blueprint §5 and §16: publish only once confirmed.
  features: {
    constructionProperty: false,
  },
};
