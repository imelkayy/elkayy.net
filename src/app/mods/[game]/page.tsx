import ModBrowser from "@/components/mods/modBrowser"
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export type GameParam = { game: string };
type AllModsPageProps = { params: Promise<GameParam> };

export default async function GameModPage({ params } : AllModsPageProps) {
  const gamePath = (await params).game;

  const game = await prisma.game.findFirst({
    where: {
      path: gamePath
    }
  });
  
  if(!game) redirect("/mods");

  return <ModBrowser gameId={game.id} />
}