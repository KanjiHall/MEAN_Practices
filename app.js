var createError = require('http-errors');
var express = require('express');
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/HeroDB');

const Schema = mongoose.Schema;

const HeroSchema = new Schema({
  id: Number,
  name: String,
},{
    collection : 'Heroes'
});


const Joi = require('joi');

const heroes = [  
{ id: 12, name: 'Dr. Nice' },
{ id: 13, name: 'Bombasto' },
{ id: 14, name: 'Celeritas' },
{ id: 15, name: 'Magneta' },
{ id: 16, name: 'RubberMan' },
{ id: 17, name: 'Dynama' },
{ id: 18, name: 'Dr. IQ' },
{ id: 19, name: 'Magma' },
{ id: 20, name: 'Tornado'},
]


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World')
});

// http://localhost:3000/static/images/download.jpg
app.use('/static', express.static('public')) 
app.use('/users', usersRouter);

app.get('/api/heroes', (req, res) => {
  res.send(heroes);
  const schema = {
    name : Joi.string().min(3).required()
  };
  const result = Joi.validate(req.body, schema);
  console.log(result);
});

app.post('/api/heroes', (req, res) => {
  if (!req.body.name || req.body.name.length < 3){
    // 400 Bad Request
    res.status(400).send('Name is required and should be minium 3 characters.')
    return;    
  }
  const hero = {
    id : heroes.length + 1,
    name: req.body.name
  };
  heroes.push(hero);
  res.send(hero);
});

app.get('/api/heroes/:id', (req, res) => {
  const hero = heroes.find(hero => hero.id === parseInt(req.params.id));
  if (!hero) {
    res.status(404).send('The hero with the given ID was not found.')
  }
  res.send(req.params.id)
});



app.get('/api/posts/:year/:month/:day', (req, res)=>{
  res.send(req.params) 
  // res.send(req.query)
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
