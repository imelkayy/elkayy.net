import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { GameParam } from "../page";
import Box from "@mui/material/Box";
import { Card, Paper, Typography } from "@mui/material";
import { getDescriptionFromCF } from "@/lib/api/curseforge";

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

  let description = ""

  if(mod.providerId)
    description = await getDescriptionFromCF(mod.providerId)

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="bold"
        marginLeft="10px"
      >
        {mod.name}
      </Typography>
      <Card
        component={Paper}
        variant="elevation"
        sx={{
          padding: "15px"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textTransform: "capitalize"
          }}
        >
          {mod.provider} Description:
        </Typography>

        <Typography dangerouslySetInnerHTML={{__html: description}} />
      </Card>
    </Box>
  )
}