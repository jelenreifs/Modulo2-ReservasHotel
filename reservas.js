const express = require("express");
const router = express.Router();
//const app = express();

/* let clientes = require("./clientes");
let habitaciones = require("./habitaciones");
 */


/* TODA LA COLECCIÓN DE HABITACIONES */
router.get("/", (req, res) => {
    let db = req.app.locals.db;
    db.collection("reservas")
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

/* AÑADIR UNA RESERVA */
router.post("/alta", (req, res) => {

    const reserva = {
        dni: req.body.dni,
        habitacion: req.body.habitacion,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
    }  

     let db = req.app.locals.db;
        db.collection("clientes")
            .find({ dni : dni}, function (err, datos){
                if (err != null) {
                    console.log(err);
                    res.send({ mensaje: "No hay cliente registrado " + err });
                } else {
                    db.collection("habitaciones")
                        .find({
                            $and: [
                                { habitacion: habitacion },
                                { estado: "disponible" }
                            ]
                        }), function (err, data) {
                            if (err != null) {
                                console.log(err);
                                res.send({ mensaje: "La habitación está ocupada " + err });
                            } else {
                                db.collection("reservas")
                                  .insertOne(reserva, (err, elemento) => {
                                        if (err != null) {
                                            console.log(err);
                                            res.send({ mensaje: "La reserva no ha podido realizarse" + err });

                                    res.send(err);
                                        } else {
                                            console.log(elemento);
                                            console.log("La reserva se ha realizado correctamente");
                                            res.send(elemento);
                                        }
                                    });
                                }
                            }
                    }
                });
            });


/* app.use("/clientes", clientes);
app.use("/habitaciones", habitaciones);
 */


module.exports = router;