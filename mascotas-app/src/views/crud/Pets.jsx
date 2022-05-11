import React, { useState, useEffect } from 'react';
import MascotaService from '../../service/MascotaService';
import swal from 'sweetalert';
import EmptyPets from '../partials/EmptyPets';

function Pets() {
    const [mascotas, setMascota] = useState([]);

    useEffect(() => {
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

        fetchData();
    }, []);

    const fncBtnVer = (_id) => {
        window.location.href = `/view/${_id}`;
    };

    const fncBtnEditar = (_id) => {
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
    <div class="row row-cols-1 row-cols-md-3 g-4">
    { Object.keys(mascotas).map( (index) => {
        let pet = mascotas[index];
        return (<>
            <div class="col" key={index}>
                <div class="card h-100">
                {/* <img src="..." class="card-img-top" alt="..."/> */}
                <div class="card-body">
                    <h5 class="card-title">{pet.nombre}</h5>
                    <small class="card-text text-muted">{pet.raza} con {pet.edad} años de edad. <br/> Además cuenta con las siguientes enfermedades: </small>
                    <ul class="list-group">
                    { pet.enfermedades.map( (el) => {
                        return (<li class="list-group-item list-group-item-primary" key={index}>
                            {el}
                        </li>);
                    }) }
                    </ul>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-between">
                        <small class="text-muted">Creado hace {new Date().getHours() - new Date(pet.createdAt).getHours()} hrs.</small>
                        {/* Acciones para el modal */}
                    <div class="btn-group btn-group-sm" role="group" aria-label="...">
                        <a href={"#"} onClick={()=> fncBtnVer(pet._id)} className="btn btn-dark btn-sm btn-block">
                            <i class="fas fa-eye"></i>
                        </a> 
                        <a href={"#"} onClick={()=> fncBtnEditar(pet._id)} className="btn btn-warning">
                            <i class="fas fa-edit"></i>
                        </a> 
                        <a href={"#"} onClick={()=> fncBtnEliminar(pet._id)} className="btn btn-danger">
                            <i class="fas fa-trash"></i>
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