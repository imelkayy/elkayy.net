import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { GameParam } from "../page";
import Box from "@mui/material/Box";
import { Card, Divider, Link, Paper, Stack, Typography } from "@mui/material";
import { getDescriptionFromCF } from "@/lib/api/curseforge";
import SettingsTable from "@/components/mods/settings/settingsTable";

export type GameModParam = GameParam & { mod: string };
export type ModsPageProps = { params: Promise<GameModParam> };

export async function generateMetadata({ params }: ModsPageProps) {
  const PARAMS = await params;
  const gamePath = PARAMS.game;
  const modSlug = PARAMS.mod;

  const game = await prisma.game.findFirst({
    where: {
      path: gamePath
    }
  });

  if(!game) return {
    title: "Not found",
  }

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

  if(!mod) return {
    title: "Not found",
  }

  return {
    title: mod.name,
    description: mod.summary,
    openGraph: {
      title: mod.name,
      description: mod.summary,
      images: [{
        url: mod.logoUrl,
      }],
      type: "website"
    }
  }
}

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
      <Stack
        direction="row"
      >
        <img
            src={mod.logoUrl}
            alt={`${mod.name} icon`}
            width="80"
            height="80"
          />
        <Typography
          variant="h2"
          fontWeight="bold"
          marginLeft="10px"
          alignSelf="center"
        >
          {mod.name}
        </Typography>
      </Stack>
      

      <Divider variant="middle" sx={{borderBottomWidth: "2px"}} />

      <Stack
        direction="row"
        marginLeft="15px"
      >
        { mod.url ? <Link href={mod.url} sx={{textTransform: "capitalize"}}>View on {mod.provider}</Link> : <></>}
      </Stack>
      <Card
        variant="outlined"
        sx={{
          paddingLeft: "15px",
          paddingRight: "15px",
          margin: "20px"
        }}
      >
        <Typography dangerouslySetInnerHTML={{__html: description}} />
      </Card>

      {
        mod.settings.length > 0 ?
        <Box
          marginLeft="10px"
          marginRight="10px"
        >
          <Typography variant="h4">Settings</Typography>
          <Typography variant="subtitle1">Section: [{mod.section}]</Typography>
          
          <SettingsTable settings={mod.settings} />
        </Box>
        :
        <></>
      }
      
    </Box>
  )
}