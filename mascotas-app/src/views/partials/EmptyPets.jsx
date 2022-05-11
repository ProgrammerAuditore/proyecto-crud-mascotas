import React, { useState, useEffect } from 'react';

function EmptyPets() {
    return ( <>
        <div class="d-flex justify-content-center align-middle">
            <div class="alert alert-warning" role="alert">
                <strong>No hay mascotas!</strong> Deseas registrar una <a role="button" href={"/add"}>
                    aquí
                </a>? 
            </div>
        </div>
    </> );
}

export default EmptyPets;