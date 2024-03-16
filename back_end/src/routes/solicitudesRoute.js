import express from 'express';
import moduleSolicitudes from '../models/solicitudes.js';
import moduleEmpleados from '../models/empleados.js'

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        let solicitudes = await moduleSolicitudes.findAll();

        solicitudes = await Promise.all(solicitudes.map(async solicitud => {
            const idEmpleado = solicitud.id_empleado
            const empleado = await moduleEmpleados.findOne({ where: { id: idEmpleado } });
            return { ...solicitud.toJSON(), empleado: empleado }
        }))

        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).send({ error: error })
    }
});


route.post('/', async (req, res) => {
    try {

        const { codigo, descripcion, resumen, id_empleado } = req.body;

        const nuevaSolicitud = await moduleSolicitudes.create({
            codigo: codigo,
            descripcion: descripcion,
            resumen: resumen,
            id_empleado: id_empleado
        });

        res.status(201).json(nuevaSolicitud);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const solicitud = await moduleSolicitudes.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({ error: 'El id proporcionado no se encuentra en la tabla solicitudes' });
        }
        await solicitud.destroy();
        res.status(200).json({ mensaje: 'Solicitud eliminada exitosamente.' });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


export default route
