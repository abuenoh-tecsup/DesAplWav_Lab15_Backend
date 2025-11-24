require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
require('./models');

const seedRoles = require('./utils/seedRoles');
const seedCategories = require('./utils/seedCategories');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida');

        // Sincronizar modelos (crea o actualiza tablas)
        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados');

        // Ejecutar seed de roles
        await seedRoles();
        await seedCategories();

        // Iniciar servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();
