"use client";

import { Button, Stack, TextField } from "@mui/material";

export type GamesType = {
  name: string,
  path: string
}

export default function GameInput({
  value,
  setValue,
  onSave
} : {
  value: GamesType,
  setValue: (value: GamesType) => void,
  onSave: (value: GamesType) => void
}) {
  
  return (
    <Stack
      spacing={1}
      width="50%"
      alignSelf="center"
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
        sx={{
          width: "25%",
          alignSelf: "center"
        }}
      >
        Save Game
      </Button>
    </Stack>
  );
}