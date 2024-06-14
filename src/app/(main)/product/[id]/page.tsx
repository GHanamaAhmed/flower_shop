import React from "react";
import { fetchProductById } from "@/lib/api";
import Product from "../_components/product";
const productInclude = {
  productCategories: {
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  },
  variants: {
    include: {
      color: true,
      size: true,
      pictures: {
        select: {
          picture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  },
  thumbnail: {
    select: {
      url: true,
    },
  },
};
export default async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const product = await fetchProductById<typeof productInclude>(
    id,
    productInclude
  );
  return <Product product={product} />;
}
