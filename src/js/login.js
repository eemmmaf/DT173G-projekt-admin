"use strict";

//Endpoint
let loginUrl = "http://localhost/projekt_webservice/loginapi.php";


//Variabler för inputfält och knappar
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const logoutBtn = document.getElementById("logout-btn");
const loginBtn = document.getElementById("login-btn");

//Eventlistener
if (logoutBtn) {
    logoutBtn.addEventListener("click", logOutUser, false);
}
if (loginBtn) {
    loginBtn.addEventListener("click", logIn, false);
}

//Funktion för att lägga till en kurs
function logIn(event) {
    event.preventDefault()



    //Sparar inmatad data i variabler
    let userName = usernameInput.value;
    let passWord = passwordInput.value;


    let jsonStr = JSON.stringify({
        username: userName,
        password: passWord,
    });

    fetch(loginUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => saveUser(data))
        .catch(err => console.log(err))
}

function saveUser(data) {
    if (data['status'] == true) {
        localStorage.setItem('username', 'Emma');
    }
    if (data['status'] == false) {
        window.location.replace("http://localhost:3000/login.html");
    }

}

function logOutUser() {
    localStorage.clear();

    window.location.replace("http://localhost:3000/login.html");
}

function message(event) {
    event.preventDefault()

    document.getElementById("errormessage").innerHTML += `<p> ${data['message']}`;
}
