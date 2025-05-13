// src/compomnents/ProfileTab/index.tsx
import React from 'react';
import { Box, Avatar, Typography, useTheme } from '@mui/material';

type ProfileTabProps = {
  collapsed: boolean;
};

export default function ProfileTab({ collapsed }: ProfileTabProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',  // ← centraliza quando colapsado
        px: collapsed ? 1 : 2,
        py: collapsed ? 1 : 2,
        transition: theme.transitions.create(['justify-content', 'padding'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Avatar
        alt="Usuário"
        // src="/path/to/avatar.jpg"          // ajuste para sua fonte de avatar
        sx={{ width: 32, height: 32 }}
      />

      {/* só exibe nome e cargo quando NÃO estiver colapsado */}
      {!collapsed && (
        <Box sx={{ ml: 2, overflow: 'hidden' }}>
          <Typography sx={{ fontSize: '1.2rem' }} variant="subtitle1" noWrap>
            Nicolas Ferreira
          </Typography>
          <Typography sx={{ fontSize: '1rem' }} variant="body2" color="textSecondary" noWrap>
            Desenvolvedor
          </Typography>
        </Box>
      )}
    </Box>
  );
}
