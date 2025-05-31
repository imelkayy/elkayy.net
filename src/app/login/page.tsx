import Signin from "@/components/auth/signin";
import { auth, providers } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  // Users don't need to go to /login if they're already signed in
  if(session) redirect("/");

  return <Signin providers={providers} />
}