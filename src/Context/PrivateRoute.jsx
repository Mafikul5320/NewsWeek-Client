import { Navigate } from 'react-router';
import Loading from './Loading';
import useAuth from '../Hooks/useAuth';

const PrivateRouter = ({ children }) => {
    const { User, loading } = useAuth()
    if (loading) {
        return <Loading></Loading>
    }

    if (!User && !User?.email) {
        return <Navigate to={'/login'} />
    }


    return children
};

export default PrivateRouter;