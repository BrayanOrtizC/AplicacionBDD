export const fetchProveedores = async () => {
    try {
      console.log('Haciendo solicitud a la API de proveedores...');
      const response = await fetch('http://localhost:5000/api/proveedores'); // Ajusta la URL si es necesario
      console.log('Respuesta de la API:', response);
  
      if (!response.ok) {
        throw new Error(`Error al obtener los proveedores: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Proveedores obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error al cargar los proveedores:', error);
      throw new Error('Error al obtener los proveedores');
    }
  };

export const deleteProveedor = async (id_proveedor) => {
    try {
      console.log('Iniciando solicitud de eliminación del proveedor...');
      const response = await fetch(`http://localhost:5000/api/proveedores/${id_proveedor}`, {
        method: 'DELETE',
      });
  
      console.log('Respuesta de la API para eliminación:', response);
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el proveedor: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Proveedor eliminado:', data);
      return data;
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
      throw new Error('Error al eliminar el proveedor');
    }
  };

export const updateProveedor = async (id_proveedor, updatedData) => {
    try {
      console.log('Iniciando solicitud de actualización del proveedor...');
      console.log("Proveedor ID a actualizar:", id_proveedor);

      const response = await fetch(`http://localhost:5000/api/proveedores/${id_proveedor}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      console.log('Respuesta de la API para actualización:', response);
  
      if (!response.ok) {
        throw new Error(`Error al actualizar el proveedor: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Proveedor actualizado:', data);
      return data;
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      throw new Error('Error al actualizar el proveedor');
    }
  };
  
export const addProveedor = async (newProveedor) => {
    try {
      console.log('Iniciando solicitud para agregar un proveedor...');
      const response = await fetch('http://localhost:5000/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProveedor),
      });
  
      console.log('Respuesta de la API para agregar:', response);
  
      if (!response.ok) {
        throw new Error(`Error al agregar el proveedor: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Proveedor agregado:', data);
      return data;
    } catch (error) {
      console.error('Error al agregar el proveedor:', error);
      throw new Error('Error al agregar el proveedor');
    }
  };
