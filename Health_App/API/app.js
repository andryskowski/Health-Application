const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');

app.use(bodyParser.json());

//import Routes
const postsRoute = require('./routes/posts');
const dishesRoute = require('./routes/dishes');
app.use(cors())
app.use('/posts', postsRoute);
app.use('/dishes', dishesRoute);

// app.get('/', (req, res) => {
//     res.send('We are on home');
// });


//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {console.log('connected to DB')})

//start listening to the server
app.listen(8000);