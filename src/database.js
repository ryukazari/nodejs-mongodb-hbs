const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root1234@ds141889.mlab.com:41889/nodejs-mongodb', {   
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
    