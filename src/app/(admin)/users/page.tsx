import React from "react";
import UserTable from "./_components/usersTable";
import { fetchUsers } from "@/lib/api";
import { Prisma } from "@prisma/client";
import { UsersTableData } from "@/types/users";
import { OrderStatusEnum } from "../../../../enums/products";
import { db } from "@/lib/db";
const UserInclude = {
  orders: {
    select: {
      total: true,
      status: true,
    },
  },
};
export default async function Page({
  searchParams: { s, itemsPerPage, page, orderBy, order },
}: {
  searchParams: {
    s?: string;
    page?: string;
    orderBy?: keyof UsersTableData;
    itemsPerPage?: string;
    order?: "asc" | "desc";
  };
}) {
  const orderByFn = (orderBy?: keyof UsersTableData) => {
    switch (orderBy) {
      case "name":
        return {
          name: order,
        };
      case "email":
        return {
          email: order,
        };
      case "id":
        return {
          id: order,
        };
      default:
        return undefined;
    }
  };
  const users = await fetchUsers<typeof UserInclude>(
    Number(page) || 1,
    Number(itemsPerPage) || 5,
    s || undefined,
    UserInclude,
    orderByFn(orderBy)
  );
  let sortedUsers = users;
  if (orderBy === "purchases") {
    sortedUsers = users.sort((a, b) => {
      const totalA = a.orders.filter(
        (e) => e.status === OrderStatusEnum.success
      );
      const totalB = b.orders.filter(
        (e) => e.status === OrderStatusEnum.success
      );
      return order === "asc"
        ? totalA.length - totalB.length
        : totalB.length - totalA.length;
    });
  } else if (orderBy === "returned") {
    sortedUsers = users.sort((a, b) => {
      const totalA = a.orders.filter(
        (e) => e.status === OrderStatusEnum.returned
      );
      const totalB = b.orders.filter(
        (e) => e.status === OrderStatusEnum.returned
      );
      return order === "asc"
        ? totalA.length - totalB.length
        : totalB.length - totalA.length;
    });
  } else if (orderBy === "amount") {
    sortedUsers = users.sort((a, b) => {
      const totalA = a.orders
        .filter((e) => e.status === OrderStatusEnum.success)
        .reduce((acc, curr) => acc + curr.total, 0);
      const totalB = b.orders
        .filter((e) => e.status === OrderStatusEnum.success)
        .reduce((acc, curr) => acc + curr.total, 0);
      return order === "asc" ? totalA - totalB : totalB - totalA;
    });
  }
  const count = await db.user.count();
  return (
    <div>
      <UserTable
        count={count}
        initilaData={sortedUsers.map((e, i) => {
          return {
            id: e.id,
            n: i,
            name: e.name,
            email: e.email,
            purchases: e.orders.filter(
              (e) => e.status === OrderStatusEnum.success
            ).length,
            returned: e.orders.filter(
              (e) => e.status === OrderStatusEnum.returned
            ).length,
            amount: e.orders
              .filter((e) => e.status === OrderStatusEnum.success)
              .reduce((acc, curr) => acc + curr.total, 0),
          };
        })}
      />
    </div>
  );
}
