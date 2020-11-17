const express = require("express");
const mongodb = require("mongodb");
const app = express();


let clientes = require("./clientes");
let habitaciones = require("./habitaciones");
let reservas = require("./reservas");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let MongoClient = mongodb.MongoClient;
let db;



/* CONEXIÓN CON LA BASE DE DATOS */
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if(err!==null) {
        console.log(err);
    } else {
        app.locals.db = client.db("hotel");
    }
});


app.use("/clientes", clientes);
app.use("/habitaciones", habitaciones);
app.use("/reservas", reservas);


app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
})          
