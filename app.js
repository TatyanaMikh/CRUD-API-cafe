const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');



const indexRouter = require('./routes/index');
const clientsRouter = require('./routes/clients.js');
const dishesRouter = require('./routes/dishes');
const workersRouter = require('./routes/workers') ;
const eventsRouter = require('./routes/events') ;

const app = express();



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clients', clientsRouter);
app.use('/dishes', dishesRouter);
app.use('/workers', workersRouter);
app.use('/events', eventsRouter);


module.exports = app;
