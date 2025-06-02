import { Mod } from "@/generated/prisma";

export function getScrollIdForMod(mod: Mod) {
  return `${mod.gameId}.${mod.slug}`;
}

export function scrollIdToModId(scrollId: string): { slug: string, gameId: number } {
  const split = scrollId.split(".");
  return {
    slug: split[1],
    gameId: Number(split[0])
  };
}