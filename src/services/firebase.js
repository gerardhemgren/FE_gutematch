import firebase from "firebase/app"

var firebaseConfig = {
    apiKey: "AIzaSyAZ5Xsb2BpJF_xnV7dTTUi15k01y-1cQbg",
    authDomain: "gutefutbol.firebaseapp.com",
    projectId: "gutefutbol",
    storageBucket: "gutefutbol.appspot.com",
    messagingSenderId: "445448150479",
    appId: "1:445448150479:web:89b2e2c433debf69c046ba"
  };

/* var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  }; */

firebase.initializeApp(firebaseConfig);

export default firebaseConfig