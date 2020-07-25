const http = require('http');
// const express = require('express');
// const bodyParser = require('body-parser');
const app = require('./app');
const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, function(){
    console.log("Server is Up and listening...")
});