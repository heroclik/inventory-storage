const mongoose = require('mongoose');

const {MONGO_URI} = process.env;

exports.connect =  () =>{
    //connecting to the database
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: flase
    })
    .then(() =>{
     console.log("connected");
    })
    .catch((err) => {
        console.log("connect error");
        console.error(err);
    });
}