FROM node:alpine

COPY ./package.json ./

RUN npm install --force

COPY ./ ./

CMD ["npm","start"]
