
const htmlpdf = require("html-pdf");
const fs = require('fs')
const sharp = require("sharp")
const puppeteer = require("puppeteer")
var path = require('path');

/*
https://answers.microsoft.com/en-us/windows/forum/all/how-to-check-dpi-on-png/3e18a21c-16ae-464e-b80d-a7d73c2e121c
https://pptr.dev/#?product=Puppeteer&version=v9.1.1&show=api-pageaddscripttagoptions
*/
const hola = function(){
    return 'puppet';
}

const testp = async (html) => {
  
    // const browser = await puppeteer.launch();
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    })
    
    const page = await browser.newPage();

    //A4
    let options = {
        // width: 1122 + 140 ,
        // height: 790 + 100 
        width: 1122 ,
        height: 790 
    }


    // page.setViewport({width: options.width, height: options.height, deviceScaleFactor: 2});
    
    await page.setContent(html);
    await page.addStyleTag({path: path.resolve('./public') + '/stylesheets/app2.css'})
    await page.addStyleTag({path: path.resolve('./public') +  '/stylesheets/ucc.css'})
    page.setViewport({ width: options.width  , height :options.height  , deviceScaleFactor: 2});

    
    // console.log(page.viewport())    ;
    // let content = await page.content();
    // console.log("🚀 ~ file: puppet.js ~ line 33 ~ testp ~ content", content);

    
    
    let filename = `puppeter-${Math.round(Math.random() * 100)}`  ;
    console.log(filename);

    await page.screenshot({
            path: `imagespuppeteer/${filename}.png`,
            fullPage: true,
            omitBackground:true,
            // clip:{
            //         // width: 1122  ,
            //         // height: 790 ,
            //         // width: 1122  + 70,
            //         // height: 790 + 200 ,
            //         width: options.width - 70,
            //         height: options.height - 10,
            //         x:0,
            //         y:0
            // } 

        });
    
    console.log(filename);
    
    await browser.close();

    sharp(`imagespuppeteer/${filename}.png`,{ density: 300})
        .resize(    { 
            fit: sharp.fit.cover,
            width: 2244,
            height: 1580, 
            // width: options.width,
            // height: options.height ,
        })
        .png(
            {
                quality:100,
                compressionLevel:5
            }
        )
        .toFile(`imagespuppeteer/${filename}-resize.png`)

        
    return { 'filename'  : filename + '-resize.png' } ;
   

  };

const merge = async function(pfondo,pdomtext){
   
    // let fondo = 'imagessharp/fondoDiplomaFjsPerkins-69.png';
    // let domtext = 'imagespuppeteer/puppeter-73-resize.png';
    
    let fondo = 'imagessharp/' + pfondo; 
    let domtext = 'imagespuppeteer/'  + pdomtext;
    let filename = 'output-'  + Math.round(Math.random() * 100) + '.png';
    
    let merge = await sharp(fondo)
        .composite([{ input: domtext  }])
        .toBuffer({ resolveWithObject: true });
        // .toFile('imagemerge/' + filename);

    return   merge.data.toString("base64")  ;    
    return  { 'binary': merge.data.toString("base64") } ;    

    return { 'filename'  : filename } ;

    
}

const generate = function(html){
    
    var options = { 
        height: '1580px', 
        width: '2244px',
        border: '0',
        phantomPath: "C:/wamp64/www/Desarrollo/canvasnode/phantomjs-2.1.1-windows/phantomjs-2.1.1-windows/bin/phantomjs.exe",
        quality: "80",
        type: "png",      
        zoomFactor : 2
    };

    htmlpdf.create(html, options).toFile('imageshtml2pdf/businesscard2-zoom' + options.zoomFactor  + ' - '+ Math.round(Math.random() *100)   + '.'  + options.type, function(err, res) {
        if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
      });
}


const svgTopng = async function (){
    // sharp("imagessharp/new-file35.830499953295124.png")
    // .metadata().then(function(metadata) {
    //     console.log(metadata)
    // });

    
    let options = {
        // width: 1122 + 140 * 2 ,
        // height: 790 + 100 * 2 
        width: 1122 * 2 ,
        height: 790 * 2 
    }

    let filename = "fondoDiplomaFjsPerkins-" +Math.round(Math.random() *100);

    // console.log(filename);

    sharp("fondoDiplomaFjsPerkins.svg",{ density: 300})
    .resize(    { 
        fit: sharp.fit.cover,
        // height: 1580, 
        // width: 2244,
        width: options.width, 
        height: options.height
    })
    .png(
        {
            quality:100,
            compressionLevel:5
        }
    )
    .toFile("imagessharp/" + filename + ".png")
    .then(function(info) {
        console.log('info',info)
    })
    .catch(function(err) {
        console.log(err)
    })

    return {'filename': filename };
}





module.exports = { generate, hola, svgTopng, testp, merge }

