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
  try {
    const { colorId, productId, quantity, sizeId }: CheckoutRequest =
      await req.json();
    // add product to user checkout
    const session = await getServerSession(options);
    const sessionToken =
      req.cookies.get("next-auth.session-token")?.value || "";
    if (!session && !sessionToken) {
      return NextResponse.json({}, { status: 401 });
    }
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
      return new NextResponse("Product not found", { status: 404 });
    }
    if (!product?.variants.length) {
      return new NextResponse("the color or size out of stock", {
        status: 404,
      });
    }
    // check if user has a checkout
    const query = session?.user
      ? {
          userId: session.user.id,
          sessionToken: sessionToken,
        }
      : {
          sessionToken: sessionToken,
        };
    let cart = await db.cart.findUnique({
      where: query,
    });
    if (!cart) {
      cart = await db.cart.create({
        data: {
          ...query,
          sessionToken: sessionToken,
        },
      });
    }
    // add product to Cart
    await db.cartItem.create({
      data: {
        cartId: cart.id,
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
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(options);
    const sessionToken =
      req.cookies.get("next-auth.session-token")?.value || "";
    if (!session && !sessionToken) {
      return NextResponse.json({}, { status: 401 });
    }
    const query = session?.user
      ? {
          userId: session.user.id,
        }
      : {
          sessionToken,
        };

    const cart = await db.cart.findUnique({
      where: query,
      include: {
        cartItem: true, // Include related cart items
      },
    });
    console.log(cart);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
