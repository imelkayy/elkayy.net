import { GamesType } from "@/components/admin/game/gameInput";
import { prisma } from "@/prisma";
import GameEditor from "@/components/admin/game/gameEditor";
import { ScrollItem } from "@/components/admin/scrollMenu";

export default async function AdminGamesPage() {
  const games = await prisma.game.findMany();

  async function saveGame(id: number | undefined, value: GamesType): Promise<ScrollItem> {
    "use server";
    const data = {
      name: value.name,
      path: value.path
    };

    if(id)
      return await prisma.game.upsert({
        where: { id: id },
        create: data,
        update: data
      })
    else
      return await prisma.game.create({
        data: data
      })
  }

  async function getGame(id: number): Promise<GamesType | null> {
    "use server";
    return await prisma.game.findFirst({where: {id: id}});
  }

  async function removeGame(id: number): Promise<Boolean> {
    "use server";
    const deleted = await prisma.game.delete({ where: {id: id} });
    return Boolean(deleted);
  }

  return (
    <GameEditor
      games={games}
      getGame={getGame}
      saveGame={saveGame}
      removeGame={removeGame}
    />
  )
}