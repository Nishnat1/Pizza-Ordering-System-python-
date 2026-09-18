import BeveragesCard from "@/app/components/Cards/BeverageCard";

export default function Page() {
  const beverages = [
  {
    image: "/beverages/coca-cola-350-ml-glass7254.png",
    name: "Coca Cola 350 ML Glass",
    description: "Refreshing Coca Cola served in a chilled 350 ml glass.",
    variants: [{ size: "350 ML", price: 79 }],
    isVeg: true,
  },
  {
    image: "/beverages/coca-cola-pitcher8087.png",
    name: "Coca Cola Pitcher",
    description: "Large pitcher of chilled Coca Cola, perfect for sharing.",
    variants: [{ size: "Pitcher", price: 199 }],
    isVeg: true,
  },
  {
    image: "/beverages/coke-330-ml-can-3367.png",
    name: "Coke 330 ML Can",
    description: "Classic Coca Cola in a convenient 330 ml can.",
    variants: [{ size: "330 ML", price: 60 }],
    isVeg: true,
  },
  {
    image: "/beverages/coke-475-ml-pet3583.png",
    name: "Coke 475 ML PET",
    description: "Refreshing Coca Cola in a 475 ml PET bottle.",
    variants: [{ size: "475 ML", price: 75 }],
    isVeg: true,
  },
  {
    image: "/beverages/coke-zero-330-ml-can-6357.png",
    name: "Coke Zero 330 ML Can",
    description: "Zero sugar Coca Cola in a chilled 330 ml can.",
    variants: [{ size: "330 ML", price: 60 }],
    isVeg: true,
  },
  {
    image: "/beverages/coke-zero-350-ml-glass5705.png",
    name: "Coke Zero 350 ML Glass",
    description: "Refreshing Coke Zero served in a chilled 350 ml glass.",
    variants: [{ size: "350 ML", price: 79 }],
    isVeg: true,
  },
  {
    image: "/beverages/coke-zero-pitcher2367.png",
    name: "Coke Zero Pitcher",
    description: "Large pitcher of Coke Zero, ideal for sharing.",
    variants: [{ size: "Pitcher", price: 199 }],
    isVeg: true,
  },
  {
    image: "/beverages/fanta-330-ml-can4194.png",
    name: "Fanta 330 ML Can",
    description: "Orange-flavored Fanta in a refreshing 330 ml can.",
    variants: [{ size: "330 ML", price: 60 }],
    isVeg: true,
  },
  {
    image: "/beverages/fanta-350-ml-glass1233.png",
    name: "Fanta 350 ML Glass",
    description: "Chilled orange Fanta served in a 350 ml glass.",
    variants: [{ size: "350 ML", price: 79 }],
    isVeg: true,
  },
  {
    image: "/beverages/fanta-595-ml-pet7750.png",
    name: "Fanta 595 ML PET",
    description: "Refreshing orange Fanta in a 595 ml PET bottle.",
    variants: [{ size: "595 ML", price: 89 }],
    isVeg: true,
  },
  {
    image: "/beverages/fanta-pitcher4014.png",
    name: "Fanta Pitcher",
    description: "Large pitcher of chilled orange Fanta.",
    variants: [{ size: "Pitcher", price: 199 }],
    isVeg: true,
  },
  {
    image: "/beverages/sprite-330-ml-can4152.png",
    name: "Sprite 330 ML Can",
    description: "Lemon-lime flavored Sprite in a chilled 330 ml can.",
    variants: [{ size: "330 ML", price: 60 }],
    isVeg: true,
  },
  {
    image: "/beverages/sprite-350-ml-glass5295.png",
    name: "Sprite 350 ML Glass",
    description: "Refreshing Sprite served in a chilled 350 ml glass.",
    variants: [{ size: "350 ML", price: 79 }],
    isVeg: true,
  },
  {
    image: "/beverages/sprite-595-ml-pet4733.png",
    name: "Sprite 595 ML PET",
    description: "Refreshing lemon-lime Sprite in a 595 ml PET bottle.",
    variants: [{ size: "595 ML", price: 89 }],
    isVeg: true,
  },
  {
    image: "/beverages/sprite-pitcher2633.png",
    name: "Sprite Pitcher",
    description: "Large pitcher of chilled Sprite, perfect for groups.",
    variants: [{ size: "Pitcher", price: 199 }],
    isVeg: true,
  },
  {
    image: "/beverages/water-bottle-1l9261.png",
    name: "Water Bottle 1L",
    description: "Pure and refreshing packaged drinking water.",
    variants: [{ size: "1 L", price: 40 }],
    isVeg: true,
  },
  {
    image: "/beverages/water-bottle-500-ml4176.png",
    name: "Water Bottle 500 ML",
    description: "Pure packaged drinking water in a convenient bottle.",
    variants: [{ size: "500 ML", price: 20 }],
    isVeg: true,
  },
];
  return (
    <div className="min-h-full">
      <section className="bg-white w-full py-6 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beverages.map((item, index) => (
            <BeveragesCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
