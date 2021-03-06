import React, { useState, useEffect } from 'react';
import MascotaService from '../../service/MascotaService';
import swal from 'sweetalert';
import EmptyPets from '../partials/EmptyPets';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

function Pets() {
    const [mascotas, setMascota] = useState([]);
    var search= '';

    useEffect(() => {
        // Obtener parametro search
        search = new URL(window.location.href).searchParams.get('search') || '';

        // Obtener todas las mascota almacenadas en MongoBD 
        async function fetchData() {
            await MascotaService.getMascotas()
            .then((resp) => {
                let listaMascotas = resp.data.data;
                setMascota(listaMascotas);
            })
            .catch((resp) => {
                window.location.href = "/";
            });
        }

        // Obtener todas las mascota almacenadas en MongoBD 
        // por medio del campo ´nombre´
        async function fetchSearchData() {
            await MascotaService.getSearchMascota(search)
            .then((resp) => {
                let listaMascotas = resp.data.data;
                setMascota(listaMascotas);
            })
            .catch((resp) => {
                alert(resp);
                window.location.href = "/";
            });
        }
        
        // Verificar si el parametro search existe
        if( search.length == 0 ) fetchData();
        else fetchSearchData();
    }, []);

    const fncBtnVer = (_id) => {
        window.location.href = `/view/${_id}`;
    };

    const fncBtnModificar = (_id) => {
        window.location.href = `/update/${_id}`;
    };

    const fncBtnEliminar = (_id) => {
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
                }).then((value) => window.location.reload());
            }
          });
        
    };

  if( !mascotas ) window.location.href = "/";
  if( mascotas.length <= 0 ) return <EmptyPets></EmptyPets>;

  return (
    <>
    <div className="row row-cols-1 row-cols-lg-3 g-4">
    { Object.keys(mascotas).map( (index) => {
        let mascota = mascotas[index];
        return (<>
            <div className="col" key={mascota._id}>
                <div className="card h-100">
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className="card-body">
                    <div className='pb-2 mb-3 border-opacity-25 border-bottom border-success'>
                    <h5 className="card-title text-center">{mascota.nombre}</h5>
                    <small className="card-text text-muted">{mascota.raza} con {mascota.edad} años de edad. <br/> Cuenta con las siguientes enfermedades: </small>
                    </div>
                    <ul className="list-group">
                    {/* Mostrar un link para agregar una enfermedad  */}
                    {  mascota.enfermedades.length == 0 &&
                        <a href={"#"} onClick={()=> fncBtnModificar(mascota._id)} 
                        class="list-group-item list-group-item-action list-group-item-warning d-flex justify-content-between align-items-center">
                            Agregar una enfermedad
                            <span class="badge bg-dark rounded-pill"><i class="fas fa-plus"></i></span>
                        </a>
                    }

                    {/* Listar una lista de enfermedades  */}
                    {   mascota.enfermedades.map( (enfermedad, index) => {
                    
                            let tEnfermedad = mascota.enfermedades.length;
                            let tEnfermedadesVisible = 3;

                            // Imprimir una enfermedad
                            if( (index+1) < (tEnfermedadesVisible+1) ){
                                return (<li className="list-group-item list-group-item-primary">
                                    {enfermedad}
                                </li>);
                            }  
                            // Impimir un enlace para mostrar más
                            else
                            if( (index+1) == (tEnfermedadesVisible+1) ){
                                return (<a href={"#"} onClick={()=> fncBtnVer(mascota._id)} 
                                class="list-group-item list-group-item-action list-group-item-warning d-flex justify-content-between align-items-center">
                                    Ver más enfermedades...
                                    <span class="badge bg-dark rounded-pill">+{tEnfermedad-3}</span>
                                </a>);
                            }

                        }) // Fin del map
                    }
                    </ul>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">Creado {moment(mascota.createdAt).calendar() }</small>
                        {/* Acciones para el modal */}
                    <div className="btn-group btn-group-sm text-center align-middle" role="group" aria-label="...">
                        <a href={"#"} onClick={()=> fncBtnVer(mascota._id)} className="btn btn-dark btn-sm btn-block">
                            <i className="fas fa-eye"></i>
                        </a> 
                        <a href={"#"} onClick={()=> fncBtnModificar(mascota._id)} className="btn btn-warning">
                            <i className="fas fa-edit"></i>
                        </a> 
                        <a href={"#"} onClick={()=> fncBtnEliminar(mascota._id)} className="btn btn-danger">
                            <i className="fas fa-trash"></i>
                        </a>
                    </div> 
                    </div>
                </div>
                </div>
            </div>
        </>);
    })}
    </div>
    </>
  );
}

export default Pets;