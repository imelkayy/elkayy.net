import { ModEditor } from "@/components/admin/mod/modEditor";
import { Mod } from "@/generated/prisma";
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

    if(id) {
      await prisma.mod.update({
        where: {
          slug_gameId: {
            slug: id.slug,
            gameId: id.gameId
          }
        },
        data: mod
      })
    } else {
      await prisma.mod.create({
        data: mod
      })
    }

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