// src/pages/Login/index.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const isValid = username.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;
    await login({ username, password });
    // Você pode usar `remember` para decidir onde salvar os tokens:
    // se remember for false, usar sessionStorage, por exemplo.
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      {/* Formulário (30% em desktop, 100% em mobile) */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: '100%',
            maxWidth: 360,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="public/so_logo_sigepp.png"
            alt="Logo do sistema"
            sx={{ width: 120, mx: 'auto', mb: 1 }}
          />

          {/* Título */}
          <Typography
            variant="h4"
            align="center"
            color="primary"
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            SIGEPP
          </Typography>

          {/* Mensagem de erro */}
          {error && (
            <Typography color="error" align="center" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          {/* Usuário */}
          <TextField
            label="Usuário"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />

          {/* Senha com toggle de visibilidade */}
          <FormControl variant="outlined" required fullWidth disabled={loading}>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mostrar ou ocultar senha"
                    onClick={() => setShowPassword(prev => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>

          {/* Lembrar de mim */}
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                disabled={loading}
              />
            }
            label="Lembrar de mim"
          />

          {/* Botão Entrar */}
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || loading}
            size="large"
            sx={{
              width: { xs: '100%', sm: '50%' },
              mx: 'auto',
              display: 'block',
            }}
          >
            {loading ? 'Carregando…' : 'Entrar'}
          </Button>
        </Box>
      </Box>

      {/* Imagem decorativa (70% em desktop) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '70%',
        }}
      >
        <Box
          component="img"
          src="public/foto-fachada.png"
          alt="Imagem decorativa"
          sx={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;
