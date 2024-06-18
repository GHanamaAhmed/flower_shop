import Image from "next/image";
import Link from "next/link";
import React from "react";
type PaginationProps = {
  nPage: number;
  currentPage: number;
};
export default function Pagination({ nPage, currentPage }: PaginationProps) {
  const shift = currentPage !== 1 ? 1 : 0;
  return (
    <ul className="w-full flex gap-2 text-main-color">
      {currentPage !== 1 && (
        <>
          <li className="border w-10 h-10 border-main-color flex justify-center items-center">
            <Link href={"/flowers/" + 1}>
              <Image
                className="rotate-180"
                src={"/icons/Polygon.svg"}
                width={24}
                height={24}
                alt="left-polygon"
              />
            </Link>
          </li>
        </>
      )}
      {[...Array(nPage + 1)]
        .slice(currentPage - shift, currentPage + (shift ? 1 : 2) + shift)
        .map((_, i) => (
          <li
            key={i}
            className={`border w-10 h-10 border-main-color ${
              i + currentPage - shift == currentPage
                ? "bg-main-color text-white-color"
                : ""
            }  flex justify-center items-center`}
          >
            <Link href={"/flowers/" + (currentPage + i - shift)}>
              {" "}
              {currentPage + i - shift}
            </Link>
          </li>
        ))}
      {nPage - currentPage > 2 && (
        <li
          className={`border w-10 h-10 border-main-color flex justify-center items-center`}
        >
          ...
        </li>
      )}
      {currentPage != nPage && (
        <>
          <li className="border w-10 h-10 border-main-color flex justify-center items-center">
            <Link href={"/flowers/" + nPage}>
              <Image
                src={"/icons/Polygon.svg"}
                width={24}
                height={24}
                alt="right-polygon"
              />
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
