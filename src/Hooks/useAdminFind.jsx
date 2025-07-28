// src/Hooks/useUserByEmail.js
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSucure from './useAxiosSucure';

const useAdminFind = () => {
    const axiosSecure = useAxiosSucure()
    const { User } = useAuth();

    const { data: user, isLoading, isError, error } = useQuery({
        enabled: !!User?.email, // only run when email is not empty
        queryKey: ['userByEmail', User?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role-check?email=${User?.email}`);
            return res.data;
        }
    });

    return { user, isLoading, isError, error };
};

export default useAdminFind;