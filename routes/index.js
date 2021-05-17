var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs')
const  puppet  = require('../controller/puppet');

// var htmlToImage = require('html-to-image'); 
//https://www.npmjs.com/package/html-to-image




/* GET home page. */
router.get('/a', function(req, res, next) {
  res.render('webworkerjspdf', { title: 'Express' });
});


router.get('/print', function(req, res, next) {
  
  res.render('screenshot');
});

router.get('/dc', function(req, res, next) {
  res.render('domcert');
});

router.get('/dco', function(req, res, next) {
  res.render('extractcssdomcert');
});

router.get('/htc', function(req, res, next) {
  res.render('htc');
});

router.post('/m', async function(req, res, next) {
  let {fondo,domtext,format} = req.body;
  // console.log(puppet.merge(fondo,domtext));
  let response = await puppet.merge(fondo,domtext,format);

  res.send(response);

});

router.post('/q', async function(req, res, next) {
  let  { html }  = req.body;
  let response = await puppet.htmlToImg(html);
  res.send(response);
});

router.post('/p', async function(req, res, next) {
  // console.log(puppet.svgTopng());
  let response = await puppet.svgTopng();
  res.send(response);
});

router.get('/getPdf', async function(req, res, next) {


  let {name_pdf, name_img} = req.query;
  
  await puppet.imgToPdf(name_pdf,name_img);
  
  var path_file = `${path.resolve('./')}/imagemerge/${name_pdf}.pdf`;
  
  var file = fs.createReadStream(path_file);
  var stat = fs.statSync(path_file);
  
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename='+ name_pdf + '.pdf');
  
  file.pipe(res);

});

router.post('/getBlobPdf', async function(req, res, next) {
  
  let {name_pdf, name_img} = req.body;
  
  let {response} = await puppet.pdfToBlob(name_pdf,name_img);
  
  res.send(response);

});

router.post('/convertHtmlToPdf', async function (req, res, next) {

  let {
    name_pdf,
    html
  } = req.body;

  // await puppet.convertHtmlToPdf(name_pdf,html);


  console.log('-- ini -- ');
  // let { //   response // } = await puppet.convertHtmlToPdf(name_pdf, html);
    
  let response =  await puppet.convertHtmlToPdf(name_pdf, html);
  

  // let responseHttp = {
  //   data: response,
  //   name_pdf: name_pdf
  // }

  // console.log('-- fin -- ');

  // res.send(responseHttp);
   res.send(response);

});




// router.get('/gett', function(req, res, next) {
//   file = 'fondoDiplomaFjsPerkins.svg';
//   fs.access(file, fs.constants.F_OK, (err) => {
//   console.log("🚀 ~ file: index.js ~ line 75 ~ router.get ~ stat.size", stat.size)
//     if (err) {
//       res.set("Content-Type", "text/plain");
//       res.status(404).end("Not found");
//       return false;
//     }

//     var s = fs.createReadStream(file).on("data", function(data) {});

//     s.on("open", function() {
//       type = 'svg/xml';
//       res.set("Content-Type", type);
//       s.pipe(res);
//     });
//   });
//   // let r = fs.readFileSync('fondoDiplomaFjsPerkins.svg');
//   // return res.json({'data': r});
// });

module.exports = router;

