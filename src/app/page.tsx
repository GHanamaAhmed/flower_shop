"use client";
import Image from "next/image";
import { Aclonica } from "next/font/google";
import FlowerCard from "@/components/flowers/flowerCard";
import Flower from "@/components/flowers/flower";
import Stand from "@/components/stands/stand";
import Link from "next/link";
import Search from "@/components/search";
import { motion } from "framer-motion";
const AclonicaSans = Aclonica({ subsets: ["latin"], weight: "400" });
export default function Home() {
  const variants = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    transition: { duration: 2, delay: 0.5 },
    variants: {
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: 20 },
    },
  };
  return (
    <main>
      <motion.section
        {...variants}
        className="relative md:grid md:grid-cols-2 place-items-center bg-main-color text-white-color px-3 md:px-10 py-3 md:pt-10 md:pb-14"
      >
        <div className="flex flex-col gap-3 md:gap-5">
          <div className={"text-2xl md:text-4xl " + AclonicaSans.className}>
            <p className="z-10">Happiness</p>
            <p className="z-10">blooms from</p>
            <p className="z-10">within</p>
          </div>
          <p className="text-sm md:text-lg z-10">
            Our environment, the world in which we live and work, is a mirror of
            our attitudes and expectations.
          </p>
          <div className="flex gap-2">
            <button className="py-2 px-3 z-10 bg-white-color text-main-color cursor-pointer">
              Shop now
            </button>
            <button className="text-white-color z-10 flex gap-2 py-2 px-3 items-center cursor-pointer">
              <p>Explore plants</p>
              <Image width={13} height={1} src={"/icons/Arrow.svg"} alt="" />
            </button>
          </div>
        </div>
        <div className="absolute -top-10 right-0 -translate-y-full md:translate-y-0 md:static">
          <div className="relative w-[224px] h-[247px] md:w-[336px] md:h-[370.5px]">
            <Image
              sizes="(min-width: 780px) 336px, 224px"
              fill
              src={"/images/hero-section-picture.webp"}
              alt="hero-section-picture"
            />
          </div>
        </div>
      </motion.section>
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
              src={"/images/type-flowers.png"}
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
