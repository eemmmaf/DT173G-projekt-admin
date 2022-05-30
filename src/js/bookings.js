"use strict";


let bookingUrl = "http://localhost/projekt_webservice/bookingapi.php";
//variabler för bokningens inputfält
const fnameInput = document.getElementById("fname");
const enameInput = document.getElementById("ename");
const timeInput = document.getElementById("time");
const dateInput = document.getElementById("date");
const quantityInput = document.getElementById("quantity");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("textmessage");

//Lägga till bokning-knappen och ändra-knappen
const submitBtn = document.getElementById("submit-btn");
const changeBtn = document.getElementById("change-btn");
//Output för bokning
let outputMessage = document.getElementById("message-output");
//Dagens datum
let today = new Date().toISOString().slice(0, 10);
//Token från localstorage
let token = localStorage.getItem("token");

//Läser in bokningar vid initiering
window.onload = init();
function init() {
    if (localStorage.getItem("token") == null) {
        window.location.replace("http://localhost:3000/login.html");
    }
    getBookings();
}

//Läser in kurserna från webbtjänsten coursesapi
function getBookings() {
    if (localStorage.getItem("token") === null) {
        return;
    }
    let token = localStorage.getItem("token");

    fetch(bookingUrl,{
        method: "GET",
        headers: {
            "token": token,
            "content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => showBookings(data))
        .catch(err => console.log(err))

}


//Skriver ut bokningarna. Funktionen anropas i getBookings
function showBookings(bookings) {
    if (localStorage.getItem("token") === null) {
        return;
    }
    const bookingOutput = document.getElementById("booking-td");

        //Utskrift
        bookings.forEach(b => {
            bookingOutput.innerHTML += `<tr class="tr"><td class="booking-td" id="${b.booking_id}"> ${b.booking_id}</td>
        <td class="booking-td" id="${b.booking_id}"> ${b.booking_date}</td>
        <td class="booking-td" id="${b.booking_id}"> ${b.booking_time}</td>
        <td class="booking-td" id="${b.booking_id}"> ${b.guest_fname} ${b.guest_ename}</td>
        <td class="booking-td" id="${b.booking_id}"> ${b.guest_email}</td>
        <td class="booking-td" id="${b.booking_id}"> ${b.quantity}</td>
        <td class="booking-td" id="${b.booking_id}"> ${b.guest_text}</td>
        <td id="${b.booking_id}" class="booking-td"><button id="${b.booking_id}"class="delete-btn">Ta bort</button</td>
        <td class="booking-td"><button class="edit-btn" data-id="${b.booking_id}">Redigera</td>
        <td class="booking-td" id="${b.booking_id}"> ${b.created}</td>
        </tr>`;
        })

        //Loopar igenom knapparna och lägger till en eventlistener som tar bort en rad med klick på raden
        let deleteBtn = document.getElementsByClassName("delete-btn");
        for (let y = 0; y < deleteBtn.length; y++) {
            deleteBtn[y].addEventListener("click", deleteBooking);
        }

        //Loopar igenom ändra-knapparna och lägger till en eventlistener
        let editBtn = document.getElementsByClassName("edit-btn");
        for (let i = 0; i < editBtn.length; i++) {
            editBtn[i].addEventListener("click", getWithId);

        }
    }



//Funktion för att lägga till en bokning
function addBooking(event) {
    if (localStorage.getItem("token") === null) {
        return;
    }

    let token = localStorage.getItem("token");
    event.preventDefault()

    //Eventlisteners
    submitBtn.addEventListener("click", addBooking);
    changeBtn.addEventListener("click", sendChange);


    //Sparar inmatad data i variabler
    let fname = fnameInput.value;
    let ename = enameInput.value;
    let time = timeInput.value;
    let date = dateInput.value;
    let quantity = quantityInput.value;
    let email = emailInput.value;
    let message = messageInput.value;

    let jsonStr = JSON.stringify({
        booking_date: date,
        booking_time: time,
        guest_fname: fname,
        guest_ename: ename,
        guest_email: email,
        guest_text: message,
        quantity: quantity
    });

    fetch(bookingUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "token": token
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => showMessage(data))
        .then(data => clearFields())
        .catch(err => console.log(err))
}


//Rensa formuläret när det är skickat
function clearFields() {

    fnameInput.value = "";
    enameInput.value = "";
    timeInput.value = "";
    dateInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    quantityInput.value = "";

    getBookings();

}

//Funktion för att visa meddelande
function showMessage(data) {

    outputMessage.innerHTML += `<p>${data["message"]}</p>`;

}

//Funktion för att ta bort bokning
function deleteBooking(event) {
    if (localStorage.getItem("token") === null) {
        return;
    }


    let bookingId = event.target.id;

    //Skickar med kursens ID som parameter
    fetch(bookingUrl + "?booking_id=" + bookingId, {
        "method": "DELETE",
        headers: {
            "content-type": "application/json",
            "token": token
        }
    })
        .then(response => response.json())
        .then(data => showMessage(data))
        .then(data => getBookings())
        .catch(err => console.log(err))
}

//Funktion för att hämta specifik kurs vid klick 
function getWithId(event) {

    //Sparar kursens id i en variabel med dataset
    let bookId = event.target.dataset.id;

    fetch(bookingUrl + "?booking_id=" + bookId)
        .then(response => {
            if (response.status != 200) {
                return
            }
            return response.json()
                .then(data => dataToForm(data))
                .catch(err => console.log(err))

        })
}

//Funktion som sparar data i formulären 
function dataToForm(data) {

    //Sparar datan i variabler
    let dataFname = data.guest_fname;
    let dataEname = data.guest_ename;
    let dataDate = data.booking_date;
    let dataTime = data.booking_time;
    let dataQuantity = data.quantity;
    let dataEmail = data.guest_email;
    let dataMessage = data.guest_text;

    //Sparar input
    fnameInput.value = dataFname;
    enameInput.value = dataEname;
    dateInput.value = dataDate;
    timeInput.value = dataTime;
    quantityInput.value = dataQuantity;
    emailInput.value = dataEmail;
    messageInput.value = dataMessage;

    changeBtn.dataset.id = data.id;
    changeBtn.addEventListener("click", sendChange);
}

//Funktion för fetch-anropet vid uppdatering av kurs
function sendChange(event) {
    if (localStorage.getItem("token") === null) {
        return;
    }
    event.preventDefault()

    let id = changeBtn.dataset.id;

    let jsonStr = JSON.stringify({
        booking_id: id,
        booking_date: dateInput.value,
        booking_time: timeInput.value,
        guest_fname: fnameInput.value,
        guest_ename: enameInput.value,
        guest_email: emailInput.value,
        guest_text: messageInput.value,
        quantity: quantityInput.value
    });

    fetch(bookingUrl + "?booking_id=" + id, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "token": token
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => showMessage(data))
        .then(data => clearInput())
        .catch(err => console.log(err))
}

function logOutUser() {
    localStorage.removeItem("token");
    window.location.replace("http://localhost:3000/login.html");
}

