import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
type CheckoutRequest = {
  productId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
};
export async function POST(req: NextRequest) {
  const { colorId, productId, quantity, sizeId }: CheckoutRequest =
    await req.json();
  // add product to user checkout
  const session = await getServerSession(options);
  const globalSession = req.cookies.get("connect.sid")?.value || "";
  // check if product exists
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      variants: {
        where: {
          sizeId,
          colorId,
          quantity: {
            gte: quantity,
          },
        },
      },
    },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  if (!product?.variants.length) {
    return NextResponse.json(
      { error: "the color or size out of stock" },
      { status: 404 }
    );
  }
  // check if user has a checkout
  const query = session?.user
    ? {
        userId: session.user.id,
      }
    : {
        session: globalSession,
      };
  let checkout = await db.cart.findUnique({
    where: query,
  });
  if (!checkout) {
    checkout = await db.cart.create({
      data: {
        ...query,
        session: globalSession,
      },
    });
  }
  // add product to checkout
  await db.cartItem.create({
    data: {
      cartId: checkout.id,
      variantId: product.variants[0].id,
      quantity,
    },
  });
  product.variants[0].quantity -= quantity;
  await db.productVariant.update({
    where: {
      id: product.variants[0].id,
    },
    data: {
      quantity: product.variants[0].quantity,
    },
  });
  return NextResponse.json({ success: true });
}
