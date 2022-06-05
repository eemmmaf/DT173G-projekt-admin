<?php
/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:22:24 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-05 11:57:36
 */


include('includes/header.php');
//Kontroll om session finns. Redirectar till login.php om det ej finns
if (isset($_SESSION["admin"])) {
    header("Location: index.php");
}

//Om formuläret fylls i och postas
if (isset($_POST['username'])) {

    $username = $_POST['username'];
    $password = $_POST['password'];

    //kontrollerar att användarnamn och lösenord är ifyllda
    if (empty($username) || empty($password)) {
        $errormessage = "<p class='error-p'>Fyll i användarnamn och lösenord</p>";
    } else {
        //Om användarnamn och lösenord är ifyllda, kontrollera att användaren finns i databasen via webbtjänsten = cURL anrop

        //POST med cURL. Sparar länken till API:et i variabeln $url
        $url = 'https://studenter.miun.se/~emfo2102/writeable/projekt_webservice/loginapi.php'; //instansiera ny cURL session
        $curl = curl_init();
        //array med username och password
        $user = array("username" => $username, "password" => $password);
        //omvandlar $user-arrayen till json med json_encode
        $json_string = json_encode($user);
        //inställningar för cURL
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $json_string);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        //Response och statuskod
        $data = json_decode(curl_exec($curl), true);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        //Om användaren finns i databasen
        if ($httpcode === 200) {
            $_SESSION['admin'] = $username;

            header("Location: index.php");
        } else {
            $errormessage = "<p class='error-p'>Felaktigt användarnamn eller lösenord</p>";
        }
    }
}

?>
<main>
    <form id="login" method="POST" action="login.php">
        <h2>Logga in som administratör</h2>
        <div>
            <!--Utskrift av felmeddelanden-->
            <?php
            if (isset($errormessage)) {
                echo $errormessage;
            }
            ?>
        </div>
        <!--Användarnamn-->
        <label for="username">Användarnamn:</label>
        <input type="text" name="username" id="username">
        <!--Lösenord-->
        <label for="password">Lösenord:</label>
        <input type="password" name="password" id="password">
        <!--Skicka-->
        <input type="submit" value="Logga in" id="login-btn" name="login-btn">
    </form>
</main>
</body>

</html>