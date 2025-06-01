"use server";

import { signIn } from "@/auth";

export async function dispatchSignin(provider: string, redirect?: string) {
  return await signIn(provider, { redirect: Boolean(redirect), redirectTo: redirect });
}