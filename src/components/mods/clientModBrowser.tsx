"use client";

import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ModCard from "./modCard";
import { ModWithGame } from "@/lib/types";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

type ClientModBrowserProps = {
  mods: ModWithGame[]
}

export default function ClientModBrowser({ mods } : ClientModBrowserProps) {
  const [myMods, setMyMods] = useState<ModWithGame[]>(mods);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if(search)
      setMyMods([...mods.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))]);
    else
      setMyMods(mods);
  }, [search])
  
  return (
    <Box>
      <TextField
        label="Search Mods"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid
        container
        spacing={1}
        margin={1.5}
        direction="row"
        sx={{
          justifyContent: "flex-start",
          alignItems: "stretch"
        }}
      >
      {
        myMods.map((mod) => (
          <Grid
            size={4}
            key={mod.slug}
          >
            <ModCard mod={mod}/>
          </Grid>
        ))
      }
      </Grid>
    </Box>
  );
}