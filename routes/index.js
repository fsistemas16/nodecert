var express = require('express');
var router = express.Router();
const  puppet  = require('../controller/puppet');
const fs = require('fs')

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
  let {fondo,domtext} = req.body;
  // console.log(puppet.merge(fondo,domtext));
  let response = await puppet.merge(fondo,domtext);
  res.send(response);
});

router.post('/q', async function(req, res, next) {
  let  { html }  = req.body;
  let response = await puppet.testp(html);
  res.send(response);
});

router.post('/p', async function(req, res, next) {
  // console.log(puppet.svgTopng());
  let response = await puppet.svgTopng();
  res.send(response);
});



router.get('/gett', function(req, res, next) {
  file = 'fondoDiplomaFjsPerkins.svg';
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      res.set("Content-Type", "text/plain");
      res.status(404).end("Not found");
      return false;
    }

    var s = fs.createReadStream(file).on("data", function(data) {});

    s.on("open", function() {
      type = 'svg/xml';
      res.set("Content-Type", type);
      s.pipe(res);
    });
  });
  // let r = fs.readFileSync('fondoDiplomaFjsPerkins.svg');
  // return res.json({'data': r});
});

module.exports = router;

