import { Button } from '@/components/ui/button';
import { useAuthStore } from '../store/authStore';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '@/api/authApi';

interface CurrentUserData {
    name: string;
    email: string;
    token: string;
}

function useCurrentUser() {
    return useQuery<CurrentUserData>({
        queryKey: ['user', 'current'],
        queryFn: async () => {
            const response = await getCurrentUser();
            return response.data;
        }
    });
}


function Dashboard() {
    const { data: user } = useCurrentUser();

    return (
        <div className=''>
            <h1 className='text-3xl font-bold'>Welcome, {useAuthStore((state) => state.user?.name)}!</h1>
            <p className='row-auto'>This is from state management</p>

            <h5 className='mt-5'>And, This is from tanstack</h5>
            <h1 className='text-3xl font-bold'>Welcome, {user?.name}!</h1>

            <Link to={'/todo'}><Button className='mt-5 cursor-pointer'>Lets jump into action</Button></Link>
        </div>
    )
}

export default Dashboard