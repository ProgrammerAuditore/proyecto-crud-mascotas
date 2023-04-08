FROM node:14.21.3-slim

ENV PORT=$PORT

RUN mkdir -p /home/max98/workspace/api

WORKDIR /home/max98/workspace/api 

COPY package*.json /home/max98/workspace/api

RUN npm install -g cross-env

RUN npm install 

# Declarar variables de entorno obtenidas en `.env`
ENV API_CORS_ORIGIN=${API_CORS_ORIGIN}

ENV API_MONGO_URI=${API_MONGO_URI}

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "dev"]