"use client";
import Image from "next/image";
import { Aclonica } from "next/font/google";
import FlowerCard from "@/components/flowers/flowerCard";
import Flower from "@/components/flowers/flower";
import Stand from "@/components/stands/stand";
import Link from "next/link";
import Search from "@/components/search";
import { motion, Variants } from "framer-motion";
import HeroSectoin from "./_components/heroSection";
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
export default function Home() {
  return (
    <main>
      <HeroSectoin />
      <motion.section
        {...variants}
        initial="hidden"
        className="grid grid-cols-2 justify-items-stretch md:py-10"
      >
        <div className="flex justify-center items-center">
          <div className="w-[150px] h-[150px] md:w-72 md:h-72 relative">
            <Image
              sizes="(min-width: 780px) 288px, 150px"
              fill
              src={"/images/type-flowers.webp"}
              alt="type-flowrs"
            />
          </div>
        </div>
        <div className="py-3 px-5 flex flex-col md:gap-5">
          <div className="flex gap-3 items-center">
            <div className="w-6 h-0.5 bg-gray-color"></div>
            <p className="text-base md:text-lg font-semibold text-black-color">
              TYPE
            </p>
          </div>
          <p
            className={
              "text-xl md:text-4xl text-black-color " + AclonicaSans.className
            }
          >
            Wiche flwers do your prfer ?
          </p>
          <p className="text-gray-color text-sm md:text-lg">
            our store provide two type of flower accourding your taste. which
            allow you to choose according badgt
          </p>
        </div>
      </motion.section>
      <motion.section
        {...variants}
        initial="hidden"
        className="flex items-center flex-col gap-3"
      >
        <div className="w-10/12  flex justify-between">
          <h1 className="text-xl md:text-2xl text-main-color">Flowers</h1>
          <Link href={""}>view all</Link>
        </div>
        <Search className="w-10/12 " />
        <Flower />
      </motion.section>
      <Stand />
    </main>
  );
}
