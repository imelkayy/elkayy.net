"use client";

import { Setting } from "@/generated/prisma";
import { SelectOption } from "@/lib/types";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function SettingInput({
  setting,
  types,
  onChange
} : {
  setting: Setting,
  types: SelectOption[],
  onChange: (setting: Setting) => void 
}) {
  const typeIDs = types.map(t => t.id);
  const typeValid = typeIDs.includes(setting.type);


  function handleChange(changes: Partial<Setting>) {
    onChange({...setting, ...changes});
  }

  return (
    <Stack
      direction="row"
    >
      <TextField 
        label="Name"
        value={setting.name}
        onChange={e => handleChange({ name: e.target.value })}
      />

      <TextField 
        label="Default Value"
        value={setting.default}
        onChange={e => handleChange({ default: e.target.value })}
      />

      <TextField 
        select
        label="Type"
        value={setting.type}
        onChange={e => handleChange({ type: Number(e.target.value) })}
        error={!typeValid}
        helperText={typeValid ? "" : "Please select a type."} 
        slotProps={{
          select: {
            native: true
          }
        }}
      > 
        {types.map((type) => (
          <option key={type.id} value={type.id}>{type.label}</option>
        ))}
      </TextField>

    </Stack>
  )
}