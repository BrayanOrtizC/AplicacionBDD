export const fetchProductos = async () => {
    try {
      console.log('Haciendo solicitud a la API para obtener productos...');
      const response = await fetch('http://localhost:5000/api/productos'); // Ajusta la URL si es necesario
      console.log('Respuesta de la API:', response);
  
      if (!response.ok) {
        throw new Error(`Error al obtener los productos: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Productos obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      throw new Error('Error al obtener los productos');
    }
  };
  
  export const deleteProducto = async (id_producto) => {
    try {
      console.log('Iniciando solicitud de eliminación del producto...');
      const response = await fetch(`http://localhost:5000/api/productos/${id_producto}`, {
        method: 'DELETE',
      });
  
      console.log('Respuesta de la API para eliminación:', response);
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el producto: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Producto eliminado:', data);
      return data; // Opcional: puedes devolver algún mensaje o los datos del producto eliminado.
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new Error('Error al eliminar el producto');
    }
  };
  
  export const updateProducto = async (id_producto, updatedData) => {
    try {
      console.log('Iniciando solicitud de actualización del producto...');
      console.log("Producto ID a actualizar:", id_producto); // Depuración
  
      const response = await fetch(`http://localhost:5000/api/productos/${id_producto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      console.log('Respuesta de la API para actualización:', response);
  
      if (!response.ok) {
        throw new Error(`Error al actualizar el producto: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Producto actualizado:', data);
      return data; // Opcional: puedes devolver algún mensaje o los datos del producto actualizado.
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw new Error('Error al actualizar el producto');
    }
  };
  
  export const addProducto = async (newProducto) => {
    try {
      console.log('Iniciando solicitud para agregar un producto...');
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProducto),
      });
  
      console.log('Respuesta de la API para agregar:', response);
  
      if (!response.ok) {
        throw new Error(`Error al agregar el producto: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Producto agregado:', data);
      return data;
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      throw new Error('Error al agregar el producto');
    }
  };