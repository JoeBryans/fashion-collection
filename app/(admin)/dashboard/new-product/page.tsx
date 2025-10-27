"use client"
import { Button } from '@/components/ui/button'
import ButtonLoader from '@/components/ui/button-loader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloud } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { set, z } from 'zod'
import AddColors from '../../components/add-colors'
import AddSizes from '../../components/add-sizes'
import UploadFile from '@/components/custom/supabase/uploadFile'
import SelectCategory from './select-category'
import Image from 'next/image'

const schema = z.object({
    name: z.string().min(3).toLowerCase(),
    price: z.string().min(1).transform((val) => val),
    discount: z.string().transform((val) => val),
    description: z.string().min(3),
    categoryId: z.string().min(3),
    stockQty: z.string().min(1).transform((val) => val),
    slug: z.string().min(3).toLowerCase(),
    // image: z.string().min(3),
    brand: z.string().min(3).toLowerCase(),
    // colors: z.array(z.object(z.string().min(3))),
    // sizes: z.array(z.object(z.string().min(3))),

})

interface Category {
    id: string
    name: string
    description: string
}

interface Colors {
    color: string
}
interface Sizes {
    size: string
}

interface Images {
    url: string
}

const NewProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [colors, setColors] = useState<Colors[]>([])
    const [sizes, setSizes] = useState<Sizes[]>([])
    const [imageUrl, setImageUrl] = useState<Images[]>([])


    // const images: any = []


    // console.log("imageUrl: ", imageUrl)


    const router = useRouter()
    const form = useForm<z.infer<typeof schema>>(
        {
            resolver: zodResolver(schema),
            defaultValues: {
                name: "",
                price: "0",
                discount: "0",
                description: "",
                categoryId: "",
                stockQty: "0",
                // image: "",
                slug: "",
                brand: "",
                // colors: [""],
                // sizes: [""],
            }
        }
    )



    // useEffect(() => {
    //     form.setValue("colors", colors)
    // }, [colors])
    // useEffect(() => {
    //     form.setValue("sizes", sizes)
    // }, [sizes])

    const supabase = createClient()

    const onsubmit = async (data: z.infer<typeof schema>) => {
        console.log(data)
        try {
            setIsLoading(true)
            const { data: product, error } = await supabase.from('product').insert([
                {
                    name: data.name,

                    description: data.description,
                    price: data.price,
                    discount: data.discount,
                    slug: data.slug,
                    stockQty: data.stockQty,
                    brand: data.brand,
                    colors: colors,
                    sizes: sizes,
                    categoryId: data.categoryId,
                    images: imageUrl,
                }
            ]).select('*').single()
            if (product) {
                setIsLoading(false)
                toast.success("Product created successfully")
                // form.reset()
                // router.refresh()
            }
            if (error) {
                setIsLoading(false)
                toast.error(`failed to create product: ${error.message}`)
            }
        } catch (error) {
            setIsLoading(false)
            toast.error("something went wrong!: " + error)
            console.log(error)
            return

        }
    }
    return (
        <div className='w-full min-h-screen mb-20'>
            <div className='w-full max-w-5xl mx-auto mt-10 px-5 md:px-10'>



                <Form {...form} >
                    <form action=""
                        className=' w-full max-w-4xl rounded-xl p-5 space-y-4 mx-auto border-2 border-neutral-300'
                        onSubmit={form.handleSubmit(onsubmit)}
                    >
                        <h1 className='my-4 text-center font-semibold text-2xl capitalize'>new product</h1>

                        <FormGroup >

                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >

                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input type='text'  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                            <FormField
                                name="brand"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >
                                        <FormLabel>Brand</FormLabel>

                                        <FormControl>
                                            <Input type='text'  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                        </FormGroup>
                        <FormGroup>

                            <FormField
                                name="price"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >

                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type='number'  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                            <FormField
                                name="discount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >
                                        <FormLabel>Discount Price</FormLabel>

                                        <FormControl>
                                            <Input type='number'  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                        </FormGroup>
                        <FormGroup>

                            <FormField
                                name="slug"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >

                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input type='text'  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                            <FormField
                                name="stockQty"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >
                                        <FormLabel>Stock Quantity</FormLabel>

                                        <FormControl>
                                            <Input type='number'  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                        </FormGroup>
                        <FormGroup>




                            <div
                                className=' w-full block space-y-2'
                            >

                                <AddColors colors={colors} setColors={setColors} />

                            </div>
                            <div
                                className=' w-full block space-y-2'
                            >

                                <AddSizes sizes={sizes} setSizes={setSizes} />

                            </div>

                        </FormGroup>

                        <FormGroup>

                            <FormField
                                name="categoryId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >

                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <SelectCategory
                                                field={field}
                                            />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                            <FormField
                                name="stockQty"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >
                                        <FormLabel>Stock Quantity</FormLabel>

                                        <FormControl>
                                            <Input type='text'  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                        </FormGroup>

                        <FormField
                            name='description'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem
                                    className=' w-full block space-y-2'
                                >

                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            className='w-full rounded-md border-2 border-neutral-300 p-3 text-sm text-neutral-900 outline-none focus:ring-0 bg-transparent' placeholder='Description'></textarea>

                                    </FormControl>
                                    <FormMessage />

                                </FormItem>

                            )}
                        />


                        <UploadFile setImageUrl={setImageUrl} />
                        <div className='w-full flex gap-4 '>{
                            imageUrl?.map((image: { url: string }, index: number) => {
                                return (
                                    <div key={index} className='w-20 h-20 flex flex-col gap-2 border-3 rounded-lg '>
                                        <Image src={image.url}
                                            height={300}
                                            width={300}
                                            alt='images'
                                            // priority={true}
                                            className='w-full h-full' />

                                    </div>
                                )
                            })
                        }</div>

                        {/* <div className='w-full flex flex-col gap-2  '>
                            <Label htmlFor='image'
                                className='flex flex-col items-center justify-center gap-2 w-full rounded-lg border-2
                                border-dotted border-neutral-400 p-3 text-sm text-neutral-900 '
                            >
                                <span>Uplaod Image</span>
                                <UploadCloud />
                                {/* <span>or drag and drop</span> 
                                <span className='text-xs font-bold'>you can only upload 15 images</span>
                            </Label>
                            <input type='file' className='hidden' id='image' />
                        </div> */}
                        <Button variant={"default"}
                            type='submit'
                            className='w-full cursor-pointer'
                        >
                            Create Product {
                                isLoading && <ButtonLoader />
                            }
                        </Button>

                    </form>

                </Form>
            </div>


        </div>
    )
}

export default NewProduct



const FormGroup = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='grid grid-cols-1 gap-4 w-full mx-auto sm:grid-cols-2  '>{children}</div>

    )
}