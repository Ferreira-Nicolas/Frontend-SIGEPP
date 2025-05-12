
import { Menu, Search } from "lucide-react";
import styles from "./styles.module.css";
import { SearchInput } from "../SearchInput";

export type HeaderProps = {
  onToggleMobile: () => void;
};

export function Header({  onToggleMobile }: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* Logo sempre à esquerda */}
      <img src="./sigepp.png" alt="Logo do SIGEPP" className={styles.logo} />

      {/* Busca só em desktop e quando o menu mobile está fechado */}
      <div className={styles.search}>
        <SearchInput id="search" type="text" placeholder="Buscar..." />

        <Search />
      </div>

      {/* botão hambúrguer ou fechar, sempre à direita */}
      <button
        className={styles.toggleMobile}
        onClick={onToggleMobile}
       
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
