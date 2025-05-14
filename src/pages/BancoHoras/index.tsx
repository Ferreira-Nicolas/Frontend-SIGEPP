// src/pages/BancoHoras/index.tsx
import React from 'react';
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
  IconButton,
  FormHelperText,
} from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { TabControl, type TabItem } from '../../compomnents/TabControl';


export default function BancoHoras() {
  const [evento, setEvento] = React.useState('');
  const [dataEvento, setDataEvento] = React.useState<Date | null>(null);
  const [duracao, setDuracao] = React.useState('');
  const [justificativa, setJustificativa] = React.useState('');
  const [arquivo, setArquivo] = React.useState<File | null>(null);

  const [eventoError, setEventoError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [duracaoError, setDuracaoError] = React.useState(false);
  const [justificativaError, setJustificativaError] = React.useState(false);
  const [fileError, setFileError] = React.useState(false);

  const isAttachmentRequired = evento === 'Hora Extra' || evento === 'Folga';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setArquivo(file);
    if (file) setFileError(false);
  };

  const validate = () => {
    let ok = true;
    if (!evento) {
      setEventoError(true);
      ok = false;
    }
    if (!dataEvento) {
      setDateError(true);
      ok = false;
    }
    // duração no formato HH:MM
    const durOk = /^\d{2}:\d{2}$/.test(duracao);
    if (!duracao || !durOk) {
      setDuracaoError(true);
      ok = false;
    }
    if (!justificativa) {
      setJustificativaError(true);
      ok = false;
    }
    if (isAttachmentRequired && !arquivo) {
      setFileError(true);
      ok = false;
    }
    return ok;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // reset errors
    setEventoError(false);
    setDateError(false);
    setDuracaoError(false);
    setJustificativaError(false);
    setFileError(false);

    if (!validate()) return;

    // TODO: enviar dados para a API
    console.log({ evento, dataEvento, duracao, justificativa, arquivo });
  };

  const cadastroContent = (
    <><Box
    component="form"
    onSubmit={handleSubmit}
    noValidate
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 3,
      alignItems: 'flex-start',
    }}
  >
    {/* Evento */}
    <FormControl
      fullWidth
      error={eventoError}
      sx={{ minWidth: 240, flex: '1 1 240px' }}
    >
      <InputLabel id="evento-label">Evento</InputLabel>
      <Select
        labelId="evento-label"
        id="evento"
        value={evento}
        label="Evento"
        onChange={(e) => {
          setEvento(e.target.value);
          if (fileError) setFileError(false);
          if (eventoError) setEventoError(false);
        }}
      >
        <MenuItem value="Atraso">Atraso</MenuItem>
        <MenuItem value="Saída Antecipada">Saída Antecipada</MenuItem>
        <MenuItem value="Hora Extra">Hora Extra</MenuItem>
        <MenuItem value="Folga">Folga</MenuItem>
      </Select>
      {eventoError && (
        <FormHelperText>Campo obrigatório</FormHelperText>
      )}
    </FormControl>

    {/* Data do Evento */}
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Data do Evento"
        value={dataEvento}
        onChange={(newValue) => {
          setDataEvento(newValue);
          if (dateError) setDateError(false);
        }}
        maxDate={new Date()}
        disableFuture
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            error={dateError || params.error}
            helperText={dateError ? 'Campo obrigatório' : params.helperText}
            fullWidth
            sx={{ minWidth: 240, flex: '1 1 240px' }}
          />
        )}
      />
    </LocalizationProvider>

    {/* Duração (HH:MM obrigatório) */}
    <TextField
      fullWidth
      id="duracao"
      label="Duração (HH:MM)"
      placeholder="00:00"
      value={duracao}
      onChange={(e) => {
        let v = e.target.value.replace(/[^\d]/g, '');
        if (v.length > 4) v = v.slice(0, 4);
        if (v.length > 2) v = v.slice(0, 2) + ':' + v.slice(2);
        setDuracao(v);
        if (duracaoError) setDuracaoError(false);
      }}
      error={duracaoError}
      helperText={duracaoError ? 'Formato HH:MM obrigatório' : 'Formato HH:MM'}
      inputProps={{
        inputMode: 'numeric',
        pattern: '^[0-2]\\d:[0-5]\\d$',
        maxLength: 5,
      }}
      sx={{ minWidth: 160, flex: '1 1 160px' }}
    />

    {/* Seção de Anexo */}
    <Box
      sx={{
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <IconButton
        component="label"
        color={fileError ? 'error' : 'primary'}
        aria-label="Anexar Evidência"
        sx={{
          width: 48,
          height: 48,
          border: '1px solid',
          borderColor: fileError ? 'error.main' : 'divider',
        }}
      >
        <AttachFileIcon />
        <input type="file" hidden onChange={handleFileChange} />
      </IconButton>
      <Typography
        variant="caption"
        sx={{
          fontSize: '0.75rem',
          color: fileError ? 'error.main' : 'text.primary',
        }}
      >
        Anexar Evidência
      </Typography>
      {fileError && (
        <Typography variant="caption" color="error">
          Obrigatório para Hora Extra e Folga
        </Typography>
      )}
      {arquivo && (
        <Typography
          variant="body2"
          sx={{ mt: 1, wordBreak: 'break-all', fontSize: '0.75rem' }}
        >
          {arquivo.name}
        </Typography>
      )}
    </Box>

    {/* Justificativa */}
    <TextField
      fullWidth
      id="justificativa"
      label="Justificativa"
      multiline
      rows={4}
      value={justificativa}
      onChange={(e) => {
        setJustificativa(e.target.value);
        if (justificativaError) setJustificativaError(false);
      }}
      error={justificativaError}
      helperText={
        justificativaError ? 'Campo obrigatório' : undefined
      }
      sx={{ flex: '1 1 100%', minWidth: 0 }}
    />

    {/* Botão Salvar */}
    <Box sx={{ flex: '1 1 100%', display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={
          !evento ||
          !dataEvento ||
          !/^[0-2]\d:[0-5]\d$/.test(duracao) ||
          !justificativa ||
          (isAttachmentRequired && !arquivo)
        }
      >
        Salvar
      </Button>
    </Box>
  </Box>
  <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        alignItems: 'flex-start',
      }}
    >
      {/* Evento */}
      <FormControl
        fullWidth
        error={eventoError}
        sx={{ minWidth: 240, flex: '1 1 240px' }}
      >
        <InputLabel id="evento-label">Evento</InputLabel>
        <Select
          labelId="evento-label"
          id="evento"
          value={evento}
          label="Evento"
          onChange={(e) => {
            setEvento(e.target.value);
            if (fileError) setFileError(false);
            if (eventoError) setEventoError(false);
          }}
        >
          <MenuItem value="Atraso">Atraso</MenuItem>
          <MenuItem value="Saída Antecipada">Saída Antecipada</MenuItem>
          <MenuItem value="Hora Extra">Hora Extra</MenuItem>
          <MenuItem value="Folga">Folga</MenuItem>
        </Select>
        {eventoError && (
          <FormHelperText>Campo obrigatório</FormHelperText>
        )}
      </FormControl>

      {/* Data do Evento */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data do Evento"
          value={dataEvento}
          onChange={(newValue) => {
            setDataEvento(newValue);
            if (dateError) setDateError(false);
          }}
          maxDate={new Date()}
          disableFuture
          renderInput={(params: TextFieldProps) => (
            <TextField
              {...params}
              error={dateError || params.error}
              helperText={dateError ? 'Campo obrigatório' : params.helperText}
              fullWidth
              sx={{ minWidth: 240, flex: '1 1 240px' }}
            />
          )}
        />
      </LocalizationProvider>

      {/* Duração (HH:MM obrigatório) */}
      <TextField
        fullWidth
        id="duracao"
        label="Duração (HH:MM)"
        placeholder="00:00"
        value={duracao}
        onChange={(e) => {
          let v = e.target.value.replace(/[^\d]/g, '');
          if (v.length > 4) v = v.slice(0, 4);
          if (v.length > 2) v = v.slice(0, 2) + ':' + v.slice(2);
          setDuracao(v);
          if (duracaoError) setDuracaoError(false);
        }}
        error={duracaoError}
        helperText={duracaoError ? 'Formato HH:MM obrigatório' : 'Formato HH:MM'}
        inputProps={{
          inputMode: 'numeric',
          pattern: '^[0-2]\\d:[0-5]\\d$',
          maxLength: 5,
        }}
        sx={{ minWidth: 160, flex: '1 1 160px' }}
      />

      {/* Seção de Anexo */}
      <Box
        sx={{
          flex: '0 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton
          component="label"
          color={fileError ? 'error' : 'primary'}
          aria-label="Anexar Evidência"
          sx={{
            width: 48,
            height: 48,
            border: '1px solid',
            borderColor: fileError ? 'error.main' : 'divider',
          }}
        >
          <AttachFileIcon />
          <input type="file" hidden onChange={handleFileChange} />
        </IconButton>
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.75rem',
            color: fileError ? 'error.main' : 'text.primary',
          }}
        >
          Anexar Evidência
        </Typography>
        {fileError && (
          <Typography variant="caption" color="error">
            Obrigatório para Hora Extra e Folga
          </Typography>
        )}
        {arquivo && (
          <Typography
            variant="body2"
            sx={{ mt: 1, wordBreak: 'break-all', fontSize: '0.75rem' }}
          >
            {arquivo.name}
          </Typography>
        )}
      </Box>

      {/* Justificativa */}
      <TextField
        fullWidth
        id="justificativa"
        label="Justificativa"
        multiline
        rows={4}
        value={justificativa}
        onChange={(e) => {
          setJustificativa(e.target.value);
          if (justificativaError) setJustificativaError(false);
        }}
        error={justificativaError}
        helperText={
          justificativaError ? 'Campo obrigatório' : undefined
        }
        sx={{ flex: '1 1 100%', minWidth: 0 }}
      />

      {/* Botão Salvar */}
      <Box sx={{ flex: '1 1 100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={
            !evento ||
            !dataEvento ||
            !/^[0-2]\d:[0-5]\d$/.test(duracao) ||
            !justificativa ||
            (isAttachmentRequired && !arquivo)
          }
        >
          Salvar
        </Button>
      </Box>
    </Box>
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        alignItems: 'flex-start',
      }}
    >
      {/* Evento */}
      <FormControl
        fullWidth
        error={eventoError}
        sx={{ minWidth: 240, flex: '1 1 240px' }}
      >
        <InputLabel id="evento-label">Evento</InputLabel>
        <Select
          labelId="evento-label"
          id="evento"
          value={evento}
          label="Evento"
          onChange={(e) => {
            setEvento(e.target.value);
            if (fileError) setFileError(false);
            if (eventoError) setEventoError(false);
          }}
        >
          <MenuItem value="Atraso">Atraso</MenuItem>
          <MenuItem value="Saída Antecipada">Saída Antecipada</MenuItem>
          <MenuItem value="Hora Extra">Hora Extra</MenuItem>
          <MenuItem value="Folga">Folga</MenuItem>
        </Select>
        {eventoError && (
          <FormHelperText>Campo obrigatório</FormHelperText>
        )}
      </FormControl>

      {/* Data do Evento */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data do Evento"
          value={dataEvento}
          onChange={(newValue) => {
            setDataEvento(newValue);
            if (dateError) setDateError(false);
          }}
          maxDate={new Date()}
          disableFuture
          renderInput={(params: TextFieldProps) => (
            <TextField
              {...params}
              error={dateError || params.error}
              helperText={dateError ? 'Campo obrigatório' : params.helperText}
              fullWidth
              sx={{ minWidth: 240, flex: '1 1 240px' }}
            />
          )}
        />
      </LocalizationProvider>

      {/* Duração (HH:MM obrigatório) */}
      <TextField
        fullWidth
        id="duracao"
        label="Duração (HH:MM)"
        placeholder="00:00"
        value={duracao}
        onChange={(e) => {
          let v = e.target.value.replace(/[^\d]/g, '');
          if (v.length > 4) v = v.slice(0, 4);
          if (v.length > 2) v = v.slice(0, 2) + ':' + v.slice(2);
          setDuracao(v);
          if (duracaoError) setDuracaoError(false);
        }}
        error={duracaoError}
        helperText={duracaoError ? 'Formato HH:MM obrigatório' : 'Formato HH:MM'}
        inputProps={{
          inputMode: 'numeric',
          pattern: '^[0-2]\\d:[0-5]\\d$',
          maxLength: 5,
        }}
        sx={{ minWidth: 160, flex: '1 1 160px' }}
      />

      {/* Seção de Anexo */}
      <Box
        sx={{
          flex: '0 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton
          component="label"
          color={fileError ? 'error' : 'primary'}
          aria-label="Anexar Evidência"
          sx={{
            width: 48,
            height: 48,
            border: '1px solid',
            borderColor: fileError ? 'error.main' : 'divider',
          }}
        >
          <AttachFileIcon />
          <input type="file" hidden onChange={handleFileChange} />
        </IconButton>
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.75rem',
            color: fileError ? 'error.main' : 'text.primary',
          }}
        >
          Anexar Evidência
        </Typography>
        {fileError && (
          <Typography variant="caption" color="error">
            Obrigatório para Hora Extra e Folga
          </Typography>
        )}
        {arquivo && (
          <Typography
            variant="body2"
            sx={{ mt: 1, wordBreak: 'break-all', fontSize: '0.75rem' }}
          >
            {arquivo.name}
          </Typography>
        )}
      </Box>

      {/* Justificativa */}
      <TextField
        fullWidth
        id="justificativa"
        label="Justificativa"
        multiline
        rows={4}
        value={justificativa}
        onChange={(e) => {
          setJustificativa(e.target.value);
          if (justificativaError) setJustificativaError(false);
        }}
        error={justificativaError}
        helperText={
          justificativaError ? 'Campo obrigatório' : undefined
        }
        sx={{ flex: '1 1 100%', minWidth: 0 }}
      />

      {/* Botão Salvar */}
      <Box sx={{ flex: '1 1 100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={
            !evento ||
            !dataEvento ||
            !/^[0-2]\d:[0-5]\d$/.test(duracao) ||
            !justificativa ||
            (isAttachmentRequired && !arquivo)
          }
        >
          Salvar
        </Button>
      </Box>
    </Box></>
    
    
  );

  const historicoContent = (
    <Typography>Aqui serão exibidos os registros de banco de horas.</Typography>
  );

  const tabs: TabItem[] = [
    { label: 'Cadastro', content: cadastroContent },
    { label: 'Histórico', content: historicoContent },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <TabControl items={tabs} initialTab={0} />
    </Container>
  );
}
