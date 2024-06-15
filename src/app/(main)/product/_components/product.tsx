"use client"
import React, { useMemo, useState } from "react";
import ProductSwiper from "./productSwiper";
import { Input, Option, Select, Snackbar, SnackbarProps } from "@mui/joy";
import { Prisma } from "@prisma/client";
const productInclude = {
  productCategories: {
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  },
  variants: {
    include: {
      color: true,
      size: true,
      pictures: {
        select: {
          picture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  },
  thumbnail: {
    select: {
      url: true,
    },
  },
};
export default function Product({
  product,
}: {
  product: Prisma.ProductGetPayload<{ include: typeof productInclude }> | null;
}) {
  const [sizeId, setSizeId] = useState<string>("");
  const [colorId, setColorId] = useState<string>("");
  const [quntity, setQuntity] = useState<number>(1);
  const [pictures, setPictures] = useState<string[]>([]);
  const [snackColor, setSnackColor] =
    React.useState<SnackbarProps["color"]>("success");
  const [open, setOpen] = React.useState(false);
  const items = useMemo(
    () =>
      product?.variants
        .filter(
          (e) =>
            colorId == "" ||
            sizeId == "" ||
            (e.colorId == colorId && sizeId == "") ||
            (e.sizeId == sizeId && colorId == "") ||
            (e.sizeId == sizeId && e.colorId == colorId)
        )
        .map((e) =>
          e.pictures
            .map((e) => e.picture.url)
            .map((url, index) => {
              return (
                <div
                  key={index}
                  className="item w-full min-h-80 md:w-[517px] md:h-[517px] relative flex justify-center items-center"
                >
                  <img className="object-cover" src={url} alt={`${index}`} />
                </div>
              );
            })
        )
        .flat(),
    [sizeId, colorId]
  );
  const addToCartHandler = async () => {
    const res = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify({
        productId: product?.id,
        sizeId,
        colorId,
        quntity,
      }),
    });
    if (!res.ok) {
      setSnackColor("success");
      setOpen(true);
    } else {
      setSnackColor("warning");
      setOpen(true);
    }
    await new Promise(() => setTimeout(() => setOpen(false), 3000));
  };
  const buyHandler = async () => {
    const res = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify({
        productId: product?.id,
        sizeId,
        colorId,
        quntity,
      }),
    });
    if (!res.ok) {
      setSnackColor("success");
      setOpen(true);
    } else {
      setSnackColor("warning");
      setOpen(true);
    }
    await new Promise(() => setTimeout(() => setOpen(false), 3000));
  }
  return (
    <main className="w-full">
      <section className="w-full gap-y-2 grid grid-cols-1 md:grid-cols-2 md:gap-4 md:pt-20 px-2 md:px-10">
        <div>
          <ProductSwiper items={items} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl md:text-2xl text-main-color">
            {product?.productCategories.map((e) => e.category.name).join(", ")}
          </h1>
          <p>{product?.description}</p>
          <p className="font-bold">{30.0}$</p>
          <div className="w-full flex flex-wrap gap-2">
            <span
              onClick={() => setColorId("")}
              className={`w-[50px] h-[28px] border`}
            ></span>
            {product?.variants
              .filter((e) => e.sizeId == sizeId || sizeId == "")
              .map((e, i) => (
                <span
                  key={i}
                  onClick={() => setColorId(e.colorId)}
                  className={`w-[50px] h-[28px] bg-[${e.color.name}]`}
                ></span>
              ))}
          </div>
          <Select
            onSelect={(e) => setSizeId(e.currentTarget.value)}
            className="w-full border border-main-color rounded-none"
            placeholder="Sizes"
          >
            <Option value={""}>All</Option>
            {product?.variants
              .filter((e) => e.colorId == colorId || colorId == "")
              .map((e, i) => (
                <Option key={i} value={e.sizeId}>
                  {e.size.name}
                </Option>
              ))}
          </Select>
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold">Quntity</p>
            <Input
              type="number"
              className="rounded-none border border-main-color"
              defaultValue={1}
              onChange={(e) => setQuntity(+e.currentTarget.value)}
              slotProps={{
                input: {
                  min: 1,
                  max: product?.variants.find(
                    (e) => e.colorId == colorId && e.sizeId == sizeId
                  )?.quantity,
                },
              }}
            />
          </div>
          <button onClick={addToCartHandler} className="text-main-color border border-main-color w-full py-2 hover:text-white-color hover:bg-main-color active:text-white-color active:bg-main-color">
            ADD TO CART
          </button>
          <button  className="text-main-color border border-main-color w-full py-2 hover:text-white-color hover:bg-main-color active:text-white-color active:bg-main-color">
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
        {/* <Flower /> */}
      </section>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        color={snackColor}
        open={open}
      >
        I love snacks
      </Snackbar>
    </main>
  );
}
