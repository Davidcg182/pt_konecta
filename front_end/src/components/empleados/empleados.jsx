import { getEmpleados, createEmpleado } from "./empleadosProcesor";
import React, { useEffect, useState } from 'react';

const Empleados = () => {

    const [empleados, setEmpleados] = useState([]);
    const [copieEmpleados, setCopieEmpleados] = useState([])
    const [nombre, setNombre] = useState('');
    const [nuevoEmpleado, setNuevoEmpleado] = useState({})


    useEffect(() => {
        async function getEmp() {
            const empl = await getEmpleados();
            setEmpleados(empl)
            setCopieEmpleados(empl)
        }

        getEmp()

        const crearEmpleado = async () => {
            try {
                await createEmpleado(nuevoEmpleado);
            } catch (error) {
                console.error('Error al crear empleado:', error);
            }
        };
        if (nuevoEmpleado.fecha_ingreso) {
            crearEmpleado();
        }

    }, [nuevoEmpleado])

    const handleOnClick = async (event) => {
        event.preventDefault();
        try {
            const searchResult = copieEmpleados.filter(empleado => empleado.nombre.toUpperCase().includes(nombre.toUpperCase()));
            setEmpleados(searchResult)
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const date = new Date().toISOString();
        setNuevoEmpleado({
            ...nuevoEmpleado,
            fecha_ingreso: date
        });
    }

    return (
        <div>
            <h1>Buscar empleados por nombre</h1>
            <input
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Ingrese el nombre del empleado"
            />
            <button type="submit" onClick={e => handleOnClick(e)}> Buscar </button>
            <div >

                {empleados.map(e => {
                    return (
                        <ul key={e.id}>
                            <li>Nombre: {e.nombre}</li>
                            <li>Fecha de ingreso: {e.fecha_ingreso}</li>
                            <li>Salario: {e.salario}</li>
                        </ul>
                    )
                })}

            </div>


            <div>
                <h3>Agrega un nuevo empleado</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="nombre"
                        value={nuevoEmpleado.nombre || ''}
                        onChange={(event) => setNuevoEmpleado({
                            ...nuevoEmpleado,
                            nombre: event.target.value
                        })}
                        placeholder="Ingrese el nombre del empleado"
                    />
                    <input
                        type="number"
                        id="salario"
                        value={nuevoEmpleado.salario || ''}
                        onChange={(event) => setNuevoEmpleado({
                            ...nuevoEmpleado,
                            salario: event.target.value
                        })}
                        placeholder="Ingrese el salario del empleado"
                    />
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );

}


export default Empleados