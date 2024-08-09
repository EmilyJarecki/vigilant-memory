const mongoose = require ('mongoose');

module.exports = {
    Lift: require('./Lift'),
    User: require('./User'),
    Movement: require('./Movement')
};

mongoose.connect( process.env.MONGODB_URI);