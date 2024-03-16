import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import empleados from "./empleados.js";

const solicitudes = sequelize.define('solicitudes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    resumen: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: empleados,
            key: 'id'
        }
    },
}, {
    timestamps: false
});

export default solicitudes