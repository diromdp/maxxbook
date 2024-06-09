"use client";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store";
import { useRouter } from "next/navigation";
const ProtectLogin = ({ children }) => {
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const token = getToken.access_token;
    const hasFetchedData = useRef(false);
    const router = useRouter();

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