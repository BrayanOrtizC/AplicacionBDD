export const fetchItems = async () => {
    try {
      console.log('Haciendo solicitud a la API...');
      const response = await fetch('http://localhost:5000/api/items'); // Ajusta la URL si es necesario
      console.log('Respuesta de la API:', response);
  
      if (!response.ok) {
        throw new Error(`Error al obtener los items: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Items obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error al cargar los items:', error);
      throw new Error('Error al obtener los items');
    }
  };

  export const deleteItem = async (id_item) => {
    try {
      console.log('Iniciando solicitud de eliminación del item...');
      const response = await fetch(`http://localhost:5000/api/items/${id_item}`, {
        method: 'DELETE',
      });
  
      console.log('Respuesta de la API para eliminación:', response);
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el item: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Item eliminado:', data);
      return data;
    } catch (error) {
      console.error('Error al eliminar el item:', error);
      throw new Error('Error al eliminar el item');
    }
  };

  export const updateItem = async (id_item, updatedData) => {
    try {
      console.log('Iniciando solicitud de actualización del item...');
      console.log("Item ID a actualizar:", id_item);

      const response = await fetch(`http://localhost:5000/api/items/${id_item}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      console.log('Respuesta de la API para actualización:', response);
  
      if (!response.ok) {
        throw new Error(`Error al actualizar el item: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Item actualizado:', data);
      return data;
    } catch (error) {
      console.error('Error al actualizar el item:', error);
      throw new Error('Error al actualizar el item');
    }
  };
  
  export const addItem = async (newItem) => {
    try {
      console.log('Iniciando solicitud para agregar un item...');
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
  
      console.log('Respuesta de la API para agregar:', response);
  
      if (!response.ok) {
        throw new Error(`Error al agregar el item: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Item agregado:', data);
      return data;
    } catch (error) {
      console.error('Error al agregar el item:', error);
      throw new Error('Error al agregar el item');
    }
  };
