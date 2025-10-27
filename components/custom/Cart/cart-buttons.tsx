"use client"

import { Button } from "@/components/ui/button"
import { addToCart, CartItem, decreaseCartItemQuantity, removeFromCart } from "@/hooks/store/slices/cart-slices"
import { useAppDispatch, useAppSelector } from "@/hooks/store/store"
import { createClient } from "@/lib/supabase/client"
import { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Minus, PlusIcon } from "lucide-react"
import { toast } from "sonner"


export const AddToCartButton = ({ product, selectedColor, selectedSize, className }: { product: Product | CartItem, selectedColor?: string, selectedSize?: string, className?: string }) => {
    const cartItem = useAppSelector((state) => state.cart.cart.cartItems.find((item: CartItem) => item.id === product.id))
    const dispatch = useAppDispatch()
    const supabase = createClient()

    const addToCarts = async (product: Product | CartItem) => {
        const { data, error } = await supabase.auth.getUser()
        const user = data?.user
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.discount,
            images: product.images,
            quantity: 1,
            discount: product.discount,
            color: selectedColor as string,
            size: selectedSize as string,
        }
        //   if( user === null){
        //      
        dispatch(addToCart(cartItem))
        toast.success(product.name + " added to cart")
        // }

        // try {
        //     const { data: cart, error: cartErr } = await supabase.from("carts").insert([
        //         {
        //             product_id: product.id,
        //             user_id: user?.id,
        //             selected_color: selectedColor,
        //             selected_size: selectedSize,
        //             total_qty: 1,
        //             total_price: product.discount,
        //         }
        //     ]).select("*").single()

        //     console.log("cart: ", cart)
        //     if (cartErr) {
        //         console.log("error: ", cartErr)
        //         toast.error("error adding to cart: " + cartErr.message)
        //     }
        //     toast.success("added to cart")
        // } catch (error) {
        //    toast.error("error adding to cart: " + error)
        //     console.log("error: ", error)
        // }
    }


    const decreaseCarts = async (product: Product | CartItem) => {
        dispatch(decreaseCartItemQuantity({ id: product.id }))
    }

    return (
        <>
            {
                cartItem?.quantity !== undefined ?
                    <div className="flex gap-2 items-center">
                        <Button variant={"dark"}
                            size={"sm"}
                            className={cn("w-max cursor-pointer mt-4 flex gap-2 items-center", className)}
                            onClick={() => addToCarts(product)}
                        ><PlusIcon />

                        </Button>
                        <Button variant={"secondary"}
                            size={"sm"}
                            className={cn("w-max cursor-pointer mt-4 flex gap-2 items-center font-semibold text-lg", className)}

                        >

                            {
                                cartItem?.quantity !== undefined && <div>{cartItem?.quantity}</div>
                            }
                        </Button>
                        <span className="">
                        </span>
                        <Button variant={"dark"}
                            size={"sm"}
                            className={cn("w-max cursor-pointer mt-4 flex gap-2 items-center", className)}
                            onClick={() => decreaseCarts(product)}
                        >
                            <Minus />
                        </Button>
                    </div> :


                    <Button variant={"dark"}
                        className={cn("w-full cursor-pointer mt-4 flex gap-2 items-center", className)}
                        onClick={() => addToCarts(product)}
                    >Add to Cart
                        {
                            cartItem?.quantity !== undefined && <div> ({cartItem?.quantity})</div>
                        }
                    </Button>
            }
        </>
    )
}
export const RemoveCartButton = ({ product, selectedColor, selectedSize, className }: { product: Product | CartItem, selectedColor?: string, selectedSize?: string, className?: string }) => {
    const cartItem = useAppSelector((state) => state.cart.cart.cartItems.find((item: CartItem) => item.id === product.id))
    // console.log("cartItem: ", cartItem)
    const dispatch = useAppDispatch()
    const supabase = createClient()

    const removeFromCarts = async (product: Product | CartItem) => {
        console.log("product: ", product)
        const { data, error } = await supabase.auth.getUser()
        const user = data?.user
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.discount,
            images: product.images,
            quantity: 1,
            discount: product.discount,
            color: selectedColor as string,
            size: selectedSize as string,
        }
        //   if( user === null){
        //      
        dispatch(removeFromCart({ id: product.id }))
        toast.success(product.name + " removed from cart")
        // }

        // try {
        //     const { data: cart, error: cartErr } = await supabase.from("carts").insert([
        //         {
        //             product_id: product.id,
        //             user_id: user?.id,
        //             selected_color: selectedColor,
        //             selected_size: selectedSize,
        //             total_qty: 1,
        //             total_price: product.discount,
        //         }
        //     ]).select("*").single()

        //     console.log("cart: ", cart)
        //     if (cartErr) {
        //         console.log("error: ", cartErr)
        //         toast.error("error adding to cart: " + cartErr.message)
        //     }
        //     toast.success("added to cart")
        // } catch (error) {
        //    toast.error("error adding to cart: " + error)
        //     console.log("error: ", error)
        // }
    }
    return (
        <Button variant={"outline"}
            className={cn("w-full cursor-pointer mt-4 flex gap-2 items-center", className)}
            onClick={() => removeFromCarts(product)}
        >Remove from Cart

        </Button>
    )
}



