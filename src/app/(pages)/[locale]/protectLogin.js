"use client";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store";
import { useRouter } from "next/navigation";
import Lottie from 'react-lottie';
import * as loadingCat from '../../../../lottie/loading.json';
const ProtectLogin = ({ children }) => {
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const token = getToken.access_token;
    const hasFetchedData = useRef(false);
    const router = useRouter();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingCat,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const checkLogin = () => {
        if (!token) {
            router.push('/');
            setIsLoggingIn(false);
        }
    }
    useEffect(() => {
        if (!hasFetchedData.current) {
            checkLogin();
            hasFetchedData.current = true;
        }
    }, []);
    return (
        <>
            {children}
        </>
    );
}

export default ProtectLogin;