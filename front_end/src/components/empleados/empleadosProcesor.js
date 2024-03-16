export async function getEmpleados(nombre) {
    let empleados;
    if (nombre) {
        empleados = await fetch(`http://localhost:3001/empleados/${nombre}`)
    } else {
        empleados = await fetch(`http://localhost:3001/empleados`)
    }
    if (empleados.ok) {
        const data = await empleados.json();
        return data;
    } else {
        throw new Error(`Error al obtener los empleados: ${empleados.status} - ${empleados.statusText}`);
    }
}


export async function createEmpleado(empleado) {

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleado)
    }

    try {
        const response = await fetch('http://localhost:3001/empleados', request);

        if (response.ok) {
            console.log('Empleado creado exitosamente');
        } else {
            throw new Error(`Error al crear empleado: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al crear empleado:', error);
        throw error;
    }

}

