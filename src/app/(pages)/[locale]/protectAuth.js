"use client";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { urlAPI } from "../../../lib/constant";
import { setAuthInfoSlice, setAuthSlice } from "@/store/reducer/authSlice";
import { useAppSelector, useAppDispatch } from "@/store";

const ProtectAuth = ({children}) => {
    const dispatch = useAppDispatch();
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const token = getToken.access_token;
    const router = useRouter();
    const hasFetchedData = useRef(false);

    const getCurrentUser = async () => {
        if (token) {
            await axios.get(`${urlAPI}backend/customer/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        dispatch(setAuthInfoSlice(data.data));
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        if (error.response.status == 401) {
                            dispatch(setAuthSlice({ ...getToken, access_token: null }))
                            router.push('/');
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }

    }
    useEffect(() => {
        if (!hasFetchedData.current) {
            getCurrentUser();
            hasFetchedData.current = true;
        }
    }, []);
    return ( <>
        {children}
    </> );
}
 
export default ProtectAuth;