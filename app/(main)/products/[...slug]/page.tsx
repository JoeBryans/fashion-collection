import { getDescendantCategoryIds } from "@/lib/supabase/query";
import { createClient } from "@/lib/supabase/sever";
interface Props {
    params: {
        slug: string
    }
}
const page = async ({ params }: Props) => {
    const slug = await params.slug
    console.log("slug: ", slug);

    const lastSlug = slug[slug.length - 1]

    console.log("lastSlug: ", lastSlug);
    



    const supabase = await createClient()
    const { data: category } = await supabase
        .from("categories")
        .select("id, name,slug, parent_id")
        .eq("slug", lastSlug)
        .single();

    console.log("category: ", category);





    const res = await getDescendantCategoryIds(category?.id);

    console.log("res: ", res);


    const { data: products, error: prodError } = await supabase
        .from("product")
        .select(`
      id, name, slug, price, description, images,
      category:categoryId ( id, name, slug )
    `).in("categoryId", res);



    
    console.log("result: ", products);

    return (
        <div className='w-full flex gap-4'>
            <div className='w-64'>Side filter</div>

            <div className='flex-1'>
                {/* <ProductCard products={products} /> */}
            </div>

        </div>
    )
}

export default page