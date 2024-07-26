const mongoose = require ('mongoose')

module.exports = {
    Fruit: require('./Fruit'),
};

mongoose.connect( process.env.MONGODB_URI);