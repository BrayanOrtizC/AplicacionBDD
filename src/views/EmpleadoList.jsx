import React, { useEffect, useState } from "react";
import {
  fetchEmpleados,
  deleteEmpleado,
  updateEmpleado,
  addEmpleado,
} from "../services/empleadoService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../assets/css/components/Table.css";
import "../assets/css/components/Botones-Tabla.css";
import "../assets/css/components/modal.css";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [addingEmpleado, setAddingEmpleado] = useState(false);
  const [newEmpleado, setNewEmpleado] = useState({
    id_empleado: "",
    nombre_empleado: "",
    puesto_empleado: "",
    id_tienda: "",
    estado_laboral: "",
    salario: "",
    cuenta_bancaria: "",
  });

  useEffect(() => {
    const loadEmpleados = async () => {
      try {
        const data = await fetchEmpleados();
        console.log("Empleados cargados:", data);
        setEmpleados(data);
      } catch (error) {
        console.error("Error al cargar los empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmpleados();
  }, []);

  const handleDelete = async (id_empleado) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      try {
        await deleteEmpleado(id_empleado);
        setEmpleados(
          empleados.filter((empleado) => empleado.id_empleado !== id_empleado)
        );
      } catch (error) {
        console.error("Error al eliminar el empleado:", error);
      }
    }
  };

  if (loading) return <p>Cargando empleados...</p>;

  const handleEdit = (empleado) => {
    setEditingEmpleado(empleado);
    setEditedData(empleado);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmpleado({ ...newEmpleado, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateEmpleado(editedData.id_empleado, editedData);
      setEmpleados(
        empleados.map((empleado) =>
          empleado.id_empleado === editedData.id_empleado
            ? editedData
            : empleado
        )
      );
      setEditingEmpleado(null);
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
    }
  };

  const handleAddEmpleado = async () => {
    try {
      const addedEmpleado = await addEmpleado(newEmpleado);
      setEmpleados([...empleados, addedEmpleado]);
      setAddingEmpleado(false);
      setNewEmpleado({
        id_empleado: "",
        nombre_empleado: "",
        puesto_empleado: "",
        id_tienda: "",
        estado_laboral: "",
        salario: "",
        cuenta_bancaria: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar el empleado:", error);
    }
  };

  return (
    <div className="sales-table-container">
      <h1 className="sales-title">Lista de Empleados</h1>
      <button
        className="cliente-modal-add"
        onClick={() => setAddingEmpleado(true)}
      >
        <FaPlus /> Agregar Empleado
      </button>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Puesto</th>
            <th>ID Tienda</th>
            <th>Estado Laboral</th>
            <th>Salario</th>
            <th>Cuenta Bancaria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => (
            <tr key={empleado.id_empleado || index}>
              <td>{empleado.id_empleado}</td>
              <td>{empleado.nombre_empleado}</td>
              <td>{empleado.puesto_empleado}</td>
              <td>{empleado.id_tienda}</td>
              <td>{empleado.estado_laboral}</td>
              <td>{empleado.salario}</td>
              <td>{empleado.cuenta_bancaria}</td>
              <td>
                <button
                  className="action-buttonT edit-button"
                  onClick={() => handleEdit(empleado)}
                >
                  <FaEdit />
                </button>
                <button
                  className="action-buttonT delete-button"
                  onClick={() => handleDelete(empleado.id_empleado)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(editingEmpleado || addingEmpleado) && (
        <div className="cliente-modal-overlay">
          <div className="cliente-modal">
            <h2>{editingEmpleado ? "Editar Empleado" : "Agregar Empleado"}</h2>
            <input
              type="text"
              name="id_empleado"
              value={
                addingEmpleado
                  ? newEmpleado.id_empleado
                  : editedData.id_empleado
              }
              onChange={
                addingEmpleado ? handleNewInputChange : handleInputChange
              }
              placeholder="ID Empleado"
              disabled={!addingEmpleado}
            />
            <input
              type="text"
              name="nombre_empleado"
              value={
                addingEmpleado
                  ? newEmpleado.nombre_empleado
                  : editedData.nombre_empleado
              }
              onChange={
                addingEmpleado ? handleNewInputChange : handleInputChange
              }
              placeholder="Nombre"
            />
            <input
              type="text"
              name="puesto_empleado"
              value={
                addingEmpleado
                  ? newEmpleado.puesto_empleado
                  : editedData.puesto_empleado
              }
              onChange={
                addingEmpleado ? handleNewInputChange : handleInputChange
              }
              placeholder="Puesto"
            />
            <input
              type="text"
              name="id_tienda"
              value={
                addingEmpleado ? newEmpleado.id_tienda : editedData.id_tienda
              }
              onChange={
                addingEmpleado ? handleNewInputChange : handleInputChange
              }
              placeholder="ID Tienda"
            />
            <input
              type="text"
              name="estado_laboral"
              value={
                addingEmpleado
                  ? newEmpleado.estado_laboral
                  : editedData.estado_laboral
              }
              onChange={
                addingEmpleado ? handleNewInputChange : handleInputChange
              }
              placeholder="Estado Laboral"
            />
            <input
              type="text"
              name="salario"
              value={addingEmpleado ? newEmpleado.salario : editedData.salario}
              onChange={
                addingEmpleado ? handleNewInputChange : handleInputChange
              }
              placeholder="Salario"
            />
            <input
              type="text"
              name="cuenta_bancaria"
              value={
                addingEmpleado
                  ? newEmpleado.cuenta_bancaria
                  : editedData.cuenta_bancaria
              }
              onChange={
                addingEmpleado ? handleNewInputChange : handleInputChange
              }
              placeholder="Cuenta Bancaria"
            />
            <div className="cliente-modal-buttons">
              <button
                className="cliente-modal-save"
                onClick={addingEmpleado ? handleAddEmpleado : handleUpdate}
              >
                {addingEmpleado ? "Agregar" : "Guardar"}
              </button>
              <button
                className="cliente-modal-cancel"
                onClick={() =>
                  addingEmpleado
                    ? setAddingEmpleado(false)
                    : setEditingEmpleado(null)
                }
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpleadoList;
