"use client";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

type ThumbItemsProps = (
  items: React.ReactNode[] | undefined,
  [setThumbIndex, setThumbAnimation]: [
    (index: number) => void,
    (animate: boolean) => void
  ]
) => JSX.Element[] | undefined;
type ProductSwiperProps = {
  items: JSX.Element[] | undefined;
};
const thumbItems: ThumbItemsProps = (
  items,
  [setThumbIndex, setThumbAnimation]
) => {
  return items?.map((item: React.ReactNode, i: number) => (
    <div
      className="thumb w-20 h-20 mx-3 flex border justify-center items-center "
      onClick={() => (setThumbIndex(i), setThumbAnimation(true))}
    >
      {i + 1}
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
      activeIndex={mainIndex}
      animationType="fadeout"
      animationDuration={800}
      disableDotsControls
      autoHeight
      disableButtonsControls
      items={items}
      mouseTracking={!thumbAnimation}
      onSlideChange={syncMainBeforeChange}
      onSlideChanged={syncMainAfterChange}
      touchTracking={!thumbAnimation}
    />,
    <div className="thumbs">
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
