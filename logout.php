<?php
/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:22:45 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-02 16:47:49
 */

//Sida för att logga ut. Avbryter sessionen och redirectar till login.php
include('includes/config.php');
unset($_SESSION["admin"]);
header("Location:login.php");
?>

