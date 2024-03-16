import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'

const Home = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '5%'}}>Bienvenidos al gestor de solicitudes y empleados de Konecta</h1>

            <div className='button_container'>
                <Link to='/empleados'>
                    <button className='button'>Gestion empleados</button>
                </Link>
                <Link to='/solicitudes'>
                    <button className='button'>Gestion solicitudes</button>
                </Link>
            </div>
        </div>
    )
}

export default Home