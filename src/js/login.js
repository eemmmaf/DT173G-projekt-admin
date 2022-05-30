"use strict";

//Endpoint
let loginUrl = "http://localhost/projekt_webservice/loginapi.php";


//Variabler för inputfält och knappar
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
//Token
let token = localStorage.getItem("token");

//Eventlistener
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
            "content-type": "application/json",
        },
        body: jsonStr
    })
        .then(async (response) => {
            let data = await response.json();
            let status = response.status;

            if (status == 200) {
                localStorage.setItem("token", data.token);
                window.location.replace("http://localhost:3000/index.html");
            } else {
                localStorage.removeItem("token");
            }
        })
        .catch(err => console.log(err))
}

function message() {
    document.getElementById("errormessage").innerHTML += `<p> ${data['message']}`;
}

function logOutUser() {
    localStorage.removeItem("token");
    window.location.replace("http://localhost:3000/login.html");
}
