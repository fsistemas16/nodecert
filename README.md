
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

## issues 
https://gist.github.com/andrei-tofan/b75082574544aee19de1295a48323ad5