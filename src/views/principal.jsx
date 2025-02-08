import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/views/fondo.css";
import "../assets/css/components/botones-principal.css";
import {
  FaUsers,
  FaUserTie,
  FaFileInvoiceDollar,
  FaTruck,
} from "react-icons/fa";
import Banner from "../components/Banner/Banner.jsx";


const ActionsView = () => {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    navigate(`/${section}`);
  };

  return (
    <div className="actions-botonP">
      <Banner />
      <div className="buttons-botonP">
        <button
          className="action-button"
          onClick={() => handleButtonClick("proveedores")}
        >
          <FaTruck className="button-icon" />
          Proveedores
        </button>
        <button
          className="action-button"
          onClick={() => handleButtonClick("cliente")}
        >
          <FaUsers className="button-icon" />
          Clientes
        </button>
        <button
          className="action-button"
          onClick={() => handleButtonClick("empleados")}
        >
          <FaUserTie className="button-icon" />
          Empleados
        </button>
        <button
          className="action-button"
          onClick={() => handleButtonClick("facturacion")}
        >
          <FaFileInvoiceDollar className="button-icon" />
          Facturación
        </button>
      </div>
    </div>
  );
};

export default ActionsView;
