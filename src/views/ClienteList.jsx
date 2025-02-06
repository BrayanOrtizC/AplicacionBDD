import React, { useEffect, useState } from "react";
import { fetchClientes } from "../services/clienteService";
import "../components/table/Table.css";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const data = await fetchClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClientes();
  }, []);

  if (loading) return <p>Cargando clentes...</p>;

  return (
    <div className="sales-table-container">
      <h1 className="sales-title">Lista de Clientes</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dircción</th>
            <th>Correo</th>
            <th>Tienda</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={cliente.cc_cliente || index}>
              <td>{cliente.cc_cliente}</td>
              <td>{cliente.nombre_cliente}</td>
              <td>{cliente.telefono_cliente}</td>
              <td>{cliente.direccion_cliente}</td>
              <td>{cliente.correo_cliente}</td>
              <td>{cliente.id_tienda}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;
