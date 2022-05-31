//url:en till webbtjänsten drinkapi och foodapi sparad i en variabler
let urlDrink = "http://localhost/projekt_webservice/drinkapi.php";
let urlFood = "http://localhost/projekt_webservice/foodapi.php";

//Variabler för matens inputfält
const foodNameInput = document.getElementById("food-name");
const foodPriceInput = document.getElementById("food-price");
const foodCategoryInput = document.getElementById("food-category");
const foodTypeInput = document.getElementById("food-type");
const foodDescriptionInput = document.getElementById("food-description");
//Knappar
const foodSubmitBtn = document.getElementById("food-submit-btn");
//Token från localstorage
let token = localStorage.getItem("token");

//Eventlisteners
//Lägger till eventlistener på submit-knappen och ändra-knappen
if (foodSubmitBtn) {
    foodSubmitBtn.addEventListener("click", addFood);
}


//Läser in Mat och dryck när sidan läses in 
window.onload = init;
function init() {
    if (localStorage.getItem("token") != null) {
        localStorage.getItem("token");
        getFood();
        getDrinks();
    }
}

//Läser in maträtterna från webbtjänsten foodapi
function getFood() {
    fetch(urlFood, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "token": token
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => showFood(data))
        .catch(err => console.log(err))
}

//Skriver ut maträtterna. Funktionen anropas i getFood
function showFood(foods) {

    const appetizerOutput = document.getElementById("appetizer");
    const mainOutput = document.getElementById("maincourse");
    const dessertOutput = document.getElementById("dessert");
    if (appetizerOutput || mainOutput || dessertOutput) {
        appetizerOutput.innerHTML = "";
        mainOutput.innerHTML = "";
        dessertOutput.innerHTML = "";


        //Utskrift
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

        //Loopar igenom ändra-knapparna och lägger till en eventlistener
        let editBtn = document.getElementsByClassName("edit-btn");
        for (let i = 0; i < editBtn.length; i++) {
            editBtn[i].addEventListener("click", updateFood);
        }
    }
}

//Funktion för att lägga till en kurs
function addFood(event) {
    if (localStorage.getItem("token") === null) {
        return;
    }
    //Token från localstorage
    let token = localStorage.getItem("token");
    event.prevent.default();

    //Sparar inmatad data i variabler
    let foodName = foodNameInput.value;
    let foodPrice = foodPriceInput.value;
    let foodCategory = foodCategoryInput.value;
    let foodType = foodTypeInput.value;
    let foodDescription = foodDescriptionInput.value;

    let jsonStr = JSON.stringify({
        food_name: foodName,
        food_price: foodPrice,
        food_description: foodDescription,
        food_category_id: foodCategory,
        food_type_id: foodType
    });

    fetch(urlFood, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "token": token
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => clearInput())
        .catch(err => console.log(err))
}



function updateFood(event) {
    if (localStorage.getItem("token") === null) {
        return;
    }

    //Token från localstorage
    let token = localStorage.getItem("token");
    let foodId = event.target.dataset.id;
    console.log(foodId);

    let dataName = document.getElementById("name" + foodId).innerHTML;
    let dataDescription = document.getElementById("description" + foodId).innerHTML;
    let dataPrice = document.getElementById("price" + foodId).innerHTML;
    let dataCategory = document.getElementById("category" + foodId).innerHTML;
    let dataType = document.getElementById("type" + foodId).innerHTML;


    let jsonStr = JSON.stringify({
        food_id: foodId,
        food_name: dataName,
        food_price: dataPrice,
        food_description: dataDescription,
        food_category_id: dataCategory,
        food_type_id: dataType
    });

    fetch(urlFood + "?food_id=" + foodId, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "token": token
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => clearInput())
        .catch(err => console.log(err))
}



//Funktion för att radera maträtter i menyn
function deleteFood(event) {
    if (token === null) {
        return;
    }
    let food_id = event.target.id;
    console.log(food_id);

    //Skickar med kursens ID som parameter
    fetch(urlFood + "?food_id=" + food_id, {
        "method": "DELETE",
        "token": token
    })
        .then(response => response.json())
        .then(data => getFood())
        .catch(err => console.log(err))
}


//Funktion för att hämta drickorna
function getDrinks() {
    if (localStorage.getItem("token") === null) {
        return;
    }
    fetch(urlDrink)
        .then(response => {
            if (response.status != 200) {
                return
            }

            return response.json()
                .then(data => showDrink(data))
                .catch(err => console.log(err))
        })
}

//Utskrift
function showDrink(drinks) {
    if (localStorage.getItem("token") === null) {
        return;
    }
    //Variabler för utskrift till olika divar
    const whiteOutput = document.getElementById("whitewine");
    const redOutput = document.getElementById("redwine");
    const beerOutput = document.getElementById("beer");
    const nonAlcoOutput = document.getElementById("nonalcohol");
    if (whiteOutput || redOutput || beerOutput || nonAlcoOutput) {
        whiteOutput.innerHTML = "";
        redOutput.innerHTML = "";
        beerOutput.innerHTML = "";
        nonAlcoOutput.innerHTML = "";


        drinks.forEach(drink => {
            if (drink.drink_category_id == "1") {
                whiteOutput.innerHTML += ` <td contenteditable class="food-td" id="${drink.drink_id}"> ${drink.drink_name} </td><td contenteditable class="food-td" id="price${drink.drink_id}"> ${drink.drink_price}</td><td contenteditable class="food-td" id="description${drink.drink_id}"> ${drink.drink_description}</td><td id="${drink.drink_id}" class="food-td"><button id ="${drink.drink_id}"class="delete-drink-btn">Ta bort</button</td> <td><button class="edit-btn" data-id="${drink.drink_id}">Uppdatera</td><tr>`;
            }
            if (drink.drink_category_id == "2") {
                redOutput.innerHTML += ` <td contenteditable class="food-td" id="${drink.drink_id}"> ${drink.drink_name} </td><td contenteditable class="food-td" id="price${drink.drink_id}"> ${drink.drink_price}</td><td contenteditable class="food-td" id="description${drink.drink_id}"> ${drink.drink_description}</td><td id="${drink.drink_id}" class="food-td"><button id ="${drink.drink_id}"class="delete-drink-btn">Ta bort</button</td> <td><button class="edit-btn" data-id="${drink.drink_id}">Uppdatera</td><tr>`;
            }
            if (drink.drink_category_id == "3") {
                beerOutput.innerHTML += ` <td contenteditable class="food-td" id="${drink.drink_id}"> ${drink.drink_name} </td><td contenteditable class="food-td" id="price${drink.drink_id}"> ${drink.drink_price}</td><td contenteditable class="food-td" id="description${drink.drink_id}"> ${drink.drink_description}</td><td id="${drink.drink_id}" class="food-td"><button id ="${drink.drink_id}"class="delete-drink-btn">Ta bort</button</td> <td><button class="edit-btn" data-id="${drink.drink_id}">Uppdatera</td><tr>`;
            }
            if (drink.drink_category_id == "4") {
                nonAlcoOutput.innerHTML += ` <td contenteditable class="food-td" id="${drink.drink_id}"> ${drink.drink_name} </td><td contenteditable class="food-td" id="price${drink.drink_id}"> ${drink.drink_price}</td><td contenteditable class="food-td" id="description${drink.drink_id}"> ${drink.drink_description}</td><td id="${drink.drink_id}" class="food-td"><button id ="${drink.drink_id}"class="delete-drink-btn">Ta bort</button</td> <td><button class="edit-btn" data-id="${drink.drink_id}">Uppdatera</td><tr>`;
            }
        })

        //Loopar igenom knapparna och lägger till en eventlistener som tar bort en rad med klick på raden
        let deleteBtn = document.getElementsByClassName("delete-drink-btn");
        for (let y = 0; y < deleteBtn.length; y++) {
            deleteBtn[y].addEventListener("click", deleteDrink);
        }
    }
}

//Funktion för att radera drickor i menyn
function deleteDrink(event) {
    if (localStorage.getItem("token") === null) {
        return;
    }
    let drink_id = event.target.id;
    //Token från localstorage
    let token = localStorage.getItem("token");

    //Skickar med kursens ID som parameter
    fetch(urlDrink + "?drink_id=" + drink_id, {
        "method": "DELETE",
        "token": token
    })
        .then(response => response.json())
        .then(data => getDrinks())
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

function logOutUser() {
    localStorage.removeItem("token");
    window.location.replace("http://localhost:3000/login.html");
}




