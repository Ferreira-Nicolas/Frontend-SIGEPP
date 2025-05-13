// src/components/MenuList/MenuList.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { List, Collapse } from '@mui/material';
import { MenuItem } from '../MenuItem/';

export type SubItem = { label: string; to: string };
export type MenuItemConfig = {
  label: string;
  icon?: React.ReactNode;
  to?: string;
  subItems?: SubItem[];
};

type MenuListProps = {
  items: MenuItemConfig[];
  collapsed: boolean;
  onItemClick: () => void;
  onSidebarToggle: () => void;
};

export function MenuList({
  items,
  collapsed,
  onItemClick,
  onSidebarToggle,
}: MenuListProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleGroupClick = (item: MenuItemConfig) => {
    if (collapsed) {
      onSidebarToggle();
      return;
    }
    if (item.subItems) {
      setExpanded((prev) => (prev === item.label ? null : item.label));
    } else {
      onItemClick();
    }
  };

  return (
    <List disablePadding>
      {items.map((item) => {
        const isActive = item.to
          ? location.pathname === item.to
          : !!item.subItems?.some((sub) => sub.to === location.pathname);
        const isOpen = expanded === item.label;

        return (
          <React.Fragment key={item.label}>
            <MenuItem
              label={item.label}
              icon={item.icon}
              to={item.to}
              onClick={() => handleGroupClick(item)}
              collapsed={collapsed}
              isActive={isActive}
              isGroup={!!item.subItems}
              expanded={isOpen}
              onToggle={() => handleGroupClick(item)}
              level={0}
            />

            {item.subItems && (
              <Collapse in={isOpen && !collapsed} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {item.subItems.map((sub) => {
                    const isSubActive = location.pathname === sub.to;
                    return (
                      <MenuItem
                        key={sub.label}
                        label={sub.label}
                        to={sub.to}
                        onClick={onItemClick}
                        collapsed={collapsed}
                        isActive={isSubActive}
                        level={1}
                      />
                    );
                  })}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
}
