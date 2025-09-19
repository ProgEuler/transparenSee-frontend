import "next-auth"

declare module "next-auth" {
  interface User {
    role?: string
    token?: string
  }

  interface Session {
    user: {
      role?: string
      token?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    token?: string
  }
}
