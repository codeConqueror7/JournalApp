
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
// Dev/Prod
// const firebaseConfig = {
//     apiKey: "AIzaSyDTw6_1QBCH4IAOLzrojmqmRNAnligdZXA",
//     authDomain: "react-cursos-e6f1c.firebaseapp.com",
//     projectId: "react-cursos-e6f1c",
//     storageBucket: "react-cursos-e6f1c.appspot.com",
//     messagingSenderId: "131751041218",
//     appId: "1:131751041218:web:2cbd5490bb2af9630e435b"
//   };  

// Testing
// const firebaseConfig = {
//     apiKey: "AIzaSyBmSUAe9ofRw85MGcsLwe-RRsFOAcIXe_g",
//     authDomain: "react-testing-7220d.firebaseapp.com",
//     projectId: "react-testing-7220d",
//     storageBucket: "react-testing-7220d.appspot.com",
//     messagingSenderId: "378107141419",
//     appId: "1:378107141419:web:d53b5f37321c779b0c796e"
// };

const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID,
};



// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)