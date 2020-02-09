const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const passport = require('passport');

// initialize server
const app = express();
const port = process.env.PORT || 8000;

//middlewares
app.use(bodyParser.json())
app.use('/uploads',express.static('./public/places'));
app.use('/uploads',express.static('./public/profiles'));
app.use(cors());
app.use(passport.initialize());

//connect to database local
mongoose.connect('mongodb://localhost/bookingsystem', 
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}
);

mongoose.connect('mongodb://localhost/bookingsystem', () => {
	
	console.log('Connected to database');
})



//connect to database cloud
// mongoose.connect('mongodb+srv://admin:admin123@capstone3cluster-td2fn.mongodb.net/test?retryWrites=true&w=majority', 
// 	{
// 		useUnifiedTopology: true,
// 		useNewUrlParser: true,
// 	}
// );
// mongoose.connect('mongodb+srv://admin:admin123@capstone3cluster-td2fn.mongodb.net/test?retryWrites=true&w=majority', () => {
// 	console.log('Connected to database');
// })

app.use('/users',require('./routes/users'));
app.use('/categories',require('./routes/categories'));
app.use('/places',require('./routes/places'));
app.use('/reservations',require('./routes/reservations'));
app.use('/requests',require('./routes/requests'));


//error handling middleware
app.use((err,req,res,next)=> {
	console.log(err)
	res.status(400).json({
		error : err.message
	})
})

app.listen(port, () => {
	console.log(`Listening to ${port}`);
})

