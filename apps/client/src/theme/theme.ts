import { createTheme } from "@mui/material";

// import gotham from "$"
import { colorPalette } from "./colors";

const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

export const theme = createTheme({
  typography: {
    fontFamily: "Gotham",
  },

  palette: {
    primary: {
      light: colorPalette.default.primary.light,
      main: colorPalette.default.primary.main,
      dark: colorPalette.default.primary.dark,
    },
    secondary: {
      light: colorPalette.default.secondary.light,
      main: colorPalette.default.secondary.main,
      dark: colorPalette.default.secondary.dark,
    },
  },
  breakpoints,
});
