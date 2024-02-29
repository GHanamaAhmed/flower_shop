import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function Footer() {
  return (
    <div className="w-full gap-x-2 relative grid grid-cols-2 grid-rows-2 md:grid-cols-3 text-white-color pt-8 pb-3 px-4 md:pt-28">
      <svg
        className="absolute w-full h-full -z-10"
        viewBox="0 0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 6.72881L40.0067 2.80165C99.1941 -3.00833 158.943 1.78758 216.446 16.964L454.813 79.8746C527.982 99.1859 604.581 101.637 678.836 87.0418L1057.62 12.5915C1149.37 -5.441 1244.33 2.61283 1331.73 35.8385L1440 77V444.5H0V6.72881Z"
          fill="#004F44"
        />
      </svg>
      <div className="row-span-1 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Dev</h2>
        <button className="rounded-md px-3 py-2 bg-white-color text-main-color">
          Contact Us
        </button>
        <ul className="flex justify-between gap-3 w-fit">
          <li>
            <Link href={""}>
              <Image
                src={"/icons/social.svg"}
                height={20}
                width={20}
                alt="figma"
              />
            </Link>
          </li>
          <li>
            <Link href={""}>
              <Image
                src={"/icons/social-1.svg"}
                height={20}
                width={20}
                alt="figma"
              />
            </Link>
          </li>
          <li>
            <Link href={""}>
              <Image
                src={"/icons/social-2.svg"}
                height={20}
                width={20}
                alt="figma"
              />
            </Link>
          </li>
        </ul>
      </div>
      <ul className="md:hidden">
        <li>
          <Link href={""}>Terms of Use</Link>
        </li>
        <li>
          <Link href={""}>Sales and Refunds</Link>
        </li>
        <li>
          <Link href={""}>Legal</Link>
        </li>
        <li>
          <Link href={""}>Site Map</Link>
        </li>
      </ul>
      <ul className="hidden md:flex md:flex-col items-center">
        <li>
          <Link href={""}>Shop</Link>
        </li>
        <li>
          <Link href={""}>Products</Link>
        </li>
        <li>
          <Link href={""}>Fertilizer</Link>
        </li>
        <li>
          <Link href={""}>Guide</Link>
        </li>
      </ul>
      <ul className="hidden md:flex md:flex-col md:items-center justify-between">
        <li>
          <Link href={""}>
            <Image
              src={"/icons/social.svg"}
              height={20}
              width={20}
              alt="figma"
            />
          </Link>
        </li>
        <li>
          <Link href={""}>
            <Image
              src={"/icons/social-1.svg"}
              height={20}
              width={20}
              alt="figma"
            />
          </Link>
        </li>
        <li>
          <Link href={""}>
            <Image
              src={"/icons/social-2.svg"}
              height={20}
              width={20}
              alt="figma"
            />
          </Link>
        </li>
      </ul>
      <div className="col-span-2 row-span-1 md:col-span-3 flex justify-between self-end">
        <p>© 2021 All Rights Reserved</p>
        <p>+1 800 854-36-80</p>
      </div>
    </div>
  );
}
