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

export async function saveAndCacheMod(key: ModKey | undefined, mod: Mod) {
  if(mod.providerId) {
    const modInfo = await getModInfoFromCF(mod.providerId);
    mod.updatedAt = modInfo.updatedAt;
    mod.summary = modInfo.summary;
    mod.url = modInfo.providerUrl;
  }
  
  if(key) {
    await prisma.mod.update({
      where: {
        slug_gameId: key
      },
      data: mod
    });
  } else {
    await prisma.mod.create({
      data: mod
    });
  }
}