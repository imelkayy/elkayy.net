import { ModEditor } from "@/components/admin/mod/modEditor";
import { Mod, Setting } from "@/generated/prisma";
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

  async function saveSettings(settings: Setting[], remove: number[], forMod: ModKey) {
    "use server";
    console.log(remove);

    if(settings) {
      settings.forEach(async (setting) => {
        if(setting.id >= 0) {
          await prisma.setting.update({
            where: {
              id: setting.id
            },
            data: {
              ...setting,
              modGame: forMod.gameId,
              modSlug: forMod.slug
            }
          });
        } else {
          await prisma.setting.create({
            data: {
              name: setting.name,
              default: setting.default,
              type: setting.type,
              modGame: forMod.gameId,
              modSlug: forMod.slug
            }
          });
        }
      })
    }
    // Handle deleted settings
    if(remove) {
      remove.forEach(async (settingId) => {
        await prisma.setting.delete({
          where: {
            id: settingId
          }
        });
      })
    }
  }

  return (
    <ModEditor
      mods={allMods}
      games={games}
      saveMod={saveMod}
      removeMod={removeMod}
      saveSettings={saveSettings}
    />
  )
}