"use client";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import type { Props } from "react-alice-carousel/lib/types";
import "react-alice-carousel/lib/alice-carousel.css";
import FlowerCard from "./flowers/flowerCard";
import Image from "next/image";
type renderNextButtonProps = {
  isDisabled?: boolean | undefined;
};
type SwiperProps = {
  AliceCarouselProps: Props;
  navigationButton?: boolean;
  items?: React.ReactNode[];
};
const renderPrevButton = ({ isDisabled }: renderNextButtonProps) => {
  return isDisabled ? undefined : (
    <span className="  absolute top-1/2 -translate-y-1/2 left-5 hidden md:inline-block text-6xl">
      &lang;
    </span>
  );
};
const renderNextButton = ({ isDisabled }: renderNextButtonProps) => {
  return isDisabled ? undefined : (
    <span className="  absolute top-1/2 -translate-y-1/2 right-5 hidden md:inline-block text-6xl">
      &rang;
    </span>
  );
};
export default function Swiper({
  AliceCarouselProps,
  items,
  navigationButton,
}: SwiperProps) {

  return (
    <AliceCarousel
      renderNextButton={navigationButton ? renderNextButton : undefined}
      renderPrevButton={navigationButton ? renderPrevButton : undefined}
      {...AliceCarouselProps}
      items={items}
    />
  );
}
