import { initializeApp } from "firebase/app";
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword
} from "firebase/auth";

import {
   getFirestore,
   doc,
   getDoc,
   setDoc
 } from "firebase/firestore";
import { redirect } from "react-router-dom";


// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBYNAxQr6unuTfvrVyUlVUl6SlTNAXnIvs",
   authDomain: "crwn-clothing-db-30a5f.firebaseapp.com",
   projectId: "crwn-clothing-db-30a5f",
   storageBucket: "crwn-clothing-db-30a5f.appspot.com",
   messagingSenderId: "944816688100",
   appId: "1:944816688100:web:ad311981af08443655d5f1"
 };
 
 // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
 
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
   userAuth,
   additionalInformation = {}
   ) => {
   if (!userAuth) return;
   
   const userDocRef = doc(db, 'users', userAuth.uid);

   console.log(userDocRef);

   const userSnapshot = await getDoc(userDocRef);
   console.log(userSnapshot);
   console.log(userSnapshot.exists());

   //if userdata doesnt exist,then create one
   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
         });
      } catch(error) {
       console.log("error ccreating user", error.message);
      }
   }

   return userDocRef;
   
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;
   
   return await createUserWithEmailAndPassword(auth, email, password);
};
