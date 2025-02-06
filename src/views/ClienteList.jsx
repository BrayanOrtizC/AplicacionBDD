import React, { useEffect, useState } from "react";
import {
  fetchClientes,
  deleteCliente,
  updateCliente,
  addCliente,
} from "../services/clienteService";
import { FaEdit, FaTrash , FaPlus} from "react-icons/fa";
import "../assets/css/components/Table.css";
import "../assets/css/components/Botones-Tabla.css";
import "../assets/css/components/modal.css";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCliente, setEditingCliente] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [addingCliente, setAddingCliente] = useState(false);
  const [newCliente, setNewCliente] = useState({
    cc_cliente: "",
    nombre_cliente: "",
    telefono_cliente: "",
    direccion_cliente: "",
    correo_cliente: "",
    id_tienda: "",
  });

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
  const handleDelete = async (cc_cliente) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await deleteCliente(cc_cliente);
        setClientes(
          clientes.filter((cliente) => cliente.cc_cliente !== cc_cliente)
        );
      } catch (error) {
        console.error("Error al eliminar el cliente:", error);
      }
    }
  };

  if (loading) return <p>Cargando clientes...</p>;

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setEditedData(cliente);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      console.log("Cliente ID a actualizar:", editedData.cc_cliente);
      await updateCliente(editedData.cc_cliente, editedData);
      setClientes(
        clientes.map((cliente) =>
          cliente.cc_cliente === editedData.cc_cliente ? editedData : cliente
        )
      );
      setEditingCliente(null);
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const handleAddCliente = async () => {
    try {
      const addedCliente = await addCliente(newCliente);  // Usa la función de servicio
      setClientes([...clientes, addedCliente]);
      setAddingCliente(false);
      setNewCliente({
        cc_cliente: "",
        nombre_cliente: "",
        telefono_cliente: "",
        direccion_cliente: "",
        correo_cliente: "",
        id_tienda: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
    }
  };

  return (
    <div className="sales-table-container">
      <h1 className="sales-title">Lista de Clientes</h1>
      <button className="cliente-modal-add" onClick={() => setAddingCliente(true)}>
        <FaPlus /> Agregar Cliente
      </button>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Tienda</th>
            <th>Acciones</th>
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
              <td>
                <button
                  className="action-buttonT edit-button"
                  onClick={() => handleEdit(cliente)}
                >
                  <FaEdit />
                </button>
                <button
                  className="action-buttonT delete-button"
                  onClick={() => handleDelete(cliente.cc_cliente)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(editingCliente || addingCliente) && (
        <div className="cliente-modal-overlay">
          <div className="cliente-modal">
            <h2>{editingCliente ? "Editar Cliente" : "Agregar Cliente"}</h2>
            <input type="text" name="cc_cliente" value={addingCliente ? newCliente.cc_cliente : editedData.cc_cliente} onChange={addingCliente ? handleNewInputChange : handleInputChange} placeholder="Cédula" disabled={!addingCliente} />
            <input type="text" name="nombre_cliente" value={addingCliente ? newCliente.nombre_cliente : editedData.nombre_cliente} onChange={addingCliente ? handleNewInputChange : handleInputChange} placeholder="Nombre" />
            <input type="text" name="telefono_cliente" value={addingCliente ? newCliente.telefono_cliente : editedData.telefono_cliente} onChange={addingCliente ? handleNewInputChange : handleInputChange} placeholder="Teléfono" />
            <input type="text" name="direccion_cliente" value={addingCliente ? newCliente.direccion_cliente : editedData.direccion_cliente} onChange={addingCliente ? handleNewInputChange : handleInputChange} placeholder="Dirección" />
            <input type="email" name="correo_cliente" value={addingCliente ? newCliente.correo_cliente : editedData.correo_cliente} onChange={addingCliente ? handleNewInputChange : handleInputChange} placeholder="Correo" />
            <input type="text" name="id_tienda" value={addingCliente ? newCliente.id_tienda : editedData.id_tienda} onChange={addingCliente ? handleNewInputChange : handleInputChange} placeholder="ID Tienda" />
            <div className="cliente-modal-buttons">
              <button className="cliente-modal-save" onClick={addingCliente ? handleAddCliente : handleUpdate}>{addingCliente ? "Agregar" : "Guardar"}</button>
              <button className="cliente-modal-cancel" onClick={() => (addingCliente ? setAddingCliente(false) : setEditingCliente(null))}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteList;
