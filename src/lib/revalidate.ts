import { revalidatePath, revalidateTag } from "next/cache";

export function productsRevalidate(productsId?: string[]) {
  // Main routers
  revalidatePath("/(main)/", "page");
  revalidatePath("/(main)/products", "page");
  productsId?.forEach((id) => {
    revalidatePath("/(main)/product/" + id, "page");
  });
  revalidatePath("/(main)/products/[category]", "layout");
  // Admin routers
  revalidatePath("/(dashboard)/products-dashboard", "page");
  // Api
  revalidateTag("/api/products/categories");
}
