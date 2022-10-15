const express = require('express');
const app = express();
const port = 8000;

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in listening to the port: ${err}`);
    }
    console.log(`Listening to port: ${port}`);
});