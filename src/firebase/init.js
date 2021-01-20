import firebase from 'firebase'
import firestore from 'firebase/firestore'

//Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAfoakv_LpCQX0mhEAJwWlMcdP8UgMwFdY",
    authDomain: "udemy-ninja-smoothies-2b5c6.firebaseapp.com",
    databaseURL: "https://udemy-ninja-smoothies-2b5c6.firebaseio.com",
    projectId: "udemy-ninja-smoothies-2b5c6",
    storageBucket: "udemy-ninja-smoothies-2b5c6.appspot.com",
    messagingSenderId: "88571848015",
    appId: "1:88571848015:web:126c2172b9b749ea4ad13a",
    measurementId: "G-1LY3CMYQ0Q"
  };
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

const firebaseApp = firebase.initializeApp(firebaseConfig);
//firebaseApp.firestore().settings({ timestampsInSnapShot: true })

//export firebase db
export default firebaseApp.firestore()