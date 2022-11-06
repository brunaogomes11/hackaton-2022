const mongoose = require('mongoose');
require('dotenv').config();

function connection_Database(){
    mongoose.connect('mongodb+srv://'+process.env.USER+':'+process.env.PASSWORD+'@cluster0.fkwhnoc.mongodb.net/Usuarios?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
    );
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
}

module.exports = connection_Database;