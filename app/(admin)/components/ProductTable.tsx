"use client"
import { Product } from '@/lib/types'
import React, { ChangeEvent, use, useEffect, useState } from 'react'
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
import { ChevronDown, ChevronRight, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

interface Props{
    products:Product[]
    count:number
    page:number
    totalPage:number
    searchParam:{
        q?:string
        page?:string
        brand?:string
        color?:string
    }
}

const ProductTable = ({ products, count, page, totalPage, searchParam }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [field, setField] = useState<string | null>(null);
    const [productId, setProductId] = useState<string | null>(null);
    const [productsId, setProductsId] = useState<string[]>([]);
    const [pages, setPage] = useState(1);

    const path=usePathname()
    //    const [index, setIndex] = useState(0);


    useEffect(() => {
        setPage(pages)
    }, [pages])

    const handleEditProduct = (id?: string, name?: string) => {
        setIsOpen((prevState) => !prevState);
        setField(name!)
        setProductId(id!)

    };


    const handelDelet = async () => {
        const supabase = createClient()
        try {
            const delets = await Promise.all(productsId.map(async (id: string) => {
                // console.log("id: ", id);
                const { data, error } = await supabase.from('orders').delete().eq('id', id)
                if (error) {
                    console.log(error)
                    return
                }

                return { okay: true, }
            }))
            if (delets.some((item) => item!.okay === true)) {
                toast.success("Orders deleted successfully")
            }
            // console.log("delets: ", delets);
        } catch (error) {

        }
    }

    return (
        <div className='mt-10'>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    {
                        productsId.length > 0 && <div className='flex items-center gap-4 mb-2'>
                            <div className=' cursor-pointer'>
                                <Button variant={"destructive"}
                                    onClick={handelDelet}
                                >
                                    <Trash2 /> {productsId.length} items
                                </Button>
                            </div>
                            <Button variant={"outline"}>Copy</Button>
                            <Button variant={"secondary"}>Export</Button>
                        </div>
                    }
                    <TableRow>
                        <TableHead className='flex items-center gap-4 ' >
                            <Checkbox
                                checked={productsId.length > 0}
                            />
                            id
                        </TableHead>
                        <TableHead>created_at</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>brand</TableHead>
                        <TableHead>price</TableHead>
                        <TableHead>discount</TableHead>
                        <TableHead>stockQty</TableHead>
                        <TableHead>category</TableHead>
                        <TableHead>images</TableHead>
                        <TableHead>color</TableHead>
                        <TableHead>size</TableHead>

                        {/* <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody className='relative'>
                    {products.map((product: Product) => (
                        <TableRow key={product.id}
                        // onDoubleClick={()=>handleEditProduct()}

                        >
                            <TableCell className='flex gap-4 items-center'>
                                <Checkbox
                                    onCheckedChange={(e) => {
                                        // console.log("e: ", e);
                                        if (e === true) {
                                            setProductsId((prevState) => [...prevState, product.id])
                                        } else {
                                            setProductsId((prevState) => prevState.filter((id: string) => id !== product.id))
                                        }
                                    }} />

                                {product.id}
                            </TableCell>

                            <TableCell>{product.created_at}</TableCell>

                            <TableCell>
                                <TableCells
                                    value={product.name}
                                    id={product.id}
                                    onDoubleClick={() => handleEditProduct(product.id, "name")}
                                    field={field}
                                    productId={productId}
                                    isOpen={isOpen}
                                    column="name"
                                    setIsOpen={setIsOpen}

                                />
                            </TableCell>
                            <TableCell>
                                <TableCells
                                    value={product.brand}
                                    id={product.id}
                                    onDoubleClick={() => handleEditProduct(product.id, "brand")}
                                    field={field}
                                    productId={productId}
                                    isOpen={isOpen}
                                    column="brand"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell>
                            <TableCell>
                                <TableCells
                                    value={product.price}
                                    id={product.id}
                                    onDoubleClick={() => handleEditProduct(product.id, "price")}
                                    field={field}
                                    productId={productId}
                                    isOpen={isOpen}
                                    column="price"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell>
                            <TableCell>
                                <TableCells
                                    value={product.discount}
                                    id={product.id}
                                    onDoubleClick={() => handleEditProduct(product.id, "discount")}
                                    field={field}
                                    productId={productId}
                                    isOpen={isOpen}
                                    column="discount"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell>
                            <TableCell>
                                <TableCells
                                    value={product.stockQty}
                                    id={product.id}
                                    onDoubleClick={() => handleEditProduct(product.id, "stockQty")}
                                    field={field}
                                    productId={productId}
                                    isOpen={isOpen}
                                    column="stockQty"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell>

                            <TableCell>{product.categoryId.name}</TableCell>
                            <TableCell className='h-14'>
                                <div className="w-20 h-10">
                                    <Image src={product.images[0].url} alt={product.images[0].url} width={100} height={100}
                                        className='w-full h-full object-file'
                                    />
                                </div>
                            </TableCell>
                            {/* <TableCell>
                                <TableCells
                                    value={product.colors}
                                    id={product.id}
                                    onDoubleClick={() => handleEditProduct(product.id, product.brand)}
                                    field={field}
                                    productId={productId}
                                    isOpen={isOpen}
                                    column="colors"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell> */}
                            <TableCell>{product.colors[0].color}</TableCell>
                            <TableCell>{product.sizes[0].size}</TableCell>


                            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className='flex gap-4 items-center'>
                            <Button variant="outline" className='w-max'
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                <Link 
                                    href={
                                        {
                                            pathname: path,
                                            query: { q: searchParam.q, page: pages}
                                        }
                                    }
                                >
                                    Prev
                                </Link>
                            </Button>
                            <span>{page}/{totalPage}</span>
                            {/* <span>{totalPage}</span> */}
                            <Button variant="dark" className='w-max'
                                onClick={() => setPage((p) => Math.min(totalPage, p +1))}
                             disabled={page === totalPage}
                            >
                                <Link 
                                href={
                                    {
                                        pathname:path,
                                        query:{q:searchParam.q,page:pages}
                                    }
                                }
                                
                                >
                                    Next</Link>
                            </Button>
                        </TableCell>

                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default ProductTable



interface CellProps {
    className?: string
    isOpen: boolean
    productId: string | null
    field: string | null
    id: string
    column: string
    onDoubleClick: () => void
    value: string | number
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface Form {
    [key: string]: string
}

const TableCells = ({ isOpen, productId, field, id, onDoubleClick, value, column, setIsOpen }: CellProps) => {
    const [newValue, setNewValue] = useState<string | number>(value)
    const [formData, setFormData] = useState<Form>({});
    const router = useRouter()

    // Handle all changes dynamically
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNewValue(val);
        setFormData({ [column]: val });
        // console.log(productId);

    };
    // console.log("formData: ", formData);

    const supabase = createClient()
    const handleUpdateProduct = async () => {
        if (!formData[column]) {
            toast.error("No changes detected");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("product")
                .update(formData).select("*")
                .eq("id", productId);

            if (error) {
                console.error(error);
                toast.error("Failed to update product: " + error.message);
                return;
            }
            // console.log("updatdata: ",data);

            router.replace(`/dashboard/products`)
            toast.success("Product updated successfully");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };
    return <div
        className='flex flex-col relative items-center gap-2 text-sm'
        onDoubleClick={onDoubleClick}
    >
        <span className='cursor-context-menu'>{value}</span>


        {
            isOpen && productId === id && field === column ? <div className='w-60 h-max py-1 px-2 z-40 absolute rounded-lg bg-neutral-50 border-2 space-y-2'>
                <div className='w-full flex justify-end'>
                    <X onClick={() => {
                        setIsOpen(false)

                    }} size={15} />
                </div>
                <input name={column}
                    value={newValue}
                    placeholder={column}
                    onChange={handleChange}
                    className='w-full px-2 py-3  hover:bg-neutral-100 focus:outline-none  rounded-md '
                />
                <Button variant="outline" className='flex gap-4 items-center cursor-pointer text-sm w-full mt-5'
                    onClick={handleUpdateProduct}
                >update</Button>
            </div> : null
        }

    </div>

}