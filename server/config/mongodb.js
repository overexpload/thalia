const mongoose = require('mongoose');

//db connection
const connect = () => {
    mongoose.connect(process.env.DB_URL).then(() => console.log('Connected to db')).catch((e) => {
        console.error(e.message);
    })
}

module.exports = connect