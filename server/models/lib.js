const mongoose = require ('mongoose');

module.exports = {
    Lift: require('./Lift'),
    User: require('./User'),
    Move: require('./Movement'),
    Category: require('./Category'),
    Entry: require('./Entry')
};

mongoose.connect( process.env.MONGODB_URI);