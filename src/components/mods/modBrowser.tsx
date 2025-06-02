import { prisma } from "@/prisma";
import ClientModBrowser from "./clientModBrowser";

type ModBrowserProps = {
  gameId?: number
}

type ModFilterType = {
  where: {
    gameId?: number,
    published: boolean
  },
  include: GameIncludeType
}

type GameIncludeType = {
  game: {
    select: {
      name: boolean,
      path: boolean
    }
  }
}

export default async function ModBrowser({ gameId } : ModBrowserProps) {
  const include: GameIncludeType = {
    game: {
      select: { 
        name: true,
        path: true
      }
    }
  }

  let modFilters: ModFilterType = {
    where: { 
      gameId: undefined,
      published: true 
    },
    include: include
  }

  if(Number(gameId))
    modFilters.where.gameId = gameId;

  const mods = await prisma.mod.findMany(modFilters);

  return <ClientModBrowser mods={mods} />;
}