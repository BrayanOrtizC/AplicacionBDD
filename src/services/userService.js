export const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users'); // Ajusta la URL según tu backend
    if (!response.ok) {
      throw new Error('Error al obtener los datos de usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
