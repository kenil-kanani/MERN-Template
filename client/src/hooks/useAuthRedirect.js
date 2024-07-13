import { useContext, useEffect } from 'react';
import AppContext from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '@/constant';

const useAuthRedirect = () => {
    const navigate = useNavigate()
    const { user, role } = useContext(AppContext);

    useEffect(() => {
        if (user) {
            if (role === ROLE.ADMIN) {
                navigate('/admin-dashboard');
            } else if (role === ROLE.USER) {
                navigate('/user-dashboard');
            }
        }
    }, [user, role, navigate]);
};

export default useAuthRedirect;