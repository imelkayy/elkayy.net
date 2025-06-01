"use client";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function ProfileMenu({
  avatar,
  tooltip,
} : {
  avatar: { alt: string, src: string },
  tooltip: string,
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handleOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
  <>
    <Tooltip
      title={tooltip}
    >
      <IconButton
        onClick={handleOpen}
      >
        <Avatar 
          alt={avatar.alt}
          src={avatar.src}
        />
      </IconButton>
    </Tooltip>

    <Menu
      id="profile-menu"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      onClick={handleClose}
    >
      <MenuItem
        onClick={() => signOut()}
      >
        <Typography>
          Signout
        </Typography>
      </MenuItem>
    </Menu>
  </>
  )
}