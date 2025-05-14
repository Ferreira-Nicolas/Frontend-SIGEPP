// src/pages/NotAuthorized.tsx
import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export function NotAuthorized() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '4rem', sm: '6rem' },
            color: theme.palette.text.primary,
          }}
        >
          403
        </Typography>

        <Typography
          component="h2"
          variant="h5"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Acesso negado
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 4 }}
        >
          Você não tem permissão para acessar esta página.
        </Typography>

        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          size="large"
          sx={{
            textTransform: 'none',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            py: { xs: 1, sm: 1.5 },
            px: { xs: 2, sm: 3 },
          }}
        >
          Fazer login
        </Button>
      </Container>
    </Box>
  );
}

export default NotAuthorized;
