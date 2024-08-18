"use client";

import Lottie from 'react-lottie';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAppSelector } from "@/store";

import * as verificationData from '@/lottie/verification.json';
import { urlAPI } from "@/lib/constant";

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const tokenParamsh = searchParams.get('token');
    const hasFetchedData = useRef(false);
    const router = useRouter();
    const getAuth = useAppSelector((state) => state.authUserStorage.authUser);
    const getToken = getAuth ? getAuth.access_token : null;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: verificationData,
    };

    const verifyEmail = async () => {
        const formData = {
            token: tokenParamsh
        }
        await axios.post(`${urlAPI}backend/verify/email`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${getToken}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    router.push('/');
                }
            })
            .catch(function (error) {
                if (error.response) {
                    
                    console.log(error.response.status);
                    
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };

    useEffect(() => {
        if (!hasFetchedData.current) {
            verifyEmail();
            hasFetchedData.current = true;
        }
    })

    return (
        <div className="screen-layer flex flex-col justify-center h-screen my-[32px]">
            <div className="m-auto w-[300px] h-[300px]">
                <Lottie
                    options={defaultOptions}
                />
            </div>
        </div>
    );
}

export default VerifyEmail;