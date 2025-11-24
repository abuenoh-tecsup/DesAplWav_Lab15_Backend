const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');

const app = express();

const allowedOrigins = [
    'http://localhost:3000',                     
    'https://des-apl-wav-lab15-frontend.vercel.app',
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log('CORS bloqueado para:', origin);
                callback(new Error('No permitido por CORS'));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ message: 'API E-commerce funcionando' });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;