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

  // Form delivery endpoints. By default forms go through FormSubmit
  // (https://formsubmit.co), which emails each submission to the address below
  // and needs no account: the first submission sends an "Activate Form" email
  // to that inbox, and nothing is delivered until the link in it is clicked.
  // Any other endpoint that accepts multipart POSTs (e.g. Formspree) also works.
  // An empty endpoint makes the form tell visitors plainly that nothing was
  // sent and offer email/WhatsApp instead. The site never claims an enquiry
  // was submitted unless the endpoint confirms success (Blueprint §8).
  forms: {
    quote: 'https://formsubmit.co/ajax/bkamurendo.work1@gmail.com',
    supplier: 'https://formsubmit.co/ajax/bkamurendo.work1@gmail.com',
    contact: 'https://formsubmit.co/ajax/bkamurendo.work1@gmail.com',
  },

  // Optional service lines. Blueprint §5 and §16: publish only once confirmed.
  features: {
    constructionProperty: false,
  },
};
