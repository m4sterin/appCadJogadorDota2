import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

  let firebaseConfig = {
    apiKey: "AIzaSyAQ_jWbcLViAuhE-8FUx4gVwyPvDrxgDg8",
    authDomain: "cadastrodota2.firebaseapp.com",
    projectId: "cadastrodota2",
    storageBucket: "cadastrodota2.appspot.com",
    messagingSenderId: "66032175503",
    appId: "1:66032175503:web:c3f14516e947db0005a3fa"
  };
  // Initialize Firebase
  if(!firebase.apps.lenght){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;