const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejs-mongodb', {   
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
    