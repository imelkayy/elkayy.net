import { Mod } from "@/generated/prisma";
import { ModKey } from "./types";

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