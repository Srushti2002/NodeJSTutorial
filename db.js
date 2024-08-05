const mongoose = require('mongoose');
require('dotenv').config();
//Define the MongoDB connection URL/
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

//Set up MongoDB connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object represernting the MongoDB connection.
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', () => {
    console.log('MongoDB Connection Error  ');
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db; 

//changes updated