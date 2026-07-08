import { database } from "./firebase.js";

import {
    ref,
    set,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


console.log("ADMIN JS LOADED");




// Admin Login

const password = "Roham@123";


const adminPassword = document.getElementById("adminPassword");
const loginBtn = document.getElementById("loginBtn");

const adminArea = document.getElementById("adminArea");



loginBtn.onclick=function(){


    if(adminPassword.value === password){


        adminArea.style.display="block";


        loadBookings();


        alert("Admin Login Successful");


    }

    else{


        alert("Wrong Password");


    }


};






// Slot Number Save


const slotSelect = document.getElementById("slotSelect");
const slotNumber = document.getElementById("slotNumber");
const saveSlot = document.getElementById("saveSlot");



saveSlot.onclick=function(){


    let slot = slotSelect.value;

    let number = slotNumber.value.trim();



    if(number===""){


        alert("Enter number");


        return;

    }



    set(
        ref(database,"slotNumbers/"+slot),
        {

            number:number

        }

    )
    .then(()=>{


        alert(slot+" number saved");


        slotNumber.value="";


    });



};







// Load Bookings


const bookingList =
document.getElementById("bookingList");



function loadBookings(){



    onValue(
        ref(database,"tickets"),
        (snapshot)=>{


            let data=snapshot.val() || {};


            bookingList.innerHTML="";



            for(let ticket in data){



                let booking=data[ticket];



                let div=document.createElement("div");



                div.innerHTML=`

                <p>

                🎫 ${booking.ticket}

                <br>
                <br>
🔢 ${booking.number || "Not Assigned"}

                👤 ${booking.name}

                <br>

                ⏰ ${booking.time}

                </p>


                <button onclick="deleteBooking('${ticket}')">

                Delete

                </button>

                <hr>

                `;



                bookingList.appendChild(div);



            }



        }
    );


}







// Delete Booking


window.deleteBooking=function(ticket){


    remove(
        ref(database,"tickets/"+ticket)
    )
    .then(()=>{


        alert("Booking deleted");


    });


};