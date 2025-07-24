import React, { useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const Register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const Login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(currentUser)
            }
            else {
                console.log("log out user")
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const userInfo = {
        Register,
        Login
    }
    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;