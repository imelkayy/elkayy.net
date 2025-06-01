import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord, GitHub],
  adapter: PrismaAdapter(prisma),
  trustHost: true
})

export const providers = [
  { name: "Discord", id: "discord" },
  { name: "GitHub", id: "github" }
]