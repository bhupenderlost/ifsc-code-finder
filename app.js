const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

//Controllers
const errorController = require('./controllers/error');
//INITIALIZE EXPRESS()
const app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
const home = require('./routes/home');
const api = require('./routes/api');

app.use('/api', api);
app.use(home);

app.use(errorController.get404);

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    });
