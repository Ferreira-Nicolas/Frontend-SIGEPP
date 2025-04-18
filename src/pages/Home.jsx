import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HorasComponent from "../components/BancoHoras/HorasComponent.jsx";
import LogoSigepp from '../assets/img/Logo_SIGEPP.png'
import "../styles/Home.css";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("cadastros");

  // Função para renderizar o conteúdo de acordo com o item selecionado
  const renderContent = () => {
    switch (selectedMenu) {
      case "Horas":
        return <HorasComponent />;
      default:
        return <p>Exibindo conteúdo de {selectedMenu}...</p>;
    }
  };

  return (
    <div className="home-container">
      {/* Header fixo no topo */}
      <header className="header">
        <img
          src={LogoSigepp}
          alt="LOGO-SIGEPP"
          className="logo-header"
        />
      </header>

      {/* Contêiner que agrupa o Sidebar e o conteúdo principal */}
      <div className="content-container">
        <Sidebar selectedMenu={selectedMenu} onMenuClick={setSelectedMenu} />
        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Home;
