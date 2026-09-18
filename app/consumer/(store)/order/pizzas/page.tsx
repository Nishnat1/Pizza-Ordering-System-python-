import PizzaCard from "@/app/components/Cards/PizzaCard";

export default function Page() {
  const pizzas = [
    {
      image: "/pizzas/chicken-bbq6161.png",
      name: "chicken bbq",
      description: "",
      variants: [
        { size: "Small", price: 249 },
        { size: "Medium", price: 399 },
        { size: "Large", price: 549 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/chicken-florentine3740.png",
      name: "chicken florentine",
      description: "",
      variants: [
        { size: "Small", price: 269 },
        { size: "Medium", price: 419 },
        { size: "Large", price: 569 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/chicken-hawaiian2476.png",
      name: "chicken hawaiian",
      description: "",
      variants: [
        { size: "Small", price: 259 },
        { size: "Medium", price: 409 },
        { size: "Large", price: 559 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/chicken-mexican-ole-4683.png",
      name: "chicken mexican ole",
      description: "",
      variants: [
        { size: "Small", price: 279 },
        { size: "Medium", price: 429 },
        { size: "Large", price: 579 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/chicken-sausage9202.png",
      name: "chicken sausage",
      description: "",
      variants: [
        { size: "Small", price: 239 },
        { size: "Medium", price: 389 },
        { size: "Large", price: 539 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/double-cheese-dhamaka2611.png",
      name: "double cheese",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 329 },
        { size: "Large", price: 459 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/fiery-garden-delight-4818.png",
      name: "fiery garden delight",
      description: "",
      variants: [
        { size: "Small", price: 229 },
        { size: "Medium", price: 359 },
        { size: "Large", price: 489 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/garden-special7740.png",
      name: "garden special",
      description: "",
      variants: [
        { size: "Small", price: 219 },
        { size: "Medium", price: 349 },
        { size: "Large", price: 479 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/margherita3310.png",
      name: "margherita",
      description: "",
      variants: [
        { size: "Small", price: 179 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 419 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/paneer-garden-delight9774.png",
      name: "paneer garden delight",
      description: "",
      variants: [
        { size: "Small", price: 239 },
        { size: "Medium", price: 379 },
        { size: "Large", price: 519 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/spicy-garden-special7509.png",
      name: "spicy garden special",
      description: "",
      variants: [
        { size: "Small", price: 249 },
        { size: "Medium", price: 389 },
        { size: "Large", price: 529 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/spicy-italian5900.png",
      name: "spicy italian",
      description: "",
      variants: [
        { size: "Small", price: 289 },
        { size: "Medium", price: 439 },
        { size: "Large", price: 589 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/spicy-paneer-ranch2368.png",
      name: "spicy paneer ranch",
      description: "",
      variants: [
        { size: "Small", price: 259 },
        { size: "Medium", price: 399 },
        { size: "Large", price: 539 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/spinach-alfredo8170.png",
      name: "spinach alfredo",
      description: "",
      variants: [
        { size: "Small", price: 229 },
        { size: "Medium", price: 369 },
        { size: "Large", price: 499 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/the-greek-chicken7384.png",
      name: "the greek chicken",
      description: "",
      variants: [
        { size: "Small", price: 299 },
        { size: "Medium", price: 459 },
        { size: "Large", price: 619 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/the-greek-veggie7269.png",
      name: "the greek veggie",
      description: "",
      variants: [
        { size: "Small", price: 249 },
        { size: "Medium", price: 389 },
        { size: "Large", price: 529 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/veg-bbq5837.png",
      name: "veg bbq",
      description: "",
      variants: [
        { size: "Small", price: 219 },
        { size: "Medium", price: 349 },
        { size: "Large", price: 479 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/veg-mexican-ole2095.png",
      name: "veg mexican ole",
      description: "",
      variants: [
        { size: "Small", price: 229 },
        { size: "Medium", price: 359 },
        { size: "Large", price: 489 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/veggie-hawaiian3637.png",
      name: "veggie hawaiian",
      description: "",
      variants: [
        { size: "Small", price: 239 },
        { size: "Medium", price: 369 },
        { size: "Large", price: 499 },
      ],
      isVeg: true,
    },
  ];
  return (
    <div className="min-h-full">
      <section className="bg-white w-full py-6 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((item, index) => (
            <PizzaCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
