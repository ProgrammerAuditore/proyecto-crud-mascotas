FROM node:14.21.3-slim

ENV PORT=$PORT

ENV REACT_APP_MASCOTA_API=$REACT_APP_MASCOTA_API

RUN mkdir -p /home/max98/workspace/mascotas-app

WORKDIR /home/max98/workspace/mascotas-app

COPY package*.json /home/max98/workspace/mascotas-app

COPY .env .

RUN npm install -g cross-env

RUN npm install 

COPY . .

# Declarar variables de entorno obtenidas en `.env`
ENV REACT_APP_MASCOTA_API=${REACT_APP_MASCOTA_API}

# Mostrar variables
RUN echo "PORT=$PORT"
RUN echo "REACT_APP_MASCOTA_API=$REACT_APP_MASCOTA_API"

EXPOSE $PORT

CMD ["npm","start"]