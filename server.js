const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// models
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// DB config
const db = require('./config/keys').mongoURI;

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())






//connect to mongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=> console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport);

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Serve running on PORT ${PORT}`));