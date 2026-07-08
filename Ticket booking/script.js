import { database } from "./firebase.js";

import {
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


// Elements

const ticketContainer = document.getElementById("ticketContainer");
const username = document.getElementById("username");

const availableCount = document.getElementById("availableCount");
const bookedCount = document.getElementById("bookedCount");

const confirmation = document.getElementById("confirmation");
const confirmName = document.getElementById("confirmName");
const confirmTicket = document.getElementById("confirmTicket");
const confirmNumber = document.createElement("p");
confirmation.appendChild(confirmNumber);
const confirmDate = document.getElementById("confirmDate");
const confirmTime = document.getElementById("confirmTime");

const printReceipt = document.getElementById("printReceipt");

// Popup

const bookingPopup = document.getElementById("bookingPopup");
const popupName = document.getElementById("popupName");
const popupTicket = document.getElementById("popupTicket");

const confirmBooking = document.getElementById("confirmBooking");
const cancelBooking = document.getElementById("cancelBooking");


// Firebase

const ticketsRef = ref(database,"tickets");

const slotNumbersRef = ref(database,"slotNumbers");

// Data

let tickets = {};
let slotNumbers = {};
let selectedTicket = "";
let selectedName = "";




// Load tickets

onValue(ticketsRef,(snapshot)=>{

    tickets = snapshot.val() || {};

    loadTickets();

});


onValue(slotNumbersRef,(snapshot)=>{

    slotNumbers = snapshot.val() || {};

    loadTickets();

});






function loadTickets(){


    ticketContainer.innerHTML="";



    for(let i=1;i<=22;i++){


        let ticketNumber="M"+i;


        let box=document.createElement("div");


        box.classList.add("ticket");




        if(tickets[ticketNumber]){


            box.classList.add("booked");


            box.innerHTML=

            `
            ${ticketNumber}<br>
            BOOKED
            `;


        }


        else{


            box.classList.add("available");


            box.innerHTML=ticketNumber;



            box.onclick=function(){



                let name=username.value.trim();



                if(name===""){


                    alert("Please enter your name");

                    return;

                }



                selectedName=name;

                selectedTicket=ticketNumber;



                popupName.innerText=
                "👤 Name: "+name;



                popupTicket.innerText=
                "🎫 Slot: "+ticketNumber;



                bookingPopup.style.display="flex";



            };

        }



        ticketContainer.appendChild(box);



    }




    if(bookedCount && availableCount){


        bookedCount.innerText=
        Object.keys(tickets).length;



        availableCount.innerText=
        22-Object.keys(tickets).length;


    }



}







// Confirm Booking


confirmBooking.onclick=function(){


   set(
    ref(database,"tickets/" + selectedTicket),
    {
        name: selectedName,
        ticket: selectedTicket,
        number: slotNumbers[selectedTicket]?.number || "",
        time: new Date().toString()
    }
)
        
    .then(()=>{


        bookingPopup.style.display="none";


        confirmation.style.display="block";



        confirmName.innerText=
        "Name: "+selectedName;
let now = new Date();


confirmTicket.innerText =
"Ticket: " + selectedTicket;


let hiddenNumber =
slotNumbers[selectedTicket]?.number || "Not Assigned";


confirmNumber.innerText =
"🔢 Your Number: " + hiddenNumber;


        alert("Your slot is booked!");



    });



};






// Cancel


cancelBooking.onclick=function(){


    bookingPopup.style.display="none";


};printReceipt.onclick = function(){

    window.print();

};