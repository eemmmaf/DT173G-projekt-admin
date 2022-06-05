<?php
/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:22:08 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-04 18:47:35
 */

include('includes/header.php');
//Koll om användare är inloggad. Redirectar annars till login-sidan
if (!isset($_SESSION["admin"])) {
    header("Location: login.php");
}
?>
<main>
    <section class="index-section">
        <h1>
            Administrationssidan för anställda på Trattoria Romantico
        </h1>
        <p>På denna webbplats kan du administrera restaurangens meny och bokningar. Det är möjligt att ta bort, ändra och lägga till bokningar och maträtter/dryck. </p>
        <article id="contact">
            <h2>Kontaktuppgifter</h2>
            <p><b>För frågor om bokningar och menyn, ring eller maila restaurangansvarige Emma</b></p>
            <ul>
                <li>076 101 54 74</li>
                <li><a href="mailto:emfo2102@student.miun.se">emfo2102@student.miun.se</a> </li>
            </ul>
            <br><br>
            <p><b>För tekniska frågor, ring restaurangens teknikansvarige Emma</b></p>
            <ul>
                <li>076 101 54 74</li>
            </ul>
        </article>
    </section>
    <section id="aktuellt">
        <h2>Aktuellt</h2>
        <article class="aktuellt">
            <h3>AW på Boule bar</h3>
            <img src="images/boule.jpg" alt="man står i en boule-bana">
            <p>Äntligen är sommaren här! För att fira in sommaren ses vi på Boule bar i Hagaparken. Vi bjuder på mat, dryck och obegränsat med spel. Vi ses klockan 17:00! <br><br>
                /Emma </p>
        </article>
    </section>
</main>
<footer>
    <p>Emma Forslund | Trattoria Romantico | emfo2102@student.miun.se</p>
</footer>
</body>

</html>