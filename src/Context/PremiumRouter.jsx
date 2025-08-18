import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from './Loading';
import { Navigate } from 'react-router';
import usePremiumFind from '../Hooks/usePremiumFind';

const PremiumRouter = ({ children }) => {

    const { User, loading } = useAuth();
    const { isLoading, PremiumUser } = usePremiumFind();
    console.log(PremiumUser, "admin chack")
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    if (!User || PremiumUser?.user_status !== "premium") {
        return <Navigate to={'/forbidden'} />
    }

    return children
};

export default PremiumRouter;