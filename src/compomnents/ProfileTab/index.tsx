// src/components/ProfileTab/index.tsx
import React from 'react';
import { Box, Avatar, Typography, useTheme } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

type ProfileTabProps = {
  collapsed: boolean;
};

export default function ProfileTab({ collapsed }: ProfileTabProps) {
  const theme = useTheme();
  const { user } = useAuth();  // aqui você já tem o User com name e role

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 1 : 2,
        py: collapsed ? 1 : 2,
        transition: theme.transitions.create(['justify-content', 'padding'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Avatar
        alt={user?.name}
        src={user?.avatarPhoto}
        sx={{ width: 32, height: 32 }}
      />

      {!collapsed && user && (
        <Box sx={{ ml: 2, overflow: 'hidden' }}>
          <Typography variant="subtitle1" noWrap sx={{ fontSize: '1.2rem' }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '1rem' }}>
            {user.role.name}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
