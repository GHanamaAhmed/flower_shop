import FlowerCard from "@/components/flowers/flowerCard";
import Pagination from "@/components/pagination";
import React from "react";

export default function Page({
  params: { page },
}: {
  params: {
    page: number;
  };
}) {
  return (
    <div className="w-11/12 gap-x-2 gap-y-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center py-5  ">
      <FlowerCard
        className="w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
        name="Peperomia Ginny"
        price="30$"
        imgProps={{
          sizes: "(min-width: 780px) 220px, 200px",
          objectFit: "cover",
          fill: true,
          src: "/images/katsia-jazwinska-y-IwXNMxN_o-unsplash 1.jpg",
          alt: "cardImg",
          role: "presentation",
        }}
        addToCard={true}
      />
      <FlowerCard
        className="w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
        name="Peperomia Ginny"
        price="30$"
        imgProps={{
          sizes: "(min-width: 780px) 220px, 200px",
          objectFit: "cover",
          fill: true,
          src: "/images/katsia-jazwinska-y-IwXNMxN_o-unsplash 1.jpg",
          alt: "cardImg",
          role: "presentation",
        }}
        addToCard={true}
      />
      <FlowerCard
        className="w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
        name="Peperomia Ginny"
        price="30$"
        imgProps={{
          sizes: "(min-width: 780px) 220px, 200px",
          objectFit: "cover",
          fill: true,
          src: "/images/katsia-jazwinska-y-IwXNMxN_o-unsplash 1.jpg",
          alt: "cardImg",
          role: "presentation",
        }}
        addToCard={true}
      />
      <FlowerCard
        className="w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
        name="Peperomia Ginny"
        price="30$"
        imgProps={{
          sizes: "(min-width: 780px) 220px, 200px",
          objectFit: "cover",
          fill: true,
          src: "/images/katsia-jazwinska-y-IwXNMxN_o-unsplash 1.jpg",
          alt: "cardImg",
          role: "presentation",
        }}
        addToCard={true}
      />
      <FlowerCard
        className="w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
        name="Peperomia Ginny"
        price="30$"
        imgProps={{
          sizes: "(min-width: 780px) 220px, 200px",
          objectFit: "cover",
          fill: true,
          src: "/images/katsia-jazwinska-y-IwXNMxN_o-unsplash 1.jpg",
          alt: "cardImg",
          role: "presentation",
        }}
        addToCard={true}
      />
      <div className="col-span-full flex justify-center">
        <Pagination nPage={15} currentPage={Number(page)} />
      </div>
    </div>
  );
}
