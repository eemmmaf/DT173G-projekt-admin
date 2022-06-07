/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-06-01 15:23:05 
 * @Last Modified by: Emma Forslund - emfo2102
 * @Last Modified time: 2022-06-07 03:11:46
 */

"use strict";

let bookingUrl = "https://studenter.miun.se/~emfo2102/writeable/projekt_webservice/bookingapi.php";

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

//Ändra-knappen är disabled by default
changeBtn.disabled = true;

//Eventlisteners
submitBtn.addEventListener("click", addBooking);

//Output för utskrifter vid bokning
let outputMessage = document.getElementById("message-output");
let deleteMessage = document.getElementById("delete-output");

//Dagens datum
let today = new Date().toISOString().slice(0, 10);

//Läser in bokningar vid initiering
window.onload = init();
function init() {
    getBookings();
}

//Läser in kurserna från webbtjänsten coursesapi
function getBookings() {
    fetch(bookingUrl)
        .then(response => {
            if (response.status != 200) {
                return
            }

            return response.json()
                .then(data => showBookings(data))
                .catch(err => console.log(err))
        })
}


//Skriver ut bokningarna. Funktionen anropas i getBookings
function showBookings(bookings) {
    const bookingOutput = document.getElementById("booking-td");
    bookingOutput.innerHTML = "";

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
        <td class="booking-td"><button class="edit-btn" id="${b.booking_id}">Ändra</td>
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
    event.preventDefault();


    //Sparar inmatad data i variabler
    let fname = fnameInput.value;
    let ename = enameInput.value;
    let time = timeInput.value;
    let date = dateInput.value;
    let quantity = quantityInput.value;
    let email = emailInput.value;
    let message = messageInput.value;

    //Gör en kontroll om något fält är tomt eller NULL
    if (fname && ename && time && date && quantity && email  == "" || null) {
        outputMessage.innerHTML += `<p>Kontrollera fälten och försök igen</p>`;
    }
    else {

        //Gör om till JSON-format
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
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => showChangeMessage(data)) //Anropar funktion som skriver ut meddelande
            .then(data => clearFields()) //Tömmer input-fälten
            .catch(err => console.log(err))
    }
}


//Rensa formuläret när det är skickat och hämtar alla bokningar
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


//Funktion för att ta bort bokning med metoden DELETE
function deleteBooking(event) {
    //Plockar upp bokningens ID
    let bookingId = event.target.id;

    //Skickar med kursens ID som parameter
    fetch(bookingUrl + "?booking_id=" + bookingId, {
        "method": "DELETE",
        headers: {
            "content-type": "application/json",
        }
    })
        .then(response => response.json())
        .then(data => showDeleteMessage(data)) //Visar meddelande
        .then(data => getBookings(data))
        .catch(err => console.log(err))
}

//Funktion för att hämta specifik bokning vid klick 
function getWithId(event) {

    //Sparar bokningens id i en variabel med dataset
    let bookId = event.target.id;

    //Fetch-anrop med PUT. Bokningens id som parameter i URL:en
    fetch(bookingUrl + "?booking_id=" + bookId)
        .then(response => {
            if (response.status != 200) {
                return
            }
            return response.json()
                .then(data => dataToForm(data)) //Anropar funktionen som "skickar" datan till formuläret
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

    //Gör att ändra-knappen inte är disabled längre
    changeBtn.disabled = false;
    changeBtn.dataset.id = data.booking_id;
    //Lägger till eventListener 
    changeBtn.addEventListener("click", sendChange);
    //Gör att lägga till-knappen är disabled
    submitBtn.disabled = true;

    //Skrollar till botten av sidan till formuläret
    window.scrollTo(0, document.body.scrollHeight);
}

//Funktion för fetch-anropet vid uppdatering av kurs
function sendChange(event) {
    event.preventDefault();

    //Sparar bokningens id i en variabel
    let booking_id = changeBtn.dataset.id;


    //Gör om till JSON
    let jsonStr = JSON.stringify({
        booking_id: booking_id,
        booking_date: dateInput.value,
        booking_time: timeInput.value,
        guest_fname: fnameInput.value,
        guest_ename: enameInput.value,
        guest_email: emailInput.value,
        guest_text: messageInput.value,
        quantity: quantityInput.value
    });

    //Fetch-anrop med bokningens id som parameter i URL
    fetch(bookingUrl + "?booking_id=" + booking_id, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => showChangeMessage(data)) //Visar meddelande
        .then(data => clearInput(data)) //Tömmer input
        .catch(err => console.log(err))
}

//Rensa formuläret när det är skickat och hämtar bokningarna
function clearInput() {

    fnameInput.value = "";
    enameInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    quantityInput.value = "";
    emailInput.value = "";
    messageInput.value = "";


    getBookings();
}

//Funktion som skriver ut felmeddelande vid borttagning av bokning
function showDeleteMessage(data) {
    if (deleteMessage.innerHTML = "") {
        deleteMessage.innerHTML += `<p>${data["message"]}</p>`;
    } else {
        deleteMessage.innerHTML += `<p>${data["message"]}</p>`;
    }
}

//Funktion för att visa meddelanden i formulären
function showChangeMessage(data) {
    if (outputMessage.innerHTML = "") {
        outputMessage.innerHTML += `<p>${data["message"]}</p>`;
    } else {
        outputMessage.innerHTML += `<p>${data["message"]}</p>`;
    }
}



