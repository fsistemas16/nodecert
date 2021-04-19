<?php 
// $path="wkhtmltoimg/wkhtmltoimage.exe"; //path to your executable
$path="C:\Program Files\wkhtmltopdf\bin\wkhtmltoimage"; //path to your executable
$url="https://google.com";
// $output_path="D:\imagen.png";
$output_path="hola\imagen.png";
$res = shell_exec("$path $url $output_path");
// $res = shell_exec("mkdir hola");
echo($res);