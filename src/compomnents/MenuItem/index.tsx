import React from "react";
import { NavLink } from "react-router";
import styles from "./styles.module.css";
import { ChevronDown } from "lucide-react";

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
  to = "#",
  onClick,
  collapsed = false,
  isActive = false,
  isGroup = false,
  expanded = false,
  onToggle,
  level = 0,
}: MenuItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (isGroup) {
      e.preventDefault();
      onToggle?.();
    } else {
      onClick?.();
    }
  };

  const classList = [
    styles.menuItem,
    collapsed && styles.collapsed,
    isActive && styles.active,
    isGroup && styles.group,
    expanded && styles.expanded,
    level > 0 && styles[`level${level}`],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={classList}
      end={!!to && !isGroup} // apenas links com rota usam o “end” para match exato
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
      {isGroup && (
        <span className={styles.expandIcon}>
          <ChevronDown strokeWidth={1} />
        </span>
      )}
    </NavLink>
  );
}
