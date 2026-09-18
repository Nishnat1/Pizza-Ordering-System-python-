export type MenuItemVariant = {
  size: string;
  price: number;
};

export type MenuItem = {
  image: string;
  name: string;
  description: string;
  variants: MenuItemVariant[];
  isVeg: boolean;
  category: "pizza" | "side" | "beverage" | "dessert";
};

export const PIZZAS: MenuItem[] = [
  {
    image: "/pizzas/chicken-bbq6161.png",
    name: "chicken bbq",
    description: "Savory BBQ chicken, red onions, and mozzarella on a golden crust.",
    variants: [
      { size: "Small", price: 249 },
      { size: "Medium", price: 399 },
      { size: "Large", price: 549 },
    ],
    isVeg: false,
    category: "pizza",
  },
  {
    image: "/pizzas/chicken-florentine3740.png",
    name: "chicken florentine",
    description: "Creamy white sauce, grilled chicken, spinach, and garlic toppings.",
    variants: [
      { size: "Small", price: 269 },
      { size: "Medium", price: 419 },
      { size: "Large", price: 569 },
    ],
    isVeg: false,
    category: "pizza",
  },
  {
    image: "/pizzas/chicken-hawaiian2476.png",
    name: "chicken hawaiian",
    description: "A tropical mix of sweet pineapple, savory chicken, and cheese.",
    variants: [
      { size: "Small", price: 259 },
      { size: "Medium", price: 409 },
      { size: "Large", price: 559 },
    ],
    isVeg: false,
    category: "pizza",
  },
  {
    image: "/pizzas/chicken-mexican-ole-4683.png",
    name: "chicken mexican ole",
    description: "Spicy Mexican style chicken, jalapeños, onions, and bell peppers.",
    variants: [
      { size: "Small", price: 279 },
      { size: "Medium", price: 429 },
      { size: "Large", price: 579 },
    ],
    isVeg: false,
    category: "pizza",
  },
  {
    image: "/pizzas/chicken-sausage9202.png",
    name: "chicken sausage",
    description: "Flavorful chicken sausage slices spread over melting mozzarella.",
    variants: [
      { size: "Small", price: 239 },
      { size: "Medium", price: 389 },
      { size: "Large", price: 539 },
    ],
    isVeg: false,
    category: "pizza",
  },
  {
    image: "/pizzas/double-cheese-dhamaka2611.png",
    name: "double cheese",
    description: "Extra layer of premium liquid cheese and mozzarella blend.",
    variants: [
      { size: "Small", price: 199 },
      { size: "Medium", price: 329 },
      { size: "Large", price: 459 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/fiery-garden-delight-4818.png",
    name: "fiery garden delight",
    description: "Hot red paprika, green chillies, onions, capsicum, and fresh tomatoes.",
    variants: [
      { size: "Small", price: 229 },
      { size: "Medium", price: 359 },
      { size: "Large", price: 489 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/garden-special7740.png",
    name: "garden special",
    description: "Healthy garden fresh capsicum, sweet corn, mushrooms, and onions.",
    variants: [
      { size: "Small", price: 219 },
      { size: "Medium", price: 349 },
      { size: "Large", price: 479 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/margherita3310.png",
    name: "margherita",
    description: "Classic pizza with tomato sauce, basil oil, and double mozzarella.",
    variants: [
      { size: "Small", price: 179 },
      { size: "Medium", price: 299 },
      { size: "Large", price: 419 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/paneer-garden-delight9774.png",
    name: "paneer garden delight",
    description: "Golden paneer cubes with fresh garden vegetables and cheese.",
    variants: [
      { size: "Small", price: 239 },
      { size: "Medium", price: 379 },
      { size: "Large", price: 519 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/spicy-garden-special7509.png",
    name: "spicy garden special",
    description: "Garden fresh toppings with a kick of hot jalapeños and red paprika.",
    variants: [
      { size: "Small", price: 249 },
      { size: "Medium", price: 389 },
      { size: "Large", price: 529 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/spicy-italian5900.png",
    name: "spicy italian",
    description: "Pepperoni, spicy sausage, onions, and hot green chillies.",
    variants: [
      { size: "Small", price: 289 },
      { size: "Medium", price: 439 },
      { size: "Large", price: 589 },
    ],
    isVeg: false,
    category: "pizza",
  },
  {
    image: "/pizzas/spicy-paneer-ranch2368.png",
    name: "spicy paneer ranch",
    description: "Marinated paneer chunks, spicy ranch drizzle, and green capsicum.",
    variants: [
      { size: "Small", price: 259 },
      { size: "Medium", price: 399 },
      { size: "Large", price: 539 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/spinach-alfredo8170.png",
    name: "spinach alfredo",
    description: "Creamy Alfredo sauce base loaded with fresh spinach and garlic.",
    variants: [
      { size: "Small", price: 229 },
      { size: "Medium", price: 369 },
      { size: "Large", price: 499 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/the-greek-chicken7384.png",
    name: "the greek chicken",
    description: "Feta cheese, black olives, roasted chicken, and red bell peppers.",
    variants: [
      { size: "Small", price: 299 },
      { size: "Medium", price: 459 },
      { size: "Large", price: 619 },
    ],
    isVeg: false,
    category: "pizza",
  },
  {
    image: "/pizzas/the-greek-veggie7269.png",
    name: "the greek veggie",
    description: "Authentic Greek flavors with feta, olives, capsicum, and oregano.",
    variants: [
      { size: "Small", price: 249 },
      { size: "Medium", price: 389 },
      { size: "Large", price: 529 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/veg-bbq5837.png",
    name: "veg bbq",
    description: "Smoky BBQ mushrooms, red onions, and sweet corn toppings.",
    variants: [
      { size: "Small", price: 219 },
      { size: "Medium", price: 349 },
      { size: "Large", price: 479 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/veg-mexican-ole2095.png",
    name: "veg mexican ole",
    description: "A vegetarian fiesta of jalapeños, onions, corn, and tomatoes.",
    variants: [
      { size: "Small", price: 229 },
      { size: "Medium", price: 359 },
      { size: "Large", price: 489 },
    ],
    isVeg: true,
    category: "pizza",
  },
  {
    image: "/pizzas/veggie-hawaiian3637.png",
    name: "veggie hawaiian",
    description: "Sweet pineapple chunk, jalapeños, and sweet corn tropical blend.",
    variants: [
      { size: "Small", price: 239 },
      { size: "Medium", price: 369 },
      { size: "Large", price: 499 },
    ],
    isVeg: true,
    category: "pizza",
  },
];

export const SIDES: MenuItem[] = [
  {
    image: "/sides/batata-pataka-4-pcs5914.png",
    name: "Batata Pataka 4 PCS",
    description: "Crispy and spicy potato bites served with signature dip.",
    variants: [{ size: "4 PCS", price: 299 }],
    isVeg: true,
    category: "side",
  },
  {
    image: "/sides/batata-pataka-8-pcs6574.png",
    name: "Batata Pataka 8 PCS",
    description: "Double the goodness of crispy and spicy potato bites.",
    variants: [{ size: "8 PCS", price: 399 }],
    isVeg: true,
    category: "side",
  },
  {
    image: "/sides/bbq-chicken-wings-4-pcs6015.png",
    name: "BBQ Chicken Wings 4 PCS",
    description: "Tender chicken wings coated in sweet and smoky BBQ sauce.",
    variants: [{ size: "4 PCS", price: 299 }],
    isVeg: false,
    category: "side",
  },
  {
    image: "/sides/bbq-chicken-wings-8-pcs3929.png",
    name: "BBQ Chicken Wings 8 PCS",
    description: "8 pieces of tender chicken wings coated in sweet and smoky BBQ sauce.",
    variants: [{ size: "8 PCS", price: 399 }],
    isVeg: false,
    category: "side",
  },
  {
    image: "/sides/breadsticks7323.png",
    name: "Breadsticks",
    description: "Freshly baked soft breadsticks seasoned with garlic and herbs.",
    variants: [
      { size: "M", price: 299 },
      { size: "L", price: 399 },
    ],
    isVeg: true,
    category: "side",
  },
  {
    image: "/sides/buffalo-chicken-wings-4-pcs6632.png",
    name: "Buffalo Chicken Wings 4 PCS",
    description: "Chicken wings tossed in spicy and tangy Buffalo wing sauce.",
    variants: [{ size: "4 PCS", price: 299 }],
    isVeg: false,
    category: "side",
  },
  {
    image: "/sides/buffalo-chicken-wings-8-pcs3628.png",
    name: "Buffalo Chicken Wings 8 PCS",
    description: "8 pieces of chicken wings tossed in spicy Buffalo sauce.",
    variants: [{ size: "8 PCS", price: 399 }],
    isVeg: false,
    category: "side",
  },
  {
    image: "/sides/cheeseticks5168.png",
    name: "Cheesesticks",
    description: "Freshly baked sticks loaded with melting mozzarella.",
    variants: [
      { size: "M", price: 299 },
      { size: "L", price: 399 },
    ],
    isVeg: true,
    category: "side",
  },
  {
    image: "/sides/chicken-pepperoni-rolls-4-pcs8980.png",
    name: "Chicken Pepperoni Rolls 4 PCS",
    description: "Bite-sized rolls stuffed with chicken pepperoni and cheese.",
    variants: [{ size: "4 PCS", price: 299 }],
    isVeg: false,
    category: "side",
  },
  {
    image: "/sides/chicken-pepperoni-rolls-8-pcs1959.png",
    name: "Chicken Pepperoni Rolls 8 PCS",
    description: "8 pieces of bite-sized rolls stuffed with chicken pepperoni.",
    variants: [{ size: "8 PCS", price: 399 }],
    isVeg: false,
    category: "side",
  },
];

export const BEVERAGES: MenuItem[] = [
  {
    image: "/beverages/coca-cola-350-ml-glass7254.png",
    name: "Coca Cola 350 ML Glass",
    description: "Refreshing Coca Cola served in a chilled 350 ml glass.",
    variants: [{ size: "350 ML", price: 79 }],
    isVeg: true,
    category: "beverage",
  },
  {
    image: "/beverages/coca-cola-pitcher8087.png",
    name: "Coca Cola Pitcher",
    description: "Large pitcher of chilled Coca Cola, perfect for sharing.",
    variants: [{ size: "Pitcher", price: 199 }],
    isVeg: true,
    category: "beverage",
  },
  {
    image: "/beverages/coke-330-ml-can-3367.png",
    name: "Coke 330 ML Can",
    description: "Classic Coca Cola in a convenient 330 ml can.",
    variants: [{ size: "330 ML", price: 60 }],
    isVeg: true,
    category: "beverage",
  },
  {
    image: "/beverages/coke-475-ml-pet3583.png",
    name: "Coke 475 ML PET",
    description: "Refreshing Coca Cola in a 475 ml PET bottle.",
    variants: [{ size: "475 ML", price: 75 }],
    isVeg: true,
    category: "beverage",
  },
  {
    image: "/beverages/coke-zero-330-ml-can-6357.png",
    name: "Coke Zero 330 ML Can",
    description: "Zero sugar Coca Cola in a chilled 330 ml can.",
    variants: [{ size: "330 ML", price: 60 }],
    isVeg: true,
    category: "beverage",
  },
  {
    image: "/beverages/water-bottle-1l9261.png",
    name: "Water Bottle 1L",
    description: "Pure and refreshing packaged drinking water.",
    variants: [{ size: "1 L", price: 40 }],
    isVeg: true,
    category: "beverage",
  },
];

export const DESSERTS: MenuItem[] = [
  {
    image: "/desserts/g.j.-scrolls-8-pcs5558.png",
    name: "GJ Scrolls 8 Pcs",
    description: "Soft, sweet scrolls topped with a rich glaze.",
    variants: [{ size: "8 Pieces", price: 249 }],
    isVeg: true,
    category: "dessert",
  },
  {
    image: "/desserts/gj-scrolls-4-pcs2384.png",
    name: "GJ Scrolls 4 Pcs",
    description: "Warm and fluffy sweet scrolls with a gooey center.",
    variants: [{ size: "4 Pieces", price: 149 }],
    isVeg: true,
    category: "dessert",
  },
  {
    image: "/desserts/lav'-at-first-bite3343.png",
    name: "Lav' At First Bite",
    description: "Indulgent molten lava cake with a rich chocolate center.",
    variants: [{ size: "Regular", price: 129 }],
    isVeg: true,
    category: "dessert",
  },
];

export const ALL_MENU_ITEMS: MenuItem[] = [
  ...PIZZAS,
  ...SIDES,
  ...BEVERAGES,
  ...DESSERTS,
];
