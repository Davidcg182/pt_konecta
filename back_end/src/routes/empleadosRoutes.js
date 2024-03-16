import express from 'express';
import modelEmpleados from '../models/empleados.js'

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const {nombre} = req.query
        let empleados = await modelEmpleados.findAll();

        if (nombre) {
            empleados = empleados.filter(empleado => empleado.nombre.toUpperCase().includes(nombre.toUpperCase()))   
        }
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).send({ error: error })
    }
});

route.post('/', async (req, res) => {
    try {

        const { nombre, fecha_ingreso, salario } = req.body;

        const nuevoEmpleado = await modelEmpleados.create({
            nombre: nombre,
            fecha_ingreso: fecha_ingreso,
            salario: salario
        });

        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


export default route