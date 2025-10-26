
import Hero from "@/components/header/Hero/Hero";

import { getAllProducts} from "@/lib/supabase/query";
import ProductCard from "@/components/home/ProductCard";
import { NavigationMenuDemo } from "@/components/custom/Category/nav";
export default async function Home() {
  const products = await getAllProducts()

  return (
    <div className="w-full mx-auto place-items-center relative mb-20">
      <div className="relative w-full max-h-[80vh]  ">
        <div className="w-full z-50">
          <NavigationMenuDemo />
        </div>
        <Hero />
      </div>

      <div className="mt-34 place-items-center w-full px-14">

        <ProductCard products={products} />
      </div>
    </div>
  );
}
