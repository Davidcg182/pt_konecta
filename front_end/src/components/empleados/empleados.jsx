import { getEmpleados, createEmpleado } from "./empleadosProcesor";
import React, { useEffect, useState } from 'react';
import Search from "../search/search";
import './empleados.css';

const Empleados = () => {

    const [empleados, setEmpleados] = useState([]);
    const [copieEmpleados, setCopieEmpleados] = useState([])
    const [nuevoEmpleado, setNuevoEmpleado] = useState({})
    const [actualizar, setActualizar] = useState(false)


    useEffect(() => {
        async function getEmp() {
            const empl = await getEmpleados();
            setEmpleados(empl)
            setCopieEmpleados(empl)
        }
        getEmp()
    }, [actualizar]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const date = new Date().toISOString();
        const dataEmpleado = {
            ...nuevoEmpleado,
            fecha_ingreso: date
        }
        try {
            await createEmpleado(dataEmpleado);
            setActualizar(!actualizar)
            setNuevoEmpleado({})
        } catch (error) {
            console.error('Error al crear empleado:', error);
        };

    };


    function handleOnChange(event) {
        setNuevoEmpleado({
            ...nuevoEmpleado,
            [event.target.name]: event.target.value
        })
    };

    return (
        <div>
            <h1>Buscar empleados por nombre</h1>
            <Search
                errorMessage={'Error filtrando empleados'}
                setData={setEmpleados}
                copieData={copieEmpleados}
            />
            <div className="flex">

                {empleados.map(e => {
                    return (
                        <ul key={e.id} className="card">
                            <li>Nombre: {e.nombre}</li>
                            <li>Fecha de ingreso: {e.fecha_ingreso}</li>
                            <li>Salario: {e.salario}</li>
                        </ul>
                    )
                })}

            </div>


            <div>
                <h3 style={{ textAlign: 'center' }}>Agrega un nuevo empleado</h3>
                <form onSubmit={handleSubmit} className='content_form'>
                    <input
                        className='inputs'
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nuevoEmpleado.nombre || ''}
                        onChange={e => handleOnChange(e)}
                        placeholder="Nombre del empleado"
                    />
                    <input
                        className='inputs'
                        type="number"
                        id="salario"
                        name="salario"
                        value={nuevoEmpleado.salario || ''}
                        onChange={e => handleOnChange(e)}
                        placeholder="Salario del empleado"
                    />
                    <button className='create_solicitud' type="submit">Crear</button>
                </form>
            </div>
        </div>
    );

}


export default Empleados