const mongoose = require ('mongoose');

module.exports = {
    User: require('./User'),
    Category: require('./Category'),
    Entry: require('./Entry')
};

mongoose.connect( process.env.MONGODB_URI);