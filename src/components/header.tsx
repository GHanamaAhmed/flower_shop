"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
export default function Header() {
  const { data: session } = useSession();
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 2,delay: 0.5  }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
          },
        },
      }}
      className="bg-main-color text-white flex items-center justify-around py-5"
    >
      <Image
        className="md:hidden"
        src="/icons/clarity_user-line.svg"
        alt="cart"
        width={20}
        height={20}
      />
      <ul className="gap-5 hidden md:flex">
        <li>
          <Link href="/">shop</Link>
        </li>
        <li>
          <Link href="/">products</Link>
        </li>
        <li>
          <Link href="/">Fertilizer</Link>
        </li>
        <li>
          <Link href="/">Guide</Link>
        </li>
      </ul>
      <Link href={"/"} className="font-bold text-2xl">
        D
      </Link>
      <ul className="flex gap-3 items-center">
        <li className="hidden md:block">
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
        </li>
        <li>
          <Image
            src="/icons/clarity_shopping-cart-line.svg"
            alt="cart"
            width={20}
            height={20}
          />
        </li>
        <li>
          <Image
            src="/icons/clarity_search-line.svg"
            alt="search"
            width={20}
            height={20}
          />
        </li>
        <li className="flex flex-col gap-1">
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </li>
      </ul>
    </motion.header>
  );
}
