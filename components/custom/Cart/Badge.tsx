import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartItem, CartState } from "@/hooks/store/slices/cart-slices"
import { ShoppingBagIcon, ShoppingBasket, ShoppingCartIcon } from "lucide-react"
import Image from "next/image"
import { AddToCartButton } from "./cart-buttons"
import Currency from "@/components/ui/currency"
import Link from "next/link"

export default function CartBadge({ cart }: CartState) {
  const cartQuantity = cart.totalQuantity
  console.log("cartQuantity: ", cartQuantity)

  return (
    <Sheet>
      <SheetTrigger >
        <div className="relative">
          <ShoppingCartIcon className="h-10 w-10 ml-4 cursor-pointer" />
          <span className="absolute -top-2 right-0 left-4  rounded-full  font-semibold  flex justify-center items-center z-20">
            {cartQuantity}

          </span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          {
            cartQuantity === 0 ? <SheetDescription className=" text-xl font-semibold text-center ">Your cart is empty</SheetDescription> : <SheetDescription
              className=" text-xl font-semibold text-center "
            >
              Your cart is items are {cartQuantity}
            </SheetDescription>
          }
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 ">
          {
            cart.cartItems.slice(0,3).map((item: CartItem, index: number) => {
              return (
                <div key={index} className="flex gap-2 items-center justify-center  overflow-x-auto ">
                
                    <div className="w-44 h-28">
                      <Image src={item.images[0].url} alt='product' width={500} height={500}
                        className='w-full h-28 object-cover rounded-md shadow-md'
                      />
                    </div>
                    <div className="w-full px-5 flex flex-col gap-2 ">
                      <span>{item.name}</span>
                      {/* <span>quntity: {item.quantity}</span> */}
                      <span>{item.price}</span>
                      <Currency price={item.price} />
                      <AddToCartButton product={item} />
                    </div>
                  </div>
              )
            })
          }
        </div>
        <SheetFooter>

          <SheetClose asChild>
            <Button variant="outline">
              <Link href={"/cart"}>View Cart</Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
