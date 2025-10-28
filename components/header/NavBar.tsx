"use client"

import * as React from "react"
import Link from "next/link"
import { BarcodeIcon, CircleCheckIcon, CircleHelpIcon, CircleIcon, MoreHorizontal, MoreVerticalIcon, Search, User2, User2Icon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "../mode"
import Logo from "./Logo"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import CartBadge from "../custom/Cart/Badge"
import Searchs from "./Search"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/auth-js/src/lib/types"
import { useAppSelector } from "@/hooks/store/store"


export default function NavBar() {
  const cart = useAppSelector((state) => state.cart.cart)

  const supabase = createClient()
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        // console.log('SIGNED_IN', session)
        setUser(session?.user as User)
      }
    })
  }, [user])


  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={
        {
          opacity: 1,
          y: 0,
          transition: {
            duration: 2,
            ease: "easeInOut"
          }
        }
      }
      className="flex flex-col items-center justify-center w-full py-2 shadow-md bg-neutral-950 text-neutral-50  ">
      <div className="flex justify-between items-center  px-5 gap-10 max-w-7xl w-full mx-auto ">
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={
            {
              x: 0,
              opacity: 1,
              transition: {
                duration: 2,
                ease: "easeInOut"
              }
            }
          }
          // className="md:block hidden"
        >
          <Logo />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, y: -100 }}
          animate={
            {
              scale: 1,
              y: 0,
              opacity: 1,
              transition: {
                duration: 2,
                ease: "easeInOut"
              }
            }
          }
          className="ml-5 lg:ml-10"
        >

          <Searchs className="hidden md:flex" />
        </motion.div>
        <NavigationMenu viewport={true} className="w-full py-1.5  relative " >
          <NavigationMenuList className="flex justify-end relative ">
            <motion.div
              initial={{ x: 500, opacity: 0 }}
              animate={
                {
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 2,
                    ease: "easeInOut"
                  }
                }
              }
              className="flex gap-4 items-center relative "
            >
              <NavigationMenuItem className="    ">
                <NavigationMenuTrigger className="py-3 bg-neutral-900 border hover:bg-neutral-900  ">
                  <div className="sm:block hidden ">
                    {
                      user !== null ?
                        <div className="flex  flex-col my-2  items-center">
                          <span className="line-clamp-1">Hello, {user?.user_metadata?.name}</span>
                          {/* <h2>Acount & List</h2> */}
                        </div>
                        : <div className="flex  flex-col my-2  items-center">
                          <span>Hello, sign in</span>
                          <h2>Acount & List</h2>
                        </div>
                    }
                  </div>
                  <div className=" sm:hidden rounded-full h-10 w-10 p-2">
                    <User2Icon className="h-6 w-6" />

                  </div>
                </NavigationMenuTrigger>


                <NavigationMenuContent className="w-50 z-50   bg-neutral-900 rounded-md shadow-md ">
                  {
                    user === null &&
                    <div className="w-full  flex flex-col md:flex-row gap-5 px-3 items-center">
                      <Link href="/auth/sign-in" className="w-full md:w-max flex justify-center items-center p-1.5  text-sm bg-neutral-50  rounded-md">

                        <User2 className="h-6 w-6" />
                        <span className="text-neutral-900 hover:text-gray-600 font-bold">Sign in</span>

                      </Link>
                      <Link href="/auth/sign-up" className="w-full md:w-max flex justify-center items-center p-1.5  text-sm bg-neutral-900  hover:bg-neutral-700 border-1 rounded-md">

                        <User2 className="h-6 w-6" color="white" />
                        <span className="text-white hover:text-gray-100 font-bold">Sign up</span>

                      </Link>
                    </div>
                  }


                  <ul className="grid w-[200px] gap-4 text-neutral-50 mr-20">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/account/profile" className="flex-row items-center gap-2">
                          Profile
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/account/orders" className="flex-row items-center gap-2">
                          Orders
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/account/saved-items" className="flex-row items-center gap-2">
                          Saved Items
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          Inbox                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* <CartBadge cart={cart} /> */}
            </motion.div>
            <CartBadge cart={cart} />
          </NavigationMenuList>
        </NavigationMenu>
        {/* <ModeToggle /> */}
      </div>
      <Searchs className="w-[95%] mt-6 md:hidden" />


    </motion.div>
  )
}

