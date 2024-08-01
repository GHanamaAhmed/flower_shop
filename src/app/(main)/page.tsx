import Stand from "@/components/main/stands/stand";
import HeroSectoin from "./_components/heroSection";
import Type from "./_components/type";
import Flowers from "./_components/flowers";
import { fetchCategorys, fetchProducts } from "@/lib/api";
const options = {
  variants: true,
  thumbnail: true,
  productCategories: {
    select: {
      category: true,
    },
  },
};
export default async function Home() {
  const categories = await fetchCategorys();
  const productsByCategories = await Promise.all(
    categories.map(async ({ name }) => ({
      category: name,
      products: await fetchProducts<typeof options>(
        1,
        10,
        "",
        name,
        false,
        options
      ),
    }))
  );
  return (
    <main>
      <HeroSectoin />
      <Type />
      {productsByCategories.map(({ category, products }) => {
        if (category.toLocaleLowerCase().includes("stand")) {
          return <Stand initialData={products} />;
        }
        return <Flowers initialData={products} category={category} />;
      })}
    </main>
  );
}
