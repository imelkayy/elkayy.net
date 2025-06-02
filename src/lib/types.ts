import { Mod } from "@/generated/prisma";

export type ModWithGame = {
  game: {
    name: string,
    path: string
  }
} & Mod 

export type ModWithGameName = {
  game: {
    name: string
  }
} & Mod 
