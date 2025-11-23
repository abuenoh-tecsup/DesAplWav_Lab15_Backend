require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
require('./models'); // Importa y registra TODOS los modelos
const seedRoles = require('./utils/seedRoles');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        // 1. Conectar a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida');

        // 2. Sincronizar modelos (crea o actualiza tablas)
        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados');

        // 3. Ejecutar el seed de roles si no existen
        await seedRoles();

        // 4. Iniciar servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();
