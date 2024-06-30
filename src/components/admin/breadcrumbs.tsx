"use client";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { sidebarContext } from "./sidebarContext";
function BreadcrumbsComponents() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useContext(sidebarContext);
  return (
    <Stack
      direction={"row"}
      gap={5}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">pages</Typography>
        <Typography color="text.primary">{pathName.split("/")[1]}</Typography>
      </Breadcrumbs>
      {!isOpen && (
        <MenuOpenIcon
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer lg:hidden"
        />
      )}
    </Stack>
  );
}

export default BreadcrumbsComponents;
