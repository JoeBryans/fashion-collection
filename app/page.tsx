
import Hero from "@/components/header/Hero/Hero";

import { getAllProducts, getLatestProducts} from "@/lib/supabase/query";
import { LatestProducts, ProductCard } from "@/components/home/ProductCard";
import { NavigationMenuDemo } from "@/components/custom/Category/nav";
import { Product } from "@/lib/types";
export default async function Home() {
  const products = await getAllProducts() as Product[]
  // console.log("products: ", products);
  
  // const safeProducts = Array.isArray(products) ? products : []
  const latestProducts = await getLatestProducts() as Product[]
  

  return (
    <div className="w-full mx-auto place-items-center relative mb-20">
      <div className="relative w-full max-h-[80vh]  ">
        <div className="w-full z-50">
          <NavigationMenuDemo />
        </div>
        <Hero />
      </div>

      <div className="mt-34 place-items-center space-y-10 w-full px-14">

        <LatestProducts products={latestProducts} />
        <ProductCard products={products}  />
      </div>
    </div>
  );
}
