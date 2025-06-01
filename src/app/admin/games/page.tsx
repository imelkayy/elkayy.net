import GamesEditor, { GamesType } from "@/components/admin/gamesEditor";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function AdminGamesPage() {

  async function saveGame(value: GamesType) {
    "use server";

    console.log(value);
  }

  return(
    // TODO: Add selection for games
    <Box>
      <Stack
        spacing={1}
        maxWidth={"25%"}
        marginLeft="auto"
        marginRight="auto"
      >
        <Typography
          variant="h5"
          textAlign="center"
        >
          Edit Game
        </Typography>
        
        <GamesEditor
          onSave={saveGame}
        />
      </Stack>
      
    </Box>
    
  )
}