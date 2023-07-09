// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword ,signInWithPhoneNumber} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ7sMVZG8S9yIYhMXhBAdwx_M8IFHPR5I",
    authDomain: "rwefirebase.firebaseapp.com",
    projectId: "rwefirebase",
    storageBucket: "rwefirebase.appspot.com",
    messagingSenderId: "338370821044",
    appId: "1:338370821044:web:c6eeab33fa1bd59c4850e1"
};

 export const FIREBASE_APP = initializeApp(firebaseConfig);
 export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
 export const FIREBASE_DB = getFirestore(FIREBASE_APP);

 export const userSignIn = async (email, password) => {
    try
    {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err)
    {
        return err;
    }
};

export const usserSignUp = async (email, password) => {
    try
    {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err)
    {
        return err;
    }
};


  export const handleSignInWithPhone = async () => {
    try {
      if (phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        // Prompt the user to enter the verification code
        const verificationCode = prompt('Enter the verification code:');
        if (verificationCode) {
          // Confirm the verification code
          await confirmation.confirm(verificationCode);
          console.log('User signed in successfully');
        } else {
          Alert.alert('Error', 'Please enter the verification code');
        }
      } else {
        Alert.alert('Error', 'Please enter a phone number');
      }
    } catch (error) {
      console.log('Phone sign-in error: ', error);
      Alert.alert('Error', 'Failed to sign in with phone number');
    }
  };
  
