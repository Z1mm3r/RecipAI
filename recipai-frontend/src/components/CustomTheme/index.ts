import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

export const themeOptions: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#483538',
      contrastText: '#f98626',
      light: '#A7D674',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      secondary: '#E97F25',
      primary: '#483538',
    },
  }
});