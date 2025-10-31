"use client"
import React from 'react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Searchs = ({ className }: { className: string }) => {
  const [value, setValue] = React.useState("")
  return (
    <div className={cn("flex items-center border-b border-neutral-300 dark:border-gray-700 rounded-xl  ", className)}>
      {/* <Cartegories/> */}
      <input placeholder="Search..." className="w-96 md:w-xs lg-xl rounded-none border-0 bg-transparent px-3 py-2 text-sm text-neutral-200 outline-none focus:ring-0 font-semibold"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button variant="secondary" size={"icon"} className="rounded-none cursor-pointer bg-neutral-500 p-1 text-neutral-500 hover:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-gray-400 dark:hover:text-white rounded-r-xl"
      >
        <Link href={
          {
            pathname: "/product",
            query: { q: value }
          }
        }>
          <Search className="h-4 w-4" color="white" /></Link>
      </Button>
    </div>)
}

export default Searchs