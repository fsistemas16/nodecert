<?php
require __DIR__.'/vendor/autoload.php';


use mikehaertl\wkhtmlto\Pdf;
use mikehaertl\wkhtmlto\Image;
use Anam\PhantomLinux\Path;
use Anam\PhantomMagick\Converter as Converter;

test();
   function test (){
      // https://getcomposer.org/doc/articles/troubleshooting.md#memory-limit-errors
      // $disk =  Storage::disk('temp')->path('');
      // $image = new Image('htmldomcert.html');
       $conv = new Converter();
       // $conv->setAlternateBinary("C:/wamp64/www/Desarrollo/canvasnode/php/vendor/anam/phantomjs-linux-x86-binary/bin");
       $conv->setAlternateBinary("C:\wamp64\www\Desarrollo\canvasnode\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\phantomjs");

 		// die( $conv->getAlternateBinary());
 		// die(Path::binaryPath());
		// $r = $conv->source("<div>holamundo</div>")
		$r = $conv->source('htmldomcert.html');
			    $conv->toPng()
			    ->save('otro.png');
		// echo($r);
		var_dump($r);
        die('s');

       $image  = new Image([
			    'commandOptions' => ['useExec' => true],
			    'binary' => "C:\Program Files\wkhtmltopdf\bin\wkhtmltoimage"
		]);

       // die('s');
       $image->setPage('htmldomcert.html');

   
      // $image->saveAs('C:\wamp64\www\Desarrollo\canvasnode\php\page.png');
      $image->saveAs('D:\page.png');

      // ... or send to client for inline display
      if (!$image->send()) {
          $error = $image->getError();
          echo('-------------1');
          var_dump($error);
          // ... handle error here
      }

      // ... or send to client as file download
      if (!$image->send('page.png')) {
          echo('-------------2');
          $error = $image->getError();
          var_dump($error);
          // ... handle error here
      }
    }