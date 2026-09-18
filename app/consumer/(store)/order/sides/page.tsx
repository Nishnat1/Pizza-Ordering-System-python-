import SideCard from "@/app/components/Cards/SideCard";

export default function Page() {
  const sides = [
    {
      image: "/sides/batata-pataka-4-pcs5914.png",
      name: "Batata Pataka 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: true,
    },
    {
      image: "/sides/batata-pataka-8-pcs6574.png",
      name: "Batata Pataka 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: true,
    },
    {
      image: "/sides/bbq-chicken-wings-4-pcs6015.png",
      name: "BBQ Chicken Wings 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: false,
    },
    {
      image: "/sides/bbq-chicken-wings-8-pcs3929.png",
      name: "BBQ Chicken Wings 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: false,
    },
    {
      image: "/sides/breadsticks7323.png",
      name: "Breadsticks",
      description: "this is a side",
      variants: [
        { size: "M", price: 299 },
        { size: "L", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/sides/buffalo-chicken-wings-4-pcs6632.png",
      name: "Buffalo Chicken Wings 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: false,
    },
    {
      image: "/sides/buffalo-chicken-wings-8-pcs3628.png",
      name: "Buffalo Chicken Wings 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: false,
    },
    {
      image: "/sides/cheeseticks5168.png",
      name: "Cheesesticks",
      description: "this is a side",
      variants: [
        { size: "M", price: 299 },
        { size: "L", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/sides/chicken-pepperoni-rolls-4-pcs8980.png",
      name: "Chicken Pepperoni Rolls 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: false,
    },
    {
      image: "/sides/chicken-pepperoni-rolls-8-pcs1959.png",
      name: "Chicken Pepperoni Rolls 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: false,
    },
    {
      image: "/sides/double-chilli-cheesesticks6771.png",
      name: "Double Chilli Cheesesticks",
      description: "this is a side",
      variants: [
        { size: "M", price: 299 },
        { size: "L", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/sides/firecracker-chicken-wings-4-pcs7260.png",
      name: "Firecracker Chicken Wings 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: false,
    },
    {
      image: "/sides/firecracker-chicken-wings-8-pcs2763.png",
      name: "Firecracker Chicken Wings 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: false,
    },
    {
      image: "/sides/garlic-parmesan-breadsticks1787.png",
      name: "Garlic Parmesan Breadsticks",
      description: "this is a side",
      variants: [
        { size: "M", price: 299 },
        { size: "L", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/sides/potato-wedges4308.png",
      name: "Potato Wedges",
      description: "this is a side",
      variants: [
        { size: "M", price: 299 },
        { size: "L", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/sides/roasted-chicken-wings-4-pcs6295.png",
      name: "Roasted Chicken Wings 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: false,
    },
    {
      image: "/sides/roasted-chicken-wings-8-pcs6711.png",
      name: "Roasted Chicken Wings 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: false,
    },
    {
      image: "/sides/spicy-chicken-poppers-4pcs9889.png",
      name: "Spicy Chicken Poppers 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: false,
    },
    {
      image: "/sides/spicy-chicken-poppers-8-pcs5706.png",
      name: "Spicy Chicken Poppers 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: false,
    },
    {
      image: "/sides/spicy-paneer-rolls-4-pcs3066.png",
      name: "Spicy Paneer Rolls 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: true,
    },
    {
      image: "/sides/spicy-paneer-rolls-8-pcs9749.png",
      name: "Spicy Paneer Rolls 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: true,
    },
    {
      image: "/sides/tikka-tikka-bang-bang-4-pcs1759.png",
      name: "Tikka Tikka Bang Bang 4 PCS",
      description: "this is a side",
      variants: [{ size: "4 PCS", price: 299 }],
      isVeg: false,
    },
    {
      image: "/sides/tikka-tikka-bang-bang-8-pcs8975.png",
      name: "Tikka Tikka Bang Bang 8 PCS",
      description: "this is a side",
      variants: [{ size: "8 PCS", price: 399 }],
      isVeg: false,
    },
  ];
  return (
    <div className="min-h-full">
      <section className="bg-white w-full py-6 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sides.map((item, index) => (
            <SideCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
