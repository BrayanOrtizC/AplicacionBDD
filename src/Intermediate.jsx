import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./assets/css/components/pruebas.style.css";
import UserList from "./views/UserList";
import ClienteList from './views/ClienteList';
import ActionsView from './views/principal';
import ProveedorList from './views/ProveedorList';
import EmpleadoList from './views/EmpleadoList';
import Facturacion from './views/facturacion';
import FacturaPage from './views/fdsf';




const Intermediate = () => {
  return (
    <Router>
      <div>

        {/* Definimos las rutas dentro de <Routes> */}
        <Routes>
          <Route path="/" element={<ActionsView />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/cliente" element={<ClienteList />} />
          <Route path="/proveedores" element={<ProveedorList />} />
          <Route path="/empleados" element={<EmpleadoList />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/f" element={<FacturaPage />} />
        </Routes>

      </div>
    </Router>
  );
};

export default Intermediate;
