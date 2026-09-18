import React from "react";

export const metadata = {
  title: "Restaurant Operations — Pizza",
  description: "Live order queue and kitchen management dashboard for restaurant staff.",
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
