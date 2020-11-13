const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://Audry:Hyale@12@cluster0.pfvsg.mongodb.net/cursos?retryWrites=true&w=majority", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function(){
  console.log("Conexão realizada com sucesso.")
});

//rotas
const cursos = require("./routes/cursosRoute");

//Podemos usar a propria função de parser de json do express, sem a necessidade de instalar o body parser 
app.use(bodyParser.json()); 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use("/cursos", cursos)

module.exports = app;