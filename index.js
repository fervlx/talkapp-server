const express = require('express');
const path = require('path');

require('dotenv').config();


require('./database/config').connectToDb();

//express server
const app  = express();

//read and parse body
app.use( express.json() );

//node server
const server = require('http').createServer( app );

//socket
module.exports.io = require('socket.io')( server );
require('./sockets/socket');


//public folder
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ));


//routes
app.use('/api/login', require( './routes/auth' ));


server.listen( process.env.PORT, ( error ) => { 

    if ( error ) throw new Error(error);

    console.log(` server is running. port ${ process.env.PORT }`);
});