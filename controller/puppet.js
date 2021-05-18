// const htmlpdf = require("html-pdf");
const fs = require("fs");
const sharp = require("sharp");
const puppeteer = require("puppeteer");
const path = require("path");
const PDFDocument = require("pdfkit");


const htmlToImg = async (html) => {
    // const browser = await puppeteer.launch();

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    //A4
    let options = {
        // width: 1122 + 140 ,
        // height: 790 + 100
        width: 1122,
        height: 790,
    };

    // page.setViewport({width: options.width, height: options.height, deviceScaleFactor: 2});

    await page.setContent(html);
    
    await page.addStyleTag({
        path: path.resolve("./public") + "/stylesheets/app2.css",
    });
    await page.addStyleTag({
        path: path.resolve("./public") + "/stylesheets/ucc.css",
    });
    page.setViewport({
        width: options.width,
        height: options.height,
        deviceScaleFactor: 2,
    });

    // console.log(page.viewport())    ;
    // let content = await page.content();

    let filename = `puppeter-${Math.round(Math.random() * 100)}`;
    console.log(filename);

    await page.screenshot({
        path: `imagespuppeteer/${filename}.png`,
        fullPage: true,
        omitBackground: true,
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

    
    sharp(`imagespuppeteer/${filename}.png`, {
            density: 300
        })
        .resize({
            fit: sharp.fit.cover,
            width: 2244,
            height: 1580,
            // width: options.width,
            // height: options.height ,
        })
        .png({
            quality: 100,
            compressionLevel: 5,
        })
        .toFile(`imagespuppeteer/${filename}-resize.png`);

    return {
        filename: filename + "-resize.png"
    };
};

/**
 * privada usada desde adentro 
 * @param {*} html 
 * @returns 
 */  
const _htmlToImg = async ( filename, html) => {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    //A4
    let options = {
        width: 1122,
        height: 790,
    };

    // page.setViewport({width: options.width, height: options.height, deviceScaleFactor: 2});

    await page.setContent(html);
    
    await page.addStyleTag({
        path: path.resolve("./public") + "/stylesheets/app2.css",
    });
    await page.addStyleTag({
        path: path.resolve("./public") + "/stylesheets/ucc.css",
    });
    
    page.setViewport({
        width: options.width,
        height: options.height,
        deviceScaleFactor: 2,
    });

    let res =  await page.screenshot({
        
        path: `imagespuppeteer/${filename}.png`,
        fullPage: true,
        omitBackground: true,
        encoding:"base64"
    });
    
    // console.log('res: ', res);

    await browser.close();

    let imgBuffer = Buffer.from(res, 'base64');
    
//   return   sharp(`imagespuppeteer/${filename}.png`, {
  return   sharp(imgBuffer, {
        density: 300
    }).resize({
        fit: sharp.fit.cover,
        width: 2244,
        height: 1580,
        // width: options.width,
        // height: options.height ,
        })
        .png({
            quality: 100,
            compressionLevel: 5,
        })
        .toBuffer().then((data) => {
            // console.log(data); 
            return data; 
            return Buffer.from(data).toString('base64');
        })
        // .toFile(`imagespuppeteer/${filename}-resize.png`).then((metadata) => {
        //     console.log(metadata); 
        //     return { filename: filename + "-resize" };
        // });
}

const merge = async function (pfondo, pdomtext, format ) {
    format = format || ".png";

    // let fondo = `imagessharp/${pfondo}`;
    let fondo = 'fondos/fondoDiplomaFjsPerkins.png';
    // let fondo = `fondos/${pfondo}`;
    // console.log('fondo: ', fondo);
    // // let domtext = `imagespuppeteer/${pdomtext}`;
    // let domtext = `imagespuppeteer/${pdomtext}`;
    let domtext =  'imagespuppeteer/certificado14153-1919835-resize.png';
    // console.log('domtext: ', domtext);
    
    let filename = `output-${Math.round(Math.random() * 100) + format}`;
    
    console.log('filename: ', filename);

    // let merge = await sharp(fondo)
    //     .composite([{ input: domtext  }])
    //     .toBuffer({ resolveWithObject: true })
    //     .catch(function(err) {
    //         console.log('--ERROR--',err)
    //     });
    // .toFile('imagemerge/' + filename);


    let merge = sharp(fondo).composite([{
        input: domtext
    }]);

    // if (format == ".png") {
    if (format == "bin") {

        let result = await merge
            .toBuffer({
                resolveWithObject: true
            })
            .catch(function (err) {
                console.log("--ERROR png --", err);
            });

        return result.data.toString("base64");
    }

    let result = await merge
        .toFile('imagemerge/' + filename)
        .catch(function (err) {
            console.log("--ERROR png --", err);
        });

    return {
        'result': filename
    }

};

const _merge = async function (dom_img, outformat) {
    outformat = outformat || "bin";

    let fondo = 'fondos/fondoDiplomaFjsPerkins.png';
    // let path_dom_img = `imagespuppeteer/${dom_img}.png`;
    
    let path_dom_img = dom_img;

    // let filename = dom_img + '.png';

    // console.log("filename:", filename)

    console.log('path_dom_img: ', path_dom_img);

    let merge = sharp(fondo).composite([{
        input: path_dom_img
    }]);

    return await merge
        // .toFile('imagemerge/' + filename).then( (metadata) => {
        //     return {
        //         'result': filename
        //     } 
        // })
        .toBuffer().then((data) => {
            return data;
            return Buffer.from(data).toString('base64');
        })
        .catch(function (err) {
            console.log("--ERROR png 2 --", err);
            return false;
        });

    

};

const svgTopng = async function () {
    // sharp("imagessharp/new-file35.830499953295124.png")
    // .metadata().then(function(metadata) {
    //     console.log(metadata)
    // });

    let options = {
        width: 1122 * 2,
        height: 790 * 2,
    };

    // let filename = "fondoDiplomaFjsPerkins-" + Math.round(Math.random() * 100);
    let filename = "fondoDiplomaFjsPerkins";

    // console.log(filename);

    sharp("fondoDiplomaFjsPerkins.svg", {
            density: 300
        })
        .resize({
            fit: sharp.fit.cover,
            // height: 1580,
            // width: 2244,
            width: options.width,
            height: options.height,
        })
        .png({
            quality: 100,
            compressionLevel: 5,
        })
        .toFile("imagessharp/" + filename + ".png")
        // .toFile("fondos/" + filename + ".png")
        .then(function (info) {
            console.log("info", info);
        })
        .catch(function (err) {
            console.log(err);
        });

    return {
        filename: filename
    };
};

const imgToPdf = function (name_pdf, name_img) {
    //sizes http://pdfkit.org/docs/paper_sizes.html#a-series
    
    let path_file = `imagemerge/${name_pdf}.pdf`;

    doc = new PDFDocument({
        size: "A4",
        layout: "landscape"
    });
    
    // doc.pipe(fs.createWriteStream('imagemerge/output-417.pdf'));
    const stream = fs.createWriteStream(path_file);

    doc.pipe(stream);

    doc.image(`imagemerge/${name_img}.png`, 0, 0, {
        fit: [841.89, 595.28]
    });

    let result = doc.end();

    // await new Promise(resolve => {
    return new Promise((resolve) => {
        stream.on("finish", function () {
            resolve({
                response: name_pdf
            });
        });
    });
};

const pdfToBlob_old = function (name_pdf, name_img) {
    //sizes http://pdfkit.org/docs/paper_sizes.html#a-series
    
    let path_file = `imagemerge/${name_pdf}.pdf`;

    doc = new PDFDocument({
        size: "A4",
        layout: "landscape"
    });
    
    // doc.pipe(fs.createWriteStream('imagemerge/output-417.pdf'));
    const stream = fs.createWriteStream(path_file);

    doc.pipe(stream);

    // doc.image(`imagemerge/${name_img}.png`, 0, 0, {
    doc.image(`imagemerge/${name_img}`, 0, 0, {
        fit: [841.89, 595.28]
    });

    let result = doc.end();

    // await new Promise(resolve => {
    return new Promise((resolve) => {
        stream.on("finish", function () {
            fs.readFile(path_file,'base64',function(err,data){
                resolve({
                    response: data
                });
            })
        });
    });
};

const pdfToBlob = function (name_pdf, blob) {
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
    
    let result = doc.end();

    console.log('result: ', result);



    // // await new Promise(resolve => {
    return new Promise((resolve) => {
         stream.on("finish", function (data) {
            fs.readFile(path_file,'base64',function(err,data){
                resolve({
                    response: data
                });
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
const convertHtmlToPdf = async function(name_pdf,html){

    // let  { filename } = await _htmlToImg(name_pdf,html);
    let base64Dom =  await _htmlToImg(name_pdf,html);
    
    //    let { result } = await _merge(filename, 'pdf');
    let blobMerge = await _merge(base64Dom, 'pdf');
//    return  test(blobMerge); 

   let r = await  pdfToBlob(name_pdf,blobMerge)
    return r ; 
}



module.exports = {
    svgTopng,
    htmlToImg,
    merge,
    imgToPdf,
    pdfToBlob,
    convertHtmlToPdf
};