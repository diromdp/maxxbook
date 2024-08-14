"use client"
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef
} from "react";
import { useCookies } from "react-cookie"
import { urlAPI } from "@/lib/constant";
import { notification } from 'antd';

import axios from "axios";
const AdminContex = createContext();

export const AdminProvider = ({ children }) => {
    const [cookies] = useCookies(["token"])
    const [profile, setProfile] = useState({});
    const [editCategories, setCategories] = useState({});
    const [contextHolder] = notification.useNotification();
    const hasFetchedData = useRef(false);

    const getProfile = async () => {
        await axios.get(`${urlAPI}backend/admin/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setProfile(data.data)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <AdminContex.Provider
            value={{
                profile,
                setProfile,
                contextHolder,
                editCategories,
                setCategories
            }}
        >
            {children}
        </AdminContex.Provider>
    )
}

export const useMapContext = () => useContext(AdminContex);
