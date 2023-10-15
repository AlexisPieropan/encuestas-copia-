import Server from "./models/server";
import dotenv from 'dotenv'

// Importa el modelo
import Pregunta from './models/pregunta';
import  Encuesta  from './models/encuesta';

// Configuramos las variables de ambiente
dotenv.config();

const server = new Server();



// Sincroniza el modelo "pregunta" con la base de datos y establece la relacion 
Pregunta.sync()
  .then(() => {
    console.log('Tabla Pregunta sincronizada con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Pregunta:', error);
  });

  //relacion de preg hacia el modelo Encuesta (de esta manera genera automaticamente un campo con nombre)
  Pregunta.belongsTo(Encuesta);