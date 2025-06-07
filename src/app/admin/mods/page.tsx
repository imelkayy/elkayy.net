import { ModEditor } from "@/components/admin/mod/modEditor";
import { Mod, Setting } from "@/generated/prisma";
import { saveAndCacheMod } from "@/lib/mod";
import { ModKey } from "@/lib/types";
import { prisma } from "@/prisma"
import { DialogsProvider } from "@toolpad/core";


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



  async function saveMod(id: ModKey | undefined, mod: Mod & { game?: undefined }): Promise<boolean> {
    "use server";

    // Sanitize the mod we're saving
    delete mod.game;
    return await saveAndCacheMod(id, mod);
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

    if(settings) {
      settings.forEach(async (setting) => {
        const data = {
          name: setting.name,
          key: setting.key,
          default: setting.default,
          description: setting.description,
          type: setting.type,
          modGame: forMod.gameId,
          modSlug: forMod.slug
        }

        await prisma.setting.upsert({
          where: {
            modSlug_modGame_key: {
              modSlug: forMod.slug,
              modGame: forMod.gameId,
              key: setting.key
            }
          },
          create: data,
          update: data
        })
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
    <DialogsProvider>
      <ModEditor
        mods={allMods}
        games={games}
        saveMod={saveMod}
        removeMod={removeMod}
        saveSettings={saveSettings}
      />
    </DialogsProvider>
  )
}