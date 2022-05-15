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

# Configuración Backend | API Mascota
Es necesario crear un archivo `.env` del proyecto de backend dentro del path **./api**, opcionalmente puede hacer una copia del archivo `.env.test` con el nombre de **.env** que incluyen variables de entorno predeterminado o por default para funcionar con **docker-compose** y **vagrant**. <br> 
Finalmente las variables de entorno son: 
### Variables de entorno para API | mascota
*  **API_PORT** *(Requerido)* Puerto para API mascota por default es `3033`
*  **API_CORS_ORIGIN** *(Requerido)* Es la URL del proyecto frontend de App Mascotas por default es `http://localhost:3033`

### Variables de entorno para Mongo | base de datos
*  **API_MONGO_HOST** *(Requerido)* El host **db-mongodb** es el nombre del servicio configurado en docker-compose (solo si usa docker-compose o vagrant). 
*  **API_MONGO_PORT** *(Requerido)* El puerto **27080** es el puerto configurado en docker-compose para **mongo v4.0** (solo si usa docker-compose o vagrant).
*  **API_MONGO_DATABASE** *(Requerido)* La base de datos **crud_mascotas** es por defecto.
*  **API_MONGO_URI** *(Opcional)* <br/> Solo en caso de requerir usuario y contraseña, por ejemplo: `mongodb://<user>:<password>@<host>:<port>/<database>?<options>`. Este variable de entorno anula *API_MONGO_HOST*, *API_MONGO_PORT* y *API_MONGO_DATABASE*. 

## Correr aplicación de forma independiente (Usando npm)
#### Configuración previa
Antes de ejecutar los proyectos Frontend (App Mascotas) y Backend (API Mascota) es necesario configurar el archivo `.env` en la ruta **./api*, la configuración necesario es la siguiente:
```text
[..]
# Mongo Database
API_MONGO_HOST="localhost"
API_MONGO_PORT=27017
API_MONGO_DATABASE="app_mascotas"
[..]
```

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

#### Configuración previa
Antes de ejecutar los proyectos Frontend (App Mascotas) y Backend (API Mascota) es necesario configurar el archivo `.env` en la ruta **./api*, la configuración necesario es la siguiente:
```text
[..]
# Mongo Database
API_MONGO_HOST="db-mongodb"
API_MONGO_PORT=27080
API_MONGO_DATABASE="app_mascotas"
[..]
```

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

#### Configuración previa
Antes de ejecutar los proyectos Frontend (App Mascotas) y Backend (API Mascota) es necesario configurar el archivo `.env` en la ruta **./api*, la configuración necesario es la siguiente:
```text
[..]
# Mongo Database
API_MONGO_HOST="db-mongodb"
API_MONGO_PORT=27080
API_MONGO_DATABASE="app_mascotas"
[..]
```

##### Solo si, lo ejecuta por primera vez
```shell
   vagrant up 
```

##### Ejecutalo las veces necesarias
```shell
   vagrant reload 
```
