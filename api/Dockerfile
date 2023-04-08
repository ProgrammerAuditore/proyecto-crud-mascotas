FROM node:14.21.3-slim

ENV PORT=$PORT

ENV API_CORS_ORIGIN=$API_CORS_ORIGIN

ENV API_MONGO_URI=$API_MONGO_URI

RUN mkdir -p /home/max98/workspace/api

WORKDIR /home/max98/workspace/api 

COPY package*.json /home/max98/workspace/api

RUN npm install -g cross-env

RUN npm install 

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "dev"]