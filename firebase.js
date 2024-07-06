import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCcgnZJT1LXj-MlqLXacNHKDul-t_3Wu1s",
    authDomain: "carbon-theorem-413821.firebaseapp.com",
    projectId: "carbon-theorem-413821",
    storageBucket: "carbon-theorem-413821.appspot.com",
    messagingSenderId: "123556942802",
    appId: "1:123556942802:android:8fe08b28cba6d2ee9d2e0b"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
