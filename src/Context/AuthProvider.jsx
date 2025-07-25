import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [User, setUser] = useState(null)
    const Register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const Login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };
    const GoogleSignIn = (provider) => {
        return signInWithPopup(auth, provider)
    };
    const SignOut = () => {
        // setLoading(true)
        return signOut(auth)
    };
    const UpdateUser =(info)=>{
       return updateProfile(auth.currentUser,info)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(currentUser)
                setUser(currentUser)
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
        Login,
        GoogleSignIn,
        User,
        setUser,
        SignOut,
        UpdateUser
    }
    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;