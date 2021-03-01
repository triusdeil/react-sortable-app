const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//Routes
const routes = require('./routes/routes')
//Initialization
const app = express()
const Task = require('./models/Task')
//Settings
app.set('port', process.env.PORT || 4000)

//Middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Connect mongodb
mongoose.connect('mongodb://localhost/react-example',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))

//Routes
app.use('/',routes)

//Server
app.listen(app.get('port'),() =>{
    console.log(`server on port ${app.get('port')}`);
})