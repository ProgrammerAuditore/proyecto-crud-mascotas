const express = require('express');
const morgan = require('morgan');
const _connect = require('./database');
const routerIndex = require('./routes/index.routes');
const methodOverride = require('method-override');
const app = express();

app.set('port', 3033);

_connect();

app.use(methodOverride('_method'));

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false}));

app.use(routerIndex);

app.listen(app.get('port'), () => console.log('server port ', app.get('port')));