import DessertCard from "@/app/components/Cards/DessertCard";

export default function Page() {
  const desserts = [
  {
    image: "/desserts/g.j.-scrolls-8-pcs5558.png",
    name: "GJ Scrolls 8 Pcs",
    description:
      "Soft, freshly baked sweet scrolls topped with a rich glaze, perfect for sharing and satisfying your dessert cravings.",
    variants: [
      {
        size: "8 Pieces",
        price: 249,
      },
    ],
    isVeg: true,
  },
  {
    image: "/desserts/gj-scrolls-4-pcs2384.png",
    name: "GJ Scrolls 4 Pcs",
    description:
      "A delightful serving of warm and fluffy sweet scrolls with a deliciously gooey center and sweet icing.",
    variants: [
      {
        size: "4 Pieces",
        price: 149,
      },
    ],
    isVeg: true,
  },
  {
    image: "/desserts/lav'-at-first-bite3343.png",
    name: "Lav' At First Bite",
    description:
      "An indulgent molten lava cake with a rich chocolate center that melts with every bite.",
    variants: [
      {
        size: "Regular",
        price: 129,
      },
    ],
    isVeg: true,
  },
];
  return (
    <div className="min-h-full">
      <section className="bg-white w-full py-6 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {desserts.map((item, index) => (
            <DessertCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
