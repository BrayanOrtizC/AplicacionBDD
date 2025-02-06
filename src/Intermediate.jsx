import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./assets/css/components/pruebas.style.css";
import UserList from "./views/UserList";
import ClienteList from './views/ClienteList';
import ActionsView from './views/principal';


const Intermediate = () => {
  return (
    <Router>
      <div>

        {/* Definimos las rutas dentro de <Routes> */}
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/cliente" element={<ClienteList />} />
          <Route path="/principal" element={<ActionsView />} />
        </Routes>

      </div>
    </Router>
  );
};

export default Intermediate;
