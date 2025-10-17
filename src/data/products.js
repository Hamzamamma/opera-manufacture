// Products Data for Opera Manufacture
export const products = [
  // APPAREL - T-Shirts
  {
    id: 1,
    name: "T-Shirt Classica Opera",
    description: "T-shirt in cotone premium con design Opera Manufacture. Comfort e stile per tutti i giorni.",
    category: "Abbigliamento",
    subcategory: "T-Shirt",
    basePrice: 29.99,
    salePrice: null,
    colors: ["#000000", "#FFFFFF", "#EC4899", "#8B5CF6", "#3B82F6"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://picsum.photos/seed/tshirt1-1/800/1000",
      "https://picsum.photos/seed/tshirt1-2/800/1000",
      "https://picsum.photos/seed/tshirt1-3/800/1000"
    ],
    tags: ["bestseller", "unisex", "cotone"],
    featured: true,
    stock: "in_stock",
    trending: true
  },
  {
    id: 2,
    name: "T-Shirt Gradient Dream",
    description: "T-shirt esclusiva con stampa gradient rosa-viola. Edizione limitata Opera Manufacture.",
    category: "Abbigliamento",
    subcategory: "T-Shirt",
    basePrice: 34.99,
    salePrice: 27.99,
    colors: ["#000000", "#1F2937"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://picsum.photos/seed/tshirt2-1/800/1000",
      "https://picsum.photos/seed/tshirt2-2/800/1000"
    ],
    tags: ["new", "limited", "gradient"],
    featured: true,
    stock: "in_stock",
    trending: false,
    isNew: true
  },
  {
    id: 3,
    name: "T-Shirt Oversized Neon",
    description: "T-shirt oversized con stampa neon. Perfetta per un look streetwear moderno.",
    category: "Abbigliamento",
    subcategory: "T-Shirt",
    basePrice: 32.99,
    salePrice: null,
    colors: ["#000000", "#1F2937", "#EC4899"],
    sizes: ["M", "L", "XL", "XXL"],
    images: [
      "https://picsum.photos/seed/tshirt3-1/800/1000",
      "https://picsum.photos/seed/tshirt3-2/800/1000",
      "https://picsum.photos/seed/tshirt3-3/800/1000"
    ],
    tags: ["oversized", "streetwear", "neon"],
    featured: false,
    stock: "in_stock",
    trending: true
  },
  {
    id: 4,
    name: "T-Shirt Retro Wave",
    description: "Design ispirato agli anni '80 con effetti retrowave. Stile vintage moderno.",
    category: "Abbigliamento",
    subcategory: "T-Shirt",
    basePrice: 31.99,
    salePrice: null,
    colors: ["#000000", "#EC4899", "#8B5CF6"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/tshirt4-1/800/1000",
      "https://picsum.photos/seed/tshirt4-2/800/1000"
    ],
    tags: ["retro", "vintage", "80s"],
    featured: false,
    stock: "in_stock",
    trending: false
  },

  // APPAREL - Hoodies
  {
    id: 5,
    name: "Hoodie Premium Opera",
    description: "Felpa con cappuccio in cotone francese. Comfort superiore e design minimalista.",
    category: "Abbigliamento",
    subcategory: "Felpe",
    basePrice: 59.99,
    salePrice: 49.99,
    colors: ["#000000", "#1F2937", "#374151", "#EC4899"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://picsum.photos/seed/hoodie1-1/800/1000",
      "https://picsum.photos/seed/hoodie1-2/800/1000",
      "https://picsum.photos/seed/hoodie1-3/800/1000"
    ],
    tags: ["bestseller", "premium", "cappuccio"],
    featured: true,
    stock: "in_stock",
    trending: true
  },
  {
    id: 6,
    name: "Hoodie Gradient Collection",
    description: "Felpa con stampa gradient esclusiva. Edizione limitata con design unico.",
    category: "Abbigliamento",
    subcategory: "Felpe",
    basePrice: 64.99,
    salePrice: null,
    colors: ["#000000", "#8B5CF6"],
    sizes: ["M", "L", "XL", "XXL"],
    images: [
      "https://picsum.photos/seed/hoodie2-1/800/1000",
      "https://picsum.photos/seed/hoodie2-2/800/1000"
    ],
    tags: ["limited", "gradient", "exclusive"],
    featured: true,
    stock: "low_stock",
    trending: true,
    isNew: true
  },
  {
    id: 7,
    name: "Hoodie Oversized Black",
    description: "Felpa oversize ultra-comoda. Perfetta per un look rilassato e alla moda.",
    category: "Abbigliamento",
    subcategory: "Felpe",
    basePrice: 62.99,
    salePrice: null,
    colors: ["#000000", "#1F2937"],
    sizes: ["L", "XL", "XXL"],
    images: [
      "https://picsum.photos/seed/hoodie3-1/800/1000",
      "https://picsum.photos/seed/hoodie3-2/800/1000"
    ],
    tags: ["oversized", "comfort", "unisex"],
    featured: false,
    stock: "in_stock",
    trending: false
  },

  // APPAREL - Sweatshirts
  {
    id: 8,
    name: "Sweatshirt Crew Neck",
    description: "Felpa girocollo classica. Design pulito e versatile per ogni occasione.",
    category: "Abbigliamento",
    subcategory: "Felpe",
    basePrice: 49.99,
    salePrice: 39.99,
    colors: ["#000000", "#FFFFFF", "#1F2937", "#EC4899"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://picsum.photos/seed/sweat1-1/800/1000",
      "https://picsum.photos/seed/sweat1-2/800/1000"
    ],
    tags: ["classic", "versatile", "girocollo"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 9,
    name: "Sweatshirt Neon Print",
    description: "Felpa con stampa neon accattivante. Stile audace e contemporaneo.",
    category: "Abbigliamento",
    subcategory: "Felpe",
    basePrice: 54.99,
    salePrice: null,
    colors: ["#000000", "#EC4899", "#8B5CF6"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/sweat2-1/800/1000",
      "https://picsum.photos/seed/sweat2-2/800/1000"
    ],
    tags: ["neon", "bold", "statement"],
    featured: false,
    stock: "in_stock",
    trending: true,
    isNew: true
  },

  // APPAREL - Tank Tops
  {
    id: 10,
    name: "Tank Top Minimal",
    description: "Canotta minimalista in cotone traspirante. Ideale per l'estate.",
    category: "Abbigliamento",
    subcategory: "Canotte",
    basePrice: 24.99,
    salePrice: null,
    colors: ["#000000", "#FFFFFF", "#1F2937"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/tank1-1/800/1000",
      "https://picsum.photos/seed/tank1-2/800/1000"
    ],
    tags: ["summer", "minimal", "breathable"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 11,
    name: "Tank Top Athletic",
    description: "Canotta sportiva ad alta performance. Perfetta per allenamento e tempo libero.",
    category: "Abbigliamento",
    subcategory: "Canotte",
    basePrice: 27.99,
    salePrice: null,
    colors: ["#000000", "#EC4899", "#3B82F6"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/tank2-1/800/1000",
      "https://picsum.photos/seed/tank2-2/800/1000"
    ],
    tags: ["sport", "athletic", "performance"],
    featured: false,
    stock: "in_stock",
    trending: false
  },

  // ACCESSORIES - Mugs
  {
    id: 12,
    name: "Tazza Opera Black",
    description: "Tazza in ceramica premium con logo Opera. Perfetta per il caffè mattutino.",
    category: "Accessori",
    subcategory: "Tazze",
    basePrice: 16.99,
    salePrice: null,
    colors: ["#000000"],
    sizes: ["Unica"],
    images: [
      "https://picsum.photos/seed/mug1-1/800/800",
      "https://picsum.photos/seed/mug1-2/800/800"
    ],
    tags: ["ceramic", "coffee", "premium"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 13,
    name: "Tazza Gradient Magic",
    description: "Tazza termosensibile con effetto gradient. Cambia colore con il calore.",
    category: "Accessori",
    subcategory: "Tazze",
    basePrice: 19.99,
    salePrice: 16.99,
    colors: ["#EC4899", "#8B5CF6"],
    sizes: ["Unica"],
    images: [
      "https://picsum.photos/seed/mug2-1/800/800",
      "https://picsum.photos/seed/mug2-2/800/800"
    ],
    tags: ["magic", "gradient", "gift"],
    featured: true,
    stock: "in_stock",
    trending: true,
    isNew: true
  },

  // ACCESSORIES - Phone Cases
  {
    id: 14,
    name: "Cover iPhone Opera",
    description: "Custodia protettiva per iPhone con design Opera. Protezione e stile.",
    category: "Accessori",
    subcategory: "Cover Telefono",
    basePrice: 24.99,
    salePrice: null,
    colors: ["#000000", "#EC4899", "#8B5CF6", "#FFFFFF"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    images: [
      "https://picsum.photos/seed/case1-1/800/1000",
      "https://picsum.photos/seed/case1-2/800/1000"
    ],
    tags: ["iphone", "protection", "design"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 15,
    name: "Cover Samsung Gradient",
    description: "Custodia Samsung con stampa gradient esclusiva. Design unico e protezione totale.",
    category: "Accessori",
    subcategory: "Cover Telefono",
    basePrice: 22.99,
    salePrice: null,
    colors: ["#EC4899", "#8B5CF6"],
    sizes: ["Galaxy S23", "Galaxy S24"],
    images: [
      "https://picsum.photos/seed/case2-1/800/1000",
      "https://picsum.photos/seed/case2-2/800/1000"
    ],
    tags: ["samsung", "gradient", "exclusive"],
    featured: false,
    stock: "in_stock",
    trending: false
  },

  // ACCESSORIES - Tote Bags
  {
    id: 16,
    name: "Borsa Tote Canvas",
    description: "Borsa tote in canvas resistente. Perfetta per shopping e uso quotidiano.",
    category: "Accessori",
    subcategory: "Borse",
    basePrice: 19.99,
    salePrice: 14.99,
    colors: ["#FFFFFF", "#000000", "#F5F5DC"],
    sizes: ["Unica"],
    images: [
      "https://picsum.photos/seed/tote1-1/800/1000",
      "https://picsum.photos/seed/tote1-2/800/1000"
    ],
    tags: ["eco", "canvas", "reusable"],
    featured: true,
    stock: "in_stock",
    trending: true
  },
  {
    id: 17,
    name: "Borsa Tote Premium Black",
    description: "Borsa tote premium con logo ricamato. Eleganza e funzionalità.",
    category: "Accessori",
    subcategory: "Borse",
    basePrice: 29.99,
    salePrice: null,
    colors: ["#000000"],
    sizes: ["Unica"],
    images: [
      "https://picsum.photos/seed/tote2-1/800/1000",
      "https://picsum.photos/seed/tote2-2/800/1000"
    ],
    tags: ["premium", "elegant", "embroidered"],
    featured: false,
    stock: "in_stock",
    trending: false
  },

  // ACCESSORIES - Stickers
  {
    id: 18,
    name: "Pack Stickers Opera",
    description: "Set di 10 stickers waterproof con design Opera. Personalizza tutto!",
    category: "Accessori",
    subcategory: "Stickers",
    basePrice: 9.99,
    salePrice: null,
    colors: ["Multicolor"],
    sizes: ["Pack"],
    images: [
      "https://picsum.photos/seed/sticker1-1/800/800",
      "https://picsum.photos/seed/sticker1-2/800/800"
    ],
    tags: ["waterproof", "pack", "customization"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 19,
    name: "Sticker Holographic XL",
    description: "Sticker olografico grande formato. Effetto iridescente unico.",
    category: "Accessori",
    subcategory: "Stickers",
    basePrice: 5.99,
    salePrice: null,
    colors: ["Holographic"],
    sizes: ["XL"],
    images: [
      "https://picsum.photos/seed/sticker2-1/800/800"
    ],
    tags: ["holographic", "xl", "unique"],
    featured: false,
    stock: "in_stock",
    trending: true,
    isNew: true
  },

  // ACCESSORIES - Pins
  {
    id: 20,
    name: "Pin Enamel Opera",
    description: "Spilla smaltata Opera Manufacture. Dettagli di alta qualità.",
    category: "Accessori",
    subcategory: "Spille",
    basePrice: 12.99,
    salePrice: null,
    colors: ["#EC4899", "#8B5CF6", "#000000"],
    sizes: ["Unica"],
    images: [
      "https://picsum.photos/seed/pin1-1/800/800",
      "https://picsum.photos/seed/pin1-2/800/800"
    ],
    tags: ["enamel", "collectible", "quality"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 21,
    name: "Set Pins Limited Edition",
    description: "Set esclusivo di 3 pins edizione limitata. Collezione completa.",
    category: "Accessori",
    subcategory: "Spille",
    basePrice: 29.99,
    salePrice: 24.99,
    colors: ["Set"],
    sizes: ["Pack"],
    images: [
      "https://picsum.photos/seed/pin2-1/800/800",
      "https://picsum.photos/seed/pin2-2/800/800"
    ],
    tags: ["limited", "set", "collectible"],
    featured: true,
    stock: "low_stock",
    trending: true
  },

  // HOME & LIVING - Posters
  {
    id: 22,
    name: "Poster Opera Art A3",
    description: "Poster artistico formato A3. Stampa di alta qualità su carta premium.",
    category: "Casa & Arredamento",
    subcategory: "Poster",
    basePrice: 19.99,
    salePrice: null,
    colors: ["Print"],
    sizes: ["A3", "A2", "A1"],
    images: [
      "https://picsum.photos/seed/poster1-1/800/1200",
      "https://picsum.photos/seed/poster1-2/800/1200"
    ],
    tags: ["art", "print", "decor"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 23,
    name: "Poster Gradient Collection",
    description: "Poster con design gradient esclusivo. Perfetto per decorare ogni spazio.",
    category: "Casa & Arredamento",
    subcategory: "Poster",
    basePrice: 24.99,
    salePrice: 19.99,
    colors: ["Print"],
    sizes: ["A2", "A1"],
    images: [
      "https://picsum.photos/seed/poster2-1/800/1200",
      "https://picsum.photos/seed/poster2-2/800/1200"
    ],
    tags: ["gradient", "exclusive", "modern"],
    featured: true,
    stock: "in_stock",
    trending: true
  },

  // HOME & LIVING - Canvas Prints
  {
    id: 24,
    name: "Stampa Canvas Premium",
    description: "Stampa su tela canvas di alta qualità. Pronta da appendere.",
    category: "Casa & Arredamento",
    subcategory: "Stampe Canvas",
    basePrice: 49.99,
    salePrice: null,
    colors: ["Print"],
    sizes: ["30x40cm", "50x70cm", "70x100cm"],
    images: [
      "https://picsum.photos/seed/canvas1-1/800/1000",
      "https://picsum.photos/seed/canvas1-2/800/1000"
    ],
    tags: ["canvas", "premium", "ready-to-hang"],
    featured: true,
    stock: "in_stock",
    trending: false
  },
  {
    id: 25,
    name: "Canvas Art Neon Dreams",
    description: "Stampa canvas con design neon. Arte moderna per la tua casa.",
    category: "Casa & Arredamento",
    subcategory: "Stampe Canvas",
    basePrice: 54.99,
    salePrice: null,
    colors: ["Print"],
    sizes: ["50x70cm", "70x100cm"],
    images: [
      "https://picsum.photos/seed/canvas2-1/800/1000",
      "https://picsum.photos/seed/canvas2-2/800/1000"
    ],
    tags: ["neon", "modern", "art"],
    featured: false,
    stock: "in_stock",
    trending: true,
    isNew: true
  },

  // HOME & LIVING - Pillows
  {
    id: 26,
    name: "Cuscino Opera Comfort",
    description: "Cuscino decorativo con stampa Opera. Comfort e stile per il tuo divano.",
    category: "Casa & Arredamento",
    subcategory: "Cuscini",
    basePrice: 29.99,
    salePrice: 24.99,
    colors: ["#000000", "#FFFFFF", "#EC4899"],
    sizes: ["40x40cm", "50x50cm"],
    images: [
      "https://picsum.photos/seed/pillow1-1/800/800",
      "https://picsum.photos/seed/pillow1-2/800/800"
    ],
    tags: ["comfort", "decorative", "soft"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 27,
    name: "Cuscino Gradient Deluxe",
    description: "Cuscino premium con stampa gradient. Materiale di alta qualità.",
    category: "Casa & Arredamento",
    subcategory: "Cuscini",
    basePrice: 34.99,
    salePrice: null,
    colors: ["Gradient"],
    sizes: ["45x45cm", "50x50cm"],
    images: [
      "https://picsum.photos/seed/pillow2-1/800/800",
      "https://picsum.photos/seed/pillow2-2/800/800"
    ],
    tags: ["gradient", "premium", "deluxe"],
    featured: true,
    stock: "in_stock",
    trending: true
  },

  // HOME & LIVING - Blankets
  {
    id: 28,
    name: "Coperta Fleece Cozy",
    description: "Coperta in fleece ultra-morbida. Calore e comfort per le serate invernali.",
    category: "Casa & Arredamento",
    subcategory: "Coperte",
    basePrice: 44.99,
    salePrice: 39.99,
    colors: ["#000000", "#1F2937", "#EC4899"],
    sizes: ["130x170cm", "150x200cm"],
    images: [
      "https://picsum.photos/seed/blanket1-1/800/1000",
      "https://picsum.photos/seed/blanket1-2/800/1000"
    ],
    tags: ["fleece", "cozy", "warm"],
    featured: true,
    stock: "in_stock",
    trending: true
  },
  {
    id: 29,
    name: "Coperta Premium XL",
    description: "Coperta extra large di qualità superiore. Design elegante e funzionale.",
    category: "Casa & Arredamento",
    subcategory: "Coperte",
    basePrice: 59.99,
    salePrice: null,
    colors: ["#000000", "#FFFFFF"],
    sizes: ["180x220cm"],
    images: [
      "https://picsum.photos/seed/blanket2-1/800/1000",
      "https://picsum.photos/seed/blanket2-2/800/1000"
    ],
    tags: ["xl", "premium", "elegant"],
    featured: false,
    stock: "in_stock",
    trending: false
  },

  // TECH - Mouse Pads
  {
    id: 30,
    name: "Mouse Pad Gaming Opera",
    description: "Tappetino mouse gaming XXL. Superficie antiscivolo e bordi cuciti.",
    category: "Tech",
    subcategory: "Mouse Pad",
    basePrice: 24.99,
    salePrice: null,
    colors: ["#000000", "#EC4899"],
    sizes: ["XL", "XXL"],
    images: [
      "https://picsum.photos/seed/mousepad1-1/800/600",
      "https://picsum.photos/seed/mousepad1-2/800/600"
    ],
    tags: ["gaming", "xxl", "anti-slip"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 31,
    name: "Mouse Pad Gradient Desk",
    description: "Tappetino scrivania con design gradient. Perfetto per setup moderni.",
    category: "Tech",
    subcategory: "Mouse Pad",
    basePrice: 29.99,
    salePrice: 24.99,
    colors: ["Gradient"],
    sizes: ["XXL"],
    images: [
      "https://picsum.photos/seed/mousepad2-1/800/600",
      "https://picsum.photos/seed/mousepad2-2/800/600"
    ],
    tags: ["gradient", "desk", "setup"],
    featured: true,
    stock: "in_stock",
    trending: true
  },

  // TECH - Laptop Sleeves
  {
    id: 32,
    name: "Custodia Laptop 13\"",
    description: "Custodia protettiva per laptop 13\". Imbottitura premium e design minimal.",
    category: "Tech",
    subcategory: "Custodie Laptop",
    basePrice: 34.99,
    salePrice: null,
    colors: ["#000000", "#1F2937"],
    sizes: ["13\"", "15\""],
    images: [
      "https://picsum.photos/seed/laptop1-1/800/600",
      "https://picsum.photos/seed/laptop1-2/800/600"
    ],
    tags: ["laptop", "protection", "minimal"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 33,
    name: "Sleeve Laptop Gradient Pro",
    description: "Custodia laptop professionale con stampa gradient. Massima protezione.",
    category: "Tech",
    subcategory: "Custodie Laptop",
    basePrice: 39.99,
    salePrice: 34.99,
    colors: ["Gradient"],
    sizes: ["13\"", "15\"", "16\""],
    images: [
      "https://picsum.photos/seed/laptop2-1/800/600",
      "https://picsum.photos/seed/laptop2-2/800/600"
    ],
    tags: ["gradient", "pro", "protection"],
    featured: true,
    stock: "in_stock",
    trending: true,
    isNew: true
  },

  // TECH - PopSockets
  {
    id: 34,
    name: "PopSocket Opera Logo",
    description: "PopSocket con logo Opera. Grip perfetto e supporto per il tuo smartphone.",
    category: "Tech",
    subcategory: "PopSocket",
    basePrice: 14.99,
    salePrice: null,
    colors: ["#000000", "#FFFFFF", "#EC4899", "#8B5CF6"],
    sizes: ["Unica"],
    images: [
      "https://picsum.photos/seed/pop1-1/800/800",
      "https://picsum.photos/seed/pop1-2/800/800"
    ],
    tags: ["grip", "support", "smartphone"],
    featured: false,
    stock: "in_stock",
    trending: false
  },
  {
    id: 35,
    name: "PopSocket Gradient Magic",
    description: "PopSocket con effetto gradient iridescente. Design esclusivo e funzionale.",
    category: "Tech",
    subcategory: "PopSocket",
    basePrice: 16.99,
    salePrice: null,
    colors: ["Gradient"],
    sizes: ["Unica"],
    images: [
      "https://picsum.photos/seed/pop2-1/800/800",
      "https://picsum.photos/seed/pop2-2/800/800"
    ],
    tags: ["gradient", "iridescent", "exclusive"],
    featured: false,
    stock: "in_stock",
    trending: true,
    isNew: true
  }
];

// Helper functions
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getTrendingProducts = () => {
  return products.filter(product => product.trending);
};

export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

export const getProductsOnSale = () => {
  return products.filter(product => product.salePrice !== null);
};

export const getCategories = () => {
  return [...new Set(products.map(product => product.category))];
};

export const getSubcategories = (category) => {
  return [...new Set(
    products
      .filter(product => product.category === category)
      .map(product => product.subcategory)
  )];
};

export default products;
