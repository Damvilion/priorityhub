// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBEDaIfQZssnLEsliyBQB3Hv0UXlMaxuCw',
    authDomain: 'priorityhub-ce169.firebaseapp.com',
    projectId: 'priorityhub-ce169',
    storageBucket: 'priorityhub-ce169.appspot.com',
    messagingSenderId: '610942954024',
    appId: '1:610942954024:web:91025fe28ebc9adb08631d',
    measurementId: 'G-CDBRZ28QR2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
