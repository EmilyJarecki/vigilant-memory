// IMPORTS 
const express = require("express");
const app = express();

//APP DEPENDENCIES
const cors = require('cors')
const morgan = require('morgan')

// INITIALIZE .ENV VARIABLES
require("dotenv").config();
require("./config/db.connection")

const { PORT, MONGODB_URI } = process.env;

//CONTROLLER IMPORT
const liftController = require('./controllers/lift-controller')
const authController = require('./controllers/auth-controller')
const moveController = require('./controllers/move-controller')

//MIDDLEWARE
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/', liftController)
app.use('/auth', authController)
app.use('/movement', moveController)


// LISTENER
app.listen(process.env.PORT || 4000, () => console.log(`listening on PORT ${PORT}`));