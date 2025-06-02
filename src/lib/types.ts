import { Mod } from "@/generated/prisma";

export type ModWithGame = {
  game: {
    name: string,
    path: string
  }
} & Mod 