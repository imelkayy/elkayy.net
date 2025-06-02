"use client";

import { Mod } from "@/generated/prisma";
import Stack from "@mui/material/Stack";
import ScrollMenu, { ScrollId, ScrollItem } from "../scrollMenu";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ModInput from "./modInput";
import { getScrollIdForMod, scrollIdToModId } from "@/lib/mod";

type ModPartial = Partial<Mod>;

export function ModEditor({
  mods,
  saveMod,
  removeMod
} : { 
  mods: Mod[],
  saveMod: (mod: Mod) => void,
  removeMod: (slug: string, gameId: number) => Promise<boolean> 
}) {
  const [myMods, setMyMods] = useState<Mod[]>(mods);
  const [myModItems, setMyModItems] = useState<ScrollItem[]>([]);
  const [currentMod, setCurrentMod] = useState<Mod | undefined>(undefined);

  const defaultMod: Mod = {
    name: "",
    slug: "",
    summary: "",
    provider: "",
    providerId: 0,
    updatedAt: new Date(),
    gameId: 0,
    published: false
  }

  useEffect(() => {
    const items = myMods.map((mod) => {
      return {
        id: getScrollIdForMod(mod),
        name: mod.name
      }
    });

    setMyModItems(items);
  }, [myMods]);

  function handleSelect(id: ScrollId) {
    if(!id)
      setCurrentMod(defaultMod)
    const mid = scrollIdToModId(id as string);
    setCurrentMod(myMods.find(m => m.gameId == mid.gameId && m.slug == mid.slug));
  }

  function handleRemove(id: ScrollId) {
    const mid = scrollIdToModId(String(id));
    removeMod(mid.slug, mid.gameId)
      .then(s => {
        if(s) setMyMods([...myMods.filter(m => m.gameId != mid.gameId && m.slug != mid.slug)])
      })
  }

  function handleSave() {
    if(currentMod)
      saveMod(currentMod);
  }

  function handleChange(mod: ModPartial) {
    if(currentMod)
      setCurrentMod({...currentMod, ...mod})
  }


  return (
    <Stack
      direction="row"
      width="100%"
      spacing={1}
      flex={1}
      padding={"10px"}
    >
      <ScrollMenu
        title="Games"
        items={myModItems}
        onSelect={handleSelect}
        onAddNew={() => handleSelect(undefined)}
        onRemove={handleRemove}
      />

      {
        currentMod ?
        <Stack
          spacing={1}
          flex={1} 
        >
          <Typography
            variant="h5"
            textAlign="center"
          >
            Edit Game
          </Typography>

          <ModInput 
            mod={currentMod}
            onChange={handleChange}
            onSave={handleSave}
          />
        </Stack>
        :
        <></>
      }
    </Stack>
  );
}