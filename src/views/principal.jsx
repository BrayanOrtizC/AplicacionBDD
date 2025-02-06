import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/css/views/fondo.css"
import "../assets/css/components/botones-principal.css"
import { FaUsers, FaUserTie, FaFileInvoiceDollar } from 'react-icons/fa';

const ActionsView = () => {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    navigate(`/${section}`);
  };

  return (
    <div className="actions-botonP">
      <h2 className="actions-title">Seleccione una opción</h2>

      <div className="buttons-botonP">
        <button className="action-button" onClick={() => handleButtonClick('cliente')}>
          <FaUsers className="button-icon" />
          Clientes
        </button>
        <button className="action-button" onClick={() => handleButtonClick('empleados')}>
          <FaUserTie className="button-icon" />
          Empleados
        </button>
        <button className="action-button" onClick={() => handleButtonClick('facturacion')}>
          <FaFileInvoiceDollar className="button-icon" />
          Facturación
        </button>
      </div>
    </div>
  );
};

export default ActionsView;
