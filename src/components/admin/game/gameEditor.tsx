"use client";

import GameInput, { GamesType } from "@/components/admin/game/gameInput";
import ScrollMenu, { ScrollId, ScrollItem } from "@/components/admin/scrollMenu";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function GameEditor({
  games,
  saveGame,
  getGame,
  removeGame
} : {
  games: ScrollItem[],
  saveGame: (id: number | undefined, game: GamesType) => Promise<ScrollItem>,
  getGame: (id: number) => Promise<GamesType | null>,
  removeGame: (id: number) => Promise<Boolean>
}) {
  const [myGames, setGames] = useState<ScrollItem[]>(games);
  const [current, setCurrent] = useState<GamesType | undefined>(undefined);
  const [currentId, setCurrentId] = useState<number | undefined>(undefined);

  function handleSelect(id: ScrollId) {
    console.log(id)
    setCurrentId(id);
    if(id) {
      getGame(id).then(g => {if(g) setCurrent(g)});
    } else {
      setCurrent({ name: "", path: "" })
    }
  }

  function handleSave(value: GamesType) {
    saveGame(currentId, value)
      .then((v) => {
        setGames([...myGames.filter((g) => g.id != currentId), v]);
        setCurrentId(v.id);
      });
  }

  function handleRemove(id: ScrollId) {
    if(Number(id)) {
      removeGame(id as number)
        .then( s => { if(s) setGames([...myGames.filter(g => g.id != id)]) })
    }
  }

  return(
    <Stack
      direction="row"
      width="100%"
      spacing={1}
      flex={1}
      padding={"10px"}
    >
      <ScrollMenu
        title="Games"
        items={myGames}
        onSelect={handleSelect}
        onAddNew={() => handleSelect(undefined)}
        onRemove={handleRemove}
      />

      {
        current ?
        <Stack
          spacing={1}  
          // width="65%"   
          flex={1}    
        >
          <Typography
            variant="h5"
            textAlign="center"
          >
            Edit Game
          </Typography>

          <GameInput
            value={current}
            setValue={setCurrent}
            onSave={handleSave}
          />
        </Stack>
        :
        <></>
      }
    </Stack>
  )
}