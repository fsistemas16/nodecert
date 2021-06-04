# FROM node:lts-alpine3.10
FROM node:14

WORKDIR /app

RUN echo deb http://http.debian.net/debian stretch-backports main > /etc/apt/sources.list.d/stretch-backports.list

RUN apt-get update  --fix-missing -y
RUN apt-get clean 
RUN apt install -t stretch-backports
RUN apt-get install ca-certificates \
            fonts-liberation \
            libappindicator3-1 \
            libasound2 \
            libatk-bridge2.0-0 \
            libatk1.0-0 \
            libc6 \
            libcairo2 \
            libcups2 \
            libdbus-1-3 \
            libexpat1 \
            libfontconfig1 \
            libgbm1 \
            libgcc1 \
            libglib2.0-0 \
            libgtk-3-0 \
            libnspr4 \
            libnss3 \
            libpango-1.0-0 \
            libpangocairo-1.0-0 \
            libstdc++6 \
            libx11-6 \
            libx11-xcb1 \
            libxcb1 \
            libxcomposite1 \
            libxcursor1 \
            libxdamage1 \
            libxext6 \
            libxfixes3 \
            libxi6 \
            libxrandr2 \
            libxrender1 \
            libxss1 \
            libxtst6 \
            lsb-release \
            wget \
            xdg-utils -y

RUN  apt-get update 
RUN  apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     # We install Chrome to get all the OS level dependencies, but Chrome itself
     # is not actually used as it's packaged in the node puppeteer library.
     # Alternatively, we could could include the entire dep list ourselves
     # (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
     # but that seems too easy to get out of date.
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/* 

# RUN mkdir /usr/local/share/ca-certificates/cacert.org
# RUN apt-get -P /usr/local/share/ca-certificates/cacert.org http://www.cacert.org/certs/root.crt http://www.cacert.org/certs/class3.crt
# RUN update-ca-certificates

# RUN echo "----IN CRT----"

# ADD canvasnode.crt /usr/local/share/ca-certificates/canvasnode.crt
# RUN chmod 644 /usr/local/share/ca-certificates/canvasnode.crt && update-ca-certificates

COPY package*.json .

RUN echo "----IN DOCKERFILE----"

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# RUN export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN npm install -g nodemon && npm install

EXPOSE 3000

COPY . .

CMD npm run startdev