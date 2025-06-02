"use client";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export type ScrollId = number | string | undefined
export type ScrollItem = { id: ScrollId, name: string }

export default function ScrollMenu({
  title,
  items,
  onSelect,
  onAddNew,
  onRemove
} : {
  title: string,
  items: ScrollItem[],
  onSelect: (id: ScrollId) => void
  onAddNew?: () => void,
  onRemove?: (id: ScrollId) => void
}) {
  return (
    <Stack
      width="25%"
      overflow="none"
    >
      <Stack
        alignSelf="center"
        direction="row"
      >
        <Typography variant="h4" alignSelf="center">{title}</Typography>
        {
          onAddNew ?
          <IconButton
            aria-label="add"
            size="medium"
            onClick={onAddNew}
          >
            <AddIcon />
          </IconButton>
          :
          <></>
        }
        
      </Stack>

      <Divider variant="middle" />

      <Stack overflow="scroll" sx={{ mt: "10px" }}>
        { items.map((item) => (
          <Card
            variant="outlined"
            key={item.id}
          >
            <Stack direction="row">
              <Button
                onClick={() => onSelect(item.id)}
                fullWidth
              >
                {item.name}
              </Button>
              {
                onRemove ?
                <IconButton
                  onClick={() => onRemove(item.id)}
                >
                  <RemoveIcon />
                </IconButton>
                :
                <></>
              }
            </Stack>
          </Card>
        
      ))}
      </Stack>
      
    </Stack>
  )
}