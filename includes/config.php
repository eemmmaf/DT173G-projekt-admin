<?php
/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:24:09 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-05 19:27:35
 */


//Autoload för klasser
spl_autoload_register(function ($class_name) {
    include 'classes/' . $class_name . '.class.php'; 
});

//aktivera sessioner
session_start();

//Variabel för inställning av databasanslutnings-uppgifter. Sätts till false vid uppladning till miuns server
$developer = false;
if($developer){
//Databasanslutning lokal server
define("DBHOST", "localhost");
define("DBUSER", "dt173g");
define("DBPASS", "Password");
define("DBDATABASE", "dt173g");
// Aktiverar Felmeddelanden 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

}else{
//Databasanslutning för publicerad webbplats
define("DBHOST", 'studentmysql.miun.se');
define("DBUSER", 'emfo2102');
define("DBPASS", 'X8jyGSt@dW');
define("DBDATABASE", 'emfo2102');
}
?>
