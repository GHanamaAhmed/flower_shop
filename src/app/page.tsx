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
import Type from "./_components/type";
import Flowers from "./_components/flowers";
const AclonicaSans = Aclonica({ subsets: ["latin"], weight: "400" });
const variants: Variants = {
  left: {
    opacity: 0,
    translateX: "-100%",
  },
  right: {
    opacity: 0,
    translateX: "100%",
  },
  center: {
    opacity: 1,
    translateX: 0,
  },
};
export default function Home() {
  return (
    <main>
      <HeroSectoin />
      <Type />
      <Flowers />
      <Stand />
    </main>
  );
}
