// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

// tema claro
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#40cc3b',
      contrastText: '#fff',
    },
    // o resto do palette (secondary, error, warning, info, success)
//    fica com os defaults do MUI
  },
});

// tema escuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#027a0a',
      contrastText: '#fff',
    },
    // no modo dark, o MUI já define background.default ≈ #121212 e paper ≈ #1e1e1e
  },
});
