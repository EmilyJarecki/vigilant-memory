const mongoose = require ('mongoose')

module.exports = {
    Fruit: require('./Fruit'),
    User: require('./User'),
};

mongoose.connect( process.env.MONGODB_URI);