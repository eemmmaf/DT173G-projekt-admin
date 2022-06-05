/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:23:26 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-04 19:50:17
 */

"use strict";

//url:en till webbtjänsten drinkapi och foodapi sparad i variabler
let urlDrink = "http://localhost/projekt_webservice/drinkapi.php";
let urlFood = "http://localhost/projekt_webservice/foodapi.php";

//Variabler för matens inputfält
const foodNameInput = document.getElementById("food-name");
const foodPriceInput = document.getElementById("food-price");
const foodCategoryInput = document.getElementById("food-category");
const foodTypeInput = document.getElementById("food-type");
const foodDescriptionInput = document.getElementById("food-description");
//Variabel för utskrift av meddelande
let messageData = document.getElementById("message-change");
let outputFood = document.getElementById("message-food");
let outputDrink = document.getElementById("output-drink");
let outputDeleted = document.getElementById("deleted-menu");
//Variabler för dryckens input fält
const drinkNameInput = document.getElementById("drink-name");
const drinkPriceInput = document.getElementById("drink-price");
const drinkCategoryInput = document.getElementById("drink-category");
const drinkDescriptionInput = document.getElementById("drink-description");
//Knappar
const foodSubmitBtn = document.getElementById("food-submit-btn");
const drinkSubmitBtn = document.getElementById("drink-submit-btn");

//Eventlisteners
//Lägger till eventlistener på submit-knapparna
foodSubmitBtn.addEventListener("click", addFood);
drinkSubmitBtn.addEventListener("click", addDrink);

//Läser in Mat och dryck när sidan läses in 
window.onload = init;
function init() {
    getFood();
    getDrinks();
}

//Läser in maträtterna från webbtjänsten foodapi och anropar showFood som visar maträtterna
function getFood() {
    fetch(urlFood)
        .then(response => {
            if (response.status != 200) {
                return
            }

            return response.json()
                .then(data => showFood(data))
                .catch(err => console.log(err))
        })
}


//Skriver ut maträtterna. Funktionen anropas i getFood
function showFood(foods) {

    const appetizerOutput = document.getElementById("appetizer");
    const mainOutput = document.getElementById("maincourse");
    const dessertOutput = document.getElementById("dessert");
    appetizerOutput.innerHTML = "";
    mainOutput.innerHTML = "";
    dessertOutput.innerHTML = "";


    //Utskrift av mat. Skrivs ut beroende på vilken kategori maten har. Här används contenteditable
    foods.forEach(food => {
        if (food.food_category_id == "1") {
            appetizerOutput.innerHTML += ` <td class="food-td" id="name${food.food_id}" contenteditable> ${food.food_name} </td><td contenteditable class="food-td" id="price${food.food_id}"> ${food.food_price}</td><td contenteditable class="food-td" id="description${food.food_id}"> ${food.food_description}</td><td class="food-td-hidden" id="category${food.food_id}"> ${food.food_category_id} </td><td class="food-td-hidden" id="type${food.food_id}"> ${food.food_type_id} </td><td id="${food.food_id}" class="food-td"><button id="${food.food_id}"class="delete-btn">Ta bort</button</td> <td><button class="edit-btn" data-id="${food.food_id}">Uppdatera</td><tr>`;
        }
        if (food.food_category_id == "2") {
            mainOutput.innerHTML += ` <td class="food-td" id="name${food.food_id}" contenteditable> ${food.food_name} </td><td contenteditable class="food-td" id="price${food.food_id}"> ${food.food_price}</td><td contenteditable class="food-td" id="description${food.food_id}"> ${food.food_description}</td><td class="food-td-hidden" id="category${food.food_id}"> ${food.food_category_id} </td><td class="food-td-hidden" id="type${food.food_id}"> ${food.food_type_id} </td><td id="${food.food_id}" class="food-td"><button id="${food.food_id}"class="delete-btn">Ta bort</button</td> <td><button class="edit-btn" data-id="${food.food_id}">Uppdatera</td><tr>`;
        }
        if (food.food_category_id == "3") {
            dessertOutput.innerHTML += `<td class="food-td" id="name${food.food_id}" contenteditable> ${food.food_name} </td><td contenteditable class="food-td" id="price${food.food_id}"> ${food.food_price}</td><td contenteditable class="food-td" id="description${food.food_id}"> ${food.food_description}</td><td class="food-td-hidden" id="category${food.food_id}"> ${food.food_category_id} </td><td class="food-td-hidden" id="type${food.food_id}"> ${food.food_type_id} </td><td id="${food.food_id}" class="food-td"><button id="${food.food_id}"class="delete-btn">Ta bort</button</td> <td><button class="edit-btn" data-id="${food.food_id}">Uppdatera</td><tr>`;
        }
    })

    //Loopar igenom knapparna och lägger till en eventlistener som tar bort en rad med klick på raden
    let deleteBtn = document.getElementsByClassName("delete-btn");
    for (let y = 0; y < deleteBtn.length; y++) {
        deleteBtn[y].addEventListener("click", deleteFood);
    }

    //Loopar igenom ändra-knapparna och lägger till en eventlistener. Vid klick anropas funktionen updateFood
    let editBtn = document.getElementsByClassName("edit-btn");
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", updateFood);
    }
}


//Funktion för att lägga till en maträtt
function addFood(event) {
    event.preventDefault();


    //Sparar inmatad data i variabler
    let foodName = foodNameInput.value;
    let foodPrice = foodPriceInput.value;
    let foodCategory = foodCategoryInput.value;
    let foodType = foodTypeInput.value;
    let foodDescription = foodDescriptionInput.value;

    //Gör en kontroll om något fält är tomt eller NULL
    if (foodName && foodPrice && foodCategory && foodType && foodDescription == "" || null) {
        messageData.innerHTML += `<p>${data["message"]}</p>`
    } else {

        //Gör om till JSON-format
        let jsonStr = JSON.stringify({
            food_name: foodName,
            food_description: foodDescription,
            food_price: foodPrice,
            food_category_id: foodCategory,
            food_type_id: foodType
        });


        //Fetch-anrop med POST
        fetch(urlFood, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => showFoodMessage(data))
            .then(data => clearInput())//Tömmer fälten
            .catch(err => console.log(err))
    }
}


//Funktion för att uppdatera en maträtt
function updateFood(event) {

    //Hämtar rättens id
    let foodId = event.target.dataset.id;

    //Läser in det som är sparat och sparar i variabler
    let dataName = document.getElementById("name" + foodId).innerHTML;
    let dataDescription = document.getElementById("description" + foodId).innerHTML;
    let dataPrice = document.getElementById("price" + foodId).innerHTML;
    let dataCategory = document.getElementById("category" + foodId).innerHTML;
    let dataType = document.getElementById("type" + foodId).innerHTML;


    //Gör om till JSON
    let jsonStr = JSON.stringify({
        food_id: foodId,
        food_name: dataName,
        food_price: dataPrice,
        food_description: dataDescription,
        food_category_id: dataCategory,
        food_type_id: dataType
    });

    //Fetch-anrop med PUT och rättens id som parameter i URL
    fetch(urlFood + "?food_id=" + foodId, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => showDeletedMessage(data))
        .then(data => clearInput()) //Tömmer formulären
        .catch(err => console.log(err))
}



//Funktion för att radera maträtter i menyn
function deleteFood(event) {
    //Sparar rättens id
    let food_id = event.target.id;

    //Skickar med kursens ID som parameter och gör anrop med DELETE
    fetch(urlFood + "?food_id=" + food_id, {
        "method": "DELETE",
    })
        .then(response => response.json())
        .then(data => showDeletedMessage(data))
        .then(data => getFood()) //Hämtar maten på nytt
        .catch(err => console.log(err))
}


//Funktion för att hämta drickorna
function getDrinks() {
    fetch(urlDrink)
        .then(response => {
            if (response.status != 200) {
                return
            }

            return response.json()
                .then(data => showDrink(data)) //Anropar funktionen som hämtar drycken
                .catch(err => console.log(err))
        })
}


//Funktion för att lägga till en dryck
function addDrink(event) {
    //Laddar inte om sidan automatiskt
    event.preventDefault();


    //Sparar inmatad data i variabler
    let drinkName = drinkNameInput.value;
    let drinkPrice = drinkPriceInput.value;
    let drinkCategory = drinkCategoryInput.value;
    let drinkDescription = drinkDescriptionInput.value;

    //Gör en kontroll om något fält är tomt eller NULL
    if (drinkName && drinkPrice && drinkCategory && drinkDescription == "" || null) {
        outputDrink.innerHTML += `<p>${data["message"]}</p>`
    } else {
        //Gör om till JSON-format
        let jsonStr = JSON.stringify({
            drink_name: drinkName,
            drink_description: drinkDescription,
            drink_price: drinkPrice,
            drink_category_id: drinkCategory
        });

        //Post-anrop som lagrar i databasen
        fetch(urlDrink, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => showDrinkMessage(data))
            .then(data => clearDrinkInput(data))
            .catch(err => console.log(err))
    }
}


//Utskrift av drycker
function showDrink(drinks) {
    //Variabler för utskrift till olika divar
    const whiteOutput = document.getElementById("whitewine");
    const redOutput = document.getElementById("redwine");
    const beerOutput = document.getElementById("beer");
    const nonAlcoOutput = document.getElementById("nonalcohol");
    whiteOutput.innerHTML = "";
    redOutput.innerHTML = "";
    beerOutput.innerHTML = "";
    nonAlcoOutput.innerHTML = "";


    //skriver ut drycken beroende på vilken kategori de tillhör
    drinks.forEach(drink => {
        if (drink.drink_category_id == "1") {
            whiteOutput.innerHTML += ` <td contenteditable class="food-td" id="drinkname${drink.drink_id}"> ${drink.drink_name} </td><td contenteditable class="food-td" id="drinkprice${drink.drink_id}"> ${drink.drink_price}</td><td contenteditable class="food-td" id="drinkdescription${drink.drink_id}"> ${drink.drink_description}</td><td id="${drink.drink_id}" class="food-td"><button id="${drink.drink_id}"class="delete-drink-btn">Ta bort</button</td> <td><button class="edit-drink-btn" data-id="${drink.drink_id}">Uppdatera</td> <td class="food-td-hidden" id="drinkcategory${drink.drink_id}"> ${drink.drink_category_id}</td><tr>`;
        }
        if (drink.drink_category_id == "2") {
            redOutput.innerHTML += ` <td contenteditable class="food-td" id="drinkname${drink.drink_id}"> ${drink.drink_name} </td><td contenteditable class="food-td" id="drinkprice${drink.drink_id}"> ${drink.drink_price}</td><td contenteditable class="food-td" id="drinkdescription${drink.drink_id}"> ${drink.drink_description}</td><td id="${drink.drink_id}" class="food-td"><button id="${drink.drink_id}"class="delete-drink-btn">Ta bort</button</td> <td><button class="edit-drink-btn" data-id="${drink.drink_id}">Uppdatera</td> <td class="food-td-hidden" id="drinkcategory${drink.drink_id}"> ${drink.drink_category_id}</td><tr>`;
        }
        if (drink.drink_category_id == "3") {
            beerOutput.innerHTML += `<td contenteditable class="food-td" id="drinkname${drink.drink_id}"> ${drink.drink_name} </td><td contenteditable class="food-td" id="drinkprice${drink.drink_id}"> ${drink.drink_price}</td><td contenteditable class="food-td" id="drinkdescription${drink.drink_id}"> ${drink.drink_description}</td><td id="${drink.drink_id}" class="food-td"><button id="${drink.drink_id}"class="delete-drink-btn">Ta bort</button</td> <td><button class="edit-drink-btn" data-id="${drink.drink_id}">Uppdatera</td> <td class="food-td-hidden" id="drinkcategory${drink.drink_id}"> ${drink.drink_category_id}</td><tr>`;
        }
        if (drink.drink_category_id == "4") {
            nonAlcoOutput.innerHTML += ` <td contenteditable class="food-td" id="drinkname${drink.drink_id}"> ${drink.drink_name} </td><td contenteditable class="food-td" id="drinkprice${drink.drink_id}"> ${drink.drink_price}</td><td contenteditable class="food-td" id="drinkdescription${drink.drink_id}"> ${drink.drink_description}</td><td id="${drink.drink_id}" class="food-td"><button id="${drink.drink_id}"class="delete-drink-btn">Ta bort</button</td> <td><button class="edit-drink-btn" data-id="${drink.drink_id}">Uppdatera</td> <td class="food-td-hidden" id="drinkcategory${drink.drink_id}"> ${drink.drink_category_id}</td><tr>`;
        }
    })

    //Loopar igenom knapparna och lägger till en eventlistener som tar bort en rad med klick på raden
    //Lägger till en eventlistener på ändra knapparna som anropar updateDrink
    let deleteBtn = document.getElementsByClassName("delete-drink-btn");
    let changeBtn = document.getElementsByClassName("edit-drink-btn");
    for (let y = 0; y < deleteBtn.length; y++) {
        deleteBtn[y].addEventListener("click", deleteDrink);
        changeBtn[y].addEventListener("click", updateDrink);
    }
}


//Funktion för att radera drickor i menyn
function deleteDrink(event) {
    //Sparar dryckens id
    let drink_id = event.target.id;


    //Skickar med kursens ID som parameter och gör ett fetch-anrop med DELETE
    fetch(urlDrink + "?drink_id=" + drink_id, {
        "method": "DELETE",
    })
        .then(response => response.json())
        .then(data => showDeletedMessage(data))
        .then(data => getDrinks()) //Hämtar drycken
        .catch(err => console.log(err))
}

//Funktion för att uppdatera en dryck
function updateDrink(event) {
    event.preventDefault();

    //Sparar dryckens id i en variabel
    let drinkId = event.target.dataset.id;


    //Sparar dryckens befintliga data som hämtas från tabellen i variabler
    let drinkName = document.getElementById("drinkname" + drinkId).innerHTML;
    let drinkDescription = document.getElementById("drinkdescription" + drinkId).innerHTML;
    let drinkPrice = document.getElementById("drinkprice" + drinkId).innerHTML;
    let drinkCategory = document.getElementById("drinkcategory" + drinkId).innerHTML;

    //Gör om till JSON
    let jsonStr = JSON.stringify({
        drink_id: drinkId,
        drink_name: drinkName,
        drink_description: drinkDescription,
        drink_price: drinkPrice,
        drink_category_id: drinkCategory
    });

    //Fetch-anrop med PUT och drinkens id som parameter i URL
    fetch(urlDrink + "?drink_id=" + drinkId, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => showDeletedMessage(data))
        .then(data => clearDrinkInput()) //Rensar formuläret
        .catch(err => console.log(err))
}


//Rensa formuläret när det är skickat
function clearInput() {

    foodNameInput.value = "";
    foodDescriptionInput.value = "";
    foodCategoryInput.value = "";
    foodPriceInput.value = "";
    foodCategoryInput.value = "";

    getFood();
}

//Tömmer fälten för dryck 
function clearDrinkInput() {

    drinkNameInput.value = "";
    drinkDescriptionInput.value = "";
    drinkCategoryInput.value = "";
    drinkPriceInput.value = "";

    getDrinks();

}

function showMessage(data) {
    if (messageData.innerHTML = "") {
        messageData.innerHTML += `<p>${data["message"]}</p>`;
    } else {
        messageData.innerHTML += `<p>${data["message"]}</p>`;
    }
}

//Funktion som visar meddelande i formuläret
function showFoodMessage(data) {
    if (outputFood.innerHTML = "") {
        outputFood.innerHTML += `<p>${data["message"]}</p>`;
    } else {
        outputFood.innerHTML += `<p>${data["message"]}</p>`;
    }
}

//Funktion som visar meddelande i dryckes-formuläret
function showDrinkMessage(data) {
    if (outputDrink.innerHTML = "") {
        outputDrink.innerHTML += `<p>${data["message"]}</p>`;
    } else {
        outputDrink.innerHTML += `<p>${data["message"]}</p>`;
    }
}

//Funktion som visar om en maträtt blivit borttagen
function showDeletedMessage(data) {
    if (outputDeleted.innerHTML = "") {
        outputDeleted.innerHTML += `<p>${data["message"]}</p>`;
    } else {
        outputDeleted.innerHTML += `<p>${data["message"]}</p>`;
    }
}








