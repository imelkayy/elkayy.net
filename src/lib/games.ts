import { prisma } from "@/prisma"
import { SelectOption } from "./types"

export async function getGamesAsSelectOptions(): Promise<SelectOption[]> {
  return (await prisma.game.findMany()).map(g => { return { label: g.name, id: g.id } });
}