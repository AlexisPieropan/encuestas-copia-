import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Pregunta from './pregunta';

const Encuesta = db.define('Encuesta', {
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    cantPreg: {
        type: DataTypes.INTEGER
    }
}, {
    createdAt: false,
    updatedAt: false
});

//SE INDICA QUE UNA ENCUESTA TIENE VARIAS PREGUNTAS
Encuesta.hasMany(Pregunta);

export default Encuesta;