const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose
    .connect(db)
    .then(()=> console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get('/', (req, res)=> res.send("HELLO!!!"))


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Serve running on PORT ${PORT}`))