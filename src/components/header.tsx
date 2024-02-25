import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-main-color text-white flex items-center justify-around py-5">
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
      <h1 className="font-bold text-2xl">D</h1>
      <ul className="flex gap-3 items-center">
        <li className="hidden md:block">
          <Image
            src="/icons/clarity_user-line.svg"
            alt="cart"
            width={20}
            height={20}
          />
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
            alt="cart"
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
    </header>
  );
}
