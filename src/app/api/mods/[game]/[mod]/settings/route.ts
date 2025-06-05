import { ModsPageProps } from "@/app/mods/[game]/[mod]/page";
import { Game, Prisma } from "@/generated/prisma";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: ModsPageProps) {
  const p = await params.params;
  const game = p.game;
  const mod = p.mod;
  let where: Prisma.GameWhereUniqueInput = {
    path: game
  };

  // Handle finding game through its id instead of path
  if(!Number.isNaN(Number(game)))
    where = {
      id: Number(game)
    }

  const gameId = (await prisma.game.findUnique({
    where: where
  }) as Game).id;
  
  const settings = await prisma.setting.findMany({
    where: {
      modGame: gameId,
      modSlug: mod
    }
  })

  return NextResponse.json({ settings: settings });
}