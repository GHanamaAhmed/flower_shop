import React from "react";
import Swiper from "../swiper";
import FlowerCard from "./flowerCard";
import { Prisma } from "@prisma/client";
const options = {
  prices: true,
  thumbnail: true,
  productCategories: {
    select: {
      category: true,
    },
  },
};
export default function Flower({
  initialData,
}: {
  initialData: Prisma.ProductGetPayload<{ include: typeof options }>[];
}) {
  return (
    <div className="relative w-full">
      <Swiper
        AliceCarouselProps={{
          responsive: {
            0: { items: 1 },
            568: { items: 2 },
            768: { items: 3 },
            1024: { items: 4 },
          },
          paddingLeft: 50,
          paddingRight: 50,
          mouseTracking: true,
          disableDotsControls: true,
        }}
        navigationButton={true}
        items={initialData.map((e, i) => (
          <FlowerCard
            key={i}
            className="mx-2 w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
            name={e.name}
            price={e.prices[0].price + "$"}
            imgProps={{
              sizes: "(min-width: 780px) 220px, 200px",
              objectFit: "cover",
              fill: true,
              src: e.thumbnail.url,
              alt: "cardImg",
              role: "presentation",
            }}
            addToCard={true}
          />
        ))}
      />
    </div>
  );
}
