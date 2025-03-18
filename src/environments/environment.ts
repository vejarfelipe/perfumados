

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// Define la interfaz para el objeto environment
export interface Environment {
  production: boolean;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

// Implementa la interfaz en el objeto environment
export const environment: Environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBBnP3cEj_zDza5ULiEZeUHrYi6iIsMBwI",
    authDomain: "perfumados-40888.firebaseapp.com",
    projectId: "perfumados-40888",
    storageBucket: "perfumados-40888.firebasestorage.app",
    messagingSenderId: "305812024406",
    appId: "1:305812024406:web:761ed98396fa4484071ff7",
  },
};