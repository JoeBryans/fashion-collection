import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { color } from 'framer-motion'
import { PlusIcon, X } from 'lucide-react'
import React from 'react'

interface Sizes {
    size: string
}

const AddSizes = ({ setSizes, sizes }: { setSizes: React.Dispatch<React.SetStateAction<Sizes[]>>, sizes: Sizes[] }) => {
    // console.log(sizes);
    
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value:any = [...sizes]
        value[index][e.target.name] = e.target.value;
        setSizes(value)
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
                    > Sizes</Button>
                </DialogTrigger>

                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Add Sizes</DialogTitle>
                        <DialogDescription>
                            Add Sizes
                        </DialogDescription>



                    </DialogHeader>

                    <div className='w-full flex flex-col gap-4 p-4'>
                        <Button variant="default" className='flex gap-4 items-center cursor-pointer'
                            onClick={() => {
                                setSizes([...sizes, { size: "" }])
                            }}
                        >
                            <PlusIcon />
                            <span>Add Size</span>
                        </Button>
                        {
                            sizes?.map((input, index) => {
                                return (
                                    <div key={index} className='flex gap-4 items-center'>
                                        <Input name="size"
                                            value={input.size}
                                            onChange={(e) => handleChange(index, e)}
                                        />
                                        <X onClick={() => {
                                            setSizes(sizes.filter((_, i) => i !== index))
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

export default AddSizes