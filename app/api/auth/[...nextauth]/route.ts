import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    // Normal Username + Password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        })
        const user = await res.json()

        if (!res.ok || !user) return null

        return {
          id: user.id,
          email: user.email,
          role: user.role, // citizen | guest | localAuth | gov
          token: user.token // keep backend JWT here
        }
      }
    }),

    // MetaMask (Ethereum wallet)
    CredentialsProvider({
      id: "metamask",
      name: "MetaMask",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/metamask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        })
        const user = await res.json()
        if (!res.ok || !user) return null

        return {
          id: user.id,
          address: user.address,
          role: user.role,
          jwt: user.token
        }
      }
    })
  ],

  // Store backend JWT inside NextAuth JWT
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.accessToken = token.token
      return session
    }
  },

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/auth/login"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
