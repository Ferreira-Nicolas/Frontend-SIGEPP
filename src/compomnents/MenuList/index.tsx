import React, { useState } from "react";
import { useLocation } from "react-router";
import { MenuItem, type MenuItemProps } from "../MenuItem";
import styles from "./styles.module.css";

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
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (label: string) =>
    setExpandedGroup((prev) => (prev === label ? null : label));

  const renderItem = (item: MenuItemConfig, level = 0): React.ReactNode => {
    const isGroup = Boolean(item.subItems);
    const isExpanded = expandedGroup === item.label;

    //  ← só fica active se a rota bater exatamente no “to” ou em um sub.to
    const isActiveGroup = item.to
      ? location.pathname === item.to
      : isGroup &&
        item.subItems!.some((sub) => sub.to === location.pathname);

    const handleToggle = () => {
      if (collapsed) {
        onSidebarToggle();
      } else {
        toggleGroup(item.label);
      }
    };

    const miProps: MenuItemProps = {
      label: item.label,
      icon: item.icon,
      to: item.to || "#",
      onClick: () => {
        if (!isGroup) onItemClick();
      },
      collapsed,
      isActive: isActiveGroup,
      isGroup,
      expanded: isExpanded,
      onToggle: handleToggle,
      level,
    };

    const element = <MenuItem key={item.label} {...miProps} />;

    // subitens só exibidos (com animação) quando a sidebar NÃO está colapsada
    if (isGroup && !collapsed) {
      return (
        <React.Fragment key={item.label}>
          {element}
          <div className={`${styles.subList} ${isExpanded ? styles.open : ""}`}>
            {item.subItems!.map((sub) => {
              const isSubActive = location.pathname === sub.to;
              return (
                <MenuItem
                  key={sub.label}
                  label={sub.label}
                  to={sub.to}
                  onClick={onItemClick}
                  collapsed={collapsed}
                  isActive={isSubActive}
                  level={level + 1}
                />
              );
            })}
          </div>
        </React.Fragment>
      );
    }

    return element;
  };

  return <nav className={styles.menuList}>{items.map((i) => renderItem(i, 0))}</nav>;
}
