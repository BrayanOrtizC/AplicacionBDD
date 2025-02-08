import React, { useEffect, useState } from "react";
import { addCliente, fetchClientes } from "../services/clienteService";
import { fetchEmpleados } from "../services/empleadoService";
import { fetchProductos } from "../services/productoService";
import { addFactura, fetchFacturas } from "../services/facturaService";
import "../assets/css/components/Table.css";
import "../assets/css/components/modal.css";

const Facturacion = () => {
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);

  const [nuevaFactura, setNuevaFactura] = useState({
    id_factura: "",
    cc_cliente: "",
    id_empleado: "",
    id_tienda: "",
    fecha: new Date().toISOString().split("T")[0],
    precio_total: 0,
    items: [],
    num_linea: 1, // Inicializar con 1
    // total: 0, // Total de la factura
  });

  const [nuevoItem, setNuevoItem] = useState({
    // id_factura: "F211",
    id_producto: "",
    cantidad: 1,
    descripcion: "",
    precio: 0,
    importe: 0, // Se almacenará directamente en la base de datos
    // cantidad: 1,
    // importe:"",
    id_tienda: "",
    num_linea: 1, // Inicializar con 1
  });

  // const obtenerNuevoIdFactura = async () => {
  //     try {
  //         const ultimaFactura = await fetchUltimaFactura();

  //         if (ultimaFactura) {
  //             const ultimoNumero = parseInt(ultimaFactura.id_factura.replace("F", ""));
  //             const nuevoNumero = ultimoNumero + 1;
  //             const nuevoIdFactura = `F${nuevoNumero}`;

  //             setNuevaFactura(prev => ({
  //                 ...prev,
  //                 id_factura: nuevoIdFactura
  //             }));

  //             console.log(`Última factura: ${ultimaFactura.id_factura}, Nueva factura: ${nuevoIdFactura}`);
  //         } else {
  //             setNuevaFactura(prev => ({
  //                 ...prev,
  //                 id_factura: "F001"
  //             }));
  //         }
  //     } catch (error) {
  //         console.error("Error al obtener el nuevo ID de factura:", error);
  //     }
  // };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setClientes(await fetchClientes());
        setEmpleados(await fetchEmpleados());
        setProductos(await fetchProductos());

        // Obtener la última factura y calcular el nuevo ID
        // await obtenerNuevoIdFactura();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const handleAgregarFactura = async () => {
    if (isCancelled) {
      alert(
        "La factura ha sido cancelada. No se guardará en la base de datos."
      );
      return;
    }

    try {
      const facturaFinal = {
        ...nuevaFactura,
        precio_total: nuevaFactura.precio_total, // Enviar precio_total a la base de datos
      };
      await addFactura(facturaFinal);
      // console.log(nuevaFactura);
      // const facturaAgregada = await addFactura(nuevaFactura);
      alert("Factura generada con éxito!");
      setNuevaFactura({
        cc_cliente: "",
        id_empleado: "",
        id_tienda: "",
        fecha: new Date().toISOString().split("T")[0],
        items: [],
        num_linea: 1,
        // total: 0,
        precio_total: 0, // Reiniciar el total
      });
    } catch (error) {
      console.error("Error al generar la factura:", error);
    }
  };

  const handleAgregarItem = () => {
    const productoSeleccionado = productos.find(
      (prod) => prod.id_producto === nuevoItem.id_producto
    );

    if (!productoSeleccionado) {
      alert("Seleccione un producto válido.");
      return;
    }

    // Validar que la cantidad no supere el stock disponible
    if (nuevoItem.cantidad > productoSeleccionado.stock) {
      alert(`Stock insuficiente. Disponible: ${productoSeleccionado.stock}`);
      return;
    }

    // Asignar num_linea a nuevo item
    const itemConNumeroLinea = {
      ...nuevoItem,
      num_linea: nuevaFactura.num_linea, // Asignar el número de línea actual
    };

    // Actualizar total sumando importe del nuevo item
    const nuevoTotal = nuevaFactura.precio_total + nuevoItem.importe;

    /*setNuevaFactura({ ...nuevaFactura, items: [...nuevaFactura.items, nuevoItem] });
        setNuevoItem({ id_producto: "", descripcion: "", precio: "", cantidad: "" });*/

    setNuevaFactura({
      ...nuevaFactura,
      items: [...nuevaFactura.items, itemConNumeroLinea],
      num_linea: nuevaFactura.num_linea + 1, // Incrementar el contador
      // total: nuevoTotal,
      precio_total: nuevoTotal, // Actualizar el total de la factura
    });

    // Resetear los campos del item
    setNuevoItem({
      id_producto: "",
      descripcion: "",
      precio: 0,
      cantidad: 1,
      importe: 0,
      id_tienda: "",
      num_linea: nuevaFactura.num_linea + 1, // Actualizar para el próximo item
    });
  };

  const handleCancelarFactura = () => {
    setIsCancelled(true);
    setNuevaFactura({
      cc_cliente: "",
      id_empleado: "",
      id_tienda: "",
      fecha: new Date().toISOString().split("T")[0],
      items: [],
      num_linea: 1, // Reiniciar el contador de num_linea
      // total: 0,
      precio_total: 0,
    });
    alert("Factura cancelada. No se guardará en la base de datos.");
  };

  const handleProductoChange = (e) => {
    const idProducto = e.target.value;
    const productoSeleccionado = productos.find(
      (prod) => prod.id_producto === idProducto
    );

    if (productoSeleccionado) {
      const nuevoImporte =
        productoSeleccionado.precio_producto * nuevoItem.cantidad;
      setNuevoItem({
        id_factura: nuevaFactura.id_factura,
        id_producto: idProducto,
        descripcion:
          productoSeleccionado.descripcion_producto || "Sin descripción",
        precio: productoSeleccionado.precio_producto || 0,
        cantidad: nuevoItem.cantidad || 1,
        importe: nuevoImporte, // Guardar el importe en la base de datos
        id_tienda: productoSeleccionado.id_tienda,
        num_linea: nuevaFactura.num_linea, // Asignar el num_linea actual
      });
    } else {
      setNuevoItem({
        id_producto: "",
        descripcion: "",
        precio: 0,
        cantidad: 1,
        importe: 0,
        num_linea: nuevaFactura.num_linea,
      });
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="sales-table-container">
      <h1 className="sales-title">Generar Factura</h1>
      <div className="form-container">
        <label className="custom-label">
          Factura
          <input
            type="text"
            value={nuevaFactura.id_factura}
            onChange={(e) =>
              setNuevaFactura({ ...nuevaFactura, id_factura: e.target.value })
            }
            placeholder="Ingrese ID de factura"
          />
        </label>
      </div>

      <div className="form-container">
        <label className="custom-label">Cliente:</label>
        <select
          className="custom-select"
          onChange={(e) =>
            setNuevaFactura({ ...nuevaFactura, cc_cliente: e.target.value })
          }
        >
          <option value="">Seleccione un Cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.cc_cliente} value={cliente.cc_cliente}>
              {cliente.cc_cliente}
            </option>
          ))}
        </select>

        <label className="custom-label">Empleado:</label>
        <select
          className="custom-select"
          onChange={(f) =>
            setNuevaFactura({
              ...nuevaFactura,
              id_empleado: f.target.value,
              id_tienda: empleados.find(
                (emp) => emp.id_empleado === f.target.value
              ).id_tienda,
            })
          }
        >
          <option value="">Seleccione un Empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id_empleado} value={empleado.id_empleado}>
              {empleado.id_empleado}
            </option>
          ))}
        </select>

        <label className="custom-label">Fecha:</label>
        <input
          type="date"
          value={nuevaFactura.fecha}
          onChange={(e) =>
            setNuevaFactura({ ...nuevaFactura, fecha: e.target.value })
          }
        />
      </div>

      <h3 className="sales-subtitle">Agregar Producto</h3>
      <div className="form-container">
        <label>ID Producto:</label>
        <select
          className="custom-select"
          value={nuevoItem.id_producto}
          onChange={handleProductoChange}
        >
          <option value="">Seleccione un Producto</option>
          {productos.map((producto) => (
            <option key={producto.id_producto} value={producto.id_producto}>
              {producto.id_producto}
            </option>
          ))}
        </select>

        <label>Descripción:</label>
        <input type="text" value={nuevoItem.descripcion} disabled />

        <label>Precio:</label>
        <input type="text" value={nuevoItem.precio} disabled />

        <label>Cantidad:</label>
        <input
          type="number"
          value={nuevoItem.cantidad}
          onChange={(e) => {
            const cantidad = parseInt(e.target.value) || 1;
            setNuevoItem((prev) => ({
              ...prev,
              cantidad,
              importe: prev.precio * cantidad,
            }));
          }}
        />
        <div className="cliente-modal-buttons">
          <button className="cliente-modal-add" onClick={handleAgregarItem}>
            Agregar Item
          </button>
        </div>
      </div>

      <h3 className="sales-subtitle">Items en la Factura</h3>
      <table className="sales-table">
        <thead>
          <tr>
            <th>N° Línea</th>
            <th>ID Producto</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          {nuevaFactura.items.map((item, index) => (
            <tr key={index}>
              <td>{item.num_linea}</td>
              <td>{item.id_producto}</td>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio.toFixed(2)}</td>
              <td>${item.importe.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total de la Factura: ${nuevaFactura.precio_total.toFixed(2)}</h2>

      <div className="cliente-modal-buttons">
        <button className="cliente-modal-save" onClick={handleAgregarFactura}>
          Generar Factura
        </button>
        <button
          className="cliente-modal-cancel"
          onClick={handleCancelarFactura}
        >
          Cancelar Factura
        </button>
      </div>
    </div>
  );
};

export default Facturacion;
