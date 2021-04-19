var express = require('express');
var router = express.Router();
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas');
var htmlToImage = require('html-to-image'); //https://www.npmjs.com/package/html-to-image



 

/* GET home page. */
router.get('/a', function(req, res, next) {
  // return 's';
  res.render('index', { title: 'Express' });
});


router.get('/print', function(req, res, next) {
  res.render('screenshot');
});


router.post('/save', function(req, res, next) {
  // console.log(req.body);
  // var img = new Image();
  
  let htmlContent = req.body.html;
  


 
  // fs.writeFile('helloworld.jpg', img, function (err) {
  //   if (err) return console.log(err);
  //   console.log('Hello World > helloworld.txt');
  // })

  // fs.writeFile('helloworld.jpg', htmlContent, function (err) {
  //   if (err) return console.log(err);
  //   console.log('Hello World > helloworld.txt');
  // })
   res.json('casa');
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


function convertimage(){

}
module.exports = router;

