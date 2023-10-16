import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Encuesta = db.define('Encuesta', {
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    preg1: {
        type: DataTypes.STRING
    },
    preg2: {
        type: DataTypes.STRING
    },
    preg3: {
        type: DataTypes.STRING
    },
    preg4: {
        type: DataTypes.STRING
    },
    preg5: {
        type: DataTypes.STRING
    },
    preg6: {
        type: DataTypes.STRING
    },
    preg7: {
        type: DataTypes.STRING
    },
    preg8: {
        type: DataTypes.STRING
    },
    preg9: {
        type: DataTypes.STRING
    },
    preg10: {
        type: DataTypes.STRING
    }
    
}, {
    createdAt: false,
    updatedAt: false
});



export default Encuesta;