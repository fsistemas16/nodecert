
# Canvasnode


## Pupeter
>Al intalar pupeeter setear  > npm config set puppeteer_skip_chromium_download true

https://answers.microsoft.com/en-us/windows/forum/all/how-to-check-dpi-on-png/3e18a21c-16ae-464e-b80d-a7d73c2e121c
https://pptr.dev/#?product=Puppeteer&version=v9.1.1&show=api-pageaddscripttagoptions

## Instalacion en 73 - Debian 10 
https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/
 >sudo apt-get install -y libgbm-dev //dependencia de pupeteer
dpi o ppi, de que depende ? >
 https://fotografiaprincipiantes.wordpress.com/2013/09/25/dpi-o-ppi-en-lightroom/



## dockerizando
> s3 storage
https://stackoverflow.com/questions/48716266/sharp-image-library-rotates-image-when-resizing/48726267#48726267

>docker run -it --rm --name canvasnode -v C:\wamp64\www\Desarrollo\canvasnode:/home/node/app -p 30001:3000 nodecanvas:1 npm run startdev

>docker compose run <nombre_servicio> <comando ejecuta dentro del contenedor>
ej: docker compose run node npm run startdev 

https://www.docker.com/blog/keep-nodejs-rockin-in-docker/

https://burnedikt.com/dockerized-node-development-and-mounting-node-volumes/

https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-set-environment-variables-in-linux/

https://medium.com/@jonatascastro12/understanding-self-signed-certificate-in-chain-issues-on-node-js-npm-git-and-other-applications-ad88547e7028

https://stackoverflow.com/questions/52940430/sslerror-ssl-decryption-failed-or-bad-record-mac-decryption-failed-or-bad-re

proxy 

https://stackoverflow.com/questions/9626990/receiving-error-error-ssl-error-self-signed-cert-in-chain-while-using-npm/35510347#35510347


librerias debian puppeter 
https://stackoverflow.com/questions/62345581/node-js-puppeteer-on-docker-no-usable-sandbox

## issues 

en windows instalar dependencias como adminstrador puppeter chrome 
https://gist.github.com/andrei-tofan/b75082574544aee19de1295a48323ad5


https://github.com/puppeteer/puppeteer/issues/1994


https://hackernoon.com/alpine-docker-image-with-secured-communication-ssl-tls-go-restful-api-128eb6b54f1f



&& npm install sharp
                       && npm config set strict-ssl false
                       && npm add --unsafe-perm puppeteer  
                       && npm install 