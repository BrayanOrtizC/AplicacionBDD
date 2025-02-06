import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/userService';
import '../components/table/Table.css'; // Importar el CSS

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSales = async () => {
      try {
        const data = await fetchUsers();
        setSales(data);
      } catch (error) {
        console.error("Error al cargar las ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSales();
  }, []);

  if (loading) return <p>Cargando ventas...</p>;

  return (
    <div className="sales-table-container">
      <h1 className="sales-title">Tabla de Ventas</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID Factura</th>
            <th>ID Cliente</th>
            <th>ID Empleado</th>
            <th>Fecha Venta</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale.id_factura || index}>
              <td>{sale.id_factura}</td>
              <td>{sale.id_cliente}</td>
              <td>{sale.id_empleado}</td>
              <td>{new Date(sale.fecha_venta).toLocaleString()}</td>
              <td>{sale.precio_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
