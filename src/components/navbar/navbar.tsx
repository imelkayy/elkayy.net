import { auth } from "@/auth";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import ProfileMenu from "./profileMenu";

type NavbarItem = { name: string, ref: string }

export default async function Navbar() {
  const session = await auth();
  const pages: NavbarItem[] = [
    { name: "Home", ref: "/" },
    { name: "Mods", ref: "/mods" },
  ]

  return (
    <AppBar
      position="absolute"
    >
      <Container
        maxWidth="xl"
      >
        <Toolbar disableGutters>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.ref}
                color="inherit"
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {
            session?.user?
            <ProfileMenu
              avatar={{
                alt: session?.user?.name ?? "",
                src: session?.user?.image ?? ""
              }}
              tooltip="Tooltip"
            />
            :
            <></>
          }
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}