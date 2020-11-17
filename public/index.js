showReservas();
function showReservas() {
  fetch("/reservas")
    .then(res => res.json())
    .then(datos => {
      console.log(datos)
    
    })
  }


/* function showCliente() {
  fetch("/clientes")
    .then(res =>res.json())
    .then(datos => {
      let clientes = "";
      for (let i = 0; i < datos.length; i++) {
        clientes += `
            <div class="menu">
                <p>Nombre: ${datos[i].nombre}
                  Apellido: ${datos[i].apellido}
                  Dni: ${datos[i].dni}</p>
            </div>
        `;
      }
      document.getElementById("resultado").innerHTML = clientes;
    });
} */





function addCliente() {
    let nombre = document.getElementById("nombre").value 
    let apellido = document.getElementById("apellido").value
  let dni = document.getElementById("dni").value

    let cliente = {
        nombre,
        apellido,
        dni
  }

  
  fetch("/clientes/registrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  })
    .then( res => res.json())
    .then( datos => {
      console.log(datos);
        let clientes = "";
      for (let i = 0; i < datos.length; i++) {
        clientes += `
            <div class="menu">
                <p>Nombre: ${datos[i].nombre}
                  Apellido: ${datos[i].apellido}
                  Dni: ${datos[i].dni}</p>
            </div>
        `;
      }
      document.getElementById("resultado").innerHTML = clientes;
    });
}


  




function editCliente() {
    let nombre = document.getElementById("nombre").value 
    let apellido = document.getElementById("apellido").value
    let dni = document.getElementById("dni").value
 
   let cliente = {
        nombre,
        apellido,
        dni
    }

  
    
fetch("/a/editarMenu", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  })
      .then(res => res.json())
      .then(datos => {
        console.log(datos);
        window.alert(
          `Editado liente: ${nombre} ${datos.apellido}
            DNI: ${clientes.datos.dni} `);
    });
}



function addReserva() {
    let nombreReserva = document.getElementById("nombreReserva").value 
    let apellidoReserva = document.getElementById("apellidoReserva").value
    let dniReserva = document.getElementById("dniReserva").value
    let checkInReserva = document.getElementById("checkInReserva").value

    let reserva = {
        nombreReserva,
        apellidoReserva,
        dniReserva,
        checkInReserva,
    }

  fetch("/reservas/alta", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          },
      body: JSON.stringify(reserva),
  })

  .then(res => res.json())
    .then(datos => {
      console.log(datos);
      showReservas()
     
    });
}



function editReserva() {
    let nombreReserva = document.getElementById("nombreReserva").value 
    let apellidoReserva = document.getElementById("apellidoReserva").value
    let dniReserva = document.getElementById("dniReserva").value
  let checkInReserva = document.getElementById("checkInReserva").value
    let checkOutReserva = document.getElementById("checkInReserva").value

    let reserva = {
        nombreReserva,
        apellidoReserva,
        dniReserva,
        checkInReserva,
        checkOutReserva
    }

  fetch("/resercar/baja", {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          },
      body: JSON.stringify(reserva),
  })

  .then(res => res.json())
    .then(datos => {
      console.log(datos);
      showReservas()
     
    });
}















