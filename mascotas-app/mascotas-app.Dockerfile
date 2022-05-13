FROM node:14-alpine 

RUN mkdir -p /home/max98/workspace/mascotas-app

WORKDIR /home/max98/workspace/mascotas-app

COPY package*.json /home/max98/workspace/mascotas-app

RUN npm install 

COPY . .

EXPOSE 3080 3080

CMD ["npm","start"]