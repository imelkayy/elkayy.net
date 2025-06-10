import { prisma } from "@/prisma";
import ClientModBrowser from "./clientModBrowser";
import { SelectOption } from "@/lib/types";
import { getGamesAsSelectOptions } from "@/lib/games";

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

  let games: SelectOption[] | undefined = undefined;

  if(Number(gameId))
    modFilters.where.gameId = gameId;
  else 
    games = [
      { id: -1, label: "All Games" },
      ...(await getGamesAsSelectOptions())
    ];

  const mods = await prisma.mod.findMany(modFilters);

  return <ClientModBrowser mods={mods} games={games} />;
}