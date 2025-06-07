import { Setting } from "@/generated/prisma"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

type SettingsTableProps = {
  settings: Setting[]
}

export default function SettingsTable({ settings }: SettingsTableProps) {

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
    >
      <Table
        size="small"
      >
       <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Key</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Input Type</TableCell>
          <TableCell>Default Value</TableCell>
        </TableRow>
       </TableHead>
       <TableBody>
        {
          settings.map((setting) => (
            <TableRow key={setting.id}>
              <TableCell>{setting.name}</TableCell>
              <TableCell>{setting.key}</TableCell>
              <TableCell>{setting.description}</TableCell>
              <TableCell>{setting.type}</TableCell>
              <TableCell>{setting.default}</TableCell>
            </TableRow>
          ))
        }
       </TableBody>
      </Table>
    </TableContainer>
  )
}