import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("cadastros");

  return (
    <div className="main-container">
      {/* Sidebar separada como componente */}
      <Sidebar selectedMenu={selectedMenu} onMenuClick={setSelectedMenu} />

      {/* Conteúdo Principal */}
      <div className="content">
        <div className="header">
          <h2>{selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)}</h2>
        </div>
        <div className="main-content">
          <p>Exibindo conteúdo de {selectedMenu}...</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
