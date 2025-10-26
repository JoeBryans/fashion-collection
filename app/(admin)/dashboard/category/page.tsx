import { getAllCategories } from '@/lib/supabase/query'
import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CategoryType } from '@/lib/types'
import { Checkbox } from '@/components/ui/checkbox'
import CategoryForm from '../../components/category-form'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'





const page = async () => {
    const categories: any = await getAllCategories()
    return (
        <div>
            <CategoryTable categories={categories} />
        </div>
    )
}

export default page

export function CategoryTable({ categories }: { categories: CategoryType[] }) {
    return (
        <div className='w-full max-w-7x px-5'>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow className='text-center'>
                        <TableHead className="">S/N</TableHead>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead className="w-[100px]">Category_Id</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>slug</TableHead>
                        <TableHead>Parent_Id</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>

                            <TableCell className="font-medium">
                                <Checkbox />
                            </TableCell>
                            <TableCell className="font-medium col-span-2">{category.name}</TableCell>
                            <TableCell className="font-medium col-span-2 ml-2">{category.id}</TableCell>
                            <TableCell className="font-medium  ml-2">{category.parent_id === null ? "main" : "sub"}</TableCell>
                            <TableCell className="font-medium ml-2">{category.slug}</TableCell>

                            <TableCell className="col-span-2 ml-2">{category.parent_id}</TableCell>

                            <TableCell className='flex items-center '>
                                <CategoryForm parent_id={category.id} />

                                <Button variant={"outline"} className="ml-2 cursor-pointer">
                                    Edit <Edit />
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}

