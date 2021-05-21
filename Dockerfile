FROM node:10-alpine

WORKDIR ./app

COPY package*.json .

RUN  npm config set puppeteer_skip_chromium_download true && npm install --save-dev

#ENV PATH ./app/node_modules/.bin:$PATH

EXPOSE 3000

COPY . .

CMD npm run startdev