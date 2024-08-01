import FlowerCard from "@/components/main/flowers/flowerCard";
import Pagination from "@/components/main/pagination";
import { fetchProducts } from "@/lib/api";
import React from "react";
import { CategoryEnum } from "../../../../../../enums/products";
const options = {
  variants: true,
  thumbnail: true,
};
export default async function Page({
  params: { page, category },
  searchParams: { s },
}: {
  params: {
    page: number;
    category: string;
  };
  searchParams: {
    s?: string;
  };
}) {
  const products = await fetchProducts<typeof options>(
    page || 1,
    20,
    s || "",
    category == CategoryEnum.products ? CategoryEnum.products : category,
    false,
    options
  );
  return (
    <div className="w-11/12 gap-x-2 gap-y-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center py-5  ">
      {products.map((e, i) => (
        <FlowerCard
          key={i}
          id={e.id}
          className="w-[200px] h-[370px] md:w-[220px] md:h-[390px]"
          name={e.name}
          price={e.variants[0].price + "$"}
          imgProps={{
            sizes: "(min-width: 780px) 220px, 200px",
            objectFit: "cover",
            fill: true,
            src: e.thumbnail.url,
            alt: "cardImg",
            role: "presentation",
          }}
        />
      ))}
      <div className="col-span-full flex justify-center">
        <Pagination nPage={products.length || 1} currentPage={Number(page)} />
      </div>
    </div>
  );
}
