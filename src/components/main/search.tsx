"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Menu, MenuItem, MenuList } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import { CategoryEnum } from "../../../enums/products";
export default function Search({
  className,
  categorys,
}: {
  className: string;
  categorys: Category[];
}) {
  const searchParams = useSearchParams();
  const Router = useRouter();
  const refSearch = React.useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string>(CategoryEnum.products);
  const [open, setOpen] = useState<boolean>(false);
  const createQueryString = (key: string, value: string) => {
    const search = new URLSearchParams(searchParams);
    search.set(key, value);
    return search.toString();
  };

  const handleSearchQuery = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    // Check if the event is a keyboard event and the key pressed is 'Enter'
    if (
      (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter" ||
      e.type === "click"
    ) {
      Router.replace(
        `/${category}/1?${createQueryString(
          "s",
          refSearch.current?.value || ""
        )}`
      );
    }
  };

  return (
    <div className={"flex justify-between gap-2 " + className}>
      <div className="flex items-center justify-center px-2">
        <Button
          onClick={() => setOpen(!open)}
          className="relative p-0 h-5 w-5 md:h-7 md:w-7 border-none hover:bg-inherit cursor-pointer"
        >
          <Image fill src={"/icons/parameters.svg"} alt="paramrters" />
        </Button>
        <Menu open={open}>
          <MenuItem onClick={() => setCategory(CategoryEnum.products)}>
            All
          </MenuItem>
          {categorys.map((e, i) => (
            <MenuItem key={i} onClick={() => setCategory(e.name)}>
              {e.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <input
        ref={refSearch}
        onKeyDown={handleSearchQuery}
        className="flex-1 border border-main-color placeholder:text-sm py-1 outline-none px-4 min-w-44"
        placeholder="Search flowers..."
      />
      <button
        onClick={handleSearchQuery}
        className="flex items-center justify-center p-2 bg-main-color"
      >
        <div className="relative h-5 w-5 md:h-7 md:w-7">
          <Image fill src="/icons/clarity_search-line.svg" alt="paramrters" />
        </div>
      </button>
    </div>
  );
}
