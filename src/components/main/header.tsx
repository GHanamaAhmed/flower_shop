"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Variants, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { NotificationContext } from "../admin/notification";
import { Prisma } from "@prisma/client";
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const notification = useContext(NotificationContext);
  const [cartItems, setCartItems] = useState<Prisma.CartItemGetPayload<{}>[]>(
    []
  );
  const {} = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        notification.open({
          severityParams: "error",
          textParams: res.statusText,
          variantParams: "filled",
        });
      } else {
        const {
          cart,
        }: {
          cart: Prisma.CartGetPayload<{ include: { cartItem: true } }> | null;
        } = await res.json();
        setCartItems(cart?.cartItem || []);
      }
    },
  });
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <div className="">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Image
                  src="/icons/clarity_user-line.svg"
                  alt="cart"
                  width={20}
                  height={20}
                />
              </IconButton>
              <Menu
                onClose={handleClose}
                id="account-menu"
                open={open}
                className="bg-transparent border-none"
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Card component={"div"} variant="elevation" color="warning">
                  <CardContent>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      className="w-full"
                      columnGap={"10px"}
                    >
                      <Avatar alt="User Photo" src={session.user.image || ""} />
                      <Stack direction={"column"}>
                        <Typography variant="body2">
                          {session.user.email}
                        </Typography>
                        <Typography variant="h2">
                          {session.user.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={(e) => signOut()}
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      Sign Out
                    </Button>
                  </CardActions>
                </Card>
              </Menu>
            </div>
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
          <Badge badgeContent={cartItems?.length + ""} color="error">
            <Image
              src="/icons/clarity_shopping-cart-line.svg"
              alt="cart"
              width={20}
              height={20}
            />
          </Badge>
        </motion.li>
        <motion.li variants={variants}>
          {" "}
          <Image
            src="/icons/clarity_search-line.svg"
            alt="search"
            width={20}
            height={20}
          />
        </motion.li>
        <motion.li variants={variants} className="flex flex-col gap-1">
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </motion.li>
      </motion.ul>
    </motion.header>
  );
}
