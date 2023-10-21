import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

import { BROWN, GREEN, LIGHT_ORANGE, LIME_GREEN, OFF_WHITE, DARK_ORANGE, MAROON } from "@/constants/colors";

export const themeOptions: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: LIGHT_ORANGE,
      contrastText: OFF_WHITE,
      light: LIME_GREEN,
    },
    secondary: {
      main: MAROON,
    },
    text: {
      secondary: DARK_ORANGE,
      primary: BROWN,
    },
  }
});