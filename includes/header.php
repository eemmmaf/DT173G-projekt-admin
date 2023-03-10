<?php
/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:24:30 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-04 18:46:11
 */

include_once("includes/config.php");
?>
<!DOCTYPE html>
<html lang="sv">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Admin</title>
</head>

<body>
    <header>
        <div class="header">
            <a href="index.php"><img src="loggan.svg" alt=""></a> <?php
                                                                    //Gör en kontroll om en session är startad. Om session finns skrivs menyn ut
                                                                    if (isset($_SESSION['admin'])) { ?>
                <nav class="desktop-nav">
                    <ul>
                        <li><a href="menu.php">Hantera meny</a></li>
                        <li><a class="active" href="bookings.php">Bokningar</a></li>
                        <li><a class="logout-btn" href="logout.php">Logga ut</a></li>
                    </ul>
                </nav>
            <?php
                                                                    }
            ?>
        </div>
    </header>