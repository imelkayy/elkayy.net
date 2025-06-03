import { SelectOption, ModValidation, ModWithGameName } from "@/lib/types";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function ModInput({
  mod,
  error,
  games,
  onChange,
  onSave
} : {
  mod: ModWithGameName,
  error: ModValidation,
  games: SelectOption[],
  onChange: (mod: Partial<ModWithGameName>) => void,
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
          error={error.name?.error}
          helperText={error.name?.message}
        />
        <TextField 
          label="Slug"
          value={mod.slug}
          onChange={(e) => onChange({ slug: e.target.value })}
          error={error.slug?.error}
          helperText={error.slug?.message}
        />
      </Stack>

      <Stack
        direction="row"
        alignSelf="center"
        spacing={0.5}
        sx={{
          minWidth: "30rem"
        }}
      >
        <TextField
          select
          label="Game"
          value={mod.gameId}
          slotProps={{
            select: {
              native: true,
            },
          }}
          onChange={v => onChange({gameId: Number(v.target.value)})}
          fullWidth
          error={error.game?.error}
          helperText={error.game?.message}
        >
          {games.map((game) => (
            <option key={game.id} value={game.id} >{game.label}</option>
          ))}
        </TextField>
        <FormControlLabel
          control={
            <Switch 
              size="medium"
              checked={mod.published}
              onChange={(e) => onChange({ published: e.target.checked })}
            />
          }
          label="Published"
          labelPlacement="top"
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