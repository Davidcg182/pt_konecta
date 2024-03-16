import React, { useEffect, useState } from 'react';
import { getSolicitudes, createSolicitud, deleteSolicitud } from './solicitudesProcesor.js';
import { getEmpleados } from '../empleados/empleadosProcesor';
import Search from '../search/search.jsx';
import './solicitudes.css'

const Solicitudes = () => {

    const [solicitudes, setSolicitudes] = useState([]);
    const [copieSolicitudes, setCopieSolicitudes] = useState([])
    const [nuevaSolicitud, setNuevaSolicitud] = useState({})
    const [empleados, setEmpleados] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [actualizar, setActualizar] = useState(false)


    useEffect(() => {
        async function getSol() {
            const solicit = await getSolicitudes();
            const empl = await getEmpleados();
            setEmpleados(empl)
            setSolicitudes(solicit)
            setCopieSolicitudes(solicit)
        }

        getSol()

    }, [actualizar])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const solicitud = {
            ...nuevaSolicitud,
            id_empleado: selectedOption
        };

        try {
            await createSolicitud(solicitud)
            setActualizar(!actualizar)
            setNuevaSolicitud({})
        } catch (error) {
            console.error('Error al crear Solicitud:', error);
        };
    }

    const handleSelectChange = (event) => {
        event.preventDefault();
        setSelectedOption(event.target.value);
    };

    const eliminarSolicitud = async (event) => {
        event.preventDefault();

        try {
            await deleteSolicitud(event.target.value)
            setActualizar(!actualizar)
        } catch (error) {
            console.error('Error al eliminar Solicitud:', error);
        };
    }

    function handleOnChange(event) {
        setNuevaSolicitud({
            ...nuevaSolicitud,
            [event.target.name]: event.target.value
        })
    };

    return (
        <div>
            <h1>Buscar solicitudes por empleado</h1>

            <Search
                errorMessage={'Error filtrando solicitudes'}
                setData={setSolicitudes}
                copieData={copieSolicitudes}
            />

            <div >

                {solicitudes.map(e => {
                    return (
                        <div key={e.id} className='flex'>
                            <ul className='card'>
                                <li>Resumen: {e.resumen}</li>
                                <li>Descripcion: {e.descripcion}</li>
                                <li>Empleado: {e.empleado.nombre}</li>
                                <li>Codigo: {e.codigo}</li>
                            </ul>
                            <button className='detele_button' value={e.id} onClick={e => eliminarSolicitud(e)}>X</button>
                        </div>
                    )
                })}
            </div>

            <div>
                <h3 style={{textAlign: 'center'}}>Crea una nueva solicitud</h3>
                <form onSubmit={handleSubmit} className='content_form'>
                    <input
                        className='inputs'
                        type="text"
                        id="descripcion"
                        name='descripcion'
                        value={nuevaSolicitud.descripcion || ''}
                        onChange={(event) => handleOnChange(event)}
                        placeholder="Ingrese descripcion"
                    />
                    <input
                        className='inputs'
                        type="text"
                        id="resumen"
                        name='resumen'
                        value={nuevaSolicitud.resumen || ''}
                        onChange={(event) => handleOnChange(event)}
                        placeholder="Ingrese resumen"
                    />
                    <input
                        className='inputs'
                        type="text"
                        id="codigo"
                        name='codigo'
                        value={nuevaSolicitud.codigo || ''}
                        onChange={(event) => handleOnChange(event)}
                        placeholder="Ingrese codigo"
                    />
                    <select className='select' value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Selecciona una opción</option>
                        {empleados.map(empleado => {
                            return (
                                <option key={empleado.id} value={empleado.id}>{empleado.nombre}</option>
                            )
                        })}
                    </select>
                    <button className= 'create_solicitud' type="submit">Crear</button>
                </form>
            </div>
        </div>
    );

}


export default Solicitudes