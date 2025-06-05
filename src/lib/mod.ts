import { Mod } from "@/generated/prisma";
import { ModKey } from "./types";
import { getModInfoFromCF } from "./api/curseforge";
import { prisma } from "@/prisma";

export function getScrollIdForMod(mod: Mod) {
  return `${mod.gameId}.${mod.slug}`;
}

export function scrollIdToModId(scrollId: string): ModKey {
  const split = scrollId.split(".");
  return {
    slug: split[1],
    gameId: Number(split[0])
  };
}

export async function saveAndCacheMod(key: ModKey | undefined, mod: Mod): Promise<boolean> {
  if(mod.providerId) {
    const modInfo = await getModInfoFromCF(mod.providerId);
    mod.updatedAt = modInfo.updatedAt;
    mod.summary = modInfo.summary;
    mod.url = modInfo.providerUrl;
  }

  let save: Mod;
  
  if(key) {
    save = await prisma.mod.update({
      where: {
        slug_gameId: key
      },
      data: mod
    });
  } else {
    save = await prisma.mod.create({
      data: mod
    });
  }
  
  return save.slug == mod.slug && save.gameId == mod.gameId;
}