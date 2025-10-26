"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client';
import { CategoryType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { color } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { set } from 'zod';

const size = [
    {
        id: 1,
        size: "XS"
    },
    {
        id: 2,
        size: "S"
    },
    {
        id: 3,
        size: "M"
    },
    {
        id: 4,
        size: "L"
    },
    {
        id: 5,
        size: "XL"
    },
    {
        id: 6,
        size: "XXL"
    },
    {
        id: 7,
        size: "XXXL"
    },
    {
        id: 8,
        size: "XXXXL"
    },
]


const categories: { id: number; name: string; slug: string }[] = [
    {
        id: 1,
        name: "women",
        slug: "women",
    },
    {
        id: 2,
        name: "men",
        slug: "men",
    },
    {
        id: 3,
        name: "kids",
        slug: "kids",
    },
    {
        id: 4,
        name: "unisex",
        slug: "unisex",
    },
    {
        id: 5,
        name: "clothing",
        slug: "clothes-accessories",
    },
    {
        id: 6,
        name: "shoes",
        slug: "shoe's",
    },
    {
        id: 7,
        name: "bags",
        slug: "bag's",
    },
    {
        id: 8,
        name: "jewelry",
        slug: "jewelry",
    },
]

interface SearchParamsProps {
    searchParams?: {
        slug?: string
        id?: string
        category?: string
        size?: string
        minPrice?: string
        maxPrice?: string
        color?: string
        brand?: string
        stockQty?: string
        page?: string
        perPage?: string
        sort?: string
    }
}

interface FormData {
    minPrice?: string
    maxPrice?: string
    color?: string
    brand?: string
    stockQty?: string
    page?: string
    perPage?: string
    sort?: string
    size?: string
}
const SideFilter = ({ searchParams }: SearchParamsProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [selectedSize, setSelectedSize] = useState<string>("")
    const [formData, setFormData] = useState<FormData>({
        minPrice: "",
        maxPrice: "",
        color: "",
        brand: "",
        stockQty: "",
        page: "",
        perPage: "",
        sort: "",
        size: ""

    })

    console.log("selectedSize: ", selectedSize);

    console.log("formData: ", formData);


    const router = useRouter()

    // useEffect(() => {
    //     const supabase = createClient()
    //     async function getCategories() {
    //         try {
    //             const { data, error } = await supabase.from('categories').select('*').order('id', { ascending: true })
    //             if (error) {
    //                 console.log(error)
    //                 return
    //             }
    //             console.log("data: ", data);
    //             setCategories(data)
    //         } catch (error) {
    //             console.log(error)
    //             return

    //         }
    //     }
    //     getCategories()
    // }, [])


    const params = new URLSearchParams(window.location.search)
    useEffect(() => {
        if (searchParams?.category) {
            setSelectedCategory(searchParams.category)
        }
        if (searchParams?.size) {
            setSelectedSize(searchParams.size)
        }
        if (searchParams?.minPrice) {
            params.set("minPrice", searchParams.minPrice)
            console.log("minPrice: ", searchParams.minPrice);

            // setFormData({ ...formData, minPrice: searchParams.minPrice })
        }
        if (searchParams?.maxPrice) {
            params.set("maxPrice", searchParams.maxPrice)
            // setFormData({ ...formData, maxPrice: searchParams.maxPrice })
        }
        if (searchParams?.color) {
            params.set("color", searchParams.color)
            // setFormData({ ...formData, color: searchParams.color })
        }
        if (searchParams?.brand) {

            params.set("brand", searchParams.brand)
            // setFormData({ ...formData, brand: searchParams.brand })
        }


        formData.minPrice = params.get("minPrice")!,
            formData.maxPrice = params.get("maxPrice")!,
            formData.color = params.get("color")!,
            formData.brand = params.get("brand")!,
            formData.stockQty = params.get("stockQty")!,
            formData.page = params.get("page")!,
            formData.perPage = params.get("perPage")!,
            formData.sort = params.get("sort")!

    }, [searchParams, location.search])

    const handelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handelFiter = async () => {
        const params = new URLSearchParams(window.location.search)

        if (formData.minPrice === undefined && formData.maxPrice === undefined && formData.color === undefined && formData.size === undefined && formData.brand === undefined && selectedCategory === undefined && selectedSize === undefined) {
            return
        }

        if (formData?.minPrice) {
            params.set("minPrice", formData.minPrice)
        }
        if (formData?.maxPrice) {
            params.set("maxPrice", formData.maxPrice)
        }
        if (formData?.color) {
            params.set("color", formData.color)
        }

        if (formData?.brand) {
            params.set("brand", formData.brand)
        }
        if (selectedCategory !== undefined || selectedCategory !== "" || selectedCategory !== null) {
            params.set("category", selectedCategory)
        }
        if (selectedSize !== undefined || selectedSize !== "" || selectedSize !== null) {
            params.set("size", selectedSize)
        }
        router.push(`/product?${params.toString()}`)
    }


    const ClearFilter = () => {
        setSelectedCategory("")
        setSelectedSize("")
        setFormData({ minPrice: "", maxPrice: "", color: "", brand: "", stockQty: "", page: "", perPage: "", sort: "" })
    }

    return (
        <div className='w-full relative'>
            <div className={cn('sm:flex md:mt-20 flex-col gap-4 items-center hidden ',

            )}>
                {/* 9 4 250 */}

                <CategoryFilter categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <InputFiled name='minPrice' label="Min Price" onChange={handelChange} type='text'
                    value={formData?.maxPrice}
                />
                <InputFiled name='maxPrice' label="Max Price" onChange={handelChange} type='text'
                    value={formData?.minPrice}
                />
                <InputFiled name='color' label="color" onChange={handelChange} type='text'
                    value={formData?.color}
                />

                <div className='flex gap-2 items-center flex-wrap justify-center'>
                    {
                        size.map((size: { size: string, id: number }) => {
                            return <div key={size.id} className='flex gap-2 items-center'>

                                <Button variant={"secondary"}
                                    className={cn('text-sm font-semibold',
                                        selectedSize === size.size && "border-3 border-neutral-300"
                                    )}
                                    size="sm"
                                    onClick={() => setSelectedSize(size.size)}
                                >{size.size}</Button>
                            </div>
                        })
                    }

                </div>
                <div className='w-full flex justify-between items-center px-5 mt-5'>
                    <Button variant={"outline"}
                        onClick={ClearFilter}
                    >
                        Clear Filter
                    </Button>
                    <Button variant={"default"}
                        onClick={handelFiter}
                    >
                        Filter Items
                    </Button>
                </div>

                {/* <div className='flex flex-wrap gap-4 items-center'></div> */}


            </div>


            <Button variant={"default"}
                className={cn('w-max cursor-pointer  sm:hidden mt-10',
                    isOpen && "hidden"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                Filter
            </Button>
            <div className={cn(
                " hidden"
                , isOpen && "flex flex-col gap-4 items-center sm:hidden fixed top-32 left-0 right-0 bottom-0 z-50 bg-white/90 backdrop-blur-sm w-screen h-full py-5 "

            )}>
                <div className='w-full flex justify-end mr-10'>
                    <X className='text-2xl cursor-pointer'
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>
                {/* 9 4 250 */}

                <CategoryFilter categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <InputFiled name='minPrice' label="Min Price" onChange={handelChange} type='text'
                    value={formData?.maxPrice}
                />
                <InputFiled name='maxPrice' label="Max Price" onChange={handelChange} type='text'
                    value={formData?.minPrice}
                />
                <InputFiled name='color' label="color" onChange={handelChange} type='text'
                    value={formData?.color}
                />


                <div className='flex gap-2 items-center flex-wrap justify-center'>
                    {
                        size.map((size: { size: string, id: number }) => {
                            return <div key={size.id} className='flex gap-2 items-center'>

                                <Button variant={"secondary"}
                                    className={cn('text-sm font-semibold',
                                        selectedSize === size.size && "border-3 border-neutral-300"
                                    )}
                                    size="sm"
                                >{size.size}</Button>
                            </div>
                        })
                    }

                </div>
                <div className='w-full flex justify-between items-center px-5 mt-5'>
                    <Button variant={"outline"}
                        onClick={ClearFilter}
                    >
                        Clear Filter
                    </Button>
                    <Button variant={"default"}
                        onClick={handelFiter}
                    >
                        Filter Items
                    </Button>
                </div>


                {/* <div className='flex flex-wrap gap-4 items-center'></div> */}


            </div>
        </div>
    )
}

export default SideFilter


interface Props {
    name: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    value?: string
}
const InputFiled = ({ name, value, label, onChange, type }: Props) => {
    return (
        <div className='flex flex-col gap-2 w-full px-4'>
            <Label htmlFor='price '>{label}</Label>
            <Input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />

        </div>
    )
}


interface CatProp {
    selectedCategory: string
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
    categories: { id: number; name: string; slug: string }[]
}

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }: CatProp) => {
    return (
        <div className='w-full flex gap-2 flex-wrap px-5'>
            {
                categories.length > 0 && categories.map((category: { id: number; name: string; slug: string }) => {
                    return <div key={category.id} className='flex gap-2 items-center'>
                        <Button variant={"secondary"}
                            className={cn('text-sm font-semibold',
                                selectedCategory === category.slug && "border-3 border-neutral-300"

                            )}
                            size="sm"
                            onClick={() => setSelectedCategory(category.slug)}
                        >{category.name}</Button>
                    </div>
                })
            }
        </div>
    )
}