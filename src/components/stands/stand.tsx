import React from "react";
import Swiper from "@/components/swiper";
import FlowerCard from "../flowers/flowerCard";
import Link from "next/link";
const images = ["image 5.webp", "image 6.webp", "image 7.webp"];
export default function Stand() {
  return (
    <section className="flex items-center flex-col gap-3 py-4">
      <div className="w-10/12  flex justify-between">
        <h1 className="text-xl md:text-2xl text-main-color">Plant stands</h1>
        <Link href={""}>view all</Link>
      </div>
      <div className="relative w-full  md:w-11/12">
        <Swiper
          AliceCarouselProps={{
            responsive: {
              0: { items: 1 },
              768: { items: 2 },
              1024: { items: 3 },
            },
            paddingLeft: 10,
            paddingRight: 10,
            mouseTracking: true,
            disableDotsControls: true,
            disableButtonsControls: true,
          }}
          items={images.map((e, i) => (
            <FlowerCard
              key={i}
              className="mx-2 w-[270px] h-[370px] md:w-[300px] md:h-[400px]"
              imgProps={{
                sizes: "(min-width: 780px) 220px, 200px",
                objectFit: "cover",
                fill: true,
                src: "/images/" + e,
                alt: "cardImg",
                role: "presentation",
              }}
            />
          ))}
        />
      </div>
    </section>
  );
}
