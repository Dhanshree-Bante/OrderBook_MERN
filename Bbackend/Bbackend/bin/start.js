'use strict';

require('@babel/polyfill');
require('@babel/register')


const index = require('../app').default;

const http = require('http');
require('dotenv').config();
// const port=process.env.APP_PORT;

const port = require('../config').get(process.env.Node_env).PORTNO;

const server = http.createServer(index);
server.listen(port);

server.on('listening',()=>{
    console.log(`Listening on ${port}`);
});