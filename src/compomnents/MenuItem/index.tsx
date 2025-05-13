// src/components/MenuItem/MenuItem.tsx
import React from 'react';
import { NavLink } from 'react-router';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export type MenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  to?: string;
  onClick?: () => void;
  collapsed?: boolean;
  isActive?: boolean;
  isGroup?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  level?: number;
};

export function MenuItem({
  label,
  icon,
  to = '#',
  onClick,
  collapsed = false,
  isActive = false,
  isGroup = false,
  expanded = false,
  onToggle,
  level = 0,
}: MenuItemProps) {
  const handleClick: React.MouseEventHandler<HTMLDivElement & HTMLAnchorElement> = (e) => {
    if (isGroup) {
      e.preventDefault();
      onToggle?.();
    } else {
      onClick?.();
    }
  };

  const Component = to && !isGroup ? NavLink : 'div';

  return (
    <ListItemButton
      component={Component as any}
      to={to}
      onClick={handleClick}
      selected={isActive}
      sx={{
        px: collapsed ? 0 : 2,                      // sem padding horizontal quando colapsado
        justifyContent: collapsed ? 'center' : 'flex-start',
        textDecoration: 'none',
      }}
    >
      {icon && (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: collapsed ? 0 : 2,
            justifyContent: 'center',
            '& svg, & i': {
              fontSize: '1.5rem',
            },
          }}
        >
          {icon}
        </ListItemIcon>
      )}

      {!collapsed && (
        <ListItemText
          primary={
            <Typography variant="body1" noWrap sx={{ fontSize: '1rem' }}>
              {label}
            </Typography>
          }
        />
      )}

      {isGroup && !collapsed && (
        expanded
          ? <ExpandLess sx={{ fontSize: '1.5rem' }} />
          : <ExpandMore sx={{ fontSize: '1.5rem' }} />
      )}
    </ListItemButton>
  );
}
