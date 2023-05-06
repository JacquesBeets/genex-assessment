import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBBJRkNHrsy17J7oEWL3a7fQAKHTWCI-mg",
    authDomain: "genex-assessment.firebaseapp.com",
    projectId: "genex-assessment",
    storageBucket: "genex-assessment.appspot.com",
    messagingSenderId: "596661281942",
    appId: "1:596661281942:web:f875ed8a36533a84928eb7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };