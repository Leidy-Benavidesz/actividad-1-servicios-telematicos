const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://leidy:temp123@serviciostelematicos.iqa4scn.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./product.model');