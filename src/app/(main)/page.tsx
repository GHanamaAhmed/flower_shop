import Stand from "@/components/main/stands/stand";
import HeroSectoin from "./_components/heroSection";
import Type from "./_components/type";
import Flowers from "./_components/flowers";
import { fetchProducts } from "@/lib/api";
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
  const flowers = await fetchProducts<typeof options>(
    1,
    10,
    "",
    "flower",
    false,
    options
  );
  const stands = await fetchProducts<typeof options>(
    1,
    10,
    "",
    "stand",
    false,
    options
  );
  return (
    <main>
      <HeroSectoin />
      <Type />
      <Flowers initialData={flowers} />
      <Stand initialData={stands} />
    </main>
  );
}
