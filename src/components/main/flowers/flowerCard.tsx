"use client";
import React from "react";
import Image from "next/image";
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";
import type { ImageProps } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { CldImage, CldOgImage } from "next-cloudinary";
type FlowerCardProps = {
  id: string;
  imgProps?: ImageProps;
  name?: string;
  price?: string;
  addToCard?: boolean;
  className?: string;
};
export default function FlowerCard({
  id,
  imgProps,
  name,
  price,
  addToCard,
  className,
}: FlowerCardProps) {
  const handleDragStart = (e: any) => e.preventDefault();
  return (
    <Link
      href={"/product/" + id}
      onDragStart={handleDragStart}
      className={"flex flex-col gap-1 " + className}
    >
      <div className="w-full relative flex-1">
        <CldImage {...imgProps} />
      </div>
      {(name || price) && (
        <div className="w-full grid grid-cols-10">
          <p className="col-span-7 truncate">{name}</p>
          <p className="col-span-3 text-end truncate">{price}</p>
        </div>
      )}
      {addToCard && (
        <button className="w-full py-2 bg-main-color text-white-color">
          Add to Card
        </button>
      )}
    </Link>
  );
}
