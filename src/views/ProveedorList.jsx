import React, { useEffect, useState } from "react";
import {
  fetchProveedores,
  deleteProveedor,
  updateProveedor,
  addProveedor,
} from "../services/proveedorService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../assets/css/components/Table.css";
import "../assets/css/components/Botones-Tabla.css";
import "../assets/css/components/modal.css";

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [addingProveedor, setAddingProveedor] = useState(false);
  const [newProveedor, setNewProveedor] = useState({
    id_proveedor: "",
    nombre_proveedor: "",
    numero_proveedor: "",
  });

  useEffect(() => {
    const loadProveedores = async () => {
      try {
        const data = await fetchProveedores();
        setProveedores(data);
      } catch (error) {
        console.error("Error al cargar los proveedores:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProveedores();
  }, []);

  const handleDelete = async (id_proveedor) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      try {
        await deleteProveedor(id_proveedor);
        setProveedores(
          proveedores.filter((proveedor) => proveedor.id_proveedor !== id_proveedor)
        );
      } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
      }
    }
  };

  if (loading) return <p>Cargando proveedores...</p>;

  const handleEdit = (proveedor) => {
    setEditingProveedor(proveedor);
    setEditedData(proveedor);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewProveedor({ ...newProveedor, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateProveedor(editedData.id_proveedor, editedData);
      setProveedores(
        proveedores.map((proveedor) =>
          proveedor.id_proveedor === editedData.id_proveedor ? editedData : proveedor
        )
      );
      setEditingProveedor(null);
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
    }
  };

  const handleAddProveedor = async () => {
    try {
      const addedProveedor = await addProveedor(newProveedor);
      setProveedores([...proveedores, addedProveedor]);
      setAddingProveedor(false);
      setNewProveedor({
        id_proveedor: "",
        nombre_proveedor: "",
        numero_proveedor: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar el proveedor:", error);
    }
  };

  return (
    <div className="sales-table-container">
      <h1 className="sales-title">Lista de Proveedores</h1>
      <button className="cliente-modal-add" onClick={() => setAddingProveedor(true)}>
        <FaPlus /> Agregar Proveedor
      </button>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Número</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor, index) => (
            <tr key={proveedor.id_proveedor || index}>
              <td>{proveedor.id_proveedor}</td>
              <td>{proveedor.nombre_proveedor}</td>
              <td>{proveedor.numero_proveedor}</td>
              <td>
                <button className="action-buttonT edit-button" onClick={() => handleEdit(proveedor)}>
                  <FaEdit />
                </button>
                <button className="action-buttonT delete-button" onClick={() => handleDelete(proveedor.id_proveedor)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(editingProveedor || addingProveedor) && (
        <div className="cliente-modal-overlay">
          <div className="cliente-modal">
            <h2>{editingProveedor ? "Editar Proveedor" : "Agregar Proveedor"}</h2>
            <input
              type="text"
              name="id_proveedor"
              value={addingProveedor ? newProveedor.id_proveedor : editedData.id_proveedor}
              onChange={addingProveedor ? handleNewInputChange : handleInputChange}
              placeholder="ID Proveedor"
              disabled={!addingProveedor}
            />
            <input
              type="text"
              name="nombre_proveedor"
              value={addingProveedor ? newProveedor.nombre_proveedor : editedData.nombre_proveedor}
              onChange={addingProveedor ? handleNewInputChange : handleInputChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="numero_proveedor"
              value={addingProveedor ? newProveedor.numero_proveedor : editedData.numero_proveedor}
              onChange={addingProveedor ? handleNewInputChange : handleInputChange}
              placeholder="Número"
            />
            <div className="cliente-modal-buttons">
              <button className="cliente-modal-save" onClick={addingProveedor ? handleAddProveedor : handleUpdate}>
                {addingProveedor ? "Agregar" : "Guardar"}
              </button>
              <button className="cliente-modal-cancel" onClick={() => (addingProveedor ? setAddingProveedor(false) : setEditingProveedor(null))}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProveedorList;
