
import { NavLink } from "react-router";
import styles from "./styles.module.css";

export type SubMenuProps = {
  label: string;
  to: string;
  onClick?: () => void;
  isActive?: boolean;
};

export function SubMenu({
  label,
  to,
  onClick,
  isActive = false,
}: SubMenuProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive: navIsActive }) =>
        `${styles.subMenuItem} ${
          isActive || navIsActive ? styles.active : ""
        }`
      }
    >
      {label}
    </NavLink>
  );
}
