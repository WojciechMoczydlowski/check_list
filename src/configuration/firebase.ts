import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDY8-AYUwHKZXAiVnnYX5MfrfFc-nNT9vw",
    authDomain: "check-list-cff49.firebaseapp.com",
    databaseURL: "https://check-list-cff49.firebaseio.com",
    projectId: "check-list-cff49",
    storageBucket: "check-list-cff49.appspot.com",
    messagingSenderId: "1092073599303",
    appId: "1:1092073599303:web:ae7241b2968ae105175c62",
};
// Initialize Firebase
// const database = firebase.initializeApp(firebaseConfig).database();
export const firestore = firebase.initializeApp(firebaseConfig).firestore();
