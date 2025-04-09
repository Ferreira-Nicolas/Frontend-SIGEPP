import React, { useState, useEffect, useRef } from "react";
import "../styles/components/Sidebar.css";

const Sidebar = ({ selectedMenu, onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({}); // Controla os submenus abertos
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef(null);

  // Foca na pesquisa quando o menu for aberto
  useEffect(() => {
    if (isOpen && shouldFocusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      setShouldFocusSearch(false);
    }
  }, [isOpen, shouldFocusSearch]);

  // Detecta o tamanho da tela e ajusta o comportamento
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false); // Inicia fechado no mobile (header com botão de hambúrguer)
      } else {
        setIsOpen(true); // Exibe aberto no desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Alterna a abertura dos submenus (mesma lógica para desktop e mobile)
  const toggleMenu = (menu) => {
    if (!isOpen) {
      setIsOpen(true);
      setOpenMenus((prev) => ({ ...prev, [menu]: true }));
      return;
    }
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"} ${isMobile ? "mobile" : ""}`}>
      {isMobile ? (
        // Bloco de header para mobile com título e botão de toggle
        <div className="mobile-header">
          <span className="mobile-title">Menu</span>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? (
              <i className="fa-solid fa-times icon-transition"></i>
            ) : (
              <i className="fa-solid fa-bars icon-transition"></i>
            )}
          </button>
        </div>
      ) : (
        // Botão de toggle para desktop (posição absoluta)
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="fa-solid fa-caret-left icon-transition"></i>
        </button>
      )}
      {(!isMobile || isOpen) && (
        <ul>
          {/* Barra de pesquisa */}
          <li className="search-container">
            {isOpen ? (
              <input
                type="text"
                placeholder="Pesquisar..."
                className="search-input"
                ref={searchInputRef}
              />
            ) : (
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
            )}
          </li>

          {/* CADASTROS */}
          <li
            className={
              selectedMenu === "cadastros" ||
              ["Reuniões", "Horas", "Metas", "setores"].includes(selectedMenu)
                ? "active"
                : ""
            }
            onClick={() => toggleMenu("cadastros")}
          >
            <i className="fa-solid fa-circle-plus"></i>
            {isOpen && <span>Cadastros</span>}
            {isOpen && (
              <i
                className={`fa-solid fa-chevron-down dropdown-icon ${
                  openMenus["cadastros"] ? "open" : ""
                }`}
              ></i>
            )}
          </li>
          {isOpen && (
            <ul className={`submenu scrollable ${openMenus["cadastros"] ? "show" : ""}`}>
              <li
                className={selectedMenu === "Reuniões" ? "active" : ""}
                onClick={() => onMenuClick("Reuniões")}
              >
                <span>Reuniões</span>
              </li>
              <li
                className={selectedMenu === "Horas" ? "active" : ""}
                onClick={() => onMenuClick("Horas")}
              >
                <span>Horas</span>
              </li>
              <li
                className={selectedMenu === "Metas" ? "active" : ""}
                onClick={() => onMenuClick("Metas")}
              >
                <span>Metas</span>
              </li>
            </ul>
          )}

          {/* MOVIMENTAÇÕES */}
          <li
            className={
              selectedMenu === "movimentacoes" ||
              ["entrada", "saida"].includes(selectedMenu)
                ? "active"
                : ""
            }
            onClick={() => toggleMenu("movimentacoes")}
          >
            <i className="fa-solid fa-list-ul"></i>
            {isOpen && <span>Movimentações</span>}
            {isOpen && (
              <i
                className={`fa-solid fa-chevron-down dropdown-icon ${
                  openMenus["movimentacoes"] ? "open" : ""
                }`}
              ></i>
            )}
          </li>
          {isOpen && (
            <ul className={`submenu scrollable ${openMenus["movimentacoes"] ? "show" : ""}`}>
              <li
                className={selectedMenu === "entrada" ? "active" : ""}
                onClick={() => onMenuClick("entrada")}
              >
                <span>Entrada</span>
              </li>
              <li
                className={selectedMenu === "saida" ? "active" : ""}
                onClick={() => onMenuClick("saida")}
              >
                <span>Saída</span>
              </li>
            </ul>
          )}

          {/* Outros itens sem submenu */}
          <li
            className={selectedMenu === "relatorios" ? "active" : ""}
            onClick={() => onMenuClick("relatorios")}
          >
            <i className="fa-solid fa-chart-simple"></i>
            {isOpen && <span>Relatórios</span>}
          </li>
          <li
            className={selectedMenu === "utilitarios" ? "active" : ""}
            onClick={() => onMenuClick("utilitarios")}
          >
            <i className="fa-solid fa-toolbox"></i>
            {isOpen && <span>Utilitários</span>}
          </li>
          <li
            className={selectedMenu === "configuracoes" ? "active" : ""}
            onClick={() => onMenuClick("configuracoes")}
          >
            <i className="fa-solid fa-gear"></i>
            {isOpen && <span>Configurações</span>}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
