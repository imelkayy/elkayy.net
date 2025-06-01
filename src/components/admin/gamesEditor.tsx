"use client";

import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export type GamesType = {
  name: string,
  path: string
}

export default function GamesEditor({
  defaultVal,
  onSave
} : {
  defaultVal?: GamesType,
  onSave: (value: GamesType) => void
}) {
  const [value, setValue] = useState<GamesType>(defaultVal ?? { name: "", path: "" });

  
  return (
    <Stack
      spacing={1}
    >
      <TextField 
        label="Name"
        value={value.name}
        onChange={(v) => setValue({name: v.target.value, path: value.path})}
        variant="outlined"
      />
      <TextField 
        label="Path"
        value={value.path}
        onChange={(v) => setValue({path: v.target.value, name: value.name})}
        variant="outlined"
      />
      <Button
        variant="contained"
        onClick={() => onSave(value)}
      >
        Save Game
      </Button>
    </Stack>
  );
}