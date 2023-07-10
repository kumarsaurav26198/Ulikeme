// Import the functions you need from the SDKs you need
import { initializeApp } from "@react-native-firebase/app";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword ,signInWithPhoneNumber} from "@react-native-firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1i0EsED9eBmeIaJBrB5fxeIxalDvP5HE",
  authDomain: "ulikeme-5272b.firebaseapp.com",
  projectId: "ulikeme-5272b",
  storageBucket: "ulikeme-5272b.appspot.com",
  messagingSenderId: "122415680536",
  appId: "1:122415680536:web:0dbc89c8fd01fce651476d",
  measurementId: "G-M5WEDB7KZ3"
};

 export const FIREBASE_APP = initializeApp(firebaseConfig);
//  export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//  export const FIREBASE_DB = getFirestore(FIREBASE_APP);

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
  
 export  const handleSignOut=async()=>{
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
 }
