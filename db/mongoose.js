//configure database
const url ="mongodb+srv://sumitkk12:sumit@558@cluster0.celtl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(url, {useNewUrlParser : true, useFindAndModify: false,useUnifiedTopology: true})
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));

module.exports = mongoose