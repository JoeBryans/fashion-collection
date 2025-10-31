"use client";

import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm, UseFormReturn, Path, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {  z } from "zod";
import UploadFile from "@/components/custom/supabase/uploadFile";
import SelectCategory from "./select-category";

interface Variants {
    color: string
    price: string
    stock: string
    size: string
    product_id?: string
    images: Images[]
}

const variantSchema = z.object({
    color: z.string().min(3),
    price: z.string().min(1),
    stock: z.string().min(1),
    size: z.string().min(3),
    images: z.array(z.object({ url: z.string() })),
});


const schema = z.object({
    name: z.string().min(3),
    price: z.string().min(1),
    discount: z.string(),
    description: z.string().min(3),
    category_id: z.string().min(3),
    slug: z.string().min(3),
    brand: z.string().min(3),
    variants: z.array(variantSchema).min(1),
});

export type ProductForm = z.infer<typeof schema>;
interface Images {
    url: string
}

const NewProducts = () => {
    const [isLoading, setIsLoading] = useState(false);


    const router = useRouter();
    const supabase = createClient();

    const form = useForm<ProductForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            price: "",
            discount: "",
            description: "",
            slug: "",
            brand: "",
            category_id: "",
            variants: [
                {
                    color: "",
                    price: "",
                    stock: "",
                    size: "",
                    images: []
                }
            ]
        },
    });
    const { fields: varientField, append, remove } = useFieldArray({
        name: "variants",
        control: form.control
    })







    const onSubmit = async (data: ProductForm) => {
        console.log(data);
        
        try {
            setIsLoading(true);

            const { data: product, error } = await supabase
                .from("products")
                .insert([
                    {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        discount_price: data.discount || null,
                        slug: data.slug,
                        brand: data.brand,
                        category_id: data.category_id,
                    },
                ])
                .select("*")
                .single();

            if (error) {
                toast.error(`Failed to create product: ${error.message}`);
                return;
            }
            const  varient_product =await Promise.all(data.variants.map(async (variant:Variants)=>{
                const { data: variantData, error: err } = await supabase.from("variant_products").insert([
                    {
                        product_id: product.id,
                        color: variant.color,
                        price: variant.price,
                        stock_quantity: variant.stock,
                        size: variant.size,
                        images: variant.images,
                    },
                ]).select("*").maybeSingle()
                if (err) {
                    toast.error(`Failed to create product_variants: ${err.message}`);
                    return;
                }
                return variantData
            }))
    
            if (varient_product.some((item) => item === undefined)) {
                toast.error(`Failed to create product product variants`);
                return;
            }
            toast.success("Product created successfully!");
            router.refresh();
            // form.reset();
        } catch (err) {
            toast.error(`Failed to create product: ${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen mb-20">
            <div className="max-w-5xl mx-auto mt-10 px-5 md:px-10">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full max-w-4xl rounded-xl p-5 space-y-6 mx-auto border-2 border-neutral-300"
                    >
                        <h1 className="text-center font-semibold text-2xl capitalize mb-6">New Product</h1>

                        {/* Basic Info */}
                        <FormGroup>
                            <TextField form={form} name="name" label="Product Name" type="text" />
                            <TextField form={form} name="brand" label="Brand" type="text" />
                            <TextField form={form} name="price" label="Price" type="number" />
                            <TextField form={form} name="discount" label="Discount Price" type="number" />
                            <FormField
                                name="category_id"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >

                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <SelectCategory
                                                field={field}
                                            />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                            <TextField form={form} name="slug" label="Slug" type="text" />
                        </FormGroup>

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            className="w-full rounded-md border-2 border-neutral-300 p-3 text-sm text-neutral-900 outline-none focus:ring-0 bg-transparent"
                                            placeholder="Enter product description..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Variants */}
                        <div className="flex flex-col gap-6">
                            {varientField.map((variant, index) => (
                                <div
                                    key={index}
                                    className="w-full border-2 border-neutral-300 rounded-lg p-4 space-y-4 bg-gray-50"
                                >
                                    <div className="flex items-center justify-between ">
                                        <h2 className="font-medium text-lg">Variant #{index + 1}</h2>
                                        {
                                            index !== 0 ? <Button variant={"destructive"}
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="w-max cursor-pointer"
                                            >
                                                Remove
                                            </Button> : null
                                        }
                                    </div>

                                    <FormGroup>
                                        <TextField form={form} name={`variants.${index}.color`} label="Color" />
                                        <TextField form={form} name={`variants.${index}.price`} label="Price" type="number" />
                                        <TextField form={form} name={`variants.${index}.stock`} label="Stock Qty" type="number" />
                                        <TextField form={form} name={`variants.${index}.size`} label="Sizes (comma separated)" />
                                    </FormGroup>

                                    <UploadFile
                                        form={form}
                                        index={index}
                                        fieldName={`variants.${index}.images`}
                                    />
                                  
                                </div>
                            ))}

                            <Button variant="outline" type="button" onClick={() => append({ color: "", price: "", stock: "", size: "", images: [] })} className="w-max">
                                Add Variant
                            </Button>
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full flex items-center gap-2">
                           Create Product {isLoading && <ButtonLoader />}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default NewProducts;

/* Reusable field components */

const FormGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
);

interface InputFieldProps<T extends FieldValues> {
    form: UseFormReturn<T>
    name: Path<T>
    label: string
    type?: string
}
function TextField<T extends FieldValues>({ form, name, label, type }: InputFieldProps<T>){
 return(   <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input type={type} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )  };


