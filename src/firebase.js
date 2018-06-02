import * as firebase from 'firebase';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL } from 'react-native-dotenv'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
