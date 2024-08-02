const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

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
    console.log('MongoDB Connection Error : ', error);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db; 