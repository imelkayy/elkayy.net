"use client";

import { Mod, Setting } from "@/generated/prisma";
import Stack from "@mui/material/Stack";
import ScrollMenu, { ScrollId, ScrollItem } from "../scrollMenu";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import ModInput from "./modInput";
import { getScrollIdForMod, scrollIdToModId } from "@/lib/mod";
import { SelectOption, ModKey, ModValidation, ModWithGameName } from "@/lib/types";
import SettingEditor from "./setting/settingEditor";
import Button from "@mui/material/Button";

type ModPartial = Partial<ModWithGameName>;
type KeyType = ModKey | undefined;

export function ModEditor({
  mods,
  games,
  saveMod,
  removeMod,
  saveSettings
} : { 
  mods: ModWithGameName[],
  games: SelectOption[],
  saveMod: (id: KeyType, mod: Mod) => void,
  removeMod: (slug: string, gameId: number) => Promise<boolean>,
  saveSettings: (settings: Setting[], remove: number[], forMod: ModKey) => void
}) {
  const [myMods, setMyMods] = useState<ModWithGameName[]>(mods);
  const [myModItems, setMyModItems] = useState<ScrollItem[]>([]);
  const [mySettings, setMySettings] = useState<Setting[]>([]);
  const [currentMod, setCurrentMod] = useState<ModWithGameName | undefined>(undefined);
  const [currentKey, setCurrentKey] = useState<KeyType>(undefined);
  const [error, setError] = useState<ModValidation>({});
  const removeSettings = useRef<number[]>([]);

  const gameIds = games.map(g => g.id);

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

    setMyModItems(items.sort((a, b) => a.name.localeCompare(b.name)));
  }, [myMods]);

  useEffect(() => {
    if(currentMod)
      fetch(`/api/mods/${currentMod.gameId}/${currentMod.slug}/settings`)
        .then(r => r.json().then(
          j => {
            setMySettings(j.settings);
            removeSettings.current = [];
          }
        ));
  }, [currentMod]);

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
    if(currentMod && validateInput(currentMod)) {
      saveMod(currentKey, currentMod);
      saveSettings(mySettings, removeSettings.current, currentMod);
    }
  }

  function handleChange(mod: ModPartial) {
    if(currentMod)
      setCurrentMod({...currentMod, ...mod})
  }

  function handleSettingChange(settings: Setting[]) {
    setMySettings(settings);
  }

  function validateInput(mod: Mod): boolean {
    let localError: ModValidation = {};
    let valid = true;
    // Handle local errors for mod name
    if(mod.name.length <= 0) {
      localError.name = { error: true, message: "Name must be provided." };
      valid = false;
    }
    
    // Handle local errors for slug
    if(mod.slug.length <= 3){
      localError.slug = { error: true, message: "Slug may not be less than three characters." };
      valid = false;
    } else if(mod.slug.includes(" ")) {
      localError.slug = { error: true, message: "Slug may not contain spaces." };
      valid = false;
    }

    // Handle local errors for game
    if(!gameIds.includes(mod.gameId)) {
      localError.game = { error: true, message: "You must select a valid game." };
      valid = false;
    }

    setError(localError);

    return valid;
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
            Edit Mod
          </Typography>

          <ModInput 
            mod={currentMod}
            error={error}
            games={games}
            onChange={handleChange}
          />

          <SettingEditor
            values={mySettings}
            remove={removeSettings.current}
            onChange={handleSettingChange}      
          />

          <Button 
            variant="contained"
            onClick={handleSave}
            sx={{
              width: "25%",
              alignSelf: "center"
            }}
          >
            Save
          </Button>
        </Stack>
        :
        <></>
      }
    </Stack>
  );
}