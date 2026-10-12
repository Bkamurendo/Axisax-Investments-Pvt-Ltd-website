// Product categories supplied by Axisax (Blueprint §7 and revised positioning).
//
// - Set `published: false` for any category Axisax is not yet ready to support.
// - `items` lists example products in the category. Keep fulfilment status honest:
//   some items may be stocked, others are ordered after the customer confirms.
// - `products` is reserved for future product pages (Blueprint §9). Each product
//   should carry a description, specifications, unit of measure, pack basis and,
//   only if current and approved, a currency-labelled price.

export const categories = [
  {
    slug: 'medical-healthcare-supplies',
    name: 'Medical & Healthcare Supplies',
    short: 'Medical consumables supplied to your specification.',
    icon: 'medical',
    featured: true,
    published: true,
    seoTitle: 'Medical Consumables Supplier Enquiries in Zimbabwe',
    intro:
      'We supply medical and healthcare consumables to clinics, pharmacies, institutions and organisations. Orders are specification-led: tell us the item, size, brand preference, quantity and delivery point, and we will confirm availability and price.',
    items: [
      'Examination and surgical gloves',
      'Syringes, needles and cannulas',
      'Dressings, gauze, bandages and plasters',
      'Face masks and protective gowns',
      'Cotton wool and swabs',
      'Disinfectants and antiseptics',
      'Specimen containers and sharps containers',
      'Thermometers and basic diagnostic consumables',
    ],
    specify: [
      'Exact product name, size and gauge where relevant',
      'Brand or standard required, if any',
      'Sterile or non-sterile',
      'Quantity and unit (each, box, carton)',
      'Any documentation your procurement process requires',
    ],
    note:
      'Product documentation, registration and regulatory status are confirmed for the specific product and transaction at quotation stage. We do not make general regulatory claims about products.',
  },
  {
    slug: 'business-office-retail-consumables',
    name: 'Business, Office & Retail Consumables',
    short: 'POS and thermal rolls, paper, labels, stationery and packaging.',
    icon: 'office',
    featured: true,
    published: true,
    seoTitle: 'Thermal Till Rolls, Office Paper & Stationery in Zimbabwe',
    intro:
      'Retailers, offices and businesses rely on a steady supply of everyday consumables. We supply POS and thermal rolls, paper, labels, printer consumables, stationery and related items for once-off and recurring orders.',
    items: [
      'Thermal and POS till rolls (various widths and lengths)',
      'Card machine rolls',
      'A4 and A3 copy paper',
      'Labels and label rolls',
      'Printer toner and ink cartridges',
      'Receipt books, invoice books and business forms',
      'Files, folders, pens and general stationery',
      'Envelopes and shop packaging',
    ],
    specify: [
      'Roll width × diameter or length (e.g. 80 × 80 mm)',
      'Paper size and weight (e.g. A4, 80 gsm)',
      'Printer or device model for toner and ink',
      'Quantity and how often you reorder',
    ],
  },
  {
    slug: 'cleaning-hygiene',
    name: 'Cleaning & Hygiene',
    short: 'Chemicals, tissue, hand hygiene and cleaning tools.',
    icon: 'cleaning',
    featured: true,
    published: true,
    seoTitle: 'Cleaning & Hygiene Supplies in Zimbabwe',
    intro:
      'We supply cleaning chemicals, tissue products, hand-hygiene supplies and cleaning equipment for offices, schools, clinics, hospitality venues and institutions.',
    items: [
      'Detergents, degreasers and floor cleaners',
      'Bleach and disinfectants',
      'Hand soap, hand sanitiser and dispensers',
      'Toilet tissue, paper towels and serviettes',
      'Mops, brooms, buckets and cloths',
      'Refuse bags and bins',
      'Air fresheners and washroom consumables',
    ],
    specify: [
      'Product type and pack size (e.g. 5 L, 25 L)',
      'Concentration or brand, if required',
      'Quantity and delivery frequency',
    ],
  },
  {
    slug: 'ppe-safety-workwear',
    name: 'PPE, Safety & Workwear',
    short: 'Protective clothing, boots, gloves, helmets and eyewear.',
    icon: 'shield',
    featured: true,
    published: true,
    seoTitle: 'PPE, Safety Boots & Workwear Supplies in Zimbabwe',
    intro:
      'We supply personal protective equipment and workwear for construction, mining, agriculture, manufacturing, security and service teams.',
    items: [
      'Work suits, overalls and reflective vests',
      'Safety boots and gumboots',
      'Work, chemical and cut-resistant gloves',
      'Hard hats and helmets',
      'Safety glasses, goggles and face shields',
      'Ear protection and dust masks',
      'Rainwear and branded uniforms',
    ],
    specify: [
      'Item, colour and sizes required (size breakdown helps)',
      'Safety standard or rating, if required',
      'Branding or embroidery requirements',
      'Quantity per size and required date',
    ],
  },
  {
    slug: 'school-education-supplies',
    name: 'School & Education Supplies',
    short: 'Stationery, exercise books and classroom supplies.',
    icon: 'education',
    featured: true,
    published: true,
    seoTitle: 'School & Education Supplies in Zimbabwe',
    intro:
      'Schools, colleges and education programmes can send us their requirement lists for exercise books, stationery, classroom materials and related supplies.',
    items: [
      'Exercise books and counter books',
      'Pens, pencils, rulers and maths sets',
      'Chalk, markers and whiteboard supplies',
      'Classroom and office paper',
      'Art and craft materials',
      'School cleaning and hygiene supplies',
    ],
    specify: [
      'Requirement list or BOQ (attach if available)',
      'Quantities per item',
      'Delivery location and term start date',
    ],
  },
  {
    slug: 'packaging-commercial-supplies',
    name: 'Packaging & Commercial Supplies',
    short: 'Boxes, bags, wraps and commercial packaging.',
    icon: 'packaging',
    featured: true,
    published: true,
    seoTitle: 'Packaging & Commercial Supplies in Zimbabwe',
    intro:
      'We supply packaging for retail, food service, logistics and small manufacturing businesses.',
    items: [
      'Cartons and corrugated boxes',
      'Plastic and paper carrier bags',
      'Stretch wrap, cling film and packaging tape',
      'Takeaway containers and food packaging',
      'Bubble wrap and protective packaging',
      'Sacks and bulk bags',
    ],
    specify: [
      'Dimensions, material and thickness or ply',
      'Printed or plain',
      'Quantity and carton/pack basis',
    ],
  },
  {
    slug: 'electrical-lighting',
    name: 'Electrical & Lighting',
    short: 'Cables, fittings, lighting and electrical consumables.',
    icon: 'electrical',
    featured: false,
    published: true,
    seoTitle: 'Electrical & Lighting Supplies in Zimbabwe',
    intro:
      'We supply electrical consumables and lighting for maintenance, fit-out and project requirements. Installation work, where needed, is carried out by appropriately qualified third parties.',
    items: [
      'Cables and wiring accessories',
      'Switches, sockets and plugs',
      'LED bulbs, tubes and floodlights',
      'Extension leads and surge protection',
      'Distribution boards and breakers',
      'Solar lighting accessories',
    ],
    specify: [
      'Rating, size and standard (e.g. cable cross-section, wattage)',
      'Brand preference, if any',
      'Quantity and installation needs',
    ],
  },
  {
    slug: 'hardware-tools-maintenance',
    name: 'Hardware, Tools & Maintenance',
    short: 'Tools, fasteners, plumbing and maintenance items.',
    icon: 'tools',
    featured: false,
    published: true,
    seoTitle: 'Hardware, Tools & Maintenance Supplies in Zimbabwe',
    intro:
      'From hand tools to plumbing fittings, we supply hardware and maintenance supplies for facilities, workshops and projects.',
    items: [
      'Hand and power tools',
      'Fasteners, fixings and adhesives',
      'Plumbing pipes and fittings',
      'Paint and painting supplies',
      'Locks, hinges and door hardware',
      'Maintenance and repair consumables',
    ],
    specify: [
      'Item, size and material',
      'Brand or standard, if required',
      'Quantity and delivery site',
    ],
  },
  {
    slug: 'agriculture-farm-supplies',
    name: 'Agriculture & Farm Supplies',
    short: 'Farm inputs, tools, irrigation and livestock supplies.',
    icon: 'agriculture',
    featured: false,
    published: true,
    seoTitle: 'Agriculture & Farm Supplies in Zimbabwe',
    intro:
      'We supply agricultural tools, irrigation components and farm consumables for farmers, cooperatives and agricultural programmes.',
    items: [
      'Hand tools and farm implements',
      'Irrigation pipes, fittings and drip kits',
      'Fencing materials',
      'Storage bags and tarpaulins',
      'Livestock equipment and consumables',
      'Protective clothing for farm work',
    ],
    specify: [
      'Item, size and quantity',
      'Season or required-by date',
      'Delivery location (farm or depot)',
    ],
    note:
      'Seed, fertiliser, chemicals and veterinary products are quoted only where the product and supplier meet applicable requirements for the specific transaction.',
  },
  {
    slug: 'catering-hospitality',
    name: 'Catering & Hospitality',
    short: 'Kitchen, catering and guest consumables.',
    icon: 'catering',
    featured: false,
    published: true,
    seoTitle: 'Catering & Hospitality Supplies in Zimbabwe',
    intro:
      'We supply kitchen equipment, catering disposables and guest consumables for lodges, hotels, canteens, events and institutional kitchens.',
    items: [
      'Disposable cups, plates and cutlery',
      'Kitchen utensils and cookware',
      'Food storage containers',
      'Guest amenities and linen',
      'Kitchen cleaning supplies',
      'Serviettes and table supplies',
    ],
    specify: [
      'Item, size and material',
      'Quantity and pack basis',
      'Delivery location and event date, if applicable',
    ],
  },
  {
    slug: 'security-safety',
    name: 'Security & Safety',
    short: 'Fire safety, signage and site security supplies.',
    icon: 'lock',
    featured: false,
    published: true,
    seoTitle: 'Security & Safety Supplies in Zimbabwe',
    intro:
      'We supply safety and security supplies for premises, sites and vehicles. Servicing, certification and installation are arranged with qualified third parties where required.',
    items: [
      'Fire extinguishers and fire blankets',
      'First aid kits',
      'Safety and warning signage',
      'Padlocks, chains and security hardware',
      'Torches and emergency lighting',
      'Barrier tape and cones',
    ],
    specify: [
      'Item type, size or capacity',
      'Any standard or certification required',
      'Quantity and location',
    ],
  },
  {
    slug: 'household-general-consumer-products',
    name: 'Household & General Consumer Products',
    short: 'Household goods and general consumer items.',
    icon: 'home',
    featured: false,
    published: true,
    seoTitle: 'Household & General Consumer Products in Zimbabwe',
    intro:
      'We supply household goods and general consumer products for organisations, programmes and individual customers.',
    items: [
      'Kitchenware and household utensils',
      'Bedding and blankets',
      'Plastic ware and storage',
      'Toiletries and personal care items',
      'Small household appliances',
    ],
    specify: [
      'Item description and size',
      'Quantity',
      'Delivery or collection preference',
    ],
  },
  {
    slug: 'promotional-corporate-supplies',
    name: 'Promotional & Corporate Supplies',
    short: 'Branded items, corporate gifts and event materials.',
    icon: 'gift',
    featured: false,
    published: true,
    seoTitle: 'Promotional & Corporate Branded Supplies in Zimbabwe',
    intro:
      'We supply branded and corporate items for marketing, events, staff and client programmes. Artwork is provided by the customer or a designer appointed by the customer.',
    items: [
      'Branded T-shirts, caps and uniforms',
      'Branded pens, notebooks and diaries',
      'Banners and event materials',
      'Corporate gifts',
      'Branded bags and drinkware',
    ],
    specify: [
      'Item and branding method (print, embroidery, engraving)',
      'Artwork availability and colours',
      'Quantity and event date',
    ],
  },
];

export const publishedCategories = () => categories.filter((c) => c.published);
export const featuredCategories = () => publishedCategories().filter((c) => c.featured);
