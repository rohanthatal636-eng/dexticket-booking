import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


// Firebase Config

const firebaseConfig = {
  apiKey: "AIzaSyCR7FqJPuPRnTzLfDj-xSSJqfBxezMO25w",
  authDomain: "m-ticket-booking.firebaseapp.com",
  databaseURL: "https://m-ticket-booking-default-rtdb.firebaseio.com",
  projectId: "m-ticket-booking",
  storageBucket: "m-ticket-booking.firebasestorage.app",
  messagingSenderId: "783183837715",
  appId: "1:783183837715:web:ae26850b19a2fcf9401de6"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Database

export const database = getDatabase(app);