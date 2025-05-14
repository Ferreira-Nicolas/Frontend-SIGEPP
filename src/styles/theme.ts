// src/styles/theme.ts
import { createTheme } from "@mui/material/styles";

const sharedShape = {
  borderRadius: 8, // já está no seu theme
};

const sharedComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: sharedShape.borderRadius,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: sharedShape.borderRadius,
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        borderRadius: sharedShape.borderRadius,
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: sharedShape.borderRadius,
      },
    },
  },
};

// Fator de escala: 7px em vez de 8px
const spacingUnit = 7;

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#40cc3b",
      contrastText: "#fff",
    },
  },
  shape: sharedShape,
  // 1) reduz a escala de espaçamento global (8px → 7px)
  spacing: (factor: number) => `${spacingUnit * factor}px`,
  // 2) diminui a base de tipografia (14px → 13px)
  typography: {
    fontSize: 13,
  },
  components: sharedComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#027a0a",
      contrastText: "#fff",
    },
  },
  shape: sharedShape,
  spacing: (factor: number) => `${spacingUnit * factor}px`,
  typography: {
    fontSize: 13,
  },
  components: sharedComponents,
});
