const mongoose = require ('mongoose')

module.exports = {
    Lift: require('./Lift'),
    User: require('./User'),
};

mongoose.connect( process.env.MONGODB_URI);