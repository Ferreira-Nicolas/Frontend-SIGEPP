// src/components/Siderbar/Sidebar.tsx
import React from 'react';
import { Drawer, IconButton, Box, styled, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ProfileTab from '../ProfileTab';
import { MenuList, type MenuItemConfig } from '../MenuList';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
  '& .MuiDrawer-paper': {
    width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
    boxSizing: 'border-box',
    transition: theme.transitions.create('width', {
      easing:   theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    top:    theme.mixins.toolbar.minHeight,
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  },
}));

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onMobileClose: () => void;
};

const items: MenuItemConfig[] = [
  {
    label: 'Cadastros',
    icon: <i className="fa-solid fa-circle-plus" />,
    subItems: [
      { label: 'Clientes', to: '/home' },
      { label: 'Grupos', to: '/grupos' },
    ],
  },
  {
    label: 'Movimentos',
    icon: <i className="fa-solid fa-list-ul" />,
    subItems: [
      { label: 'Banco de Horas', to: '/banco-de-horas' },
      { label: 'Reuniões', to: '/reunioes' },
    ],
  },
  {
    label: 'Relatórios',
    icon: <i className="fa-solid fa-chart-simple" />,
    subItems: [
      { label: 'Em Breve', to: '/home3' },
      { label: 'Em Breve', to: '/home2' },
    ],
  },
  {
    label: 'Configurações',
    icon: <i className="fa-solid fa-gear" />,
    to: '/configuracoes',
  },
];

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onMobileClose,
}: SidebarProps) {
  const theme = useTheme();

  return (
    <>
      {/* Permanent drawer (desktop) */}
      <StyledDrawer
        variant="permanent"
        collapsed={collapsed}
        PaperProps={{ elevation: 1 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-end',
            px: 1,
            py: 1,
          }}
        >
          <IconButton
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
          >
            {collapsed
              ? <MenuIcon sx={{ fontSize: '1.5rem' }} />
              : <ChevronLeftIcon sx={{ fontSize: '1.5rem' }} />
            }
          </IconButton>
        </Box>

        <ProfileTab collapsed={collapsed} />

        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <MenuList
            items={items}
            collapsed={collapsed}
            onItemClick={onMobileClose}
            onSidebarToggle={onToggleCollapse}
          />
        </Box>
      </StyledDrawer>

      {/* Temporary drawer (mobile) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            top:    theme.mixins.toolbar.minHeight,
            height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: 1,
            py: 1,
          }}
        >
          <IconButton onClick={onMobileClose} aria-label="Fechar sidebar móvel">
            <ChevronLeftIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Box>

        <ProfileTab collapsed={false} />
        <MenuList
          items={items}
          collapsed={false}
          onItemClick={onMobileClose}
          onSidebarToggle={onMobileClose}
        />
      </Drawer>
    </>
  );
}
