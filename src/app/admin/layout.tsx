import { auth } from "@/auth";
import { UserRoles } from "@/lib/enums";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children
} : {
  children: ReactNode
}) {
  // Server-side control of access to /admin
  const session = await auth();
  if(!session?.user) redirect("/login");

  const usr = await prisma.user.findFirst({where: {id: session.user.id}});
  if(usr?.role != UserRoles.Admin) redirect("/");

  return children;
}