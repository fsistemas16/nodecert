// const htmlpdf = require("html-pdf");
const fs = require("fs");
const sharp = require("sharp");
const puppeteer = require("puppeteer");
const path = require("path");
const PDFDocument = require("pdfkit");
const moment = require("moment");



/**
 * privada usada desde adentro 
 * @param {*} html 
 * @returns 
 */  
const _htmlToImg = async ( filename, html, scale = 1) => {
    // const browser = await puppeteer.launch();
    // let scale = scale || 1; 

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

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

    await page.setContent(html);
    
    await page.addStyleTag({
        path: path.resolve("./public") + "/stylesheets/app2_original.css",
        // path: path.resolve("./public") + "/stylesheets/app2.css",
    });
    await page.addStyleTag({
        path: path.resolve("./public") + "/stylesheets/ucc_original.css",
        // path: path.resolve("./public") + "/stylesheets/ucc.css",
    });
    
    page.setViewport({
        width: options.width,
        height: options.height,
        deviceScaleFactor: scale,
    });


    page.on("error", function (err) {  
        theTempValue = err.toString();
        console.log("Error: " + theTempValue);
    }) 

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

const _merge = async function (buffer_dom, outformat) {
    let fondo = 'fondos/fondoDiplomaFjsPerkins.png';

    let merge = sharp(fondo).composite([{
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







const pdfToBlob = function (blob) {
    console.log('pdfToBlob: ', moment().format('mm:ss.SSS'));
    
    doc = new PDFDocument({
        size: "A4",
        layout: "landscape"
    });
    
    let path_file = 'imagemerge/output-temp.pdf';

    const stream = fs.createWriteStream(path_file);

    doc.pipe(stream);

    doc.image(blob, 0, 0, {
        fit: [841.89, 595.28]
    });
    
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

/**
 * 
 * @param {nombre del pdf sin extension} name_pdf 
 * @param {raw string dom certificado } html 
 * @returns 
 */
const convertHtmlToPdf = async function(name_pdf,html,options){
    console.log('convertHtmlToPdf: ', moment().format('mm:ss.SSS'));
    // return buffer_dom.data.toString("base64");
    
    let buffer_dom =  await _htmlToImg(name_pdf,html,options.scale);
    console.log('_htmlToImg: ', moment().format('mm:ss.SSS'));
    
    let buffer_merge = await _merge(buffer_dom, 'pdf');
    console.log('_merge: ', moment().format('mm:ss.SSS'));
    

    return { data: await  pdfToBlob(buffer_merge), name_pdf:name_pdf };
    
}


module.exports = {
    pdfToBlob,
    convertHtmlToPdf
};