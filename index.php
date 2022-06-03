<?php
/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:22:08 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-06-01 15:22:08 
 */

include('includes/header.php');
//Koll om användare är inloggad. Redirectar annars till login-sidan
if (!isset($_SESSION["admin"])) {
    header("Location: login.php");
}
?>
<main>
    <div class="start-flex">
        <div id="bookings">
            <h2>Nya bokningar</h2>
        </div>
        <div id="contact">
            <h2>Kontaktuppgifter</h2>

        </div>
    </div>
</main>
<footer>
</footer>
</body>

</html>