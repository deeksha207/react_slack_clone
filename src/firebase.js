import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtHbomVIAK4XTOUe1U7MVMzNjFAK3L86w",
  authDomain: "react-slack-clone-761fe.firebaseapp.com",
  databaseURL: "https://react-slack-clone-761fe.firebaseio.com",
  projectId: "react-slack-clone-761fe",
  storageBucket: "react-slack-clone-761fe.appspot.com",
  messagingSenderId: "656163982504",
  appId: "1:656163982504:web:fa89ef4cb50f8a06e3869d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();
  const firestore=firebase.firestore();
  const signInWithGoogle = ()=>{
    //initialize google provider
    const googleProvider=new firebase.auth.GoogleAuthProvider();
    // ask user to signup with google by popup new window
      auth.signInWithPopup(googleProvider);
  };
export{auth,signInWithGoogle,firestore};
export const signOut=()=>{
  auth.signOut();
};
export const createOrGetUserProfileDocument=async (user)=>{
  if(!user){
    return;
  }  
  const userRef=firestore.doc(`users/${user.uid}`);
  const snapshot=await userRef.get();
  if(!snapshot.exists){
    const {displayName,email,photoURL}=user;
    try{
      const user={
        display_name:displayName,
        email,
        photo_url:photoURL,
        created_at:new Date(),
      };
      await userRef.set(user);
    } catch(error){
      console.log('Error',error.message);
    }
  }
  return getUserDocument(user.uid);  
};
async function getUserDocument(uid){
  if(!uid){
    return null;
  }
  try{
    const userDoc=await firestore.collection('user').doc(uid);
    return userDoc;
  } catch(error){
    console.log('Error',error.message);
  }
}