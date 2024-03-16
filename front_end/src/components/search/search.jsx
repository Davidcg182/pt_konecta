import React from "react";
import { useState } from "react";
import './search.css'

export default function Search({ setData, copieData, errorMessage }) {

    const [nombre, setNombre] = useState('');

    const searchUser = async (event) => {
        event.preventDefault();
        try {
            setNombre(event.target.value);
            const searchResult = copieData.filter(item => {

                if (item.nombre) {
                    return item.nombre.toUpperCase().includes(event.target.value.toUpperCase())
                }
                return item.empleado.nombre.toUpperCase().includes(event.target.value.toUpperCase())
            });

            if (event.target.value === '') {
                return setData(copieData)
            }

            if (searchResult.length === 0) {
                return setData([])
            };

            setData(searchResult)
        } catch (error) {
            console.error(errorMessage, error);
        }
    };

    return (
        <div className="content_search">
            <input
                className="content_input_search"
                type="text"
                value={nombre}
                onChange={(event) => searchUser(event)}
                placeholder="Buscar..."
            />
        </div>
    )
}