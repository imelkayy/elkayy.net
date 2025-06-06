import { prisma } from "@/prisma";
import { ModsPageProps } from "../page"
import { redirect } from "next/navigation";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { Fragment } from "react";

export default async function ModSettingsPage({ params } : ModsPageProps) {
  const p = await params;
  const gamePath = p.game;
  const modSlug = p.mod;
  
  const game = await prisma.game.findUnique({
    where: {
      path: gamePath
    }
  });

  if(!game) redirect("/mods/");

  const mod = await prisma.mod.findUnique({
    where: {
      slug_gameId: {
        gameId: game.id,
        slug: modSlug
      }
    },
    include: {
      settings: true
    }
  });

  if(!mod) redirect(`/mods/${gamePath}/`);
  else if(mod.settings.length <= 0) redirect(`/mods/${gamePath}/${modSlug}/`);

  return (
    <Box>

      <Typography variant="h3" sx={{textDecoration: "underline"}}>{mod?.name} Default Settings</Typography>

      <Divider variant="middle" />

      <Typography variant="subtitle1">The following settings go into gameUserSettings.ini</Typography>

      <Box
        component={Paper}
        variant="outlined"
        margin="15px"
        padding="5px"
      >
        <Typography component="pre">[{mod?.section}]
        {
          mod?.settings.map((setting) => (
            <Fragment key={setting.id}>
              {"\n"}
              {setting.key}={setting.default}
            </Fragment>
          ))
        }
        </Typography>
      </Box>
    </Box>
  )
}