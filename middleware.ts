import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) return false

        const role = token.role
        const path = req.nextUrl.pathname

        if (role === "gov" && path.startsWith("/gov")) return true
        if (role === "localAuth" && path.startsWith("/local")) return true
        if (role === "citizen" && path.startsWith("/citizen")) return true
        if (role === "guest" && path.startsWith("/guest")) return true

        return false
      }
    }
  }
)

export const config = {
  matcher: ["/gov/:path*", "/local/:path*", "/citizen/:path*", "/guest/:path*"]
}
