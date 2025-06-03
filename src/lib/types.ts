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

export interface SelectOption {
  label: string,
  id: number
}

export interface ModKey {
  slug: string, 
  gameId: number
};

type ErrorCase = { error: boolean, message: string }
export type ModValidation = {
  name?: ErrorCase,
  slug?: ErrorCase,
  game?: ErrorCase,
  provider?: ErrorCase,
  providerId?: ErrorCase
}