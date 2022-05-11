import React, { useState, useEffect } from 'react';

function NavBar() {
    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">
                <img src="https://cdn-icons-png.flaticon.com/512/1076/1076826.png" alt="pet-logo" width={60} height={60} />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                </li>
                
               
                <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Mis mascotas
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="/pets">Ver mascotas</a></li> 
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/add">Registrar</a></li>
          </ul>
        </li>
            </ul>
            <form className="d-flex" method='GET' action='/pets/'>
                <input className="form-control me-2" type="search" name="search" placeholder="Buscar una mascota..." aria-label="Buscar"/>
                <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            </div>
        </div>
        </nav>
    </> );
}

export default NavBar;