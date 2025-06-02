import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { GameParam } from "../page";

export type GameModParam = GameParam & { mod: string };
export type ModsPageProps = { params: Promise<GameModParam> };

export default async function GameModsPage({ params } : ModsPageProps) {
  const PARAMS = await params;
  const gamePath = PARAMS.game;
  const modSlug = PARAMS.mod;

  const game = await prisma.game.findFirst({
    where: {
      path: gamePath
    }
  });

  if(!game) redirect("/mods");

  const mod = await prisma.mod.findFirst({
    where: {
      slug: modSlug,
      gameId: game.id
    }
  });

  if(!mod) redirect(`/mods/${gamePath}`);

  return (
    <div>{mod.name}</div>
  )
}