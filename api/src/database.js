const mongoose = require('mongoose');

function _connect(){
    // Definir datos para la conexión
    const HOST = "localhost";
    const PORT = 27017;
    const DB = "crud_mascotas";
    const URI = `mongodb://${HOST}:${PORT}/${DB}`;

    mongoose.connection.on('connected', connected => {
        console.log('MongoDB conectado');
    });

    mongoose.connection.on('error', disconnected => {
        console.log('MongoDB desconectado');
    });

    mongoose.connection.on('error', err => {
        logError(err);
    });

    mongoose.connect(URI);
};

module.exports = _connect;