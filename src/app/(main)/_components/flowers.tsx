"use client";
import { Aclonica } from "next/font/google";
import Flower from "@/components/main/flowers/flower";
import Link from "next/link";
import Search from "@/components/main/search";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { Prisma, Product } from "@prisma/client";
const AclonicaSans = Aclonica({ subsets: ["latin"], weight: "400" });
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
export default function Flowers({
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
      className="flex items-center flex-col gap-3"
    >
      <div className="w-10/12  flex justify-between">
        <motion.h1
          variants={textVariants}
          className="text-xl md:text-2xl text-main-color"
        >
          Flowers
        </motion.h1>
        <motion.span variants={textVariants}>
          <Link href={"/flowers/1"}>view all</Link>
        </motion.span>
      </div>
      {/* <motion.span
        className="w-full flex justify-center"
        variants={textVariants}
      >
        <Search className="w-10/12 " />
      </motion.span> */}
      <motion.span
        variants={textVariants}
        className="w-full flex justify-center"
      >
       <Flower initialData={initialData}/>
      </motion.span>
    </motion.section>
  );
}
