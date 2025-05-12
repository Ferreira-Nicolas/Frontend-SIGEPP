
import { MenuList, type MenuItemConfig } from "../MenuList";
import ProfileTab from "../ProfileTab";
import styles from "./styles.module.css";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onMobileClose: () => void;
};

const items: MenuItemConfig[] = [
  {
    label: "Cadastros",
    icon: <i className="fa-solid fa-circle-plus" />,
    subItems: [
      { label: "Clientes", to: "/home" },
      { label: "Grupos", to: "/grupos" },
    ],
  },
  {
    label: "Movimentos",
    icon: <i className="fa-solid fa-list-ul" />,
    subItems: [
      { label: "Banco de Horas", to: "/banco-de-horas" },
      { label: "Reuniões", to: "/reunioes" },
    ],
  },
  {
    label: "Relatórios",
    icon: <i className="fa-solid fa-chart-simple" />,
    subItems: [
      { label: "Em Breve", to: "/home3" },
      { label: "Em Breve", to: "/home2" },
    ],
  },
  {
    label: "Configurações",
    icon: <i className="fa-solid fa-gear" />,
    to: "/configuracoes",
  },
];

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onMobileClose,
}: SidebarProps) {
  return (
    <aside
      className={`
        ${styles.sidebar}
        ${collapsed ? styles.collapsed : ""}
        ${mobileOpen ? styles.openMobile : ""}
      `}
    >
      <div className={styles.header}>
        <button
          className={`${styles.toggleBtn} ${styles.btnCollapse}`}
          onClick={onToggleCollapse}
          aria-label={
            collapsed ? "Expandir barra lateral" : "Retrair barra lateral"
          }
        >
          <i className="fa-solid fa-caret-left" />
        </button>
      </div>

      {/* aba de perfil */}
      <ProfileTab collapsed={collapsed} />

      {/* passo onToggleCollapse para o MenuList */}
      <MenuList
        items={items}
        collapsed={collapsed}
        onItemClick={onMobileClose}
        onSidebarToggle={onToggleCollapse}
      />
    </aside>
  );
}
