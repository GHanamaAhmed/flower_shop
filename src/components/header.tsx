import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Header() {
  const session = await getServerSession(options);
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
