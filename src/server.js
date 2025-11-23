const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        // 1. Autenticación/Conexión a la DB
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');

        // 2. Sincronización de modelos (crea tablas si no existen)
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados');

        // 3. Inicio del servidor Express
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();