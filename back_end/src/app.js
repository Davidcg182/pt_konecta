import express from 'express';
import userRoutes from './routes/empleadosRoutes.js';
import solicitudesRoute from './routes/solicitudesRoute.js'

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());
// app.use(setSecurityHeaders);
// app.use(setCorsHeaders);


app.use('/empleados', userRoutes);
app.use('/solicitudes', solicitudesRoute);

export default app;