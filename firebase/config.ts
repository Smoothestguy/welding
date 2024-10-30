import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAZP8R0Y1BLtVQLdk9U5ayrvHode9-yv6Y",
    authDomain: "tawacademy-53d05.firebaseapp.com",
    projectId: "tawacademy-53d05",
    storageBucket: "tawacademy-53d05.appspot.com",
    messagingSenderId: "131000090010",
    appId: "1:131000090010:web:11f19145070d465870ce23"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app) 