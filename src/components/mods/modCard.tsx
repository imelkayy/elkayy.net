import { ModWithGame } from "@/lib/types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ModCard({ mod } : {mod: ModWithGame}) {
  
  return (
    <Link
      variant="inherit"
      sx={{
        textDecoration: "none"
      }}
      href={`/mods/${mod.game.path}/${mod.slug}`}
      height="100%"
      display="block"
    >
      <Card
        component={Paper}
        variant="outlined"
        sx={{
          padding: "5px",
          height: "100%"
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
        >
          <img
            src={mod.logoUrl}
            width="48"
            height="48"
          />
          <Typography
            variant="h5"
            alignSelf="center"
            sx={{
              textDecoration: "underline"
            }}
          >
            {mod.name}
          </Typography>
        </Stack>
        
        <Stack
          direction="row"
          marginBottom="-5px"
        >
          <Typography color="textSecondary" variant="overline">{mod.game.name}</Typography>
        </Stack>

        <Divider variant="middle" sx={{mb: "5px"}} />

        <Typography>{mod.summary}</Typography>
      </Card>
    </Link>
  )
}