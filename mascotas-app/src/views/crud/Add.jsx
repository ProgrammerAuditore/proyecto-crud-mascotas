import React, { useState, useEffect } from "react";
import MascotaService from "../../service/MascotaService";
import swal from 'sweetalert';

function Add() {
    
    const [mascota, setMascota] = useState({
        nombre: '',
        edad: 0,
        raza: 'otro',
        enfermedades: []
    });

    
    const fncRegistrarMascota = (e) => {
        e.preventDefault();
        console.log("sdsd");
        const formRegistrar = document.querySelector('#form-registrar');
        const data = Object.keys(formRegistrar).map(key => formRegistrar[key].value || 'input:error');

        const enfermedades = mascota.enfermedades;
        const nuevoMascota = { nombre : data[0], raza : data[1], edad : data[2], enfermedades: enfermedades  
          ? enfermedades : undefined };

        const buscarCamposVacios = Object.keys(nuevoMascota).map(key => nuevoMascota[key] || 'input:error');
        const respuesta = buscarCamposVacios.includes('input:error');

        if(respuesta){
          //***  Mensaje de error */
          swal({
            title: "Aviso",
            text: "Todos los campos son requeridos.",
            icon: "error"
          }).then((value) => {});

          return;
        }
        
        MascotaService.createMascota(nuevoMascota)
        .then((resp) => {
          let nMascota = resp.data;
          
          //***  Mensaje de exitosa */
          swal({
            title: "Hecho",
            text: "Mascota registrada exitosamente.",
            icon: "success"
          })
          .then((value) => {
            if(value){ window.location.href = "/pets"; }
            else {
              formRegistrar.reset();
              setMascota({
                nombre: '',
                edad: 0,
                raza: 'otro',
                enfermedades: []
              });
            }
          });

        })
        .catch((resp) => {
            //***  Mensaje de error */
            swal({
              title: "Aviso",
              text: "Hubo un error en la operación.",
              icon: "error"
            }).then((value) => {
              window.location.href = "/";
            });
        });        
    }

    const fncAgregarEnfermedad = (e) => {
        e.preventDefault();
        
        const inputEnfermedad = document.querySelector('#enfermedades');
        if( inputEnfermedad.value.length <= 3 ) {
          //***  Mensaje de error */
          swal({
            title: "Aviso",
            text: "Agregue una enfermedad correcto con más de 3 caracteres.",
            icon: "error"
          }).then((value) => {});

          return;
        }
        
        const m = mascota.enfermedades.push(inputEnfermedad.value);

        setMascota({
            ...mascota,
            enfermedades: [
                ...mascota.enfermedades,
            ]
        });

        inputEnfermedad.value="";
    }

    const fncEliminarEnfermedad = (id) => {
        const m = mascota.enfermedades.splice(id, 1);
        console.log(id, m);

        setMascota({
            ...mascota,
            enfermedades: [
                ...mascota.enfermedades,
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
                  <option defaultValue={"Otro"}>Otro</option>
                  <option defaultValue={"Chihuahua"}>Chihuahua</option>
                  <option defaultValue={"Pitbull"}>Pitbull</option>
                  <option defaultValue={"Xoloitzcuintle"}>Xoloitzcuintle</option>
                  <option defaultValue={"Bulldog"}>Bulldog</option>
                  <option defaultValue={"Pug"}>Pug</option>
                  <option defaultValue={"Bóxer"}>Bóxer</option>
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
                <label htmlFor="enfermedades" className="form-label">
                  Enfermedades
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="enfermedades"
                    id="enfermedades"
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
                <div className="form-text m-2 alert alert-secondary">
                  <ul style={{ listStyle: "none" }}>
                    { Object.keys(mascota.enfermedades).map(el => {
                        
                        return (<li key={el} style={{ display: "inline", margin: "4px" }}>
                            <span className="badge bg-secondary position-relative">
                            {mascota.enfermedades[el]}
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

              <button type="submit" className="btn btn-success m-1 text-white">
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
