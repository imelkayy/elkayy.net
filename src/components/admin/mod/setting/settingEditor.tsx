"use client";

import { Setting } from "@/generated/prisma";
import Stack from "@mui/material/Stack";
import { useRef } from "react";
import SettingInput from "./settingInput";
import { SettingType_SelectOptions } from "@/lib/enums";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export default function SettingEditor({
  values,
  remove,
  onChange
} : {
  values: Setting[],
  remove: number[],
  onChange: (settings: Setting[]) => void
}) {
  const tempId = useRef<number>(-9999); // Need better way to create a temporary id to sort new items towards the bottom.
  
  const defSetting: Setting = {
    default: "",
    key: "",
    name: "",
    description: "",
    id: tempId.current, 
    type: 0,
    modSlug: null,
    modGame: null
  }

  function doSort(a: Setting, b: Setting) {
    return Math.abs(a.id) - Math.abs(b.id);
  }

  function setSettings(settings: Setting[]) {
    onChange(settings.sort(doSort));
  }

  function removeSetting(id: number): Setting[] {
    return values.filter(s => s.id != id);
  }

  function handleChange(setting: Setting) {
    setSettings([...removeSetting(setting.id), setting]);
  }

  function handleAdd() {
    setSettings([...values, { ...defSetting, id: tempId.current-- }]);
  }

  function handleRemove(id: number) {
    remove.push(id);
    setSettings([...removeSetting(id)]);
  }

  return(
    <Stack
      alignSelf="center"
    >
      <Stack
        direction="row"
        alignSelf="center"
        width="min-content"
      >
        <Typography
          variant="h6"
          alignSelf="center"
        >
          Settings
        </Typography>
        <Tooltip
          title="Add Setting"
        >
          <IconButton
            onClick={handleAdd}
            aria-label="Add Setting"
          >
            <AddIcon />
        </IconButton>
        </Tooltip>
        
      </Stack>

      <Stack
        spacing={1}
        maxHeight="25rem"
        sx={{
          overflow: "auto"
        }}
        paddingTop="10px"
      >
        { 
          values.map((setting) => (
          <SettingInput
            key={setting.id}
            setting={setting} 
            types={SettingType_SelectOptions}
            onChange={handleChange}
            onRemove={handleRemove}
          />
          )) 
        }
      </Stack>
    </Stack>
  )
}