import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({ //login should take uid as argument and we are implicity returning the object
    type: 'LOGIN',
    uid
});

export const startLogin = () => {   //to start the login promise
    return () => {
        //returning the promise to allow others to attach to it
        return firebase.auth().signInWithPopup(googleAuthProvider) //signInWithPopup takes proider as its first and only argument
    }
}; 

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};