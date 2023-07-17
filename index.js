const express = require('express');
const path = require('path');
const members = require('./members');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');

const app = express();

//app.get('/',(req, res) => {
    //res.send('<h1>Hello World!<h1/>');
//    res.sendFile(path.join(__dirname,'public','index.html'));
//});


//Hanldebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


// Hompage  Route
app.get('/', (req,res) => {
    res.render('index',{
        title: 'Memebr App',
        members
    })
});

//Init Middleware
//app.use(logger);

//Body parser json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Members API Routes

app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
