// importScripts( "/javascripts/jspdflatest.js");  

// postMessage("I\'m working before postMessage(\'ali\').");

// onmessage = function (oEvent) {
//   // postMessage(oEvent.data);
 
//   var img = oEvent.data.img;
//   var id = oEvent.data.id;
//   var jsPDF = jspdf.jsPDF;
  
//   var opt = {
//       jsPDF: {
//           unit: 'mm',
//           format: [297, 210] ,
//           orientation: 'l'
//       }
//   }
  
//   var doc = new jsPDF(opt.jsPDF);
//   // doc.addPage();
//   doc.addImage(img, 'PNG', 0, 0, 297,210, Math.random(), 'FAST');
//   // const odoc = JSON.parse(JSON.stringify(doc));
//   postMessage({'id':id,'blob':doc.output('datauristring')});

  
// };

onmessage = function (event){
  var sec = event.data.sec ; 

  // postMessage({'id': 'ENTRE ' + sec });

  if (sec == 2) {
    setTimeout( p.bind(null,sec) , 2000);
  }


  if (sec == 3) {
    setTimeout( p.bind(null,sec) , 5000);

  }
}

var p = function(sec){
  postMessage({'sec':sec});
}




// self.onmessage = function(e) {
//   let userNum = Number(e.data);
//   fibonacci(userNum);
// }


// function fibonacci(num){
// let a = 1, b = 0, temp;
//   while (num >= 0){
//     temp = a;
//     a = a + b;
//     b = temp;
//     num--;
//   }

//   self.postMessage(b);
// }