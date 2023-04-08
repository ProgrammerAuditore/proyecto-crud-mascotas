FROM node:14.21.3-slim

ENV PORT=$PORT

ENV REACT_APP_MASCOTA_API=$REACT_APP_MASCOTA_API

RUN mkdir -p /home/max98/workspace/mascotas-app

WORKDIR /home/max98/workspace/mascotas-app

COPY package*.json /home/max98/workspace/mascotas-app

RUN npm install -g cross-env

RUN npm install 

# Declarar variables de entorno obtenidas en `.env`
ENV REACT_APP_MASCOTA_API=${REACT_APP_MASCOTA_API}

COPY . .

EXPOSE $PORT

CMD ["npm","start"]