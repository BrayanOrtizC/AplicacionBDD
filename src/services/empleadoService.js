export const fetchEmpleados = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/empleados');
      if (!response.ok) {
        throw new Error(`Error al obtener los empleados: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al cargar los empleados:', error);
      throw error;
    }
  };
  
  export const deleteEmpleado = async (id_empleado) => {
    try {
      const response = await fetch(`http://localhost:5000/api/empleados/${id_empleado}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el empleado: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
      throw error;
    }
  };
  
  export const updateEmpleado = async (id_empleado, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/empleados/${id_empleado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar el empleado: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar el empleado:', error);
      throw error;
    }
  };
  
  export const addEmpleado = async (newEmpleado) => {
    try {
      const response = await fetch('http://localhost:5000/api/empleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmpleado),
      });
      if (!response.ok) {
        throw new Error(`Error al agregar el empleado: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al agregar el empleado:', error);
      throw error;
    }
  };