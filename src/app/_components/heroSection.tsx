"use client";
import Image from "next/image";
import { Aclonica } from "next/font/google";
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
export default function HeroSectoin() {
  const imageControle = useAnimation();
  const restElement = useAnimation();
  const imgRef = useRef(null);
  const imageInView = useInView(imgRef, { once: true, amount: 0.8 });
  useEffect(() => {
    if (imageInView) {
      imageControle.start("center").then(() => restElement.start("center"));
    }
  }, [imageInView]);
  return (
    <motion.section
      viewport={{ once: true }}
      animate={restElement}
      initial="hide"
      transition={{ staggerChildren: 0.4, delayChildren: 0.5 }}
      className="relative md:grid md:grid-cols-2 place-items-center bg-main-color text-white-color px-3 md:px-10 py-3 md:pt-10 md:pb-14"
    >
      <div className="flex flex-col gap-3 md:gap-5">
        <div className={"text-2xl md:text-4xl " + AclonicaSans.className}>
          <motion.p variants={variants} className="z-10">
            Happiness
          </motion.p>
          <motion.p variants={variants} className="z-10">
            blooms from
          </motion.p>
          <motion.p variants={variants} className="z-10">
            within
          </motion.p>
        </div>
        <motion.p variants={variants} className="text-sm md:text-lg z-10">
          Our environment, the world in which we live and work, is a mirror of
          our attitudes and expectations.
        </motion.p>
        <div className="flex gap-2">
          <motion.button
            variants={variants}
            className="py-2 px-3 z-10 bg-white-color text-main-color cursor-pointer"
          >
            Shop now
          </motion.button>
          <motion.button
            variants={variants}
            className="text-white-color z-10 flex gap-2 py-2 px-3 items-center cursor-pointer"
          >
            <p>Explore plants</p>
            <Image width={13} height={1} src={"/icons/Arrow.svg"} alt="" />
          </motion.button>
        </div>
      </div>
      <div className="absolute -top-10 right-0 -translate-y-full md:translate-y-0 md:static">
        <motion.div
          animate={imageControle}
          initial="hide"
          variants={variants}
          ref={imgRef}
          className="relative w-[224px] h-[247px] md:w-[336px] md:h-[370.5px]"
        >
          <Image
            sizes="(min-width: 780px) 336px, 224px"
            fill
            src={"/images/hero-section-picture.webp"}
            alt="hero-section-picture"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
