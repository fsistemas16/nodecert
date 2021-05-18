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

  console.log('-- ini -- ');
  let response =  await puppet.convertHtmlToPdf(name_pdf, html);
  res.send(response);
  console.log('-- fin -- ');
});


module.exports = router;

