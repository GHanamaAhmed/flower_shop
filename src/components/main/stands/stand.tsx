"use client";
import React from "react";
import Swiper from "@/components/main/swiper";
import FlowerCard from "../flowers/flowerCard";
import Link from "next/link";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { Prisma, Product } from "@prisma/client";
const textVariants: Variants = {
  hide: {
    opacity: 0,
    translateX: "100%",
  },
  show: {
    scale: 1,
    opacity: 1,
    translateX: 0,
    transition: {
      duration: 1,
    },
  },
};
const options = {
  variants: true,
  thumbnail: true,
  productCategories: {
    select: {
      category: true,
    },
  },
};

export default function Stand({
  initialData,
}: {
  initialData: Prisma.ProductGetPayload<{ include: typeof options }>[];
}) {
  const mainControle = useAnimation();
  const containerRef = useRef(null);
  const containerInView = useInView(containerRef, { once: true, amount: 0.8 });
  useEffect(() => {
    if (containerInView) {
      mainControle.start("show");
    }
  }, [containerInView]);
  return (
    <motion.section
      ref={containerRef}
      initial="hide"
      animate={mainControle}
      transition={{ staggerChildren: 0.4, delayChildren: 0.5 }}
      className="flex items-center flex-col gap-3 py-4"
    >
      <div className="w-10/12  flex justify-between">
        <motion.h1
          variants={textVariants}
          className="text-xl md:text-2xl text-main-color"
        >
          Plant stands
        </motion.h1>
        <motion.span variants={textVariants}>
          <Link href={"/stands/1"}>view all</Link>
        </motion.span>
      </div>
      <motion.div
        variants={textVariants}
        className="relative w-full  md:w-11/12"
      >
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
          items={initialData.map((e, i) => (
            <FlowerCard
              key={i}
              className="mx-2 w-[270px] h-[370px] md:w-[300px] md:h-[400px]"
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
        />
      </motion.div>
    </motion.section>
  );
}
