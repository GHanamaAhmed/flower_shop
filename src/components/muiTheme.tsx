"use client"
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        
      },
    },
  },
});

export default function MuiTheme({ children }: { children: React.ReactNode }) {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
}
