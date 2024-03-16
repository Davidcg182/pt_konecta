import React from 'react';
import Empleados from './empleados/empleados';
import Solicitudes from './solicitudes/solicitudes';

const Home = () => {
    return (
        <div>
            <Empleados />
            <hr />
            <hr />
            <Solicitudes />
        </div>
    )
}

export default Home