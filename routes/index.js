var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs')
const moment = require("moment");
const { reset } = require('nodemon');

const  puppet  = require('../controller/puppet');

const  puppetOnDisk  = require('../controller/puppetOnDisk');







router.get('/dc', function(req, res, next) {
  res.render('domcert');
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
  
  let response = await puppetOnDisk.svgTopng();

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

  let default_options = {
    scale : 2
  } 

  let {
    name_pdf,
    html,
    fondo,
    options
  } = req.body;
  
  console.log('options: ', options);

  let options_output = typeof(options) == 'undefined' || options == '' ? default_options : options;

  let response =  await puppet.convertHtmlToPdf(name_pdf, html, fondo,options_output);
  
  console.log('response: ', moment().format('mm:ss.SSS'));
  
  res.send(response);

});
router.post('/convertHtmlToPdfMultiple', async function (req, res, next) {
  
  let default_options = {
    scale : 1,
    tipo_emision : "Z"
  } 

  let {
    dom_certs,
    name_file,
    options
  } = req.body;
  

  console.log('options_output: ', typeof(options));

  let options_output = typeof(options) == 'undefined' || options == '' ? default_options  : options;

  let response =  await puppet.convertHtmlToPdfMultiple(dom_certs,name_file,options_output);
  
  res.send(response);

});

router.post('/convertSvgToPng', async function (req, res, next) {

  puppetOnDisk.svgToPng();
  res.send('d');

});


router.get('/ip', async function (req, res, next) {


  var ips = req.ip;
  res.send(ips);

});
module.exports = router;

