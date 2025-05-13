// src/compomnents/Header/Header.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '../SeachBar';

type HeaderProps = {
  onToggleMobile: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onToggleMobile }) => (
  <AppBar
    position="fixed"
    color="default"
    elevation={0}
    sx={(theme) => ({
      backgroundColor: theme.palette.common.white,             // fundo branco
      borderBottom: `1px solid ${theme.palette.divider}`,      // borda inferior
      zIndex: theme.zIndex.drawer + 1,
    })}
  >
    <Toolbar sx={{ minHeight: 48 }}>                          {/* altura reduzida */}
      {/* hamburger mobile */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={onToggleMobile}
        sx={{ display: { xs: 'block', sm: 'none' }, mr: 1 }}
      >
        <MenuIcon />
      </IconButton>

      {/* logo */}
      <Box
        component="img"
        src="/public/sigepp.png"    // ajuste para sua logo
        alt="Logo"
        sx={{
          height: 40,
          mr: 2,
        }}
      />

      {/* espaçador */}
      <Box sx={{ flexGrow: 1 }} />

      {/* search desktop */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <SearchBar />
      </Box>
    </Toolbar>
  </AppBar>
);
