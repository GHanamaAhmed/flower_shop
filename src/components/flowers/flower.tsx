import React from "react";
import Search from "../search";
import Swiper from "../swiper";
import FlowerCard from "./flowerCard";
export default function Flower() {
  return (
    <section className="flex items-center flex-col gap-3">
      <div className="w-10/12  flex justify-between">
        <h1 className="text-xl md:text-2xl text-main-color">Flowers</h1>
        <p>view all</p>
      </div>
      <Search className="w-10/12 " />
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
          items={[
            <FlowerCard
              className="mx-2 w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
              name="Peperomia Ginny"
              price="30$"
              imgProps={{
                objectFit: "cover",
                fill: true,
                src: "/images/katsia-jazwinska-y-IwXNMxN_o-unsplash 1.jpg",
                alt: "cardImg",
                role: "presentation",
              }}
              addToCard={true}
            />,
          ]}
        />
      </div>
    </section>
  );
}