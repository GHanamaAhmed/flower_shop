"use client";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import StoreIcon from "@mui/icons-material/Store";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { usePathname, useRouter } from "next/navigation";
import { isCompositeComponent } from "react-dom/test-utils";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { sidebarContext } from "./sidebarContext";
import CloseIcon from "@mui/icons-material/Close";
const pages = [
  {
    title: "Dashboard",
    icon: <DashboardIcon className="fill-white" />,
    path: "dashboard",
  },
  {
    title: "Users",
    icon: <GroupIcon className="fill-white" />,
    path: "users",
  },
  {
    title: "Orders",
    icon: <WorkHistoryIcon className="fill-white" />,
    path: "orders",
  },
  {
    title: "Products",
    icon: <StoreIcon className="fill-white" />,
    path: "products-dashboard",
  },
  {
    title: "Payments",
    icon: <PaymentIcon className="fill-white" />,
    path: "payments",
  },
];
const variants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

function Sidebar() {
  const { data: session } = useSession();
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useContext(sidebarContext);
  return (
    <motion.div
      variants={variants}
      animate={
        isOpen || global.window?.innerWidth >= 1024 ? "visible" : "hidden"
      }
      transition={{ duration: 1 }}
      className={`bg-gradientBlack  md:translate-x-0 lg:flex flex-col gap-4 p-4 rounded-lg h-[calc(100vh-12px)] m-2 w-fit text-white lg:static absolute top-2 left-2 z-50`}
    >
      <CloseIcon
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 cursor-pointer"
      />
      <Stack columnGap={2} direction={"row"} paddingX={1}>
        <Typography variant="h6">D</Typography>
        <Typography variant="h6">Material Dashboard</Typography>
      </Stack>
      <Divider color="gray" />
      <Stack columnGap={2} direction={"row"} alignItems={"center"} paddingX={1}>
        <Avatar
          src={session?.user?.image || ""}
          alt={session?.user?.name || ""}
        />
        <Typography variant="body2">{session?.user?.name}</Typography>
      </Stack>
      <Divider color="gray" />
      <List>
        {pages.map((page) => {
          const isCurrentPath = path.includes(page.title.toLowerCase());
          return (
            <ListItemButton
              key={page.title}
              onClick={() => router.push(`/${page.path}`)}
              className={`overflow-hidden rounded-md hover:bg-darkMud my-1 ${
                isCurrentPath ? "bg-gradientBlue" : ""
              }`}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <Typography variant="body2" paddingX={1} paddingY={0.5}>
                {page.title}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </motion.div>
  );
}

export default Sidebar;
