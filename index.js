const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config')

//crear el server de express
const app = express();

// Configurar CORS
app.use(cors());

// base de datos
dbConnection();


// Rutas
app.get('/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'hola mundo'
    })
});



app.listen(process.env.PORT, () => {
    console.log('Server corriendo en puerto: ' + process.env.PORT);
})