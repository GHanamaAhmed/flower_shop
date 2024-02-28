import React from "react";
import Swiper from "../swiper";
import FlowerCard from "../flowers/flowerCard";

export default function Stand() {
  return (
    <section className="flex items-center flex-col gap-3 py-4">
      <div className="w-10/12  flex justify-between">
        <h1 className="text-xl md:text-2xl text-main-color">Plant stands</h1>
        <p>view all</p>
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
          items={[
            <FlowerCard
              className="mx-2 w-[270px] h-[370px] md:w-[300px] md:h-[400px]"
              imgProps={{
                objectFit:"cover",
                fill: true,
                src: "/images/katsia-jazwinska-y-IwXNMxN_o-unsplash 1.jpg",
                alt: "cardImg",
                role: "presentation",
              }}
            />,
          ]}
        />
      </div>
    </section>
  );
}
