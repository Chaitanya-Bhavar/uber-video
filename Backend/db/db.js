// require("dotenv").config();
// const mongoose = require('mongoose');




// function connectToDb() {
//     mongoose.connect(process.env.DB_CONNECT
//     ).then(() => {
//         console.log('Connected to DB');
//     }).catch(err => console.log(err));
// }


// module.exports = connectToDb;


require("dotenv").config();
const mongoose = require('mongoose');

console.log("DB_CONNECT:", process.env.DB_CONNECT); // Debugging ke liye

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => console.log(err));
}

module.exports = connectToDb;
