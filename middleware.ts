
// import { type NextRequest, NextResponse } from 'next/server'
// // import { supabaseClient } from 'utils/auth-helpers-nextjs'
// import { supabaseClient } from '../script-sync/utils/supabaseClient'

// // Since Server Components can't write cookies, you need middleware to refresh expired Auth tokens and store them.



// // Initialize Supabase client
// const supabase = supabaseClient()

// export async function middleware(request: NextRequest) {
//   const { cookies, headers } = request
//   const token = cookies.get('sb-access-token') // Get the existing token from cookies

//   if (!token) {
//     return NextResponse.next()
//   }

//   try {
//     // Verify and refresh the token if necessary
//     const { data: { session }, error } = await supabase.auth.getSession(token)

//     if (error || !session) {
//       console.error('Failed to refresh session:', error.message)
//       return NextResponse.redirect('/login') // Redirect to login if session refresh fails
//     }

//     // Set the refreshed token in cookies
//     const response = NextResponse.next()
//     response.cookies.set('sb-access-token', session.access_token, { httpOnly: true, path: '/' })

//     return response
//   } catch (error) {
//     console.error('Error in middleware:', error.message)
//     return NextResponse.redirect('/login') // Redirect to login on error
//   }
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }
