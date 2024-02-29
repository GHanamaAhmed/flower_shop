import React from "react";
import ProductSwiper from "../_components/productSwiper";
import Image from "next/image";
import { Button, Input, Option, Select } from "@mui/joy";
import Flower from "@/components/flowers/flower";
const itemsLength = Array.from({ length: 5 });
const items = itemsLength.map((item, index) => {
  return (
    <div
      key={index}
      className="item w-full min-h-80 md:w-[517px] md:h-[517px] relative flex justify-center items-center"
    >
      <img
        className="object-cover"
        src={"/images/katsia-jazwinska-y-IwXNMxN_o-unsplash 1.jpg"}
        alt={`${index}`}
      />
    </div>
  );
});
export default function Page({
  params: { id },
}: {
  params: {
    id: number;
  };
}) {
  return (
    <main className="w-full">
      <section className="w-full gap-y-2 grid grid-cols-1 md:grid-cols-2 md:gap-4 md:pt-20 px-2 md:px-10">
        <div>
          <ProductSwiper items={items} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl md:text-2xl text-main-color">Flowers</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p>
          <p className="font-bold">30.00$</p>
          <div className="w-full flex flex-wrap gap-2">
            <div className="w-[50px] h-[28px] bg-[#F7A928]"></div>
          </div>
          <Select
            className="w-full border border-main-color rounded-none"
            placeholder="Sizes"
          >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
          </Select>
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold">Quntity</p>
            <Input
              type="number"
              className="rounded-none border border-main-color"
              defaultValue={1}
              slotProps={{
                input: {
                  min: 1,
                  max: 5,
                },
              }}
            />
          </div>
          <button className="text-main-color border border-main-color w-full py-2 hover:text-white-color hover:bg-main-color active:text-white-color active:bg-main-color">
            ADD TO CART
          </button>
          <button className="text-main-color border border-main-color w-full py-2 hover:text-white-color hover:bg-main-color active:text-white-color active:bg-main-color">
            BUY
          </button>
        </div>
      </section>
      <section className="w-full flex flex-col items-center py-10 gap-3">
        <div className="w-10/12  flex justify-between">
          <h1 className="text-xl md:text-2xl text-main-color font-bold">
            Recommandation
          </h1>
        </div>
        <Flower />
      </section>
    </main>
  );
}
