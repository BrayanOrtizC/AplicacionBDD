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
  