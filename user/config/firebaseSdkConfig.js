import firebaseAdmin from "firebase-admin";
import servicesAccountKey from "./servicesAccountKey.json" assert {type:"json"};

const firebaseApp= firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(servicesAccountKey)
})

export default firebaseApp;