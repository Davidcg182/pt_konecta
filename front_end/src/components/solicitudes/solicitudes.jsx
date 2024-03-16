import React, { useEffect, useState } from 'react';
import { getSolicitudes, createSolicitud, deleteSolicitud } from './solicitudesProcesor.js';
import { getEmpleados } from '../empleados/empleadosProcesor';

const Solicitudes = () => {

    const [solicitudes, setSolicitudes] = useState([]);
    const [copieSolicitudes, setCopieSolicitudes] = useState([])
    const [nombre, setNombre] = useState('');
    const [nuevaSolicitud, setNuevaSolicitud] = useState({})
    const [empleados, setEmpleados] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');



    useEffect(() => {
        async function getSol() {
            const solicit = await getSolicitudes();
            const empl = await getEmpleados();
            setEmpleados(empl)
            setSolicitudes(solicit)
            setCopieSolicitudes(solicit)
        }

        getSol()

        const crearSolicitud = async () => {
            try {
                await createSolicitud(nuevaSolicitud);
            } catch (error) {
                console.error('Error al crear empleado:', error);
            }
        };
        if (nuevaSolicitud.id_empleado) {
            crearSolicitud();
        }

    }, [nuevaSolicitud])

    const handleOnClick = async (event) => {
        event.preventDefault();
        try {
            const searchResult = copieSolicitudes.filter(solicitud => solicitud.empleado.nombre.toUpperCase().includes(nombre.toUpperCase()));
            setSolicitudes(searchResult)
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setNuevaSolicitud({
            ...nuevaSolicitud,
            id_empleado: selectedOption
        });
    }

    const handleSelectChange = (event) => {
        event.preventDefault();
        setSelectedOption(event.target.value);
    };

    const eliminarSolicitud = async (event) => {
        event.preventDefault();
        await deleteSolicitud(event.target.value)
    }

    return (
        <div>
            <h1>Buscar solicitudes por empleado</h1>
            <input
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Ingrese el nombre del empleado"
            />
            <button type="submit" onClick={e => handleOnClick(e)}> Buscar </button>
            <div >

                {solicitudes.map(e => {
                    return (
                        <div key={e.id}>
                            <ul>
                                <li>Resumen: {e.resumen}</li>
                                <li>Descripcion: {e.descripcion}</li>
                                <li>Empleado: {e.empleado.nombre}</li>
                                <li>Codigo: {e.codigo}</li>
                            </ul>
                            <button value={e.id} onClick={e => eliminarSolicitud(e)}>X</button>
                        </div>
                    )
                })}

            </div>


            <div>
                <h3>Crea una nueva solicitud</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="descripcion"
                        value={nuevaSolicitud.descripcion || ''}
                        onChange={(event) => setNuevaSolicitud({
                            ...nuevaSolicitud,
                            descripcion: event.target.value
                        })}
                        placeholder="Ingrese descripcion"
                    />
                    <input
                        type="text"
                        id="resumen"
                        value={nuevaSolicitud.resumen || ''}
                        onChange={(event) => setNuevaSolicitud({
                            ...nuevaSolicitud,
                            resumen: event.target.value
                        })}
                        placeholder="Ingrese resumen"
                    />
                    <input
                        type="text"
                        id="codigo"
                        value={nuevaSolicitud.codigo || ''}
                        onChange={(event) => setNuevaSolicitud({
                            ...nuevaSolicitud,
                            codigo: event.target.value
                        })}
                        placeholder="Ingrese codigo"
                    />
                    <select value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Selecciona una opción</option>
                        {empleados.map(empleado => {
                            return (
                                <option key={empleado.id} value={empleado.id}>{empleado.nombre}</option>
                            )
                        })}
                    </select>
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );

}


export default Solicitudes