FROM node:10-alpine
WORKDIR ./app
COPY package.json ./
EXPOSE 3000
RUN  npm config set puppeteer_skip_chromium_download true && npm install --save-dev
ENV PATH ./app/node_modules/.bin:$PATH
CMD npm run startdev
COPY . .