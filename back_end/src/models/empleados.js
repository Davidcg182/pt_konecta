import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const empleados = sequelize.define('empleados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    fecha_ingreso: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    salario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: false
});

export default empleados