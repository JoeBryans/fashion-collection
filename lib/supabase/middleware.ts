import { CookieOptions, createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from './supabase'

interface Cookies {
  name: string
  value: string
  options?: Partial<CookieOptions>
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }:Cookies) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }:Cookies) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  await supabase.auth.getUser()
  
 const {data,error}= await supabase.auth.getSession()
 const session=data?.session
 
 
 if(session ===null && request.nextUrl.pathname.startsWith("/dashboard")){
   return NextResponse.redirect(new URL("/auth/sign-in", request.url))
 }
 if(session !==null && request.nextUrl.pathname.startsWith("/auth/sign-in")||request.nextUrl.pathname.startsWith("/auth/sign-up")){
   return NextResponse.redirect(new URL("/", request.url))
 }
 



  return supabaseResponse
}