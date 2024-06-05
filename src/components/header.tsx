"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Variants, motion } from "framer-motion";
import { useSession } from "next-auth/react";
const variants: Variants = {
  right: {
    opacity: 0,
    translateX: "100%",
  },
  left: {
    opacity: 0,
    translateX: "-100%",
  },
  hide: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    translateX: 0,
    transition: {
      duration: 1,
    },
  },
};
export default function Header() {
  const { data: session } = useSession();
  return (
    <motion.header className="bg-main-color text-white flex items-center justify-around py-5">
      <motion.span
        initial="left"
        whileInView="center"
        variants={variants}
        viewport={{ once: true }}
      >
        <Image
          className="md:hidden"
          src="/icons/clarity_user-line.svg"
          alt="cart"
          width={20}
          height={20}
        />
      </motion.span>
      <motion.ul
        initial="right"
        whileInView="center"
        viewport={{ once: true }}
        transition={{
          staggerChildren: 0.4,
          delayChildren: 0.5,
        }}
        className="gap-5 hidden md:flex"
      >
        <motion.li variants={variants}>
          <Link href="/">shop</Link>
        </motion.li>
        <motion.li variants={variants}>
          <Link href="/">products</Link>
        </motion.li>
        <motion.li variants={variants}>
          <Link href="/">Fertilizer</Link>
        </motion.li>
        <motion.li variants={variants}>
          <Link href="/">Guide</Link>
        </motion.li>
      </motion.ul>
      <motion.span
        initial="hide"
        whileInView="center"
        variants={variants}
        viewport={{ once: true }}
      >
        <Link href={"/"} className="font-bold text-2xl">
          D
        </Link>
      </motion.span>
      <motion.ul
        initial="left"
        whileInView="center"
        viewport={{ once: true }}
        transition={{
          staggerChildren: 0.4,
          delayChildren: 0.5,
        }}
        className="flex gap-3 items-center"
      >
        <motion.li variants={variants} className="hidden md:block">
          {session?.user ? (
            <Image
              src="/icons/clarity_user-line.svg"
              alt="cart"
              width={20}
              height={20}
            />
          ) : (
            <Link
              href={"/api/auth/signin"}
              className="border border-white-color text-white-color py-2 px-5 font-semibold hover:bg-white-color hover:text-main-color active:bg-white-color active:text-main-color"
            >
              Login
            </Link>
          )}
        </motion.li>
        <motion.li variants={variants}>
          <Image
            src="/icons/clarity_shopping-cart-line.svg"
            alt="cart"
            width={20}
            height={20}
          />
        </motion.li>
        <motion.li variants={variants}>
          <Image
            src="/icons/clarity_search-line.svg"
            alt="search"
            width={20}
            height={20}
          />
        </motion.li>
        <motion.li variants={variants}>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </motion.li>
      </motion.ul>
    </motion.header>
  );
}
