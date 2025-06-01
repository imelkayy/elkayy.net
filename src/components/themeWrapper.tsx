"use client";

import { CssBaseline, InitColorSchemeScript, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

export default function ThemeWrapper({
  children
} : {
  children: ReactNode
}) {
  const dark = createTheme({
    colorSchemes: {
      light: true,
      dark: true
    },
    cssVariables: { // Required to prevent SSR flickering
      colorSchemeSelector: 'class'
    }
  })
  

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  console.log(prefersDarkMode);

  return (
    <ThemeProvider
      theme={dark}
    >
      { /* This is required to prevent SSR flickering */ }
      <InitColorSchemeScript attribute="class" />
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}