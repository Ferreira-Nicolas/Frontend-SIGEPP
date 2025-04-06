import React, { useState, useEffect, useRef } from "react";
import "../styles/components/BancoHoras/horas.css";


const HorasComponent = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Fecha o dropdown se clicar fora dele
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="horas-container">
            
            <div className="dropdown" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="dropbtn">
                    Selecione um Evento
                </button>
                <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
                    <a href="#">Atraso</a>
                    <a href="#">Extra</a>
                    <a href="#">Saida Antecipada</a>
                    <a href="#">Compensação Feriado</a>
                </div>
            </div>
            <div className="date-inicio-fim">
                <label htmlFor="dataInicio">Data Início:</label>
                <input type="datetime-local" id="dataInicio" className="input-datetime" />

                <label htmlFor="dataFim">Data Fim:</label>
                <input type="datetime-local" id="dataFim" className="input-datetime" />
            </div>

        </div>
    );
};

export default HorasComponent;
