//configure database
require('dotenv').config()
username = process.env.DB_USERNAME;
password = process.env.DB_PASSWORD;

const url =`mongodb+srv://${username}:${password}@cluster0.celtl.mongodb.net/mySecondDatabase?retryWrites=true&w=majority`
//hello wor
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(url, {useNewUrlParser : true, useFindAndModify: false,useUnifiedTopology: true})
    .then(() => console.log(`Database Connected`))
    .catch((error) => console.log(error));

module.exports = mongoose