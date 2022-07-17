import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { useState, useEffect, useContext, createContext, ReactNode } from "react";
let firebaseConfig = {
  apiKey: "AIzaSyBgkr-rx7rP2lZtI-YxpyGWROzOhjss9D8",
  authDomain: "shopmakeitfast.firebaseapp.com",
  projectId: "shopmakeitfast",
  storageBucket: "shopmakeitfast.appspot.com",
  messagingSenderId: "552023197654",
  appId: "1:552023197654:web:bd08bf1f0113838c1d4677",
  measurementId: "G-14EXSJLLG1"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auths = firebase.auth();
export const fi = firebase.auth;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export async function getUserWithUsername(username: string) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("shopname", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc: firebase.firestore.DocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
  };
}
interface IAuth {
    userId: firebase.User | null;
    signin: ()=> Promise<firebase.auth.UserCredential>;
    signout:()=> Promise<void>;
  
  }

  interface Props {
    children?: ReactNode
    // any props that come into the component
}
const authContext = createContext<IAuth|null>(null);
export const useAuth = () => {
    return useContext(authContext);
  };
export function ProvideAuth({ children }:Props) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}


var provider = new firebase.auth.GoogleAuthProvider();
function useProvideAuth() {
  const [user, setUser] = useState<firebase.User|null>(null);

  const signin = () => {
    return auths.signInWithPopup(provider);
  };

  const signout= async () => {
     await firebase.auth().signOut();
    setUser(null);
     
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    userId: user ,
    signin,
    
    signout,
  };
}
