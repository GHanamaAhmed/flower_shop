import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-main-color text-white flex justify-around">
      <ul className="flex gap-3">
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
      <h1>D</h1>
      <ul className="flex">
        <li>
          <Image
            src="/images/clarity_shopping-cart-line.svg"
            alt="cart"
            width={20}
            height={20}
          />
          <Image
            src="/images/clarity_user-line.svg"
            alt="cart"
            width={20}
            height={20}
          />
          <Image src="/images/Vector.svg" alt="cart" width={20} height={20} />
        </li>
      </ul>
    </header>
  );
}
