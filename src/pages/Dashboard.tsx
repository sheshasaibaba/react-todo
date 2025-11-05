import { useAuthStore } from '../store/authStore';
import { useQuery } from '@tanstack/react-query';

interface CurrentUserData {
    name: string;
    email: string;
    token: string;
}

function useCurrentUser() {
    return useQuery<CurrentUserData>({
        queryKey: ['user', 'current'],
    });
}


function Dashboard() {
    const userData = useAuthStore((state) => state);
    const { data: user } = useCurrentUser();

    console.log('User Data:', userData);
    return (
        <div className=''>
            <h1 className='text-3xl font-bold'>Welcome, {useAuthStore((state) => state.user?.name)}!</h1>
            <p className='row-auto'>This is from state management</p>

            <h5 className='mt-5'>And, This is from tanstack</h5>
            <h1 className='text-3xl font-bold'>Welcome, {user?.name}!</h1>
        </div>
    )
}

export default Dashboard