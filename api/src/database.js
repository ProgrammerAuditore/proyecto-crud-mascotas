const mongoose = require('mongoose');

function _connect(){
    // Definir datos para la conexión
    const HOST = process.env.API_MONGO_HOST || "localhost";
    const PORT = process.env.API_MONGO_PORT || 27017;
    const DB = process.env.API_MONGO_DATABASE || "crud_mascotas";
    const URI = (process.env.API_MONGO_URI) ? process.env.API_MONGO_URI : `mongodb://${HOST}:${PORT}/${DB}`;
    
    mongoose.connection.on('connected', connected => {
        console.log('MongoDB conectado');
    });

    mongoose.connection.on('error', disconnected => {
        console.log('MongoDB desconectado');
    });

    mongoose.connection.on('error', err => {
        console.log('MongoDB error en la conexión');
    });

    mongoose.connect(URI)
    .then( (db) => {
        let conn = db.connection;
        console.log(`mongodb://${conn.host}:${conn.port}/${conn.db.databaseName}`)
    })
    .catch( err => conn.log(err));
};

module.exports = _connect;