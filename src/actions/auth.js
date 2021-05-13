import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {   //to start the login promise
    return () => {
        //returning the promise to allow others to attach to it
        return firebase.auth().signInWithPopup(googleAuthProvider) //signInWithPopup takes proider as its first and only argument
    }
}; 

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};