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
    const reserva = req.body
    
    let db = req.app.locals.db;
    db.collection("clientes")
        .find({dni: reserva.dni }).toArray((err, cliente) => {
            if (err != null) {
                res.send(err)
            } else {
                if (cliente.length === 0) {
                    res.send({ mensaje: "No hay cliente registrado " });
                } else {
                    db.collection("habitaciones")
                        .find({ numero: reserva.numero }).toArray((err, habitacion) => {
                            if (err != null) {
                                res.send(err);
                            } else {
                                if (habitacion[0].estado === "ocupado") {
                                    res.send({ mensaje: "La habitación está ocupada " });
                                } else {
                                    db.collection("reservas")
                                        .insertOne({ numero: reserva.numero, dni: reserva.dni, checkIn: reserva.checkIn }, (err, datos) => {
                                            if (err != null) {
                                                res.send(err);
                                            } else {
                                                db.collection("habitaciones")
                                                    .updateOne({ numero: reserva.numero }, { $set: { estado: "ocupado" } }, (err, alta) => {
                                                        if (err != null) {
                                                            res.send(err);
                                                        } else {
                                                            res.send({ mensaje: "La reserva se ha realizado correctamente" });
                                                        }
                                                    }) //updateOne
                                            }
                                        }) // insertOne
                                }
                            }
                        }) //find
                }
            }
        }) //find
    }) // POST
                        


/* MODIFICAR UNA RESERVA */
router.put("/baja", (req, res) => {
    const dni = req.body.dni
    const checkOut = req.body.checkOut
 
    let db = req.app.locals.db;
    db.collection("reservas")
        .find({ dni: dni }).toArray((err, reserva) => {
            if (err != null) {
                res.send(err);
            } else {
                // Comprobar que el dni existe
                if (reserva.length === 0) {
                    res.send({ mensaje: "No hay reserva realizada por este cliente" });
                } else {
                    db.collection("reservas")
                        .updateOne({ dni: dni }, { $set: { checkOut: checkOut } }, (err, datos) => {
                            if (err != null) {
                                res.send(err);
                            } else {
                                db.collection("habitaciones")
                                    .updateOne({ numero: reserva[0].numero }, { $set: { estado: "disponible" } }, (err, baja) => {
                                        if (err != null) {
                                            res.send(err);
                                        } else {
                                            res.send({ mensaje: "Esperamos que haya disfrutad ode sus estancia en nuestor hotel" });
                                        }
                                    }) //updateOne
                            }
                        }) // updateOne
                }
            }
        }) // find
     }) // PUT
                         



                 
       
  

/* app.use("/clientes", clientes);
app.use("/habitaciones", habitaciones);
 */


module.exports = router;