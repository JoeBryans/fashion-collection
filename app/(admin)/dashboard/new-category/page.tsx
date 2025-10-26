"use client"
import { Button } from '@/components/ui/button'
import ButtonLoader from '@/components/ui/button-loader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from "zod"

const schema = z.object({
    name: z.string().min(3).toLowerCase(),
    slug: z.string().min(3).toLowerCase(),
    description: z.string().min(3),
})

const NewCategory = () => {
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
                    name: data.name,
                    description: data.description,
                    slug: data.slug,
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
    return (
        <div className='w-full min-h-screen flex items-center'>
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

                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type='text'  {...field} />
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

                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input type='text'  {...field} />
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


        </div>
    )
}

export default NewCategory