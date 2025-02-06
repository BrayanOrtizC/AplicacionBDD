export const fetchClientes = async () => {
    try {
      console.log('Haciendo solicitud a la API...');
      const response = await fetch('http://localhost:5000/api/clientes'); // Ajusta la URL si es necesario
      console.log('Respuesta de la API:', response);
  
      if (!response.ok) {
        throw new Error(`Error al obtener los clientes: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Clientes obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
      throw new Error('Error al obtener los clientes');
    }
  };

  export const deleteCliente = async (cc_cliente) => {
    try {
      console.log('Iniciando solicitud de eliminación del cliente...');
      const response = await fetch(`http://localhost:5000/api/clientes/${cc_cliente}`, {
        method: 'DELETE',
      });
  
      console.log('Respuesta de la API para eliminación:', response);
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el cliente: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Cliente eliminado:', data);
      return data; // Opcional: puedes devolver algún mensaje o los datos del cliente eliminado.
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      throw new Error('Error al eliminar el cliente');
    }
  };

  export const updateCliente = async (cc_cliente, updatedData) => {
    try {
      console.log('Iniciando solicitud de actualización del cliente...');
      console.log("Cliente ID a actualizar:", cc_cliente); // Depuración

      const response = await fetch(`http://localhost:5000/api/clientes/${cc_cliente}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      console.log('Respuesta de la API para actualización:', response);
  
      if (!response.ok) {
        throw new Error(`Error al actualizar el cliente: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Cliente actualizado:', data);
      return data; // Opcional: puedes devolver algún mensaje o los datos del cliente actualizado.
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      throw new Error('Error al actualizar el cliente');
    }
  };
  
  export const addCliente = async (newCliente) => {
    try {
      console.log('Iniciando solicitud para agregar un cliente...');
      const response = await fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCliente),
      });
  
      console.log('Respuesta de la API para agregar:', response);
  
      if (!response.ok) {
        throw new Error(`Error al agregar el cliente: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Cliente agregado:', data);
      return data;
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
      throw new Error('Error al agregar el cliente');
    }
  };
  

  