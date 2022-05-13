# CRUD de mascotas
Este repositorio contiene un proyecto con acciones/funciones de un CRUD <br>
usando ReactJS + Axios del lado de frontend y usando NodeJS + Express + Mongoose <br>
del lado del backend. También se utilizo la base de datos de MongoDB para almacenar <br>
los datos.

# Requisitos funcionales
Para hacer funcionar la aplicación se requiere tener instalado, como requisito lo siguiente:
* NodeJS +14.x.x (o superior)
* npm
* docker
* docker-compose
* vagrant
* MongoDB
* Browser (Google Chrome, Firefox, etc.)

## Correr aplicación de forma independiente (Usando npm)
#### Ejecutar Frontend
Es necesario ejecutar el proyecto frontend usando el sig. comando dentro del path **./mascotas-app/**
```shell
    npm run start
```

#### Ejecutar Backend
Es necesario ejecutar el proyecto backend usando el sig. comando dentro del path **./api/**
```shell
    npm run dev
```

## Correr aplicación de forma automatizada (Usando docker-compose)
Es necesario ejecutar el siguiente comando desde donde se encuetra el archivo **docker-compose.yml** 
##### Esto construye y corre la aplicación en segundo plano
```shell
   docker-compose build && docker-compose up -d
```

##### Esto detiene y elimina la aplicación
```shell
   docker-compose stop -f && docker-compose rm -f
```

## Correr aplicación de forma automatizada (Usando vagrant)
Es necesario ejecutar el siguiente comando desde donde se encuetra el archivo **docker-compose.yml** 

##### Solo si, lo ejecuta por primera vez
```shell
   vagrant up 
```

##### Ejecutalo las veces necesarias
```shell
   vagrant reload 
```
