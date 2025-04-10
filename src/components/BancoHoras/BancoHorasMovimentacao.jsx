// BancoHoras.js
import React from "react";
import "../../styles/components/BancoHoras/horas.css";

const BancoHoras = () => {
  // Dados de exemplo para a tabela com todas as informações
  const tableData = [
    {
      id: 1,
      collaborator: "João Silva",
      date: "2025-04-01",
      hours: "2:00",
      justification: "Trabalho extra para finalizar o projeto no prazo estipulado.",
      approved: false,
      type: "Extra",
    },
    {
      id: 2,
      collaborator: "Maria Souza",
      date: "2025-04-02",
      hours: "-1:30",
      justification: "Atraso devido ao trânsito intenso na manhã do dia.",
      approved: false,
      type: "Atraso",
    },
    {
      id: 3,
      collaborator: "Carlos Pereira",
      date: "2025-04-03",
      hours: "3:15",
      justification:
        "Trabalho adicional de final de semana para suprir demanda urgente.",
      approved: false,
      type: "Extra",
    },
  ];

  // Função para formatar a data no padrão dd/mm/aaaa
  const formatDate = (dateStr) => {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <div className="banco-content slide-in">
      <h2>Banco de Horas</h2>
      {/* Envolvemos a tabela num contêiner que permite scroll horizontal, se necessário */}
      <div className="table-container">
        <table className="banco-table">
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Data</th>
              <th>Horas</th>
              <th>Justificativa</th>
              <th>Aprovar</th>
              <th>Tipo Evento</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id}>
                <td>{item.collaborator}</td>
                <td>{formatDate(item.date)}</td>
                <td>{item.hours}</td>
                <td title={item.justification} className="justification-cell">
                  {item.justification}
                </td>
                <td>
                  <input type="checkbox" checked={item.approved} readOnly />
                </td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BancoHoras;
