<?php
/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:22:53 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-03 02:29:25
 */

//Kontroll om session finns. Redirectar till login.php om det ej finns
include('includes/header.php');
if (!isset($_SESSION["admin"])) {
    header("Location: login.php");
}
?>
<main>
    <!--Sektion för att hantera menyn-->
    <section class="menu">
        <h2>Hantera meny</h2>

        <!--Tabell för utskrift av förrätter-->
        <div class="table">
            <table>
                <h3>Förrätter</h3>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Ta bort</th>
                        <th>Uppdatera</th>
                    </tr>
                </thead>
                <!--Här skrivs JS-kod ut-->
                <tbody id="appetizer">

                </tbody>
            </table>
        </div>

        <!--Tabell för utskrift av varmrätter-->
        <div class="table">
            <table>
                <h3>Varmrätter</h3>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Ta bort</th>
                        <th>Uppdatera</th>
                    </tr>
                </thead>
                <!--Här skrivs JS-kod ut-->
                <tbody id="maincourse">

                </tbody>
            </table>
        </div>

        <!--Tabell för utskrift av Efterrätter-->
        <div class="table">
            <table>
                <h3>Efterrätter</h3>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Ta bort</th>
                        <th>Uppdatera</th>
                    </tr>
                </thead>
                <!--Här skrivs JS-kod ut-->
                <tbody id="dessert">

                </tbody>
            </table>
        </div>

        <!--Tabell för utskrift av vita viner-->
        <div class="table">
            <table>
                <h3>Vitt vin</h3>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Ta bort</th>
                        <th>Uppdatera</th>
                    </tr>
                </thead>
                <!--Här skrivs JS-kod ut-->
                <tbody id="whitewine">

                </tbody>
            </table>
        </div>

        <!--Tabell för utskrift av röda viner-->
        <div class="table">
            <table>
                <h3>Rött vin</h3>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Ta bort</th>
                        <th>Uppdatera</th>
                    </tr>
                </thead>
                <!--Här skrivs JS-kod ut-->
                <tbody id="redwine">

                </tbody>
            </table>
        </div>

        <!--Tabell för utskrift av öl-->
        <div class="table">
            <table>
                <h3>Öl</h3>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Ta bort</th>
                        <th>Uppdatera</th>
                    </tr>
                </thead>
                <!--Här skrivs JS-kod ut-->
                <tbody id="beer">

                </tbody>
            </table>
        </div>

        <!--Tabell för utskrift av Alkoholfritt-->
        <div class="table">
            <table>
                <h3>Alkoholfritt</h3>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Ta bort</th>
                        <th>Uppdatera</th>
                    </tr>
                </thead>
                <!--Här skrivs JS-kod ut-->
                <tbody id="nonalcohol">

                </tbody>
            </table>
        </div>

    </section>

    <!--Formulär för att lägga till och Uppdatera bokning-->
    <form id="form-food">
        <h2>Lägg till maträtt</h2>
        <!--Kurskod-->
        <div class="flex">
            <!--Kursnamn-->
            <div>
                <label for="food-name">Maträttens namn:</label><br><br>
                <input type="text" id="food-name" name="food-name"><br>
            </div>
            <div>

                <label for="food-price">Pris:</label><br><br>
                <input type="number" id="food-price" name="food-price"><br>

            </div>
        </div>
        <div class="flex">
            <div>
                <label for="food-category">Kategori:</label><br><br>
                <select name="food-category" id="food-category">
                    <option value="1">Förrätt</option>
                    <option value="2">Varmrätt</option>
                    <option value="3">Efterrätt</option>
                </select>
            </div>
            <div>
                <label for="food-type">Typ:</label><br><br>
                <select name="food-type" id="food-type">
                    <option value="1">Grill</option>
                    <option value="2">Pasta</option>
                    <option value="3">Pizza</option>
                    <option value="4">Sött</option>
                    <option value="5">Förrätt</option>
                </select>
            </div>
        </div>
        <div>
            <label for="food-description">Beskrivning</label><br><br>
            <textarea name="food-description" id="food-description" rows="4" cols="50">
    </textarea>
        </div>
        <!--Skicka-->
        <div class="flex-btn">
            <input type="submit" class="food-submit-btn" value="Lägg till maträtt" id="food-submit-btn">
            <button id="reset" class="reset">Rensa fälten</button>
        </div>
    </form>

    <!--Formulär nummer 2 för drickor-->
    <form id="form-drink">
        <h2>Lägg till dryck</h2>
        <!--Kurskod-->
        <div class="flex">
            <!--Kursnamn-->
            <div>
                <label for="drink-name">Dryckens namn:</label><br><br>
                <input type="text" id="drink-name" name="drink-name"><br>
            </div>
            <div>

                <label for="drink-price">Pris:</label><br><br>
                <input type="number" id="drink-price" name="drink-price"><br>

            </div>
        </div>
        <div class="flex">
            <div>
                <label for="drink-category">Kategori:</label><br><br>
                <select name="drink-category" id="drink-category">
                    <option value="1">Vitt vin</option>
                    <option value="2">Rött vin</option>
                    <option value="3">Öl</option>
                    <option value="4">Alkoholfritt</option>
                </select>
            </div>
            <div>
                <label for="drink-description">Dryckens beskrivning</label><br><br><textarea name="drink-description" id="drink-description" rows="4" cols="50"></textarea>
            </div>
        </div>
        <!--Skicka-->
        <div class="flex-btn">
            <input type="submit" class="drink-submit-btn" value="Lägg till dryck" id="drink-submit-btn">
            <button id="reset" class="reset">Rensa fälten</button>
        </div>
    </form>
</main>
<footer>
    <script src="js/menu.js"></script>
</footer>

</body>

</html>