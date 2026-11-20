import womanPromoImage from "../assets/home/image-363.png";

export const CATEGORIES = [
  "Women",
  "Men",
  "Mother-Child",
  "Accessory",
  "Cosmetics",
  "Shoe & Bag",
  "Sport & Outdoor",
  "Best seller",
] as const;

export type CategoryName = (typeof CATEGORIES)[number];

export type MegaMenuSection = {
  title: string;
  categoryParam?: string;
  items: string[];
};

export type CategoryMenuConfig = {
  baseParams: {
    gender?: string;
    category?: string;
    sort?: string;
  };
  promoImage?: string;
  promoAlt?: string;
  columns: MegaMenuSection[][];
};

const SHARED_SECTIONS = {
  womanShoeBag: {
    title: "SHOE & BAG",
    categoryParam: "Shoe & Bag",
    items: ["Casual Shoes", "Boots", "Sandals", "Slippers"],
  },
  homeTextile: {
    title: "HOME TEXTILE",
    categoryParam: "Home Textile",
    items: ["Bedding", "Pillows", "Handkerchief Towels", "Curtain"],
  },
  cosmeticsHair: {
    title: "COSMETICS",
    categoryParam: "Cosmetics",
    items: [
      "Shampoo and Conditioner",
      "Styling Products",
      "Hair Accessories",
      "Men's Grooming",
    ],
  },
  sportOutdoors: {
    title: "SPORT & OUTDOORS",
    categoryParam: "Sport & Outdoor",
    items: [
      "Team Sports",
      "Water Sports",
      "Outdoor Recreation",
      "Fitness Equipment",
    ],
  },
} satisfies Record<string, MegaMenuSection>;

export const CATEGORY_MENUS: Record<CategoryName, CategoryMenuConfig> = {
  Women: {
    baseParams: { gender: "Women" },
    promoImage: womanPromoImage,
    promoAlt: "Woman fashion collection",
    columns: [
      [
        SHARED_SECTIONS.womanShoeBag,
        {
          title: "LUXURY & DESIGNER",
          categoryParam: "Luxury",
          items: ["Towels", "Bathroom Scales", "Bath Mats", "Shower Caps"],
        },
      ],
      [SHARED_SECTIONS.homeTextile, SHARED_SECTIONS.cosmeticsHair],
      [SHARED_SECTIONS.sportOutdoors],
      [
        {
          title: "CLOTHES",
          categoryParam: "Clothes",
          items: [
            "Bottoms",
            "Women's Clothing",
            "T-Shirts and Tops",
            "Dresses",
            "Outerwear",
            "Formal Wear",
            "Casual Wear",
            "Seasonal Collections",
            "Sports Bras",
            "Workout Tops",
            "Fall Wardrobe",
          ],
        },
      ],
    ],
  },

  Men: {
    baseParams: { gender: "Men" },
    // Add promoImage here later if needed
    columns: [
      [
        {
          title: "SHOE & BAG",
          categoryParam: "Shoe & Bag",
          items: ["Sneakers", "Loafers", "Boots", "Backpacks", "Leather Bags"],
        },
      ],
      [
        {
          title: "GROOMING",
          categoryParam: "Cosmetics",
          items: [
            "Men's Grooming",
            "Beard Care",
            "Fragrances",
            "Shampoo and Conditioner",
          ],
        },
      ],
      [SHARED_SECTIONS.sportOutdoors],
      [
        {
          title: "CLOTHES",
          categoryParam: "Clothes",
          items: [
            "T-Shirts & Polos",
            "Shirts",
            "Jeans & Trousers",
            "Outerwear",
            "Suits & Formal Wear",
            "Casual Wear",
            "Sweaters & Hoodies",
          ],
        },
      ],
    ],
  },

  "Mother-Child": {
    baseParams: { gender: "Kids" },
    columns: [
      [
        {
          title: "BABY & TODDLER",
          categoryParam: "Clothes",
          items: ["Bodysuits", "Sleepwear", "Rompers", "Baby Blankets"],
        },
      ],
      [
        {
          title: "GIRLS & BOYS",
          categoryParam: "Clothes",
          items: ["Dresses", "T-Shirts", "Denim & Pants", "Jackets & Coats"],
        },
      ],
      [
        {
          title: "KIDS SHOE & BAG",
          categoryParam: "Shoe & Bag",
          items: ["School Backpacks", "Sneakers", "Sandals", "Rain Boots"],
        },
      ],
      [SHARED_SECTIONS.homeTextile],
    ],
  },

  Accessory: {
    baseParams: { category: "Accessory" },
    columns: [
      [
        {
          title: "JEWELRY & WATCHES",
          items: ["Necklaces", "Earrings", "Bracelets", "Wristwatches"],
        },
      ],
      [
        {
          title: "EYEWEAR",
          items: ["Sunglasses", "Blue-Light Glasses", "Cases & Straps"],
        },
      ],
      [
        {
          title: "SEASONAL",
          items: ["Scarves", "Hats & Caps", "Belts", "Hair Accessories"],
        },
      ],
      [
        {
          title: "SMALL LEATHER GOODS",
          items: ["Wallets", "Card Holders", "Keychains", "Tech Cases"],
        },
      ],
    ],
  },

  Cosmetics: {
    baseParams: { category: "Cosmetics" },
    columns: [
      [SHARED_SECTIONS.cosmeticsHair],
      [
        {
          title: "SKINCARE",
          items: ["Moisturizers", "Cleansers", "Serums", "Sunscreen"],
        },
      ],
      [
        {
          title: "MAKEUP",
          items: ["Lipstick", "Foundation", "Mascara", "Eyeshadow Palettes"],
        },
      ],
      [
        {
          title: "FRAGRANCE",
          items: ["Eau de Parfum", "Body Mist", "Gift Sets"],
        },
      ],
    ],
  },

  "Shoe & Bag": {
    baseParams: { category: "Shoe & Bag" },
    columns: [
      [SHARED_SECTIONS.womanShoeBag],
      [
        {
          title: "MEN'S FOOTWEAR",
          items: ["Sneakers", "Dress Shoes", "Loafers", "Running Shoes"],
        },
      ],
      [
        {
          title: "HANDBAGS",
          items: ["Shoulder Bags", "Tote Bags", "Crossbody", "Clutches"],
        },
      ],
      [
        {
          title: "TRAVEL & BACKPACKS",
          items: ["Laptop Backpacks", "Weekend Duffels", "Luggage"],
        },
      ],
    ],
  },

  "Sport & Outdoor": {
    baseParams: { category: "Sport & Outdoor" },
    columns: [
      [SHARED_SECTIONS.sportOutdoors],
      [
        {
          title: "ACTIVEWEAR",
          items: ["Sports Bras", "Workout Tops", "Leggings", "Tracksuits"],
        },
      ],
      [
        {
          title: "ATHLETIC FOOTWEAR",
          items: ["Running Shoes", "Training Sneakers", "Trail Boots"],
        },
      ],
      [
        {
          title: "CAMPING & GEAR",
          items: ["Yoga Mats", "Water Bottles", "Hiking Packs"],
        },
      ],
    ],
  },

  "Best seller": {
    baseParams: { sort: "popular" },
    columns: [
      [
        {
          title: "TRENDING FASHION",
          items: ["Dresses", "Sweater", "Casual Wear", "Minimalist"],
        },
      ],
      [
        {
          title: "TOP BRANDS",
          items: ["Mango", "Zara", "Uniqlo", "Calvin Klein"],
        },
      ],
      [SHARED_SECTIONS.womanShoeBag],
      [SHARED_SECTIONS.cosmeticsHair],
    ],
  },
};

export function buildCatalogUrl(
  categoryName: CategoryName,
  options?: { sectionCategory?: string; query?: string },
): string {
  const config = CATEGORY_MENUS[categoryName];
  const params = new URLSearchParams();

  if (config.baseParams.gender) {
    params.set("gender", config.baseParams.gender);
  }
  const cat = options?.sectionCategory ?? config.baseParams.category;
  if (cat) {
    params.set("category", cat);
  }
  if (config.baseParams.sort) {
    params.set("sort", config.baseParams.sort);
  }
  if (options?.query) {
    params.set("q", options.query);
  }

  const qs = params.toString();
  return qs ? `/catalog?${qs}` : "/catalog";
}
