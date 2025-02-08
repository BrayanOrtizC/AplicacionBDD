import { useState } from "react";

const FacturaPage = () => {
  const [factura, setFactura] = useState({ cliente_id: "", total: 0, fecha: "" });
  const [items, setItems] = useState([]);
  const [itemActual, setItemActual] = useState({ id_producto: "", cantidad: 0, precio: 0 });

  // Agregar un ítem a la lista temporal
  const agregarItem = () => {
    setItems([...items, { ...itemActual, importe: itemActual.cantidad * itemActual.precio }]);
    setItemActual({ id_producto: "", cantidad: 0, precio: 0 });
  };

  // Eliminar un ítem de la lista temporal
  const eliminarItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Enviar la factura con los ítems al backend
  const confirmarFactura = async () => {
    if (!factura.cliente_id || items.length === 0) {
      alert("Debe ingresar datos de la factura y al menos un ítem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/facturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ factura, items }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Factura creada con éxito, ID: " + data.idFactura);
        setFactura({ cliente_id: "", total: 0, fecha: "" });
        setItems([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al enviar factura:", error);
      alert("Error al enviar factura.");
    }
  };

  return (
    <div>
      <h2>Crear Factura</h2>
      
      {/* Datos de la factura */}
      <input
        type="text"
        placeholder="ID Cliente"
        value={factura.cliente_id}
        onChange={(e) => setFactura({ ...factura, cliente_id: e.target.value })}
      />
      <input
        type="date"
        value={factura.fecha}
        onChange={(e) => setFactura({ ...factura, fecha: e.target.value })}
      />

      <h3>Agregar Ítem</h3>
      <input
        type="text"
        placeholder="ID Producto"
        value={itemActual.id_producto}
        onChange={(e) => setItemActual({ ...itemActual, id_producto: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={itemActual.cantidad}
        onChange={(e) => setItemActual({ ...itemActual, cantidad: parseInt(e.target.value) || 0 })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={itemActual.precio}
        onChange={(e) => setItemActual({ ...itemActual, precio: parseFloat(e.target.value) || 0 })}
      />
      <button onClick={agregarItem}>Agregar Ítem</button>

      <h3>Lista de Ítems</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.id_producto} - {item.cantidad} x {item.precio} = {item.importe}
            <button onClick={() => eliminarItem(index)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <button onClick={confirmarFactura}>Confirmar Factura</button>
      <button onClick={() => setItems([])}>Cancelar</button>
    </div>
  );
};

export default FacturaPage;
