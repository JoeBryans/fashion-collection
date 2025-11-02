"use client"
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
interface Props {
    page: number
    totalPage: number
  
}

const Pagination = (
    {  page, totalPage }: Props
) => {
    const path = usePathname()
    const router = useRouter()

  
    const handelClick = async (type: string) => {
        const params = new URLSearchParams(window.location.search)
        if (type === "prev") {
           const  pages=page-1
            params.set("page", pages.toString())
            router.push(`${path}?${params.toString()}`)
        }
        if (type === "next") {
           const  pages=page+1
            // console.log("next: ",pages);
            
            params.set("page", pages.toString())
            router.push(`${path}?${params.toString()}`)
        }

        // params.set("page", pages.toString())
        // router.push(`${path}?${params.toString()}`)

    }

    return (
        <div className='flex gap-4 items-center'>
            <Button variant="outline" className='w-max'
                onClick={() => handelClick("prev")}
                disabled={page === 1}
            >Prev</Button>
            <span>{page}/{totalPage}</span>
            <Button variant="dark" className='w-max'
                onClick={() => handelClick("next")}
                disabled={page === totalPage}


            >Next</Button>
        </div>
    )
}

export default Pagination