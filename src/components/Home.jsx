import React, { useState } from 'react';
import '../styles/Home.css'; // Vamos criar o estilo depois, mas você pode adicionar o CSS conforme necessário

const Home = () => {

    const [selectedMenu, setSelectedMenu] = useState("cadastros");

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (

        <div className="main-container">
            {/* Menu Lateral */}
            <div className="sidebar">
                <ul>
                    <li
                        className={selectedMenu === "cadastros" ? "active" : ""}
                        onClick={() => handleMenuClick("cadastros")}>
                        Cadastros
                    </li>
                    <li
                        className={selectedMenu === "movimentacoes" ? "active" : ""}
                        onClick={() => handleMenuClick("movimentacoes")}>
                        Movimentações
                    </li>
                    <li
                        className={selectedMenu === "relatorios" ? "active" : ""}
                        onClick={() => handleMenuClick("relatorios")}>
                        Relatórios
                    </li>
                    <li
                        className={selectedMenu === "utilitarios" ? "active" : ""}
                        onClick={() => handleMenuClick("utilitarios")}>
                        Utilitários
                    </li>
                    <li
                        className={selectedMenu === "configuracoes" ? "active" : ""}
                        onClick={() => handleMenuClick("configuracoes")}>
                        Configurações
                    </li>
                </ul>
            </div>

            {/* Conteúdo Principal */}
            <div className="content">
                <div className="header">
                    <h2>{selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)}</h2>
                </div>
                <div className="main-content">
                    {/* Conteúdo de acordo com o item do menu */}
                    <p>Exibindo conteúdo de {selectedMenu}...</p>
                </div>
            </div>
        </div>



    );
};

export default Home;
