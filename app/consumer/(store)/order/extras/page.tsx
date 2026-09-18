import ExtraCard from "@/app/components/Cards/ExtraCard";

export default function Page() {
 const extras = [
  {
    image: "/extras/bbq-sauce2945.png",
    name: "BBQ Sauce",
    description:
      "Smoky and tangy barbecue sauce that adds a rich burst of flavor to your pizza and sides.",
    variants: [
      {
        size: "Single Dip",
        price: 25,
      },
    ],
    isVeg: true,
  },
  {
    image: "/extras/hot-buffalo-sauce1043.png",
    name: "Hot Buffalo Sauce",
    description:
      "A spicy and zesty buffalo sauce with the perfect balance of heat and flavor.",
    variants: [
      {
        size: "Single Dip",
        price: 25,
      },
    ],
    isVeg: true,
  },
  {
    image: "/extras/pepperoncini-(3-pcs)3128.png",
    name: "Pepperoncini (3 Pcs)",
    description:
      "Mildly spicy and tangy pepperoncini peppers that complement pizzas and snacks perfectly.",
    variants: [
      {
        size: "3 Pieces",
        price: 20,
      },
    ],
    isVeg: true,
  },
  {
    image: "/extras/pizza-sauce9345.png",
    name: "Pizza Sauce",
    description:
      "Classic tomato-based pizza sauce seasoned with herbs and spices for extra flavor.",
    variants: [
      {
        size: "Single Dip",
        price: 20,
      },
    ],
    isVeg: true,
  },
  {
    image: "/extras/ranch-sauce2285.png",
    name: "Ranch Sauce",
    description:
      "Creamy ranch dipping sauce with a smooth texture and savory herb flavors.",
    variants: [
      {
        size: "Single Dip",
        price: 30,
      },
    ],
    isVeg: true,
  },
  {
    image: "/extras/special-garlic-sauce8338.png",
    name: "Special Garlic Sauce",
    description:
      "Rich and creamy garlic sauce that pairs perfectly with pizza crusts and sides.",
    variants: [
      {
        size: "Single Dip",
        price: 30,
      },
    ],
    isVeg: true,
  },
  {
    image: "/extras/tomato-ketchup-sachets1052.png",
    name: "Tomato Ketchup Sachets",
    description:
      "Convenient ketchup sachets made from ripe tomatoes for a classic dipping experience.",
    variants: [
      {
        size: "2 Sachets",
        price: 10,
      },
    ],
    isVeg: true,
  },
];
  return (
    <div className="min-h-full">
      <section className="bg-white w-full py-6 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {extras.map((item, index) => (
            <ExtraCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
