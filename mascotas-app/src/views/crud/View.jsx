import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MascotaService from '../../service/MascotaService';
import swal from 'sweetalert';

function View() {
    let { _id } = useParams();
    
    const [mascota, setMascota] = useState({
        _id,
        nombre: '',
        edad: 3,
        raza: '',
        enfermedades: []
    });

    useEffect(() => {
      // Obtener una mascota almacenadas en MongoBD 
      // por medio del campo ´_id´
      MascotaService.getMascota(_id)
        .then((resp) => {
          let detalleMascota = resp.data;
          setMascota(detalleMascota.data);
        })
        .catch((resp) => {
          window.location.href = "/pets";
        });
    }, [_id]);

    const fncBtnEditar = (e) => {
        window.location.href=`/update/${_id}`;
     }

    const fncBtnEliminar = async () => {
        swal({
          title: "Confirmación",
          text: "¿Seguro que deseas eliminar está mascota?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                MascotaService.deleteMascota(_id);
                swal("Mascota eliminada exitosamente.", {
                    icon: "success",
                }).then((value) => window.location.href = "/pets");
            }
        })
        .catch((resp) => {
            //***  Mensaje de error */
            swal({
              title: "Aviso",
              text: "Hubo un error en la operación.",
              icon: "error"
            }).then((value) => window.location.href = "/");
        });
    };
    
  if(!mascota) window.location.href = "/";

  return (
    <>
      <div>
        <div className="card">
          <h5 className="card-header">Datos de mi mascota</h5>
          <div className="card-body">
            <form id="form-registrar">
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
                  readOnly={true}
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
                <input
                  type="tipo"
                  className="form-control"
                  id="tipo"
                  name="tipo"
                  defaultValue={mascota.raza}
                  readOnly={true}
                  contentEditable={false}
                />
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
                  readOnly={true}
                />
              </div>

              {/* Campo : Enfermedades */}
              <div className="mb-3">
                <label htmlFor="enfermedades" className="form-label">
                    Enfermedades
                </label>
                <div className="form-text m-2 alert alert-secondary">
                  <ul style={{ listStyle: "none" }}>
                    { Object.keys(mascota.enfermedades).map( (el) => {
                        
                        return (<li key={el} style={{ display: "inline", margin: "4px" }}>
                            <span className="badge bg-secondary position-relative">
                            {mascota.enfermedades[el]}
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                        >
                          { parseInt(el) + 1 }
                        </span>
                      </span>
                        </li>);
                    })}
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer">
              <button type="button" className='btn btn-warning m-1 text-white' onClick={()=> fncBtnEditar()}>Editar</button> 
              <button type="button" className='btn btn-danger m-1 text-white' onClick={()=> fncBtnEliminar()}>Eliminar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;