import { fetchProductById } from "@/lib/api";
import React from "react";
import ProductEdit from "./_components/productEdit"
import { notFound } from "next/navigation";
const productInclude = {
  productCategories: {
    include: {
      category: true,
    },
  },
  variants: {
    include: {
      color: true,
      size: true,
      pictures: {
        include: {
          picture: true,
        },
      },
    },
  },
  thumbnail: true,
};
export default async function page({
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
  if (!product) {
    return notFound();
  }
  return <ProductEdit product={product} />;
}
