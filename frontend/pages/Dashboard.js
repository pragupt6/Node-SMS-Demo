import React, { useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router'
const Dashboard = () => {
    const context = useContext(AuthContext);
    const router = useRouter();
    const { user, resetOTP } = context;
    useEffect(() => {
        resetOTP();
        if (!user) {
            router.push('/');
        }
        return () => {
        }
    }, [])
    return (
        <section className="">
            <div className="container h-100">
                <div className='align-items-center d-flex flex-column gap-2 justify-content-center' style={{ height: '80vh' }}>
                    <div className='w-full'>Welcome, this is Dashboard</div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
