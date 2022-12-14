const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');


app.use(express.urlencoded({extended: true}));

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');

// const mongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));

app.use(express.static('./assets'));

//extract styles and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(cookieParser());

//set view engine as ejs
app.set('view engine','ejs');
//where to look for views
app.set('views','./views');

//use session cookie
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeBuzz',
    //TODO change the secret before deployment
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/CodeBuzz_development',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || `connect-mongodb setup ok`);
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customMiddleware.setflash);``

//called the middleware here
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
//make the uploads path availabe to the browzer
app.use('/uploads',express.static(__dirname + '/uploads'))
// app.use('/posts', require('./routes/posts'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in listening to the port: ${err}`);
    }
    console.log(`Listening to port: ${port}`);
});