import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { productsRevalidate } from "@/lib/revalidate";
// upload image to cloudinary
// export async function POST(req: NextRequest) {
//   const body = await req.formData();
//   const img = body.get("img") as File;
//   const arrayBuffer = await img.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);
//   // upload stream image to cloudinary
//   cloudinary.v2.uploader
//     .upload_stream(
//       {
//         resource_type: "image",
//         folder: "flowersShop/products",
//         use_filename: true,
//         timestamp: Date.now(),
//         unique_filename: false,
//       },
//       (error, result) => {
//         console.log(result, error);
//       }
//     )
//     .end(buffer);
//   // get list all images from clodinary
//   // cloudinary.v2.api.resources(function (error, result) {
//   //   console.log(result, error);
//   // });

//   return new NextResponse(JSON.stringify({}), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      category,
      description,
      thumbnail,
      variants,
    }: {
      name: string;
      description: string;
      thumbnail: string;
      category: string;
      variants: {
        size: string;
        color: string;
        price: number;
        quantity: number;
        images: string[];
      }[];
    } = await req.json();
    const product = await db.product.create({
      data: {
        name,
        description,
        thumbnail: {
          connectOrCreate: {
            where: {
              url: thumbnail,
            },
            create: {
              url: thumbnail,
            },
          },
        },
        productCategories: {
          create: {
            category: {
              connectOrCreate: {
                where: {
                  name: category,
                },
                create: {
                  name: category,
                },
              },
            },
          },
        },
        variants: {
          create: variants.map((e) => ({
            color: {
              connectOrCreate: {
                where: {
                  name: e.color,
                },
                create: {
                  name: e.color,
                },
              },
            },
            size: {
              connectOrCreate: {
                where: {
                  name: e.size,
                },
                create: {
                  name: e.size,
                },
              },
            },
            price: e.price,
            quantity: e.quantity,
            pictures: {
              create: e.images.map((url) => ({
                picture: {
                  connectOrCreate: {
                    where: { url },
                    create: { url },
                  },
                },
              })),
            },
          })),
        },
      },
    });
    productsRevalidate();
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(undefined, {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { ids }: { ids: string[] } = await req.json();
    await db.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    db.category.deleteMany({
      where: {
        productCategories: {
          none: {},
        },
      },
    });
    db.color.deleteMany({
      where: {
        variants: {
          none: {},
        },
      },
    });
    db.size.deleteMany({
      where: {
        variants: {
          none: {},
        },
      },
    });
    db.picture
      .findMany({
        where: {
          variantPictures: {
            none: {},
          },
          products: {
            none: {},
          },
        },
      })
      .then((pictures) => {
        cloudinary.v2.api.delete_resources(pictures.map((e) => e.url));
        db.picture.deleteMany({
          where: {
            id: {
              in: pictures.map((e) => e.id),
            },
          },
        });
      });
    productsRevalidate(ids);
    return new NextResponse(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(undefined, {
      status: 500,
    });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const {
      id,
      name,
      category,
      description,
      thumbnail,
      variants,
    }: {
      id: string;
      name: string;
      description: string;
      thumbnail: string;
      category: string;
      variants: {
        size: string;
        color: string;
        price: number;
        quantity: number;
        images: string[];
      }[];
    } = await req.json();
    const product = await db.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        thumbnail: {
          connectOrCreate: {
            where: {
              url: thumbnail,
            },
            create: {
              url: thumbnail,
            },
          },
        },
        productCategories: {
          deleteMany: {},
          create: {
            category: {
              connectOrCreate: {
                where: {
                  name: category,
                },
                create: {
                  name: category,
                },
              },
            },
          },
        },
        variants: {
          deleteMany: {},
          create: variants.map((variant) => ({
            color: {
              connectOrCreate: {
                where: {
                  name: variant.color,
                },
                create: {
                  name: variant.color,
                },
              },
            },
            size: {
              connectOrCreate: {
                where: {
                  name: variant.size,
                },
                create: {
                  name: variant.size,
                },
              },
            },
            price: variant.price,
            quantity: variant.quantity,
            pictures: {
              create: variant.images.map((url) => ({
                picture: {
                  connectOrCreate: {
                    where: { url },
                    create: { url },
                  },
                },
              })),
            },
          })),
        },
      },
    });
    db.category.deleteMany({
      where: {
        productCategories: {
          none: {},
        },
      },
    });
    db.color.deleteMany({
      where: {
        variants: {
          none: {},
        },
      },
    });
    db.size.deleteMany({
      where: {
        variants: {
          none: {},
        },
      },
    });
    db.picture
      .findMany({
        where: {
          variantPictures: {
            none: {},
          },
          products: {
            none: {},
          },
        },
      })
      .then((pictures) => {
        cloudinary.v2.api.delete_resources(pictures.map((e) => e.url));
        db.picture.deleteMany({
          where: {
            id: {
              in: pictures.map((e) => e.id),
            },
          },
        });
      });
    productsRevalidate([id]);
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({}), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
