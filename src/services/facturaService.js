export const fetchFacturas = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/facturas");
        if (!response.ok) throw new Error("Error al obtener facturas");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const addFactura = async (nuevaFactura) => {
    try {
        const response = await fetch("http://localhost:5000/api/facturas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaFactura),
        });
        if (!response.ok) throw new Error("Error al agregar factura");
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const fetchClienteById = async (cc_cliente) => {
    try {
        const response = await fetch(`http://localhost:5000/api/clientes/${cc_cliente}`);
        if (!response.ok) throw new Error("No se pudo obtener el cliente");
        return await response.json();
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        return null;
    }
};
