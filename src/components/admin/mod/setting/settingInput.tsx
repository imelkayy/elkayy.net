"use client";

import { Setting } from "@/generated/prisma";
import { SelectOption } from "@/lib/types";
import { IconButton, TextField, Tooltip } from "@mui/material";
import Stack from "@mui/material/Stack";
import RemoveIcon from '@mui/icons-material/Remove';

export default function SettingInput({
  setting,
  types,
  onChange,
  onRemove
} : {
  setting: Setting,
  types: SelectOption[],
  onChange: (setting: Setting) => void,
  onRemove?: (settingId: number) => void
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
      <Stack
        direction="column"
        spacing={0.75}
      >
        <Stack
          direction="row"
          spacing={0.5}
        >
          <TextField 
            label="Name"
            value={setting.name}
            onChange={e => handleChange({ name: e.target.value })}
          />

          <TextField 
            label="Key"
            value={setting.key}
            onChange={e => handleChange({ key: e.target.value })}
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
        <TextField 
          label="Description"
          value={setting.description}
          onChange={e => handleChange({ description: e.target.value })}
        />
      </Stack>

      {
        onRemove?
        <Tooltip
          title={`Remove ${setting.name}`}
        >
          <IconButton
            sx={{
              alignSelf: "center"
            }}
            onClick={() => onRemove(setting.id)}
            aria-label={`Remove ${setting.name}`}
          >
            <RemoveIcon />
          </IconButton>
        </Tooltip>
        :
        <></>
      }

    </Stack>
  )
}