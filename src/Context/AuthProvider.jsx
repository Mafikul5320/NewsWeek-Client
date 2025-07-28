import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [User, setUser] = useState(null)
    const [loading, setloading] = useState(true)
    const Register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const Login = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };
    const GoogleSignIn = (provider) => {
        setloading(true)
        return signInWithPopup(auth, provider)
    };
    const SignOut = () => {
        setloading(true)
        // setLoading(true)
        return signOut(auth)
    };
    const UpdateUser = (info) => {
        setloading(true)
        return updateProfile(auth.currentUser, info)
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
            setloading(false)
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
        UpdateUser,
        loading
    }
    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;