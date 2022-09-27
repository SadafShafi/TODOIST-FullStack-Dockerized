const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
require("dotenv/config");


const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/todos',todoRoutes);
app.use('/auth',authRoutes);
app.get('/',(req,res)=>res.send("<h1>Wel Come to TodoIst</h1>"));


mongoose.connect("mongodb://mongo:27017/db",()=>console.log("connected to BD"))
app.listen(3000,()=>console.log(`Listning to port 3000`));



