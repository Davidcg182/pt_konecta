export async function getSolicitudes() {
    let solicitudes = await fetch(`http://localhost:3001/solicitudes`)
    if (solicitudes.ok) {
        const data = await solicitudes.json();
        return data;
    } else {
        throw new Error(`Error al obtener los solicitudes: ${solicitudes.status} - ${solicitudes.statusText}`);
    }
}


export async function createSolicitud(solicitud) {

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitud)
    }

    try {
        const response = await fetch('http://localhost:3001/solicitudes', request);

        if (response.ok) {
            console.log('Solicitud creada exitosamente');
        } else {
            throw new Error(`Error al crear solicitud: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        throw error;
    }

}

export async function deleteSolicitud(id) {

    const request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        const response = await fetch(`http://localhost:3001/solicitudes/${id}`, request);

        if (response.ok) {
            console.log('Solicitud eliminada exitosamente');
        } else {
            throw new Error(`Error eliminando la solicitud: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        throw error;
    }

}

