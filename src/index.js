const express = require('express')
const {engine} = require('express-handlebars')
const bodyParser = require("body-parser")
const mysql = require('mysql')
const userRouter = require('../server/routers/user')


require('dotenv').config()

const app = express()
port = 3000

//parsing middleware
//parsing app x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}))


//parsing app/json
app.use(bodyParser.json())


// static files
app.use(express.static('public'))


// tamplating Engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST, 
    user           : process.env.DB_USER, 
    password       : process.env.DB_PASS, 
    database       : process.env.DB_NAME,

})


//connect to DB

pool.getConnection((err, connection)=>{
    if (err) {
        throw new Error(err)
    }
    console.log("connect to database as ID"+connection.threadId);
})



//Router


app.use(userRouter)


app.listen(port , ()=>{
    console.log("Server run on port",port);
})


