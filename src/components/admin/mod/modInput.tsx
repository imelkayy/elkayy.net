import { Mod } from "@/generated/prisma";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";


export default function ModInput({
  mod,
  onChange,
  onSave
} : {
  mod: Mod,
  onChange: (mod: Partial<Mod>) => void,
  onSave: () => void
}) {

  return (
    <Stack
      spacing={1}
    >
      <Stack
        direction="row"
        alignSelf="center"
        spacing={0.5}
      >
        <TextField 
          label="Name"
          value={mod.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <TextField 
          label="Slug"
          value={mod.slug}
          onChange={(e) => onChange({ slug: e.target.value })}
        />
      </Stack>

      <Stack
        direction="row"
        alignSelf="center"
        spacing={0.5}
      >
        // TODO: Add game selection here
        <FormControlLabel
          control={
            <Checkbox
              size="large"
              checked={mod.published}
              onChange={(e) => onChange({ published: e.target.checked })}
            />
          }
          label="Published"
          labelPlacement="end"
          sx={{
            alignSelf: "center"
            }}
        />
      </Stack>

      <Stack
        direction="row"
        alignSelf="center"
        spacing={0.5}
      >
        <TextField 
          label="Provider"
          value={mod.provider}
          onChange={(e) => onChange({ provider: e.target.value })}
        />
        <TextField 
          label="Provider ID"
          type="number"
          value={mod.providerId}
          onChange={(e) => onChange({ providerId: Number(e.target.value) })}
        />
      </Stack>

      <Button 
        variant="contained"
        onClick={onSave}
        sx={{
          width: "25%",
          alignSelf: "center"
        }}
      >
        Save
      </Button>
    </Stack>
  );
}