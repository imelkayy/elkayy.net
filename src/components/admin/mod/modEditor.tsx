"use client";

import { Mod } from "@/generated/prisma";
import Stack from "@mui/material/Stack";
import ScrollMenu, { ScrollId, ScrollItem } from "../scrollMenu";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ModInput from "./modInput";
import { getScrollIdForMod, scrollIdToModId } from "@/lib/mod";
import { AutocompleteItem, ModKey, ModWithGameName } from "@/lib/types";

type ModPartial = Partial<ModWithGameName>;
type KeyType = ModKey | undefined;

export function ModEditor({
  mods,
  games,
  saveMod,
  removeMod
} : { 
  mods: ModWithGameName[],
  games: AutocompleteItem[],
  saveMod: (id: KeyType, mod: Mod) => void,
  removeMod: (slug: string, gameId: number) => Promise<boolean> 
}) {
  const [myMods, setMyMods] = useState<ModWithGameName[]>(mods);
  const [myModItems, setMyModItems] = useState<ScrollItem[]>([]);
  const [currentMod, setCurrentMod] = useState<ModWithGameName | undefined>(undefined);
  const [currentKey, setCurrentKey] = useState<KeyType>(undefined);

  const defaultMod: ModWithGameName = {
    name: "",
    slug: "",
    summary: "",
    provider: "",
    providerId: 0,
    updatedAt: new Date(),
    gameId: 0,
    published: false,
    game: {
      name: ""
    }
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
    if(!id) {
      setCurrentMod(defaultMod)
      setCurrentKey(undefined);
    } else {
      const mid = scrollIdToModId(id as string);
      setCurrentMod(myMods.find(m => m.gameId == mid.gameId && m.slug == mid.slug));
      setCurrentKey({ slug: mid.slug, gameId: mid.gameId })
    }
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
      saveMod(currentKey, currentMod);
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
        title="Mods"
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
            games={games}
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