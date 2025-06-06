import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { GameParam } from "../page";
import Box from "@mui/material/Box";
import { Card, Divider, Link, Paper, Stack, Typography } from "@mui/material";
import { getDescriptionFromCF } from "@/lib/api/curseforge";
import SettingsTable from "@/components/mods/settings/settingsTable";

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
      gameId: game.id,
      published: true
    },
    include: {
      settings: true
    }
  });

  // Or mod not found?
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

      <Divider variant="middle" sx={{borderBottomWidth: "2px"}} />

      <Stack
        direction="row"
        marginLeft="15px"
      >
        { mod.url ? <Link href={mod.url} sx={{textTransform: "capitalize"}}>View on {mod.provider}</Link> : <></>}
      </Stack>
      <Card
        component={Paper}
        variant="outlined"
        sx={{
          padding: "15px",
          margin: "20px"
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

      {
        mod.settings.length > 0 ?
        <>
          <Typography variant="h4">Settings</Typography>
          <Typography variant="subtitle1">Section: [{mod.section}]</Typography>
          
          <SettingsTable settings={mod.settings} />
        </>
        :
        <></>
      }
      
    </Box>
  )
}