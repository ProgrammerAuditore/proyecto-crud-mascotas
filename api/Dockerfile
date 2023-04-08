FROM node:14.21.3-slim

RUN mkdir -p /home/max98/workspace/api

WORKDIR /home/max98/workspace/api 

COPY package*.json /home/max98/workspace/api

RUN npm install -g cross-env

RUN npm install 

COPY . .

EXPOSE 3033 3033

CMD ["npm", "run", "dev"]