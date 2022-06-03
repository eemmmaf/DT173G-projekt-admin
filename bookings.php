<?php
/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:21:45 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-03 02:34:33
 */

 
//Kontroll om session finns. Redirectar till login.php om det ej finns
include('includes/header.php');
if (!isset($_SESSION["admin"])) {
    header("Location: login.php");
}
?>
<main>
    <section class="booking">
        <h2>Bokningar</h2>
        <table>
            <thead>
                <tr>
                    <th>Bokningsnummer</th>
                    <th>Datum</th>
                    <th>Tid</th>
                    <th>Namn</th>
                    <th>Mail</th>
                    <th>Antal gäster</th>
                    <th>Önskemål</th>
                    <th>Ta bort</th>
                    <th>Ändra</th>
                    <th>Skapad</th>
                </tr>
            </thead>
            <tbody id="booking-td">

            </tbody>
        </table>
    </section>
    <form id="form-bookings">
        <h2>Hantera bokning</h2>
        <div id="message-output"></div>
        <!--Kurskod-->
        <div class="flex">
            <!--Kursnamn-->
            <div>
                <label for="fname">Förnamn:</label><br><br>
                <input type="text" id="fname" name="fname"><br>
            </div>
            <div>

                <label for="ename">Efternamn:</label><br><br>
                <input type="text" id="ename" name="ename"><br>

            </div>
        </div>
        <!--Datum och tid-->
        <div class="flex">
            <div>
                <label for="date">Datum: <span class="required">*</span></label><br><br>
                <div id="error-date"></div>
                <div class="icon-flex">
                    <input type="date" id="date" name="date"><br><br><br>
                    <div><i id="i-date" class="fa-solid fa-circle-check"></i></div>
                </div>

            </div>
            <div>
                <label for="time">Tid: <span class="required">*</span></label><br><br>
                <div id="error-time"></div>
                <div class="icon-flex">
                    <select name="time" id="time">

                        <option value="">Tid:</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                        <option value="21:30">21:30</option>
                        <option value="22:00">22:00</option>
                    </select>
                    <div><i id="i-time" class="fa-solid fa-circle-check"></i></div>
                </div>
            </div>
        </div>
        <div class="flex">
            <div>
                <label for="quantity">Antal personer:</label><br><br>
                <select name="quantity" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="5">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div>
                <label for="email">Gästens mailadress:</label><br><br>
                <input type="email" id="email" name="email"><br>
            </div>
        </div>
        <div>
            <label for="textmessage">Önskemål</label><br><br>
<textarea name="textmessage" id="textmessage" rows="4" cols="50"></textarea>
        </div>
        <!--Skicka-->
        <div class="flex-btn">
            <input type="submit" class="submit-btn" value="Lägg till bokning" id="submit-btn">
            <input type="submit" id="change-btn" value="Uppdatera bokningen" class="change-btn">
            <button id="reset" class="reset">Rensa fälten</button>
        </div>
    </form>
</main>
<footer>
    <script src="js/bookings.js"></script>
</footer>

</body>

</html>