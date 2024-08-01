"use client";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

type ThumbItemsProps = (
  items: string[],
  [setThumbIndex, setThumbAnimation]: [
    (index: number) => void,
    (animate: boolean) => void
  ]
) => JSX.Element[] | undefined;
type ProductSwiperProps = {
  items: string[];
};
const thumbItems: ThumbItemsProps = (
  items,
  [setThumbIndex, setThumbAnimation]
) => {
  return items?.map((url: string, i: number) => (
    <div
      key={i}
      className="thumb w-20 h-20 md:h-32 md:w-32 mx-3 flex border relative justify-center items-center "
      onClick={() => (setThumbIndex(i), setThumbAnimation(true))}
    >
      <CldImage className="object-cover" fill src={url} alt={`${i}`} />
    </div>
  ));
};
const responsive = {
  0: { items: 3 },
};
export default function ProductSwiper({ items }: ProductSwiperProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [mainAnimation, setMainAnimation] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [thumbAnimation, setThumbAnimation] = useState(false);
  const [thumbs] = useState(
    thumbItems(items, [setThumbIndex, setThumbAnimation])
  );

  const syncMainBeforeChange = (e: any) => {
    setMainAnimation(true);
  };

  const syncMainAfterChange = (e: any) => {
    setMainAnimation(false);

    if (e.type === "action") {
      setThumbIndex(e.item);
      setThumbAnimation(false);
    } else {
      setMainIndex(thumbIndex);
    }
  };

  const syncThumbs = (e: any) => {
    setThumbIndex(e.item);
    setThumbAnimation(false);

    if (!mainAnimation) {
      setMainIndex(e.item);
    }
  };

  return [
    <AliceCarousel
      key={0}
      activeIndex={mainIndex}
      animationType="fadeout"
      animationDuration={800}
      disableDotsControls
      autoHeight
      disableButtonsControls
      items={items?.map((url, i) => (
        <div className="w-full flex justify-center items-center">
          <CldImage
            className="object-cover min-h-80 md:w-7/12 h-auto"
            src={url}
            alt={`${i}`}
            width={500}
            height={500}
          />
        </div>
      ))}
      mouseTracking={!thumbAnimation}
      onSlideChange={syncMainBeforeChange}
      onSlideChanged={syncMainAfterChange}
      touchTracking={!thumbAnimation}
    />,
    <div key={1} className="thumbs mt-3">
      <AliceCarousel
        activeIndex={thumbIndex}
        autoWidth
        responsive={responsive}
        disableDotsControls
        disableButtonsControls
        items={thumbs}
        mouseTracking={false}
        onSlideChanged={syncThumbs}
        touchTracking={!mainAnimation}
      />
    </div>,
  ];
}
