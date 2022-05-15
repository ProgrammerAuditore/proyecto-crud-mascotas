import React from 'react';

function EmptyPets() {
    return ( <>
        <div className="d-flex justify-content-center align-middle">
            <div className="alert alert-warning" role="alert">
                <strong>No hay mascotas!</strong> Deseas registrar una <a role="button" href={"/add"}>
                    aquí
                </a>? 
            </div>
        </div>
    </> );
}

export default EmptyPets;