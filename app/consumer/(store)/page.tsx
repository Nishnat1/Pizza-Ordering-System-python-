"use client";

import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Page() {
  const categories = [
    // "Deals",
    // "Recommended",
    { name: "Pizzas", image: "/pizzas.png", url: "/consumer/order/pizzas" },
    { name: "Sides", image: "/sides.png", url: "/consumer/order/sides" },
    {
      name: "Beverages",
      image: "/beverages.png",
      url: "/consumer/order/beverages",
    },
    {
      name: "Desserts",
      image: "/desserts.jpg",
      url: "/consumer/order/desserts",
    },
  ];
  const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-100 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Hero ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={clsx("h-3 rounded-full transition-all", {
                "w-8 bg-white": current === index,
                "w-3 bg-white/50": current !== index,
              })}
            />
          ))}
        </div>
      </section>

      {/* Explore Menu */}
      <section className="bg-[#f7f7f7] py-20 flex">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Explore Our Menu
          </h2>

          <div className="lg:w-2xl grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((item) => (
              <Link href={item.url} key={item.name}>
                <div className="text-center transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <div className="relative mb-1 h-40 w-37.5 overflow-hidden rounded-3xl bg-white shadow-md mx-auto">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold">{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/consumer/order"
              className="rounded-full border-2 border-green-900 px-8 py-3 font-semibold text-green-900 transition hover:bg-green-900 hover:text-white"
            >
              Explore More →
            </Link>
          </div>
        </div>
      </section>

      {/* Favourites */}
      <section className="bg-[#f7f7f7] pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Explore Our Favourites
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="h-80 rounded-3xl shadow-md bg-[url(/favourite1.jpg)] bg-cover" />
            <div className="h-80 rounded-3xl bg-white shadow-md bg-[url(/favourite2.jpg)] bg-cover" />
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={"/consumer/order"}
              className="rounded-full border-2 border-green-900 px-8 py-3 font-semibold text-green-900 transition hover:bg-green-900 hover:text-white"
            >
              Explore More →
            </Link>
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="bg-black py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-bold text-white">Download Our App</h2>

            <p className="mt-4 max-w-md text-gray-300">
              Get our best offers directly on your device and order your
              favourite pizza anytime.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <button className="rounded-lg bg-white px-6 py-3 font-semibold">
                App Store
              </button>

              <button className="rounded-lg bg-white px-6 py-3 font-semibold">
                Google Play
              </button>
            </div>
          </div>

          <div className="h-125 w-62.5 rounded-[40px] border-8 border-gray-700 bg-white shadow-2xl relative">
            <Image
              src="/mobileView.png"
              alt="Mobile App"
              fill
              className="rounded-[40px]"
            />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black text-zinc-300">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-white">Pizza</h3>
              <p className="mt-2 max-w-sm text-sm text-zinc-400">
                Freshly baked pizzas delivered hot to your doorstep. Order your
                favourite pizza anytime, anywhere.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-3 font-semibold text-white">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  href="/consumer"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <a href="/menu" className="hover:text-white transition-colors">
                  Menu
                </a>
                <a
                  href="/offers"
                  className="hover:text-white transition-colors"
                >
                  Offers
                </a>
                <a
                  href="/track-order"
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="mb-3 font-semibold text-white">Support</h4>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-3 font-semibold text-white">Contact</h4>
              <div className="space-y-2 text-sm">
                <p>support@pizza.com</p>
                <p>+91 98765 43210</p>
                <p>Open Daily: 10:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Pizza. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
