const express = require('express');
// const env= require('.env');
const app = express();
const env = require('dotenv').config();

const cors = require('cors');
// const bodyParser=require('body-parser');
// const bodyParser = require('body-parser'); 

const mongoose=require('mongoose');

const userRoutes = require('./api/routes/user');
const quizRoutes = require('./api/routes/quiz');
const resultRoutes = require('./api/routes/result');

mongoose.connect(process.env.Mongo_Conn
,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex : true 
}
).then(result =>{
    console.log('cluster connection request success !');
}).catch(err=>console.log(err));

app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

app.use(express.json());

app.use('/user',userRoutes);
app.use('/quiz',quizRoutes);
app.use('/result',resultRoutes);

app.use((req,res,next)=>{
    const error= new Error('Not Found!(app.js)');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;