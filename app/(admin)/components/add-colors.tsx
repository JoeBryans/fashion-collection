"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { PlusIcon, X } from 'lucide-react'
import React from 'react'
interface Colors {
    color: string
}
const AddColors = ({ setColors, colors }: { setColors: React.Dispatch<React.SetStateAction<Colors[]>>, colors: Colors[] }) => {
    // const [colorField, setColorField] = React.useState([{ color: "" }])
    // const [value, setValue] = React.useState("")
    // console.log(colors);


    const handleChange = (index: number, e:React.ChangeEvent<HTMLInputElement>) => {
        const value: {color:string}[] = [...colors]
        value[index][e.target.name] = e.target.value;
        setColors(value)
        // setValue(e.target.value)
    }

    return (
        <div className='w-full '>
            <Dialog >
                <DialogTrigger className='w-full '>
                    <Button
                        type='button'
                        variant="secondary"
                        className='w-full cursor-pointer bg-transparent border-2 border-neutral-300 '
                    > Colors</Button>
                </DialogTrigger>

                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Add Colors</DialogTitle>
                        <DialogDescription>
                            Add Colors
                        </DialogDescription>



                    </DialogHeader>

                    <div className='w-full flex flex-col gap-4 p-4'>
                        <Button variant="default" className='flex gap-4 items-center cursor-pointer'
                            onClick={() => {
                                setColors([...colors, { color: "" }])
                            }}
                        >
                            <PlusIcon />
                            <span>Add Color</span>
                        </Button>
                        {
                            colors?.map((input, index) => {
                                return (
                                    <div key={index} className='flex gap-4 items-center'>
                                        <Input name="color"
                                            value={input.color}
                                            onChange={(e) => handleChange(index, e)}
                                        // onChange={(e) => setColors([{ ...colors, value }])}
                                        />
                                        <X onClick={() => {
                                            setColors(colors.filter((_, i) => i !== index))
                                        }} />
                                    </div>
                                )
                            })
                        }
                    </div>


                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddColors