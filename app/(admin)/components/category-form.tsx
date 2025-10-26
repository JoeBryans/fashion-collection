"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PlusCircle } from 'lucide-react'
import React, { use, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import ButtonLoader from '@/components/ui/button-loader'


const schema = z.object({
    name: z.string().min(3).toLowerCase(),
    slug: z.string().min(3).toLowerCase(),
    description: z.string().optional()
})

const CategoryForm = ({ parent_id }: { parent_id: string, }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            slug: "",
        },
    })

    const supabase = createClient()

    const onsubmit = async (data: z.infer<typeof schema>) => {
        try {
            setIsLoading(true)
            const { data: category, error } = await supabase.from('categories').insert([
                {
                    description: data.description,
                    parent_id: parent_id,
                    slug: data.slug,
                    name: data.name
                }
            ]).select('*').single()
            if (category) {
                setIsLoading(false)
                toast.success("Category created successfully")
                form.reset()
                router.refresh()
            }
            if (error) {
                setIsLoading(false)
                toast.error(`failed to create category: ${error.message}`)
            }
        } catch (error) {
            setIsLoading(false)
            toast.error("something went wrong!: " + error)
            console.log(error)
            return

        } finally {
            setIsLoading(false)
        }
    }

// useEffect(() => {
//     async function getCategories() {

//     }
// }, [parent_id])

    return (
        <Dialog>
            <DialogTrigger>
                <Button><PlusCircle /> Sub Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Category Form</DialogTitle>
                    <DialogDescription>
                        remember to add a use slug for your sub category name and it is always unique
                    </DialogDescription>

                </DialogHeader>
                <div className='w-full max-w-5xl mx-auto mt-10 px-5 md:px-10 '>


                    <Form {...form} >
                        <form action=""
                            className=' w-full max-w-2xl rounded-xl p-5 space-y-4 mx-auto border-2 border-neutral-300'
                            onSubmit={form.handleSubmit(onsubmit)}
                        >
                            <h1 className='my-4 text-center font-semibold text-2xl capitalize'>new Category</h1>





                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >

                                        <FormLabel>sub category name</FormLabel>
                                        <FormControl>
                                            <Input type='text'  {...field} placeholder='sub category name' />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                            
                            <FormField
                                name="slug"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >

                                        <FormLabel>sub category slug</FormLabel>
                                        <FormControl>
                                            <Input type='text'  {...field} placeholder='sub category slug' />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className=' w-full block space-y-2'
                                    >
                                        <FormLabel>Description</FormLabel>

                                        <FormControl>
                                            <Input type='text'  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>

                                )}
                            />





                            <Button variant={"default"}
                                type='submit'
                                className='w-full cursor-pointer'
                            >
                                Create Category
                                {
                                    isLoading && <ButtonLoader />
                                }
                            </Button>

                        </form>

                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryForm