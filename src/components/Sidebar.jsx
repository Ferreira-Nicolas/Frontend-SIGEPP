import React, { useState } from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ selectedMenu, onMenuClick }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [openMenus, setOpenMenus] = useState({}); // Estado para submenus

    const toggleMenu = (menu) => {
        if (isOpen) { // Só permite abrir submenus se a sidebar estiver aberta
            setOpenMenus((prev) => ({
                ...prev,
                [menu]: !prev[menu],
            }));
        }
    };

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                <i className={`fa-solid ${isOpen ? "fa-caret-left" : "fa-bars"} icon-transition`}></i>
            </button>

            <hr className="hr-divider" />
            <ul>
                {/* CADASTROS */}
                <li className={selectedMenu === "cadastros" ? "active" : ""} onClick={() => toggleMenu("cadastros")}>
                    <i className="fa-solid fa-circle-plus"></i>
                    {isOpen && <span>Cadastros</span>}
                    {isOpen && <i className={`fa-solid fa-chevron-down dropdown-icon ${openMenus["cadastros"] ? "open" : ""}`}></i>}
                </li>
                {isOpen && (
                    <ul className={`submenu ${openMenus["cadastros"] ? "show" : ""}`}>
                        <li><span>Usuários</span></li>
                        <ul className="submenu nested">
                            <li><span>Perfil</span></li>
                            <li><span>Líderes</span></li>
                        </ul>
                        <li><span>Setores</span></li>
                    </ul>
                )}

                {/* MOVIMENTAÇÕES */}
                <li className={selectedMenu === "movimentacoes" ? "active" : ""} onClick={() => toggleMenu("movimentacoes")}>
                    <i className="fa-solid fa-list-ul"></i>
                    {isOpen && <span>Movimentações</span>}
                    {isOpen && <i className={`fa-solid fa-chevron-down dropdown-icon ${openMenus["movimentacoes"] ? "open" : ""}`}></i>}
                </li>
                {isOpen && (
                    <ul className={`submenu ${openMenus["movimentacoes"] ? "show" : ""}`}>
                        <li><span>Entrada</span></li>
                        <li><span>Saída</span></li>
                    </ul>
                )}

                {/* Outros menus sem submenu */}
                <li className={selectedMenu === "relatorios" ? "active" : ""} onClick={() => onMenuClick("relatorios")}>
                    <i className="fa-solid fa-chart-simple"></i> {isOpen && <span>Relatórios</span>}
                </li>
                <li className={selectedMenu === "utilitarios" ? "active" : ""} onClick={() => onMenuClick("utilitarios")}>
                    <i className="fa-solid fa-toolbox"></i> {isOpen && <span>Utilitários</span>}
                </li>
                <li className={selectedMenu === "configuracoes" ? "active" : ""} onClick={() => onMenuClick("configuracoes")}>
                    <i className="fa-solid fa-gear"></i> {isOpen && <span>Configurações</span>}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
