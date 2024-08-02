const express = require('express')
const db = require('./db');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/', function(req, res) {
    res.send('Welcome to my hotel... How can I help you ?')
})

//Import the routes file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);



var portNum=3000;
app.listen(3000, () => {
    console.log(`server is listening on ${portNum}`);
});