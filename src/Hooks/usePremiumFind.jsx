import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSucure from './useAxiosSucure';

const usePremiumFind = () => {
    const axiosSecure = useAxiosSucure()
    const { User } = useAuth();

    const { data: PremiumUser, isLoading, isError, error } = useQuery({
        enabled: !!User?.email, // only run when email is not empty
        queryKey: ['userByEmail', User?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/premium-check?email=${User?.email}`);
            return res.data;
        }
    });

    return { PremiumUser, isLoading, isError, error };
};

export default usePremiumFind;