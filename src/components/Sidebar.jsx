import React, { useState, useEffect, useRef } from "react";
import "../styles/components/Sidebar.css";

const Sidebar = ({ selectedMenu, onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({}); // Controla os submenus abertos
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && shouldFocusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      setShouldFocusSearch(false);
    }
  }, [isOpen, shouldFocusSearch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (menu) => {
    if (!isOpen) {
      setIsOpen(true);
      setOpenMenus((prev) => ({ ...prev, [menu]: true }));
      return;
    }
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-caret-left icon-transition"></i>
      </button>

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

        {/* Outros menus sem submenu */}
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
    </div>
  );
};

export default Sidebar;
