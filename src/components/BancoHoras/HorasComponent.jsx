// HorasComponent.js
import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/BancoHoras/horas.css"


import BancoHoras from "./BancoHorasMovimentacao";
import RegistrarHoras from "./RegistrarHoras";

const HorasComponent = () => {
  const [activeTab, setActiveTab] = useState("registrar");
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const registrarTabRef = useRef(null);
  const bancoTabRef = useRef(null);

  useEffect(() => {
    const activeTabRef = activeTab === "registrar" ? registrarTabRef.current : bancoTabRef.current;
    if (activeTabRef) {
      setIndicatorStyle({
        left: activeTabRef.offsetLeft,
        width: activeTabRef.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="horas-container">
      {/* Controle de Abas */}
      <div className="tab-container">
        <button
          ref={registrarTabRef}
          className={`tab-button ${activeTab === "registrar" ? "active" : ""}`}
          onClick={() => setActiveTab("registrar")}
        >
          Registrar Horas
        </button>
        <button
          ref={bancoTabRef}
          className={`tab-button ${activeTab === "banco" ? "active" : ""}`}
          onClick={() => setActiveTab("banco")}
        >
          Banco de Horas
        </button>
        <div className="tab-indicator" style={indicatorStyle}></div>
      </div>

      {activeTab === "registrar" && <RegistrarHoras />}
      {activeTab === "banco" && <BancoHoras />}
    </div>
  );
};

export default HorasComponent;
