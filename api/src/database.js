const mongoose = require('mongoose');

function _connect(){
    // Definir datos para la conexión
    const HOST = "db-mongodb";
    const PORT = 27080;
    const DB = "crud_mascotas";
    const URI = `mongodb://${HOST}:${PORT}/${DB}`;
    let conn = mongoose.connection;

    mongoose.connection.on('connected', connected => {
        console.log('MongoDB conectado', conn.HOST);
    });

    mongoose.connection.on('error', disconnected => {
        console.log('MongoDB desconectado', conn.HOST);
    });

    mongoose.connection.on('error', err => {
        console.log('MongoDB error en la conexión', conn.HOST);
    });

    mongoose.connect(URI);
};

module.exports = _connect;