'use strict';
// const PORT = process.env.PORT || 3000 ;
// app.listen(PORT , () => {
// console.log(`working at ${PORT} Boy !`);
// })
const Model = require('../models/memory-data-model');
const models = new Model ;
const express = require('express');
const app = express();


// represent my data as json format
app.use(express.json());

//middleware apps
app.use(timeStamp);
app.use(logger);

// middleware 500 error function
function errorHandler(err , req , res , next){
  res.status(500);
  res.statusMessage = 'OBJECT DESTROYED ! (500)';
  res.json({error : err});
}

// testing 500 middleware function
app.get('/test-error' , (req , res , next) => {
  throw errorHandler();
});


// middleware 404 error function
function notFoundHandler(req , res , next){
  res.status(404);
  res.statusMessage = 'WE NEED A MEDIC HERE !! (404)';
  res.json({error : 'NOT FOUND !!!'});
}

// adding time stamp for each request
function timeStamp(req, res , next){
  let newTime = new Date();
  let requestTime = newTime.toUTCString();
  req.requestTime = requestTime ;
  next();
}

// console.log data from request object for each request 
function logger(req, res, next) {
  console.log('request path:', req.path, ' method:' , req.method, ' request time:' , req.requestTime);
  next();
}


// main routes using memory data model class  

// PRODUCTS :
app.get('/products', (req , res) => {
  return models.get()
    .then(data => {
      res.status(200);
      res.json(data);
    });
});


app.post('/products', (req , res) => {
  console.log(req.body);
  let record = req.body;
  return models.create(record)
    .then(data => {
      res.status(201);
      res.json(data);
    });
});

app.put('/products/:_id', (req , res) => {
  let id = req.params._id ;
  let record = req.body ;
  return models.update(id , record)
    .then(data => {
      res.json(data);
    });
});

app.delete('/products/:_id', (req , res) => {
  let id = req.params._id ;
  return models.delete(id)
    .then(() => {
      res.send({ msg:'Deleted' });
    });
});


// CATEGORIES :
app.get('/categories', (req , res) => {
  return models.get()
    .then(data => {
      res.status(200);
      res.json(data);
    });
});


app.post('/categories', (req , res) => {
  console.log(req.body);
  let record = req.body;
  return models.create(record)
    .then(data => {
      res.status(201);
      res.json(data);
    });
});

app.put('/categories/:_id', (req , res) => {
  let id = req.params._id ;
  let record = req.body ;
  return models.update(id , record)
    .then(data => {
      res.json(data);
    });
});

app.delete('/categories/:_id', (req , res) => {
  let id = req.params._id ;
  return models.delete(id)
    .then(() => {
      res.send({ msg:'Deleted' });
    });
});




app.get('*' , notFoundHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`working at ${PORT} , we are  A live !!`));
  },
};