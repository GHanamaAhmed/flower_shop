"use client";
import React from "react";
import Image from "next/image";
import { Dropdown, Menu, MenuItem } from "@mui/joy";
import { MenuButton } from "@mui/joy";
export default function Search({ className }: { className: string }) {
  return (
    <div className={"flex justify-between gap-2 " + className}>
      <div className="flex items-center justify-center px-2">
        <Dropdown>
          <MenuButton className="relative p-0 h-5 w-5 md:h-7 md:w-7 border-none hover:bg-inherit cursor-pointer" >
            <Image fill src={"/icons/parameters.svg"} alt="paramrters" />
          </MenuButton>
          <Menu>
            <MenuItem>All</MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <input
        className="flex-1 border border-main-color placeholder:text-sm py-1 outline-none px-4 min-w-44"
        placeholder="Search flowers..."
      />
      <button className="flex items-center justify-center p-2 bg-main-color">
        <div className="relative h-5 w-5 md:h-7 md:w-7">
          <Image fill src="/icons/clarity_search-line.svg" alt="paramrters" />
        </div>
      </button>
    </div>
  );
}
