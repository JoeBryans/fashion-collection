"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const Navbar = () => {
    const [value,setValue]=React.useState("")
    const path = usePathname()
    console.log("path: ", path);
    const newProduct = path.includes("new-product")
    const newCategory = path.includes("new-category")
    return (
        <nav className='w-full block '>
            <ul className='flex justify-between items-center gap-4 w-full max-w-6xl mx-auto mt-10 px-10 '>
                {/* <Link href="/about">About</Link> */}
                <li className='flex items-center border-b border-neutral-300 dark:border-gray-700 rounded-xl '>
                    <input placeholder="Search..." className="w-54  rounded-none border-0  px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-0 bg-transparent " 
                     value={value}
                     onChange={(e)=>{
                         setValue(e.target.value)
                     }}
                    />
                    <Button variant="default" size={"icon"} className="rounded-none cursor-pointer   rounded-r-xl">
                        <Link
                        href={
                            {
                                    pathname: path,
                                    query:{q:value}  
                            }
                        }
                        >
                        <SearchIcon className="h-4 w-4" color="white" />
                        </Link>
                    </Button>


                </li>

                <li className='flex items-center gap-4'>
                    {
                        newCategory ? null :
                            <Link href="/dashboard/new-category">
                                <Button variant={"default"}

                                    className='flex w-max items-center cursor-pointer'
                                >
                                    <PlusIcon size={30} />
                                    New Category
                                </Button></Link>
                    }
                    {
                        newProduct ? null : <Link href="/dashboard/new-products">
                            <Button variant={"default"}

                                className='bg-neutral-900 flex w-max items-center cursor-pointer'
                            >
                                <PlusIcon size={30} />
                                New Item
                            </Button></Link>
                    }

                </li>

            </ul>
        </nav>
    )
}

export default Navbar