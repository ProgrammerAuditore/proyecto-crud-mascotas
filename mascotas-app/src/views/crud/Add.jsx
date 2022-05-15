import React, { useState } from "react";
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
        
        // Obtener los campos del formulario y validar los valores (o value)
        // de cada campo del formulario
        const formRegistrar = document.querySelector('#form-registrar');
        const data = Object.keys(formRegistrar).map(key => formRegistrar[key].value || 'input:error');

        // Obtener las enfermedades y crear un nuevo objeto mascota
        const enfermedades = mascota.enfermedades;
        const nuevoMascota = { 
          nombre : data[0], 
          raza : data[1], 
          edad : data[2], 
          enfermedades: enfermedades ? enfermedades : undefined 
        };

        // Validar los valores del nuevo objeto mascota
        const buscarCamposVacios = Object.keys(nuevoMascota).map(key => nuevoMascota[key] || 'input:error');
        const respuesta = buscarCamposVacios.includes('input:error');

        // verificar si hay un error en nuevo objeto mascota
        if(respuesta){
          //***  Mensaje de error */
          swal({
            title: "Aviso",
            text: "Todos los campos son requeridos.",
            icon: "error"
          }).then((value) => {});

          return;
        }
        
        // Registrar una nueva mascota con los datos actual
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
        
        // Obtener el campo de enfermedades
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
        
        // Agregar un nuevo enfermedad
        mascota.enfermedades.push(inputEnfermedad.value);

        // Actualizar la variable de mascota
        // agregando el nuevo enfermedad
        setMascota({
            ...mascota,
            enfermedades: [
                ...mascota.enfermedades,
            ]
        });

        inputEnfermedad.value="";
    }

    const fncEliminarEnfermedad = (id) => {
        // Eliminar una enfermedad
        const m = mascota.enfermedades.splice(id, 1);

        // Actualizar la variable de mascota
        // borrando la enfermedad
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
                  aria-describedby="nombrelHelp"
                />
                <div id="nombrelHelp" className="form-text">
                  También puede escribir el sobrenombre de su perro
                </div>
              </div>

              {/* Campo : Tipo */}
              <div className="mb-3">
                <label htmlFor="raza" className="form-label">
                  Tipo
                </label>
                <select
                  className="form-select"
                  id="raza"
                  name="raza"
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

              <button type="submit" 
              className="btn btn-success m-1 text-white">
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
