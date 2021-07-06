const { response } = require('express');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi'); 
const logger = require('./middleware/logger');
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

//templates
app.set('view engine', 'pug');
app.set('views', './views'); // default


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled...');
}
//Db work...
dbDebugger('connected to the database...');

app.use(logger.log);
app.use(logger.authenticate);

// Port
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));