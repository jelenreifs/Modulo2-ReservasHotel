const express = require("express");
const router = express.Router();


/* TODA LA COLECCIÓN DE HABITACIONES */
router.get("/", (req, res) => {
    let db = req.app.locals.db;
    db.collection("habitaciones")
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


/* AÑADIR UN HABITACIÓN A LA COLECCIÓN */
router.post("/anyadir", (req, res) => {

    const habitacion = {
    numero: req.body.numero,
    estado: req.body.estado,
    }  
    
    let db = req.app.locals.db;
    db.collection("habitaciones")
    .insertOne(habitacion, (err, datos) => {
        if (err != null) {
            console.log(err);
     res.send(err);
         } else {
            console.log(datos);
            res.send(datos);
        }
    });
});
    



module.exports = router;