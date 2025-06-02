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

export interface AutocompleteItem {
  label: string,
  id: number
}

export interface ModKey {
  slug: string, 
  gameId: number
};