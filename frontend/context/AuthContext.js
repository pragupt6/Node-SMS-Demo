import React, { useEffect } from 'react';
import * as config from '@/config/index';
import axios from 'axios';
import { data } from 'autoprefixer';
const AuthContext = React.createContext();
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie';
export const AuthProvider = ({ children }) => {
    useEffect(() => {
        checkUser();
    }, []);
    const router = useRouter();
    let [user, setUser] = React.useState(null);
    let [otp, setOtp] = React.useState(false);
    let [loading, setLoading] = React.useState(false);
    let [errorOTP, setErrorOTP] = React.useState(false);
    const cookies = new Cookies();
    const checkUser = async () => {
        const decodeUser = cookies.get('dktuser')
        setLoading(true);
        if (decodeUser) {
            setUser(decodeUser);
            setLoading(false);
            return
        }
        setLoading(false);
    }
    const login = async (number) => {
        setLoading(true);
        const sendSMS = await axios(
            {
                method: 'post',
                url: `${config.API_URL}/user/signup`,
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                data: {
                    number: number
                }
            }
        );
        if (sendSMS.status === 200) {
            setLoading(false);
            setOtp(true);
        }
    }
    const logout = () => {
        setUser(null);
        cookies.remove('dktuser');
        cookies.remove('dkttoken');
        router.push('/');
    }
    const resetOTP = () => {
        setErrorOTP(false);
        setOtp(false);
    }
    const verifyOTP = async (number, otp) => {
        setErrorOTP(false);
        console.log('==============verifyOTP======================');
        console.log(number);
        console.log(otp);
        try {
            setLoading(true);
            const verifyotp = await axios(
                {
                    method: 'post',
                    url: `${config.API_URL}/user/verify`,
                    data: {
                        number,
                        otp: otp
                    }
                }
            );
            if (verifyotp.status === 200) {
                console.log('==============verifyOTP======================');
                console.log(verifyotp);

                cookies.set('dkttoken', verifyotp.data.token, {
                    path: '/',
                    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
                });

                cookies.set('dktuser', JSON.stringify(verifyotp.data.user), {
                    path: '/',
                    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
                });
                setLoading(false);
                // setOtp(true);
                setUser(verifyotp.data.user);
                console.log(verifyotp)

                router.push('/Dashboard')
                //setOtp(false);
            }
        } catch (e) {
            setErrorOTP(true);
            setLoading(false);
        }

    }
    // const user = null;
    return (
        <AuthContext.Provider value={{ user, login, otp, loading, verifyOTP, logout, resetOTP, errorOTP }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
