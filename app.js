const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// initialize server
const app = express();
const port = process.env.PORT || 8000;

//middlewares
app.use(bodyParser.json())

//connect to database local
// mongoose.connect('mongodb://localhost/bookingsystem', () => {
// 	console.log('Connected to database');
// })

//connect to database cloud
mongoose.connect('mongodb+srv://admin:admin123@capstone3cluster-td2fn.mongodb.net/test?retryWrites=true&w=majority', () => {
	console.log('Connected to database');
})

app.use('/users',require('./routes/users'));

app.listen(port, () => {
	console.log(`Listening to ${port}`);
})

