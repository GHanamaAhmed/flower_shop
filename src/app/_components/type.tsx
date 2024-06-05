"use client";
import Image from "next/image";
import { Aclonica } from "next/font/google";
import FlowerCard from "@/components/flowers/flowerCard";
import Flower from "@/components/flowers/flower";
import Stand from "@/components/stands/stand";
import Link from "next/link";
import Search from "@/components/search";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
const AclonicaSans = Aclonica({ subsets: ["latin"], weight: "400" });
const variants: Variants = {
  hide: {
    scale: 0,
  },
  right: {
    opacity: 0,
    translateX: "100%",
  },
  center: {
    scale: 1,
    opacity: 1,
    translateX: 0,
  },
};
export default function Type() {
  const textControl = useAnimation();
  const imgControl = useAnimation();
  const containerRef = useRef(null);
  const containerInView = useInView(containerRef, { once: true, amount: 0.8 });
  useEffect(() => {
    if (containerInView) {
      Promise.all([textControl.start("center"), imgControl.start("center")]);
    }
  }, [containerInView]);
  return (
    <section
      ref={containerRef}
      className="grid grid-cols-2 justify-items-stretch md:py-10"
    >
      <div className="flex justify-center items-center">
        <motion.div
          variants={variants}
          initial="hide"
          animate={textControl}
          className="w-[150px] h-[150px] md:w-72 md:h-72 relative"
        >
          <Image
            sizes="(min-width: 780px) 288px, 150px"
            fill
            src={"/images/type-flowers.webp"}
            alt="type-flowrs"
          />
        </motion.div>
      </div>
      <motion.div
        viewport={{ once: true }}
        initial="right"
        animate={textControl}
        transition={{
          staggerChildren: 0.4,
          delayChildren: 0.5,
        }}
        className="py-3 px-5 flex flex-col md:gap-5"
      >
        <div className="flex gap-3 items-center">
          <motion.div
            variants={variants}
            className="w-6 h-0.5 bg-gray-color"
          ></motion.div>
          <motion.p
            variants={variants}
            className="text-base md:text-lg font-semibold text-black-color"
          >
            TYPE
          </motion.p>
        </div>
        <motion.p
          variants={variants}
          className={
            "text-xl md:text-4xl text-black-color " + AclonicaSans.className
          }
        >
          Wiche flwers do your prfer ?
        </motion.p>
        <motion.p
          variants={variants}
          className="text-gray-color text-sm md:text-lg"
        >
          our store provide two type of flower accourding your taste. which
          allow you to choose according badgt
        </motion.p>
      </motion.div>
    </section>
  );
}
