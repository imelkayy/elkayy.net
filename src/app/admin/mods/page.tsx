import { ModEditor } from "@/components/admin/mod/modEditor";
import { Mod } from "@/generated/prisma";
import { saveAndCacheMod } from "@/lib/mod";
import { ModKey } from "@/lib/types";
import { prisma } from "@/prisma"


export default async function AdminModsPage() {
  const allMods = await prisma.mod.findMany({
    include: {
      game: {
        select: {
          name: true
        }
      }
    }
  });
  const games = (await prisma.game.findMany()).map(g => { return { label: g.name, id: g.id } })



  async function saveMod(id: ModKey | undefined, mod: Mod & { game?: undefined }) {
    "use server";

    // Sanitize the mod we're saving
    delete mod.game;
    await saveAndCacheMod(id, mod);
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
      games={games}
      saveMod={saveMod}
      removeMod={removeMod}
    />
  )
}