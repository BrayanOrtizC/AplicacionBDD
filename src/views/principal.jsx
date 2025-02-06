import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/button/button.css";
import "../components/combobox/combobox.css";
import "../components/fondo/fondo.css";

const ActionsView = () => {
  const [selection, setSelection] = useState('');
  const navigate = useNavigate();

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  const handleButtonClick = (action) => {
    if (selection) {
      if (action === 'agregar') {
        navigate(`/${selection}/agregar`);
      } else if (action === 'editar') {
        navigate(`/${selection}/editar`);
      } else if (action === 'eliminar') {
        navigate(`/${selection}/eliminar`);
      }
    } else if (action === 'pagos') {
      navigate('/pagos');
    } else {
      alert('Por favor, seleccione una opción en el combobox');
    }
  };

  return (
    <div className="actions-container">
      <h2 className="actions-title">Seleccione una opción y luego elija una acción</h2>

      <div className="select-container">
        <select value={selection} onChange={handleSelectionChange}>
          <option value="">Seleccione...</option>
          <option value="cliente">Cliente</option>
          <option value="proveedor">Proveedor</option>
          <option value="empleado">Empleado</option>
          <option value="producto">Producto</option>
        </select>
      </div>

      <div className="buttons-container">
        <button onClick={() => handleButtonClick('agregar')}>Agregar</button>
        <button onClick={() => handleButtonClick('editar')}>Editar</button>
        <button onClick={() => handleButtonClick('eliminar')}>Eliminar</button>
        <button onClick={() => handleButtonClick('pagos')}>Pagos</button>
      </div>
    </div>
  );
};

export default ActionsView;
