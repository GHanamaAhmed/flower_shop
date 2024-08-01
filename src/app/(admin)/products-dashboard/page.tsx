import { fetchProducts } from "@/lib/api";
import { Prisma } from "@prisma/client";
import React from "react";
import ProductsTable from "./_components/productsTabels";
import { db } from "@/lib/db";
import { ProductsTableData } from "@/types/products";
const productInclude = {
  variants: {
    select: {
      quantity: true,
      orderItems: {
        select: {
          order: {
            select: {
              _count: {
                select: {
                  orderItems: true,
                },
              },
            },
          },
        },
      },
    },
  },
  thumbnail: true,
  productCategories: {
    select: {
      category: true,
    },
  },
};
export default async function page({
  searchParams: { s, itemsPerPage, page, orderBy, order },
}: {
  searchParams: {
    s?: string;
    page?: string;
    orderBy?: keyof ProductsTableData;
    itemsPerPage?: string;
    order?: "asc" | "desc";
  };
}) {
    const products = await fetchProducts<typeof productInclude>(
      Number(page) || 1,
      Number(itemsPerPage) || 5,
      s || undefined,
      undefined,
      order === "asc",
      productInclude
    );
    const count = await db.product.count();
    return (
      <div>
        <ProductsTable
          count={count}
          initilaData={products.map((e) => ({
            thumbnail: e.thumbnail.url,
            id: e.id,
            buyers: e.variants.reduce(
              (a, b) =>
                a +
                b.orderItems.reduce((a, b) => a + b.order._count.orderItems, 0),
              0
            ),
            name: e.name,
            quntity: e.variants.reduce((a, b) => a + b.quantity, 0),
            date: e.createdAt,
          }))}
        />
      </div>
    );
}
