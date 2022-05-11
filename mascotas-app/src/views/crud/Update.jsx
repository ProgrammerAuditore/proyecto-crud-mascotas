import React, { useState, useEffect } from "react";
import MascotaService from "../../service/MascotaService";
import { useParams } from "react-router";
import swal from 'sweetalert';

function Update() {
  let { _id } = useParams();
    
    const [mascota, setMascota] = useState({
        _id,
        nombre: '',
        edad: 3,
        raza: '',
        enfermedades: []
    });

    useEffect(() => {
      MascotaService.getMascota(_id)
        .then((resp) => {
          let detalleMascota = resp.data;
          setMascota(detalleMascota.data);
        })
        .catch((resp) => {
          window.location.href = "/pets";
        });
    }, [_id]);
    
    const fncActualizarMascota = (e) => {
        e.preventDefault();
        const formRegistrar = document.querySelector('#form-registrar');
        const data = Object.keys(formRegistrar).map(key => formRegistrar[key].value || 'input:error');

        const enfermedades = mascota.enfermedades;
        const nuevoMascota = { nombre : data[0], raza : data[1], edad : data[2], enfermedades: enfermedades  
          ? enfermedades : undefined };

        const buscarCamposVacios = Object.keys(nuevoMascota).map(key => nuevoMascota[key] || 'input:error');
        const respuesta = buscarCamposVacios.includes('input:error');

        if(respuesta) return;
        
        MascotaService.updateMascota(nuevoMascota, mascota._id)
        .then((resp) => {
          let nMascota = resp.data.data;
           
          //***  Mensaje de exitosa */
           swal({
            title: "Hecho",
            text: "Mascota actualizado con exito.",
            icon: "success"
          })
          .then((value) => {
            if(value) window.location.href = "/pets";
            else window.location.reload();
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

    if(!mascota) window.location.href = "/";

  return (
    <>
      <div>
        <div className="card">
          <h5 className="card-header">Actualizar mi mascota</h5>
          <div className="card-body">
            <form id="form-registrar" onSubmit={fncActualizarMascota}>
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
                  defaultValue={mascota.nombre}
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
                  defaultValue={mascota.raza}
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
                  defaultValue={mascota.edad}
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
                        
                        console.log("sSSSS",el);
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

              <button type="submit" className="btn btn-warning m-1 text-white">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
