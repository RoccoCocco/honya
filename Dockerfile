FROM node:16.19.0

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

CMD [ "node", "dist/main.js" ]