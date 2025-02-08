import React, { useEffect, useState } from "react";
import { addCliente, fetchClientes } from "../services/clienteService";
import { fetchEmpleados } from "../services/empleadoService";
import { fetchProductos } from "../services/productoService";
import { addFactura, fetchFacturas } from "../services/facturaService";
import "../assets/css/components/Table.css";

const Facturacion = () => {
    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCancelled, setIsCancelled] = useState(false);

    const [nuevaFactura, setNuevaFactura] = useState({
        id_factura: "F203",
        cc_cliente: "",
        id_empleado: "",
        id_tienda: "",
        fecha: new Date().toISOString().split("T")[0],
        precio_total: "0.0",
        items: []
    });

    const [nuevoItem, setNuevoItem] = useState({
        id_factura: "",
        id_producto: "",
        descripcion: "",
        precio: 0,
        cantidad: 1,
        importe:"",
        id_tienda: "",
        num_linea: ""
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setClientes(await fetchClientes());
                setEmpleados(await fetchEmpleados());
                setProductos(await fetchProductos());
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
            alert("La factura ha sido cancelada. No se guardará en la base de datos.");
            return;
        }

        try {
            console.log(nuevaFactura);
            const facturaAgregada = await addFactura(nuevaFactura);
            alert("Factura generada con éxito!");
            setNuevaFactura({
                cc_cliente: "",
                id_empleado: "",
                id_tienda: "",
                fecha: new Date().toISOString().split("T")[0],
                items: []
            });
        } catch (error) {
            console.error("Error al generar la factura:", error);
        }
    };
    

    const handleAgregarItem = () => {
        const productoSeleccionado = productos.find(prod => prod.id_producto === nuevoItem.id_producto);
        
        if (!productoSeleccionado) {
            alert("Seleccione un producto válido.");
            return;
        }
    
        // Validar que la cantidad no supere el stock disponible
        if (nuevoItem.cantidad > productoSeleccionado.stock) {
            alert(`Stock insuficiente. Disponible: ${productoSeleccionado.stock}`);
            return;
        }
    
        setNuevaFactura({ ...nuevaFactura, items: [...nuevaFactura.items, nuevoItem] });
        setNuevoItem({ id_producto: "", descripcion: "", precio: "", cantidad: "" });

    };

    const handleCancelarFactura = () => {
        setIsCancelled(true);
        setNuevaFactura({
            cc_cliente: "",
            id_empleado: "",
            id_tienda: "",
            fecha: new Date().toISOString().split("T")[0],
            items: []
        });
        alert("Factura cancelada. No se guardará en la base de datos.");
    };

    const handleProductoChange = (e) => {
        const idProducto = e.target.value;
        const productoSeleccionado = productos.find(prod => prod.id_producto === idProducto);

        if (productoSeleccionado) {
            setNuevoItem({
                id_factura: nuevaFactura.id_factura,
                id_producto: idProducto,
                descripcion: productoSeleccionado.descripcion_producto || "Sin descripción",
                precio: productoSeleccionado.precio_producto || 0,
                cantidad: nuevoItem.cantidad || 1,
                importe:"101010",
                id_tienda: "001",
                num_linea: "100"
            });
        } else {
            setNuevoItem({
                id_producto: "",
                descripcion: "",
                precio: 0,
                cantidad: 1
            });
        }
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <div className="sales-table-container">
            <h1 className="sales-title">Generar Factura</h1>
            <div className="form-container">
                <label>Cliente:</label>
                <select onChange={(e) => setNuevaFactura({ ...nuevaFactura, cc_cliente: e.target.value })}>
                    console.log(e.target.value)
                    <option value="">Seleccione un Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.cc_cliente} value={cliente.cc_cliente}>{cliente.cc_cliente}</option>
                    ))}
                </select>
                <label>Empleado:</label>
                <select onChange={(f) => setNuevaFactura({ ...nuevaFactura, id_empleado: f.target.value })}>
                    <option value="">Seleccione un Empleado</option>
                    {empleados.map(empleado => (
                        <option key={empleado.id_empleado} value={empleado.id_empleado}>{empleado.id_empleado}</option>
                    ))}
                </select>
                <label>ID Tienda:</label>
                <input type="text" onChange={(e) => setNuevaFactura({ ...nuevaFactura, id_tienda: e.target.value })} />
                <label>Fecha:</label>
                <input type="date" value={nuevaFactura.fecha} onChange={(e) => setNuevaFactura({ ...nuevaFactura, fecha: e.target.value })} />
            </div>

            <h2 className="sales-subtitle">Agregar Producto</h2>
            <div className="form-container">
                <label>ID Producto:</label>
                <select value={nuevoItem.id_producto} onChange={handleProductoChange}>
                    <option value="">Seleccione un Producto</option>
                    {productos.map(producto => (
                        <option key={producto.id_producto} value={producto.id_producto}>{producto.id_producto}</option>
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
                    onChange={(e) => setNuevoItem({ ...nuevoItem, cantidad: parseInt(e.target.value) || 1 })}
                />
                <button className="action-buttonT" onClick={handleAgregarItem}>Agregar Item</button>
            </div>

            <h3 className="sales-subtitle">Items en la Factura</h3>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>ID Producto</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {nuevaFactura.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id_producto}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.precio}</td>
                            <td>{item.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="action-buttonT" onClick={handleAgregarFactura}>Generar Factura</button>
            <button className="action-buttonT" onClick={handleCancelarFactura}>Cancelar Factura</button>
        </div>
    );
};

export default Facturacion;