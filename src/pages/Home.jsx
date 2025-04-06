import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HorasComponent from "../components/HorasComponent.jsx";
// Você pode importar outros componentes conforme os itens do submenu, por exemplo:
// import ReunioesComponent from "../components/ReunioesComponent";
// import MetasComponent from "../components/MetasComponent";
import "../styles/Home.css";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("cadastros");

  // Função para renderizar o conteúdo de acordo com o item selecionado
  const renderContent = () => {
    switch (selectedMenu) {
      case "Horas":
        return <HorasComponent />;
      // case "Reuniões":
      //   return <ReunioesComponent />;
      // case "Metas":
      //   return <MetasComponent />;
      default:
        return <p>Exibindo conteúdo de {selectedMenu}...</p>;
    }
  };

  return (
    <div className="main-container">
      {/* Sidebar como componente */}
      <Sidebar selectedMenu={selectedMenu} onMenuClick={setSelectedMenu} />

      {/* Área de conteúdo principal */}
      <div className="content">
        <div className="header">
          <h2>{selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)}</h2>
        </div>
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Home;
