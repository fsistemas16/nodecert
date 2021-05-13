const htmlpdf = require("html-pdf");
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
    // console.log("🚀 ~ file: puppet.js ~ line 33 ~ testp ~ content", content);

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

const merge = async function (pfondo, pdomtext, format = ".pdf") {
    format = format || ".pdf";

    let fondo = `imagessharp/${pfondo}`;
    let domtext = `imagespuppeteer/${pdomtext}`;

    let filename = `output-${Math.round(Math.random() * 100) + format}`;

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

    if (format == ".png") {

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

const svgTopng = async function () {
    // sharp("imagessharp/new-file35.830499953295124.png")
    // .metadata().then(function(metadata) {
    //     console.log(metadata)
    // });

    let options = {
        width: 1122 * 2,
        height: 790 * 2,
    };

    let filename = "fondoDiplomaFjsPerkins-" + Math.round(Math.random() * 100);

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

const generate = function (html) {
    var options = {
        height: "1580px",
        width: "2244px",
        border: "0",
        phantomPath: "C:/wamp64/www/Desarrollo/canvasnode/phantomjs-2.1.1-windows/phantomjs-2.1.1-windows/bin/phantomjs.exe",
        quality: "80",
        type: "png",
        zoomFactor: 2,
    };

    htmlpdf
        .create(html, options)
        .toFile(
            "imageshtml2pdf/businesscard2-zoom" +
            options.zoomFactor +
            " - " +
            Math.round(Math.random() * 100) +
            "." +
            options.type,
            function (err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/app/businesscard.pdf' }
            }
        );
};

module.exports = {
    svgTopng,
    htmlToImg,
    merge,
    imgToPdf
};