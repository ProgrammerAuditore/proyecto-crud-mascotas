FROM node:14-alpine 

RUN mkdir -p /home/max98/workspace/api

WORKDIR /home/max98/workspace/api 

COPY package*.json /home/max98/workspace/api

RUN npm install 

COPY . .

EXPOSE 3033 3033

CMD ["npm", "run", "dev"]