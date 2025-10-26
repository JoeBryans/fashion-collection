"use server";
import { User } from "@supabase/supabase-js";
import { Addresses, Category, Product } from "../types";
import { createClient } from "./sever";

  import type { Database } from "./supabase";

// import { ProductType } from "../types";

interface SearchParams{
  name?:string
  size?:string
  minPrice?:string
  maxPrice?:string
  color?:string
  brand?:string
  stockQty?:string
  page?:string
  perPage?:string 
  sort?:string
  category?:string

}



export const getAllProducts=async ()=>{
  const supabase = await createClient()

  const { data, error } = await supabase.from('product').select(
   `*,categoryId(id,name,description)`
  ).order('id', { ascending: true })
  if (error) {
    console.log(error)
    return 
  }
  const result: Product[] = data
  return result
}

// export const getAllCategories=async ()=>{
//   const supabase = createClient()
//   const { data, error } = await supabase.from('category').select('*').order('id', { ascending: true })
//   if (error) {
//     console.log(error)
//     return
//   }
//   return data
// }

export const getProduct=async (id:string)=>{
  const supabase = await createClient()
  const { data, error } = await supabase.from('product').select(
    '*,categoryId(id,name,description)'
  ).eq('id', id).single()
  if (error) {
    console.log(error)
    return
  }
  const result: Product = data
  return result
}

export const getRelatedProducts=async (category:string|undefined)=>{
  const supabase = await createClient()
  const { data, error } = await supabase.from('product').select(
    '*,categoryId!inner(id, name, description)'
  ).eq('categoryId.name', category!).order('id', { ascending: true })
  if (error) {
    console.log(error)
    return
  }
  const result: Product[] = data
  return result 
}

export const getAllCategories=async ()=>{
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from('categories').select('*').order('id', { ascending: true })
  if (error) {
    console.log(error)
    return
  }
  const result: Category[] = data
  return result
  } catch (error) {
    console.log(error)
    return error as Error
  }
}

export const getSigleCategoryProduct=async ()=>{
  const supabase = await createClient()
 try {
   const { data, error } = await supabase.from('categories').select(
    '*'
  ).order('id', { ascending: true })
  if (error) {
    console.log(error)
    return
  }
  // console.log("data: ", data);
  const main = data.filter((category:{parent_id:string}) => category.parent_id === null) 
    console.log("main: ",main);

  const result = await Promise.all(main.map(async (name:{name:string}) => {
    // console.log("svName: ",name);
    
    const { data: category, error } = await supabase.from('product').select('*,categoryId!inner(id, name, description)').eq('categoryId.name', name.name).limit(1).order('id', { ascending: false })
    if (error) {
      console.log(error)
      return
    }
    // console.log("result: ", category);
    // console.log("name: ", name.name);

    const resut: Product[] = category
    return resut
  }))

  const res=result.flat()
    // console.log("res: ", res);

  return res  
 } catch (error) {
   console.log(error)
   return
  
 }

}



export async function getDescendantCategoryIds(categoryId: string,) {
  const supabase = await createClient();
  try {
      const { data: allCategories } = await supabase
    .from("categories")
    .select("id, parent_id");

  if (!allCategories) return [];

  const descendants: string[] = [];

  function collectChildren(parentId: string) {
    allCategories!.forEach((cat:{parent_id:string,id:string}) => {
      if (cat.parent_id === parentId) {
        descendants.push(cat.id);
        collectChildren(cat.id);
      }
    });
  }

  collectChildren(categoryId);
  return [categoryId, ...descendants];
   }
  catch (error) {
    console.log(error)
    return
  }
}


export async function FilterProducts(searchParams: SearchParams) {
  const supabase = await createClient();
  
 try {
   const query =  supabase.from('product').select(
    '*,categoryId(id,name,description)'
  )
 

  if (searchParams?.name ) {
    query.ilike('name', `%${searchParams.name}%`)
  }
  if (searchParams?.size ) {
    query.filter("sizes::jsonb", "cs", JSON.stringify([{ size: searchParams.size }]));
  }
  if (searchParams?.minPrice ) {
    query.gte('price', searchParams.minPrice)
  }
  if (searchParams?.maxPrice ) {
    query.lte('price', searchParams.maxPrice)
  }
  if (searchParams?.color ) {
    const colors = query.filter("colors::jsonb", "cs", JSON.stringify([{ color: searchParams.color }]));
    // console.log("query: ", await colors);
    

  }
  // if (searchParams?.brand ) {
  //   query.eq('brand', searchParams.brand)
  // }
  // if (searchParams?.stockQty ) {
  //   query.eq('stockQty', searchParams.stockQty)
  // }
  // if (searchParams?.category ) {
  //   query.in('categoryId', searchParams.category)
  // }
  const { data, error } = await query.limit(12).order('id', { ascending: true })
  
if (error) {
    console.log(error.message)
    return
  }

  const result: Product[] = data
  return result   
 } catch (error) {
   console.log(error)
   return
 }


}


export async function getCategoriesTree(){

          const supabase = await createClient();
    try {
        const { data, error } = await supabase.from('categories').select('*, parent_id(id, name,slug, description)').order('id', { ascending: true })
              if (error) {
                  console.log(error)
                  return
              }
              const parent = data.filter((category:Category) => category?.parent_id === null)
  
              const result: Category[] = await Promise.all(parent.map(async (category: Category) => {
                  const children = await supabase.from('categories').select('*, parent_id!inner(id, name,slug, description)').eq('parent_id', category?.id).order('id', { ascending: true })
                  // console.log("children: ", children);
                  const leff  = children?.data?.map(async (child: Category) => {
                      const childs = await supabase.from('categories').select('*, parent_id!inner(id, name,slug, description)').eq('parent_id', child.id).order('id', { ascending: true })
                      // console.log("childs: ", childs);
                      return { ...child, data: childs.data }
                  })
                  return {
                      ...category,
                      children: await Promise.all(leff!)
  
                  }
              }))
              const categoryTree: Category[] = result.flat()
              
              return categoryTree
    } catch (error) {
      console.log(error);
      return error as Error;
      
    }
}

export async function getUser(){
  const supabase=await createClient()
  try {
     const { data: user, error } = await supabase.auth.getUser()
  const userInfo:User|null = user?.user
  return userInfo
  } catch (error) {
    console.log(error)
    return error as Error
    
  }
}

// export async function getAddress(){
//   const supabase=await createClient()
//   try {
//     const userInfo=await getUser()
//      const { data, error } = await supabase.from('address').select('*').eq('user_id', userInfo.id)
//      if(error){
//         console.log(error)
//         return
//      }
//    const result= data
//   // console.log(address)
//   return result
//   } catch (error) {
//     console.log(error)
//     return error as Error
    
//   }
// }
