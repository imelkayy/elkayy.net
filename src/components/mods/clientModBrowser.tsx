"use client";

import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ModCard from "./modCard";
import { ModWithGame, SelectOption } from "@/lib/types";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, MenuItem, Select, Stack } from "@mui/material";

type ClientModBrowserProps = {
  mods: ModWithGame[],
  games?: SelectOption[]
}

export default function ClientModBrowser({ mods, games } : ClientModBrowserProps) {
  const [myMods, setMyMods] = useState<ModWithGame[]>(mods);
  const [search, setSearch] = useState<string>("");
  const [game, setGame] = useState<number>(-1);

  useEffect(() => {
    let filtered: ModWithGame[] = mods;

    if(game > -1)
      filtered = filtered.filter(m => m.gameId == game);

    if(search)
     filtered = filtered.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

    setMyMods(filtered);
  }, [search, game])

  useEffect(() => {

  }, [game]);
  
  return (
    <Box>
      <Stack
        component={Paper}
        direction="row"
        spacing={1}
        variant="outlined"
        marginLeft="2.5%"
        marginRight="2.5%"
      >
        <TextField
          label="Search Mods"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
                )
            }
          }}
        />
        {
          games?
          <TextField
            select
            label="Game"
            value={game}
            onChange={(e) => setGame(Number(e.target.value))}
            fullWidth
            
          >
            { games.map((g) => <MenuItem key={g.id} value={g.id}>{g.label}</MenuItem> ) }
          </TextField>
          :
          <></>
        }
        
      </Stack>
      
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