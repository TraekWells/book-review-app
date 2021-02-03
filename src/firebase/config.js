import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVjUbVfHXYVLZ8zpOsudTIeovQs9xYVqo",
  authDomain: "book-reviews-43a84.firebaseapp.com",
  projectId: "book-reviews-43a84",
  storageBucket: "book-reviews-43a84.appspot.com",
  messagingSenderId: "644406661876",
  appId: "1:644406661876:web:a00341c019c57632f444a1",
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init firestore service
const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();

export { projectFirestore, projectAuth };
