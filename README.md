# DT173G - Projektuppgift - Administrationsgränssnitt
Skapad av Emma Forslund, emfo2102@student.miun.se

Detta repo innehåller filerna till administrationsgränssnittet. Administrationsgränssnittet är en lösenordsskyddad webbplats där admin-personal kan hantera restaurangens matsedel, innehållande maträtter och dryck. Personalen ser innehållet i menyn, kan uppdatera, lägga till och ta bort saker från menyn. På webbplatsen kan även personalen se bordsbokningar, ta bort, skapa bokningar och uppdatera bokningar. PHP, cURL, HTML och JavaScript har använts i detta repo. Denna webbplatsen använder en REST-webbtjänst som är skapad som en annan del av detta projekt. 

## Länkar:
* Länk till administrationsgränssnitt: https://studenter.miun.se/~emfo2102/writeable/projekt_admin/login.php

Användarnamn: Admin   
Lösenord: Password

* Publik webbplats: https://studenter.miun.se/~emfo2102/writeable/trattoriaromantico/index.html

### Login.php
Om användaren inte är inloggad hamnar den automatiskt på login.php. Där görs en kontroll om någon session är aktiv och loggar in personen om session finns. För inloggningen används cURL. Det är endast metoden POST som tillåts för loginapi.php. En kontroll görs om användaren finns och om den finns startas en session och användaren får tillgång till resten av webbplatsen.

### Menu.php och menu.js
Kontroll görs om användaren är inloggad på menu.php och redirectar till login.php om session ej är startad. Här kan admin-personalen lägga till saker i menyn, som sedan visas på den publika webbplatsen Trattoria Romantico. Fetch-anrop görs i JS-filen menu.js. Fetch-anrop med metoden GET görs i funktionen addFood för hämta lagrad mat och addDrink för att hämta lagrad dryck. Dryckerna och maten skrivs ut med varsin funktion där de loopas igenom med forEach. Funktionena updateFood() och updateDrink() gör det möjligt att ändra saker i menyn med fetch-anrop och metoden PUT. Funktionerna deleteFood() och deleteDrink() gör det möjligt at ta bort från menyn med fetch och metoden DELETE. addFood() och addDrink() gör att personalen kan lägga till i menyn med metoden POST och fetch.

## Bookings.php och booking.js
I dessa filer hanteras bokningar. På bookings.php finns ett kontaktformulär där admin kan lägga till bokningar. Bokningar läggs till med ett fetch-anrop med metoden POST. Bokningar kan tas bort med metoden DELETE, bokningar kan uppdateras med metoden PUT och alla lagrade bokningar hämtas med metoden GET. 

### logout.php
Denna sida länkas i huvudnavigeringen. Om användaren trycker på "logout.php" förstörs sessions-variabeln och användaren redirectas till login.php.

## Klona detta repo
git clone https://github.com/Webbutvecklings-programmet/projekt_admin_vt22-eemmmaf.git

/ Emma Forslund, emfo2102@student.miun.se, 2022
