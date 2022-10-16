const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

app.use(express.static('./assets'));
app.use(express.urlencoded({extended: true}));

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const db = require('./config/mongoose');

//extract styles and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));



app.use(cookieParser());

//set view engine as ejs
app.set('view engine','ejs');
//where to look for views
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in listening to the port: ${err}`);
    }
    console.log(`Listening to port: ${port}`);
});