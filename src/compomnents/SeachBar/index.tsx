// src/components/Header/SearchBar.tsx
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

interface PageOption {
  label: string;
  path: string;
}

const pages: PageOption[] = [
  { label: 'Home', path: '/home' },
  { label: 'Clientes', path: '/clientes' },
  { label: 'Grupos', path: '/grupos' },
  { label: 'Banco de Horas', path: '/banco-de-horas' },
  { label: 'Reuniões', path: '/reunioes' },
  // …adicione as outras rotas aqui
];

const SearchBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Autocomplete
      size="small"
      options={pages}
      getOptionLabel={(opt) => opt.label}
      onChange={(_, value) => {
        if (value) navigate(value.path);
      }}
      sx={{ width: 240 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Buscar..."
          variant="outlined"
          InputProps={{ ...params.InputProps, sx: { pr: 1 } }}
        />
      )}
    />
  );
};

export default SearchBar;
