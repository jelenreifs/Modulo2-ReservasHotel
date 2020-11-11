const express = require("express");
const router = express.Router();


/* TODA LA COLECCIÓN DE CLIENTES */
router.get("/", (req, res) => {
    let db = req.app.locals.db;
    db.collection("clientes")
        .find()
        .toArray((err, datos) => {
        if(err!=null) {
            console.log(err);
            res.send(err);
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});
 


/* AÑADIR UN CLIENTE A LA COLECCIÓN */
router.post("/registrar", (req, res) => {

    const cliente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni
    }  
    
    let db = req.app.locals.db;
    db.collection("clientes")
    .insertOne(cliente, (err, datos) => {
        if (err != null) {
            console.log(err);
     res.send(err);
         } else {
            console.log(datos);
            res.send(datos);
        }
    });
});
    
/* MODIFICAR LOS DATOS DEL CLIENTE */
router.put("/editar", function (req, res) {
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    
let db = req.app.locals.db;
    db.collection("clientes")
    .updateOne(
        { dni: dni },
        {
            $set: {
                nombre: nombre,
                apellido: apellido
            }
        },
    (err, datos) => {
      if (err !== null) {
        res.send(err);
         } else {
            console.log(datos);
            res.send(datos);
        }
    });
}); 




module.exports = router;