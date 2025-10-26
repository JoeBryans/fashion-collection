"use client"
import { ProductType } from "@/lib/types"
import Currency from "@/components/ui/currency"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { addToCart, CartItem } from "@/hooks/store/slices/cart-slices"
import { useAppDispatch } from "@/hooks/store/store"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { AddToCartButton } from "@/components/custom/Cart/cart-buttons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { BadgeInfo } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { set } from "zod"
import { createPaymentMethod } from "@/hooks/store/slices/checkout"

const PaymentMethods = [
    {
        id: 1,
        name: "Paypal",
        description: "Paypal",
        image: "/paypal1.png",
    },
    {
        id: 2,
        name: "Debit Card",
        description: "Debit Card",
        image: "/master-visa-verve.jpg",
    },
    {
        id: 3,
        name: "Opay",
        description: "Opay Transfer",
        image: " /opay.jpg",
    },

    {
        id: 5,
        name: "Pay on Delivery",
        description: "Cash on Delivery",
        image: "/cash.png",
    },
]

interface PaymentMethod {
    name: string
    description: string
    image: string
}

const DetailCard = ({ product }: { product: ProductType }) => {
    const [selectedColor, setSelectedColor] = useState<string>("")
    const [selectedSize, setSelectedSize] = useState<string>("")

    // console.log(selectedColor);
    const supabase = createClient()
    const router = useRouter()
    const dispatch = useAppDispatch()


    const NavigateToCheckOut = (payment: PaymentMethod) => {
        console.log("payment: ", payment);

        if (payment !== null || payment !== "" || payment !== undefined) {
            dispatch(createPaymentMethod(payment))
            router.push("/checkout/summary")
        }

    }


    return (
        <div className='w-full max-w-xl mx-auto flex flex-col gap-2 p-4 items-start justify-start '>
            <h1
                className='text-2xl font-bold line-clamp-2 '
            >{product.name}</h1>
            {
                product.brand !== null && <p>Brand: {product.brand}</p>
            }
            {
                product.brand !== null && <Link href={`/product/${product.categoryId.name}/${product.brand}?query=${product.name}`}
                    className="underline offset-4"
                >
                    Explore {product.brand}
                </Link>
            }

            <div className="flex flex-col gap-2 border-2 border-neutral-300 p-4 rounded-md my-1">
                <span>you can make payments directly without adding to cart</span>

                <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1" >

                        select your payment method <BadgeInfo />
                    </TooltipTrigger>
                    <TooltipContent className="flex flex-wrap items-center gap-4">
                        {
                            PaymentMethods.map((paymentMethod: { id: number, name: string, description: string, image: string }, index: number) => {
                                return <div
                                    key={index} className='flex flex-col gap-2 items-center cursor-pointer'
                                    onClick={() => NavigateToCheckOut(paymentMethod)}
                                >
                                    <img src={paymentMethod.image} alt='payment method' width={50} height={50}
                                        className='w-18 h-14 object-fill rounded-md shadow-md'
                                    />
                                    <span>{paymentMethod.name}</span>
                                </div>
                            })
                        }
                        {/* <p>Add to library</p>
                        <Link href={`/product`} >
                            <Button variant="outline">View Products</Button>
                        </Link> */}
                    </TooltipContent>
                </Tooltip>
            </div>

            <p>Price: <Currency price={product.discount} /></p>
            <p> {product.categoryId.name}</p>
            <div className='flex flex-col gap-2 '>
                {
                    product.colors.length > 0 && <span >select color</span>
                }
                <div className='flex gap-2 items-center justify-center  overflow-x-auto '>
                    {product.colors.map((color: { color: string }, index: number) => {
                        return <span className={cn('w-max p-1 rounded-md text-neutral-400  cursor-pointer',
                            selectedColor === color.color && 'border-3 border-neutral-300 '
                        )}
                            style={{ background: color.color || "black", }}

                            onClick={() => setSelectedColor(color.color)}
                        >{color.color}</span>
                    })
                    }
                </div>
            </div>
            <div className='flex flex-col gap-2 '>
                {
                    product.sizes.length > 0 && <span >select size</span>
                }
                <div className='flex gap-2 items-center justify-center  overflow-x-auto '>
                    {product.sizes.map((size: { size: string }, index: number) => {
                        return <span className={cn('w-max py-1 px-2 rounded-md text-neutral-400 border-2 border-neutral-300  cursor-pointer',
                            selectedSize === size.size && 'border-3 border-neutral-300 '
                        )}


                            onClick={() => setSelectedSize(size.size)}
                        >{size.size}</span>
                    })
                    }
                </div>
            </div>


            <AddToCartButton
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
            />
            {/* <Button variant={"dark"}
                className="w-full cursor-pointer mt-4"
                onClick={()=>addToCarts(product)}
            >Add to Cart</Button> */}


        </div>
    )
}

export default DetailCard