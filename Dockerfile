FROM node:16.19.0

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

ENTRYPOINT ["/tini", "--"]

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
