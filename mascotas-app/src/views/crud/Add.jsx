import React, { useState, useEffect } from "react";
import MascotaService from "../../service/MascotaService";

function Add() {
    
    const [mascota, setMascota] = useState({
        nombre: '',
        edad: 0,
        raza: 'otro',
        enfermedad: []
    });

    
    const fncRegistrarMascota = (e) => {
        e.preventDefault();
        console.log("sdsd");
        const formRegistrar = document.querySelector('#form-registrar');
        const data = Object.keys(formRegistrar).map(key => formRegistrar[key].value || 'input:error');

        const enfermedades = mascota.enfermedad;
        const nuevoMascota = { nombre : data[0], raza : data[1], edad : data[2], enfermedad: enfermedades  
          ? enfermedades : undefined };

        const buscarCamposVacios = Object.keys(nuevoMascota).map(key => nuevoMascota[key] || 'input:error');
        const respuesta = buscarCamposVacios.includes('input:error');

        if(respuesta) return;
        
        MascotaService.createMascota(nuevoMascota)
        .then((resp) => {
          let nMascota = resp.data;
          alert("Mascota registrado exitosamente.");
          
          formRegistrar.reset();
          setMascota({
            nombre: '',
            edad: 0,
            raza: 'otro',
            enfermedad: []
          });

          //window.location.href = `/empleados/ver/${nMascota.id}`;
        })
        .catch((resp) => {
          alert("Mascota no creado. Hubo un error en el servidor.");
          
          //window.location.href = "/";
        });

        alert('Registrando mascota');
        
    }

    const fncAgregarEnfermedad = (e) => {
        e.preventDefault();
        
        const inputEnfermedad = document.querySelector('#enfermedad');
        if( inputEnfermedad.value.length <= 2 ) return;
        
        const m = mascota.enfermedad.push({
            id: mascota.enfermedad.length,
            value: inputEnfermedad.value
        });


        setMascota({
            ...mascota,
            enfermedad: [
                ...mascota.enfermedad,
            ]
        });

        inputEnfermedad.value="";
    }

    const fncEliminarEnfermedad = (id) => {
        const m = mascota.enfermedad.splice(id, 1);
        console.log(id, m);

        setMascota({
            ...mascota,
            enfermedad: [
                ...mascota.enfermedad,
            ]
        });
    }

  return (
    <>
      <div>
        <div className="card">
          <h5 className="card-header">Registrar una mascota</h5>
          <div className="card-body">
            <form id="form-registrar" onSubmit={fncRegistrarMascota}>
              {/* Campo : Nombre */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  placeholder="Introduzca el nombre"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  También puede escribir el sobrenombre de su perro
                </div>
              </div>

              {/* Campo : Tipo */}
              <div className="mb-3">
                <label htmlFor="tipo" className="form-label">
                  Tipo
                </label>
                <select
                  className="form-select"
                  id="tipo"
                  name="tipo"
                  defaultValue={"Otro"}
                >
                  <option value={"Otro"}>Otro</option>
                  <option value={"Chihuahua"}>Chihuahua</option>
                  <option value={"Pitbull"}>Pitbull</option>
                  <option value={"Xoloitzcuintle"}>Xoloitzcuintle</option>
                  <option value={"Bulldog"}>Bulldog</option>
                  <option value={"Pug"}>Pug</option>
                  <option value={"Bóxer"}>Bóxer</option>
                </select>
              </div>

              {/* Campo : Edad */}
              <div className="mb-3">
                <label htmlFor="edad" className="form-label">
                  Edad
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="edad"
                  name="edad"
                  placeholder="Introduzca la edad"
                />
              </div>

              {/* Campo : Enfermedades */}
              <div className="mb-3">
                <label htmlFor="enfermedad" className="form-label">
                  Enfermedades
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="enfermedad"
                    id="enfermedad"
                    aria-describedby="button-addon2"
                    placeholder="Agregue una enfermedad"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={fncAgregarEnfermedad}
                  >
                    Agregar
                  </button>
                </div>
                <div className="form-text m-2">
                  <ul style={{ listStyle: "none" }}>
                    { Object.keys(mascota.enfermedad).map(el => {
                        
                        return (<li key={el} style={{ display: "inline", margin: "4px" }}>
                            <span className="badge bg-secondary position-relative">
                            {mascota.enfermedad[el].value}
                        <span
                          type="button"
                          onClick={() => fncEliminarEnfermedad(el)}
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        >
                          x
                        </span>
                      </span>
                        </li>);
                    })}
                  </ul>
                </div>
              </div>

              <button type="submit" className="btn btn-success">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add;
