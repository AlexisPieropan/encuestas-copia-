import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('minacla', 'root', 'El+Incredulo1', {
    host: 'localhost',
    dialect: 'mysql'
    
  });


  // FUNCION que Sincroniza los modelos con la base de datos y crea la base de datos si no existe
  (async () => {
    try {
      await sequelize.sync({ alter: true }); 
      console.log('Tablas sincronizadas y base de datos creada si no existía.');
    } catch (error) {
      console.error('Error al sincronizar las tablas:', error);
    }
  })();



  
  export default sequelize;