"use client"
import { Button } from '@/components/ui/button'
import ButtonLoader from '@/components/ui/button-loader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { error } from 'console'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { set, z } from 'zod'
const schema = z.object({
    location: z.string().min(3, {
        message: "Location is required",
    }),
    city: z.string().min(3, {
        message: "City is required",
    }),
    state: z.string().min(3, {
        message: "State is required",
    }),
    zipCode: z.string().min(3, {
        message: "Zip Code is required",
    }),
    country: z.string().min(3, {

        message: "Country is required",
    }),
})
const Address = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const form = useForm<z.infer<typeof schema>>(
        {
            resolver: zodResolver(schema),
            defaultValues: {
                location: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            }
        }
    )
    const supabase = createClient()
    const onsubmit = async (data: z.infer<typeof schema>) => {
        // console.log(data)
        try {
            setIsLoading(true)
            const { data: address, error } = await supabase.from('address').insert([
                {
                    location: data.location,
                    city: data.city,
                    state: data.state,
                    zip_code: data.zipCode,
                    country: data.country,
                }
            ])
            if (error) {
                setIsLoading(false)
                setError(error.message)
                toast.error("Faild to create address")
            }
            else {
                setIsLoading(false)
                toast.success("Address created successfully")
                // form.reset()
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setError(`Something went wrong! ${error}`)
            toast.error("something went wrong")
        }
    }
    return (
        <div className='w-full mx-auto '>

            <Form {...form}>
                <form action=""
                    onSubmit={form.handleSubmit(onsubmit)}
                    className='flex flex-col gap-4 w-full px-5 max-w-lg bg-white  border-neutral-300 py-10 rounded-lg shadow drop-shadow mx-auto'
                >

                    {
                        error && <div className='text-red-500 text-sm p-2 border-2 border-red-200 rounded-md bg-red-100'>{error}</div>
                    }
                    <FormField
                        name="location"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Location" />

                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        name="city"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="City" />

                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        name="state"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="State" />

                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        name="zipCode"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Zip Code" />

                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        name="country"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Country" />

                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <Button variant={"dark"} className='cursor-pointer flex items-center gap-2'>
                        Create{
                            isLoading && <ButtonLoader />
                        }
                    </Button>
                </form>

            </Form>
        </div>
    )
}

export default Address


const InputFild = () => {
    return (
        <div className='flex flex-col gap-2 '>

        </div>
    )
}