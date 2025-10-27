"use client"
import React, { useEffect } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { Separator } from '@/components/ui/separator'
import { getCategoriesTree } from '@/lib/supabase/query'
import { Category } from '@/lib/types'

interface field {
    onChange: (value: string) => void

}
interface Children {
    id?: string
    name?: string
    slug?: string
    parent_id?: Category
    description?: string
    crated_at?: string
    data?: Category[]
}

interface SelectCategoryResult {
    id?: string
    name?: string
    slug?: string
    parent_id?: string
    description?: string
    crated_at?: string
    children?: Children[]
}

const SelectCategory = ({ field }: { field: field }) => {
    const [category, setCategory] = React.useState<SelectCategoryResult[]>([])

    const supabase = createClient()

    useEffect(() => {
        async function getCategories() {
            const result = await getCategoriesTree()
            const safeResult = Array.isArray(result) ? result : []
            console.log("result: ", result);
            setCategory(safeResult)
        } getCategories()
    }, [])

    return (
        <Select

            onValueChange={(value) => {
                console.log(value)
                field.onChange(value)
            }}

        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="select a category" />
            </SelectTrigger>
            <SelectContent>
                <div>    {
                    category.map((cat: SelectCategoryResult, index: number) => {
                        return (
                            <SelectGroup
                                key={index}>

                                <SelectLabel>{cat.name}</SelectLabel>
                                <SelectGroup>
                                    {
                                        cat?.children!.map((child: Children, index: number) => {
                                            return (
                                                <SelectGroup key={index}>
                                                    <span className='text-sm  text-neutral-500 lowercase ml-2 '>
                                                        {child.name}
                                                    </span>
                                                    {
                                                        child.data!.map((subchild: Category, index: number) => {
                                                            return (
                                                                <SelectItem key={index}
                                                                    value={subchild.id}
                                                                    className='text-sm  text-neutral-700 lowercase'
                                                                >
                                                                    {subchild.name}
                                                                </SelectItem>
                                                            )
                                                        })
                                                    }
                                                    <Separator />
                                                </SelectGroup>
                                            )
                                        })
                                    }



                                </SelectGroup>
                                <Separator />
                            </SelectGroup>
                        )
                    })
                }</div>

            </SelectContent>
        </Select>
    )
}

export default SelectCategory