import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { use } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';




const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const Googleprovider = new GoogleAuthProvider();

export const AuthProvider = ({children}) => { 
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const registerUser = async(email,password) => {
        return await createUserWithEmailAndPassword(auth, email, password);

    }
   const loginUser = async(email,password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    const signInGoogle = async() => {
        return await signInWithPopup(auth, Googleprovider);
        
    }

    const logOut = () => {
        return signOut(auth);
    }


    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
        if (user) {
            const {email, displayName} = user;
            const userData = {email, displayName};  
        }})

        return() => unsubscribe();
    }, [])  


    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInGoogle,
        logOut,
        loading

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
} 

