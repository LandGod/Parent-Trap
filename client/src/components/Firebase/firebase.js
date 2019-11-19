import app from "firebase/app";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC4cgBn3J_wiua8oGfpdHuCBtsrHy58Bnc",
    authDomain: "parent-trap-a7eed.firebaseapp.com",
    databaseURL: "https://parent-trap-a7eed.firebaseio.com",
    projectId: "parent-trap-a7eed",
    storageBucket: "parent-trap-a7eed.appspot.com",
    messagingSenderId: "122704905189",
    appId: "1:122704905189:web:a87d77d6555fa220d8e50c",
    measurementId: "G-B3K4D8QFS4"
  };

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;