"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"

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
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import ButtonLoader from "../ui/button-loader"
import Link from "next/link"

const formSchema = z.object({
  email: email().refine((value) => value.length > 2, {
    message: "Email must be longer than 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 2 characters.",
  }),
})

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const supabase = createClient()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {

      setIsLoading(true)
      const { data: auth, error } = await supabase.auth.signInWithPassword(
        {
          email: data.email,
          password: data.password,
        }
      )
      if (error) {
        setIsLoading(false)
        console.log(error)
        toast.error(`failed to sign in: ${error.message}`)
      } else {
        setIsLoading(false)
        toast.success("Sign in successfully")
        // router.push("/auth/email-verification")
        router.push("/")
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[400px] shadow-md rounded-md p-8 dark:bg-gray-900 dark:border dark:border-gray-700 dark:shadow-gray-700/50">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Input type="password" placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"
          className="w-full bg-primary rounded-md py-2 px-4 text-sm  text-white shadow-sm hover:bg-primary/90 dark:text-gray-900 font-bold cursor-pointer"
        >
          Sign In {
            isLoading && <ButtonLoader />
          }

        </Button>
        <div className="w-full flex flex-wrap gap-4 items-center -mt-2  mx-auto justify-center place-items-center">
          <p>
            <span>New to Jb-collection?</span>
            <Link href={"/auth/sign-up"}
              className="text-blue-700 font-semibold decoration-1 hover:underline-offset-4 hover:underline"
            > sign up</Link>
          </p>

        </div>
      </form>
    </Form>
  )
}