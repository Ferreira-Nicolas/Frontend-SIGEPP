// src/components/TabControl/TabControl.tsx
import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export type TabControlProps = {
  /** Itens de aba com texto de label e conteúdo a renderizar */
  items: TabItem[];
  /** Aba inicial (default 0) */
  initialTab?: number;
};

export const TabControl: React.FC<TabControlProps> = ({
  items,
  initialTab = 0,
}) => {
  const [value, setValue] = React.useState(initialTab);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Controle de Abas"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          minHeight: 32,
          mb: 1,
          '& .MuiTabs-flexContainer': { gap: 1 },
          '& .MuiTabs-indicator': { height: 3 },
        }}
      >
        {items.map((item, idx) => (
          <Tab
            key={idx}
            label={item.label}
            sx={{
              minHeight: 32,
              py: 0.5,
              px: 1.5,
              textTransform: 'none',
              fontSize: '0.875rem',
            }}
          />
        ))}
      </Tabs>

      {items.map((item, idx) => (
        <div
          key={idx}
          role="tabpanel"
          hidden={value !== idx}
          id={`tab-panel-${idx}`}
          aria-labelledby={`tab-${idx}`}
        >
          {value === idx && <Box sx={{ pt: 2 }}>{item.content}</Box>}
        </div>
      ))}
    </Box>
  );
};
