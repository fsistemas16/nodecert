// const htmlpdf = require("html-pdf");
const fs = require("fs");
const sharp = require("sharp");
const puppeteer = require("puppeteer");
const path = require("path");
const PDFDocument = require("pdfkit");
const moment = require("moment");
const AdmZip = require("adm-zip");


const _getUrlFontsStyle = () => {
    let fonts = ['Roboto','Arial','Abel','RalewayRegular','Exo+2','Montserrat','Montserrat+Regular','Montserrat+Bold','Pattaya'];
    // return "<style>@import url('https://fonts.googleapis.com/css?family=Pattaya|Roboto|RalewayRegular|Exo+2|Abel|Montserrat|Montserrat+Regular|Montserrat+Bold</style>"
    return `<style>@import url('https://fonts.googleapis.com/css?family=${fonts.join('|')}</style>`
}
/**
 * privada usada desde adentro 
 * @param {*} html 
 * @returns 
 */  
const _htmlToImg = async ( filename, html, scale = 1) => {
    console.log('scale: ', scale);
    
    const browser = await puppeteer.launch({
        executablePath: 'google-chrome-stable',
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    // https://github.com/puppeteer/puppeteer/issues/422
    let fonts = _getUrlFontsStyle(); 

    //A4 px
    let options = {
        width: 1122,
        height: 790,
    };
    
    let options_output_size = {
        width: 2244,
        height: 1580,
    };
    
    // page.setViewport({width: options.width, height: options.height, deviceScaleFactor: 2});
    page.setCacheEnabled(false);
    
    await page.setContent(html + fonts, {waitUntil: 'networkidle2'});
  
    await page.addStyleTag({
        path: path.resolve("./public") + "/stylesheets/app2.css"
        // path: path.resolve("./public") + "/stylesheets/app2_original.css",
    });
    
    await page.addStyleTag({
        path: path.resolve("./public") + "/stylesheets/ucc.css"
        // path: path.resolve("./public") + "/stylesheets/ucc_original.css"
    }); 

    let content = await page.content();
    // console.log(content);

    page.setViewport({
        width: options.width,
        height: options.height,
        deviceScaleFactor: scale,
    });


    // page.on("error", function (err) {  
    //     theTempValue = err.toString();
    //     console.log("Error: " + theTempValue);
    // }) 

    let screenshot =  await page.screenshot({
        fullPage: true,
        omitBackground: true,
        encoding: "binary"
    });
    
    await browser.close();
    // let imgBuffer =  Buffer.from(res, 'base64');
    
    return   sharp(screenshot, {
        density: 300
    }).resize({
            fit: sharp.fit.cover,
            width: options_output_size.width,
            height: options_output_size.height,
        })
        .png({
            compressionLevel: 9
        })
        // .toBuffer({resolveWithObject: true}).then((data) => {
        .toBuffer().then((data) => {
            return data; 
        })
}

const _merge = async function (buffer_dom, fondo,  outformat) {
    let path_fondo = `fondos/${fondo}.png`;

    let merge = sharp(path_fondo).composite([{
        input: buffer_dom,
    }]);

    return await merge
        .toBuffer().then((data) => {
            return data;
            // return Buffer.from(data).toString('base64');
        })
        .catch(function (err) {
            console.log("--ERROR png 2 --", err);
            return false;
        });
};







const pdfToBlob = function (blob, is_multiple = false) {
    console.log('pdfToBlob: ', moment().format('mm:ss.SSS'));
    
    doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        autoFirstPage:false
    });
    
    let name = 'output-temp' + moment().format('mmss') + '.pdf';
    // let name = 'output-temp.pdf';
    let path_file = 'imagemerge/' + name ;
    console.log('path_file: ', path_file);
    
    const stream = fs.createWriteStream(path_file);

    doc.pipe(stream);

    if (is_multiple) {

        blob.forEach( (element,i) => {
            
            doc.addPage();
            doc.image(element, 0, 0, {
                fit: [841.89, 595.28]
            });
        });

    }else{
        
        doc.addPage();
        doc.image(blob, 0, 0, {
            fit: [841.89, 595.28]
        });

    }
    
    let res = doc.end();
    
    return new Promise((resolve) => {
         stream.on("finish", function (data) {
            fs.readFile(path_file,'base64',function(err,data){
                resolve(
                     data
                );
            })
        });
    });
};

const pdfToZip = async function (array_blob){
    let zip = new AdmZip();
    
    for await (element of array_blob ) {
        const  data_pdf  = await pdfToBlob(element.dom_img,false);

        zip.addFile(element.name_pdf, Buffer.from(data_pdf, "base64"));
        
    }
    
    console.log('fin zip ');
    return Buffer.from(zip.toBuffer()).toString('base64') ;
    // zip.writeZip('zipp.zip');
}

/**
 * 
 * @param {nombre del pdf sin extension} name_pdf 
 * @param {raw string dom certificado } html 
 * @returns 
 */
const convertHtmlToPdf = async function(name_pdf,html,fondo,options){
    console.log('convertHtmlToPdf: ', moment().format('mm:ss.SSS'));
    // return buffer_dom.data.toString("base64");

    let buffer_dom =  await _htmlToImg(name_pdf,html,options.scale);

    console.log('_htmlToImg: ', moment().format('mm:ss.SSS'));
    
    let buffer_merge = await _merge(buffer_dom, fondo, 'pdf');

    console.log('_merge: ', moment().format('mm:ss.SSS'));
    

    return { data: await  pdfToBlob(buffer_merge,false), name_pdf:name_pdf };
    
}


const convertHtmlToPdfMultiple = async function(dom_certs,name_file,options){
    
    console.log('ini _htmlToImg: ', moment().format('mm:ss.SSS'));
    // return buffer_dom.data.toString("base64");
    let buffer_dom = [];
    
    for await (element of dom_certs ) {
        
        // https://developer.mozilla.org/es/docs/Glossary/Base64 acentos 
        // let html_string = Buffer.from(element.html, 'base64').toString('utf8')
        // buffer_dom.push(await _htmlToImg(element.name_pdf, "'" + html_string + "'", options.scale));
        // console.log('buff: ', html_string.substring(0,2000));
        
        let html_string = decodeURIComponent(element.html);
        
        if(options.output == 'I'){
            
            buffer_dom.push(await _htmlToImg(element.name_pdf,   html_string  , options.scale));
            
        }else{
            //zip     
            buffer_dom.push({
                    name_pdf : element.name_pdf ,
                    dom_img : await _htmlToImg(element.name_pdf,   html_string  , options.scale) 
                });
            }
            
        }
        
        console.log('fin _htmlToImg: ', moment().format('mm:ss.SSS'));

    if(options.output == 'I'){
        
        return { data: await pdfToBlob(buffer_dom,true), name_file : name_file };
    }
    
    return { data: await pdfToZip(buffer_dom),  name_file : name_file };


    
}


module.exports = {
    pdfToBlob,
    convertHtmlToPdf,
    convertHtmlToPdfMultiple
};