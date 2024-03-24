import React from "react";
import Swiper from "../swiper";
import FlowerCard from "./flowerCard";
const images = [
  "katsia-jazwinska-y-IwXNMxN_o-unsplash 12.webp",
  "katsia-jazwinska-y-IwXNMxN_o-unsplash 1-1.webp",
  "katsia-jazwinska-y-IwXNMxN_o-unsplash 1 (2).webp",
  "katsia-jazwinska-y-IwXNMxN_o-unsplash 1.webp",
  "katsia-jazwinska-y-IwXNMxN_o-unsplash 2.webp",
];
export default function Flower() {
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
        items={images.map((e, i) => (
          <FlowerCard
            key={i}
            className="mx-2 w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
            name="Peperomia Ginny"
            price="30$"
            imgProps={{
              sizes: "(min-width: 780px) 220px, 200px",
              objectFit: "cover",
              fill: true,
              src: "/images/" + e,
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
