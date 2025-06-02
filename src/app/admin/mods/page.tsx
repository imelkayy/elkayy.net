import { ModEditor } from "@/components/admin/mod/modEditor";
import { Mod } from "@/generated/prisma";
import { prisma } from "@/prisma"


export default async function AdminModsPage() {
  const allMods = await prisma.mod.findMany();

  async function saveMod(mod: Mod) {
    "use server";
    console.log(mod);

  }

  async function removeMod(slug: string, gameId: number): Promise<boolean> {
    "use server";
    const removed = await prisma.mod.delete({
      where: {
        slug_gameId: {
          slug: slug,
          gameId: gameId
        }
      }
    });
    return Boolean(removed)
  }

  return (
    <ModEditor
      mods={allMods}
      saveMod={saveMod}
      removeMod={removeMod}
    />
  )
}