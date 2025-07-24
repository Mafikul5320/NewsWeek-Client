import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const Register =(email, password)=>{
        return createUserWithEmailAndPassword
    }

    const userInfo = {
        email: "abc@gmail.com"
    }
    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;