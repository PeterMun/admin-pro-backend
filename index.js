const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config')

//crear el server de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// base de datos
dbConnection();


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));





app.listen(process.env.PORT, () => {
    console.log('Server corriendo en puerto: ' + process.env.PORT);
})