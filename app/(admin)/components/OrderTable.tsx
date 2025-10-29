"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Currency from '@/components/ui/currency'
import DateFormat from '@/components/ui/date-format'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createClient } from '@/lib/supabase/client'
import { Orders } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Trash2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { check, set } from 'zod'

const OrderTable = ({ orders }: { orders: Orders[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [field, setField] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [ordersId, setOrdersId] = useState<string[]>([]);

    // console.log("orderId:", ordersId);


    const handelEditOrder = (id?: string, name?: string) => {
        setIsOpen(true);
        setField(name!)
        setOrderId(id!)

    };

    const handelDelet = async () => {
        const supabase = createClient()
        try {
            const delets = await Promise.all(ordersId.map(async (id: string) => {
                console.log("id: ", id);
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
                <TableCaption>A list of all orders .</TableCaption>
                <TableHeader>
                    {
                        ordersId.length > 0 && <span className='flex items-center gap-4 mb-2'>
                            <span className=' cursor-pointer'>

                                <Button variant={"destructive"}
                                    onClick={handelDelet}
                                >
                                    <Trash2 /> {ordersId.length} items
                                </Button>
                            </span>
                            <Button variant={"outline"}>Copy</Button>
                            <Button variant={"secondary"}>Export</Button>
                        </span>
                    }
                    <TableRow>
                        <TableHead className='flex items-center gap-4 ' >
                            <Checkbox
                                checked={ordersId.length > 0}
                            />

                            id
                        </TableHead>
                        <TableHead>created_at</TableHead>
                        <TableHead>Total price</TableHead>
                        {/* <TableHead>Order item&apos;s</TableHead> */}
                        <TableHead>Order status</TableHead>
                        <TableHead>Payment status</TableHead>
                        <TableHead>Payment method</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Delivered at</TableHead>
                        {/* <TableHead>images</TableHead>
                      <TableHead>color</TableHead>
                      <TableHead>size</TableHead> */}

                        {/* <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>

                <TableBody className='relative'>
                    {orders.map((order: Orders) => (
                        <TableRow key={order.id}
                        // onDoubleClick={()=>handelEditOrder()}

                        >

                            <TableCell className='flex items-center gap-4 ' >
                                <Checkbox
                                    onCheckedChange={(e) => {
                                        // console.log("e: ", e);
                                        if (e === true) {
                                            setOrdersId((prevState) => [...prevState, order.id])
                                        } else {
                                            setOrdersId((prevState) => prevState.filter((id: string) => id !== order.id))
                                        }

                                    }}
                                />
                                {order.id}</TableCell>
                            <TableCell>{order.created_at}</TableCell>

                            <TableCell>
                                <TableCells
                                    value={order.total_price}
                                    id={order.id}
                                    onDoubleClick={() => handelEditOrder(order.id, "total_price")}
                                    field={field}
                                    orderId={orderId}
                                    isOpen={isOpen}
                                    column="total_price"
                                    setIsOpen={setIsOpen}

                                />
                            </TableCell>
                            {/* <TableCell>
                              <TableCells
                                  value={order.order_items.length}
                                  id={order.id}
                                  onDoubleClick={() => handelEditOrder(order.id, "")}
                                  field={field}
                                  productId={productId}
                                  isOpen={isOpen}
                                  column=""
                                  setIsOpen={setIsOpen}

                              />
                          </TableCell> */}
                            <TableCell>
                                <TableCells
                                    value={order.order_status}
                                    id={order.id}
                                    onDoubleClick={() => handelEditOrder(order.id, "order_status")}

                                    field={field}
                                    orderId={orderId}
                                    isOpen={isOpen}
                                    column="order_status"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell>
                            <TableCell>
                                <TableCells
                                    value={order.payment_status}
                                    id={order.id}
                                    onDoubleClick={() => handelEditOrder(order.id, "payment_status")}
                                    field={field}
                                    orderId={orderId}
                                    isOpen={isOpen}
                                    column="payment_status"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell>
                            <TableCell>
                                <TableCells
                                    value={order.payment_method}
                                    id={order.id}
                                    onDoubleClick={() => handelEditOrder(order.id, "payment_method")}

                                    field={field}
                                    orderId={orderId}
                                    isOpen={isOpen}
                                    column="payment_method"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell>
                            <TableCell>
                                <TableCells
                                    value={order.total_quantity}
                                    id={order.id}
                                    onDoubleClick={() => handelEditOrder(order.id, "stockQty")}

                                    field={field}
                                    orderId={orderId}
                                    isOpen={isOpen}
                                    column="stockQty"
                                    setIsOpen={setIsOpen}

                                />

                            </TableCell>

                            <TableCell>{order.reference}</TableCell>

                            <TableCell>
                                {
                                    order.order_status === "delivered" ? <div>
                                        <span className='capitalize flex gap-2 items-center'>{order.order_status}
                                            <span>   on</span>
                                            <DateFormat date={new Date(order.delivered_at)} />
                                        </span>
                                    </div> : <span className={cn(
                                        "capitalize",
                                        order.order_status === "pending" && "text-orange-500",
                                        order.order_status === "processing" && "text-orange-500",
                                        order.order_status === "shipped" && "text-green-500",
                                        order.order_status === "returned" && "text-red-500",
                                    )}
                                    >{order.order_status}</span>
                                }
                            </TableCell>



                            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className='flex gap-4 items-center'>
                            <Button variant="outline" className='w-max'>Prev</Button>
                            <Button variant="dark" className='w-max'>Next</Button>
                        </TableCell>

                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default OrderTable


interface CellProps {
    className?: string
    isOpen: boolean
    orderId: string | null
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
const TableCells = ({ isOpen, orderId, field, id, onDoubleClick, value, column, setIsOpen }: CellProps) => {
    const [newValue, setNewValue] = useState<string | number>(value)
    const [formData, setFormData] = useState<Form>({});
    // console.log("formData: ", formData);

    const router = useRouter()

    const order_status = [
        "pending",
        "processing",
        "delivered",
        "shipped",
        "returned",
    ]

    const payment_status = [
        "pending",
        "paid",
        "successful",
        "cancel",
        "failed",
        "unpaid",
    ]

    // Handle all changes dynamically
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const val = e.target.value;
        setNewValue(val);
        setFormData({ [column]: val });
        // console.log(productId);

    };
    // console.log(productId);

    // console.log("formData: ", formData);

    const supabase = createClient()
    const handleUpdateProduct = async () => {
        if (!formData[column]) {
            toast.error("No changes detected");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("orders")
                .update(formData).select("*")
                .eq("id", orderId);

            if (error) {
                console.error(error);
                toast.error("Failed to update product: " + error.message);
                return;
            }
            // console.log("updatdata: ",data);

            router.replace(`/dashboard/orders`)
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
        <span className='cursor-context-menu'>
            {
                column === "total_price" ? <Currency price={value as number} /> : <span>{value}</span>
            }
        </span>


        {
            isOpen && orderId === id && field === column ? <div className='w-60 h-max py-1 px-2 z-40 absolute rounded-lg bg-neutral-50 border-2 space-y-2'>
                <div className='w-full flex justify-end'>
                    <X onClick={() => {
                        setIsOpen(false)

                    }} size={15} />
                </div>
                {
                    column === "order_status" || column === "payment_status" ?<select
                        // options={order_status}
                        name={column}
                        onChange={handleChange}
                        className='w-full px-2 py-3  hover:bg-neutral-100 focus:outline-none  rounded-md '
                    >
                        {
                            column === "order_status" ? order_status.map((item: string) => {
                                return <option value={item}>{item}</option>
                            }) : payment_status.map((item: string) => {
                                return <option value={item}>{item}</option>
                            })
                        }

                    </select> : <input name={column}
                        value={newValue}
                        placeholder={column}
                        onChange={handleChange}
                        className='w-full px-2 py-3  hover:bg-neutral-100 focus:outline-none  rounded-md '
                    />
                }

                <Button variant="outline" className='flex gap-4 items-center cursor-pointer text-sm w-full mt-5'
                    onClick={handleUpdateProduct}
                >update</Button>
            </div> : null
        }

    </div>

}