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
#### **Nota**
Es necesario ejecutar el siguiente comando desde la directorio/carpeta raíz donde se encuetra el archivo **docker-compose.yml** 

Cabe mencionar que el archivo **docker-compose.yml** es creado y configurado especificamente para ejecutarse dentro de vagrant.
Así tambien el comando "vagrant up" o "vagrant reload", levanta los servicios definidas en el archivo **docker-compose.yml** (Por defecto).

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

##### Crear maquina virtual
Este comando crea una maquina virtual usando **'vagrant'** para correr *docker* y *docker-compose* dentro de ella. <br>
Por tal motivo, este comando se debe ejecutar una sola vez. 
```shell
   vagrant up 
```

##### Construir y levantar el proyecto
Este comando reinicia la maquina virtual usando **'vagrant'**, asi también ejecuta la provision *run-workspace* definida en el archivo *Vagrantfile*. <br>
+ *run-workspace* : Suspende, Elimina, Contruye y Levanta los servicios de *__docker-compose__* en el mismo orden. <br>

Por tal motivo, este comando se puede ejecutar las veces que sean necesarias. 

```shell
   vagrant reload 
```
##### Ejecutar los contenedor invidualmente y manualmente

Este comando levanta en segundo plano el servicio *__service_db__*
```shell
   doc run -d -p 2780:2780 -v /home/vagrant/data:/data/db -t service_db mongod --port 27080 --dbpath /data/db
```

Este comando levanta en segundo plano el servicio *__service_api__*
```shell
   doc run -p 3033:3033 -v /home/max98/workspace/api/node_modules -t service_api npm run dev --no-deps
```

Este comando levanta en segundo plano el servicio *__service_app__*
```shell
   doc run -d -p 3080:3080 -v /home/max98/workspace/mascotas-app/node_modules -t service_app npm start --no-deps
```

