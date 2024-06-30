import { Category, Prisma } from "@prisma/client";
import { db } from "./db";
type ProductInclude<T> = T extends Prisma.ProductInclude ? T : never;
export async function fetchProducts<T extends Prisma.ProductInclude>(
  page: number,
  limit: number,
  search: string,
  category: string,
  inverse: boolean,
  include: ProductInclude<T>
): Promise<Prisma.ProductGetPayload<{ include: T }>[]> {
  try {
    const ofsset = (page - 1) * limit;
    const product = await db.product.findMany({
      include,
      take: limit,
      skip: ofsset,
      where: {
        name: {
          contains: search.trim(),
        },
        productCategories: {
          some: {
            category: {
              name: category.trim(),
            },
          },
        },
      },
      orderBy: {
        createdAt: inverse ? "asc" : "desc",
      },
    });
    return product as Prisma.ProductGetPayload<{ include: T }>[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCategorys(): Promise<Category[]> {
  try {
    const categorys = await db.category.findMany();
    return categorys;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchProductById<T extends Prisma.ProductInclude>(
  id: string,
  include: ProductInclude<T>
): Promise<Prisma.ProductGetPayload<{ include: T }> | null> {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
      include,
    });
    return product as Prisma.ProductGetPayload<{ include: T }> | null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

type UserInclude<T> = T extends Prisma.UserInclude ? T : never;
export async function fetchUsers<T extends Prisma.UserInclude>(
  page: number,
  limit: number,
  search: string,
  include: UserInclude<T>,
  orderBy?: Prisma.UserOrderByWithRelationInput
): Promise<Prisma.UserGetPayload<{ include: T }>[]> {
  try {
    const ofsset = (page - 1) * limit;
    const users = await db.user.findMany({
      include,
      take: limit,
      skip: ofsset,
      where: {
        OR: [
          {
            name: {
              contains: search.trim(),
            },
          },
          {
            email: {
              contains: search.trim(),
            },
          },
        ],
      },
      orderBy,
    });
    return users as Prisma.UserGetPayload<{ include: T }>[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
