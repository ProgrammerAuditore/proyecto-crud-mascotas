require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const _connect = require('./database');
const mascotaRouters = require('./routes/mascota.routes');
const methodOverride = require('method-override');
const cors = require('cors');
const app = express();

var corsOptions = {
    origin: process.env.API_CORS_ORIGIN || "http://localhost:3000",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Establecer puerto
app.set('port', process.env.API_PORT || 3000);

// Establecer conexión a la base de datos
_connect();

app.use(methodOverride('_method'));

app.use(morgan('dev'));

app.use(express.json());

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false}));

app.use(mascotaRouters);

app.listen(app.get('port'), () => console.log('server port ', app.get('port')));