require('dotenv').config()

const express = require("express");
const app = express();
const connectDB = require('./config/db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./router/router.js');



// set view engine
app.set("view engine","ejs");

// middelware
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.use(cors());
 app.use(express.static(path.join(__dirname,"public")));
 app.use(cookieParser());
 
// connect database
connectDB();

app.use("/",router);




module.exports = app;