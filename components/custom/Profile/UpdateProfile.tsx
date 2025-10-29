"use client"
import { Button } from '@/components/ui/button'
import ButtonLoader from '@/components/ui/button-loader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, Edit2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { set, z } from 'zod'

const formSchema = z.object({
    email: z.email(),
    //   password: z.string(),
    name: z.string(),
    phone: z.string(),
})

const UpdateProfile = ({ profile }: { profile: Profile }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState<string | null>(null)
    const [profileData, setProfileData] = useState<Profile>({
        email: profile.email,
        name: profile.name,
        phone: profile.phone,
        id: profile.id,
        image: profile.image,
        created_at: profile.created_at,
    })
    console.log(profileData)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: profile.email || '',
            name: profile.name || '',
            phone: profile.phone || '',
        }
    })
    const supabase = createClient()
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const { data: auth, error: authErr } = await supabase.auth.updateUser({
                email: data.email,
                // phone: data.phone,
                data: {
                    name: data.name,
                }
            }, {
                emailRedirectTo: `${window.location.origin}/auth/email-verification`
            })
            if (authErr) {
                setIsLoading(false)
                console.log(authErr)
                toast.error(`failed to sign up: ${authErr.message}`)
            }
            const { data: profileUpdate, error } = await supabase.from('profile').update({
                name: data.name,
                email: data.email,
                phone: data.phone,
                image: image !== null ? image : `https://avatar.iran.liara.run/username?username=${data.email}+${data.name}`,
            }).eq('id', profile.id).single()
            if (error) {
                setIsLoading(false)
                toast.error(`failed to update profile: ${error.message}`)
                console.log(error)
                // toast.error(`failed to update profile: ${error.message}`)
            }
            setIsLoading(false)
            toast.success("Update successfully")
            router.push("/profile")

        } catch (error) {
            setIsLoading(false)
            toast.error("something went wrong!: " + error)
            console.log(error)
            return

        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-lg shadow-md rounded-md p-8 dark:bg-gray-900 dark:border dark:border-gray-700 dark:shadow-gray-700/50">


                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>

                                <div className='flex items-center gap-2'>
                                    <Input placeholder="shadcn" {...field}
                                        disabled={profileData.name ? true : false}
                                    />

                                    <Edit2 size={15}
                                        onClick={() => {
                                            setProfileData({ ...profileData, name: "" })

                                        }}
                                        className='cursor-pointer'
                                    />

                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl >
                                <div className='flex items-center gap-2'
                                >
                                    <Input placeholder="@gmail.com" {...field}
                                     disabled={profileData.email?true:false}
                                    />
                                    <Edit2 size={15}
                                    onClick={()=>setProfileData({...profileData,email:""})}
                                        className='cursor-pointer' />
                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <div className='flex items-center gap-2'>
                                    <Input placeholder="+44" {...field}
                                        disabled={profileData.phone ? true : false}
                                    />

                                    <Edit2 size={15}
                                        onClick={() => {
                                            setProfileData({ ...profileData, phone: "" })

                                        }}
                                        className='cursor-pointer'
                                    />

                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit"
                    className="w-full bg-primary rounded-md py-2 px-4 text-sm  text-white shadow-sm hover:bg-primary/90 dark:text-gray-900 font-bold cursor-pointer"
                >
                    Update {
                        isLoading && <ButtonLoader />
                    }
                </Button>

            </form>
        </Form>)
}

export default UpdateProfile