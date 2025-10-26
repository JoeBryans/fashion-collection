"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, set, z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useState } from "react"
import ButtonLoader from "../ui/button-loader"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "../header/Logo"

const formSchema = z.object({
  email: email().refine((value) => value.length > 2, {
    message: "Email must be longer than 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
})

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    }
  })
  const supabase = createClient()
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    try {
      setIsLoading(true)
      const { data: auth, error } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
          phone: data.phone,
          options: {
            emailRedirectTo: `/auth/email-verification`,
            data: {
              name: data.name,
            },
          }
        }
      )
      if (error) {
        setIsLoading(false)
        console.log(error)
        toast.error(`failed to sign up: ${error.message}`)
      }
      const { data: profile, error: profileError } = await supabase.from('profile').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          id: auth?.user?.id,
          image: `https://avatar.iran.liara.run/username?username=${data.email}+${data.name}`,
        }
      ]).select('*').single()
      if (profileError) {
        setIsLoading(false)
        toast.error(`failed to create profile: ${profileError.message}`)

      }else{
        setIsLoading(false)
        toast.success("Sign up successfully")
      router.push("/auth/email-verification")
      }
    } catch (error) {
      setIsLoading(false)
      toast.error("something went wrong!: " + error)
      console.log(error)
      return
    }

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-2xl shadow-md rounded-md p-8 dark:bg-gray-900 dark:border dark:border-gray-700 dark:shadow-gray-700/50">
       
       <h1 className="text-2xl font-bold flex items-center justify-center">Welcome to <Logo/></h1>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormControl>
                <Input placeholder="@gmail.com" {...field} />
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
                <Input placeholder="+91" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"
          className="w-full bg-primary rounded-md py-2 px-4 text-sm  text-white shadow-sm hover:bg-primary/90 dark:text-gray-900 font-bold cursor-pointer"
        >
          Sign Up {
            isLoading && <ButtonLoader />
          }
        </Button>
        <div className="w-full flex flex-wrap gap-4 items-center -mt-2  mx-auto justify-center place-items-center">
          <p>
            <span>Already have an account?</span>
          <Link href={"/auth/sign-in"}
              className="text-blue-700 font-semibold decoration-1 hover:underline-offset-4 hover:underline"
          > sign in</Link>
          </p>
          <p>
            <span>Forgot password?</span>
            <Link href={"/auth/reset-password"}
              className="text-blue-700 font-semibold decoration-1 hover:underline-offset-4 hover:underline"
            > reset password</Link>
          </p>
          {/* <p>
            <Link href={"privace"}>
            </Link>
          </p> */}
        </div>
      </form>
    </Form>
  )
}