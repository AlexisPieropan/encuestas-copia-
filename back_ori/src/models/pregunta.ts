import { Sequelize, DataTypes } from 'sequelize';
import db from '../db/connection';

import  Encuesta  from '../models/encuesta';

// Define el modelo
const Pregunta = db.define('Pregunta', {
  texto: {
    type: DataTypes.STRING
  },
  tipo: {
    type: DataTypes.STRING
  },
  tipoResp: {
    type: DataTypes.STRING
  }
}, {
  // Opciones adicionales
  createdAt: false,
  updatedAt: false
});


export default Pregunta;