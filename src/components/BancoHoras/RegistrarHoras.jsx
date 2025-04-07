// RegistrarHoras.js
import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/BancoHoras/horas.css"

const RegistrarHoras = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleSelectEvent = (eventText) => {
    setSelectedEvent(eventText);
    setDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="registrar-content slide-in">
      <label className="label-evento" htmlFor="dropdown">
        Evento
      </label>
      <div className="dropdown" ref={dropdownRef}>
        <input
          type="text"
          value={selectedEvent}
          onClick={toggleDropdown}
          placeholder="Selecione um Evento"
          readOnly
          className="dropdown-input"
        />
        <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
          <div onClick={() => handleSelectEvent("Atraso")}>Atraso</div>
          <div onClick={() => handleSelectEvent("Extra")}>Extra</div>
          <div onClick={() => handleSelectEvent("Saída Antecipada")}>
            Saída Antecipada
          </div>
          <div onClick={() => handleSelectEvent("Compensação Feriado")}>
            Compensação Feriado
          </div>
        </div>
      </div>

      <div className="date-inicio-fim">
        <div className="date-field">
          <label htmlFor="dataInicio">Data Início:</label>
          <input type="datetime-local" id="dataInicio" className="input-datetime" />
        </div>
        <div className="date-field">
          <label htmlFor="dataFim">Data Fim:</label>
          <input type="datetime-local" id="dataFim" className="input-datetime" />
        </div>
      </div>

      <div className="justificativa-field">
        <label htmlFor="justificativa">Justificativa</label>
        <textarea id="justificativa" />
      </div>

      <div className="anexar-field">
        <button
          className={`anexar-btn ${attachedFile ? "file-attached" : ""}`}
          onClick={handleAttachClick}
        >
          <i className="fa-solid fa-paperclip"></i> Anexar
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {attachedFile && (
          <p className="anexo-success">Arquivo anexado com sucesso!</p>
        )}
      </div>
    </div>
  );
};

export default RegistrarHoras;
