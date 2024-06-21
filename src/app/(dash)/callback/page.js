"use client";
import { Spin } from 'antd';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from "../../store";
import { setAuthSlice } from "../../store/reducer/authSlice";
import { useRouter } from 'next/navigation';
import { notification } from 'antd';

const Callback = ({ searchParams }) => {
    const dispatch = useAppDispatch();
    const { token, errMsg, expires } = searchParams;
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();
    const hasFetchedData = useRef(false);

    const redirect = () => {
        const data = {
            access_token: token,
            expires_at: expires,
            message: 'ok'
        }
        dispatch(setAuthSlice(data))
        router.push('/');
    }

    const errorPages = () => {
        api.error({
            message: 'Error Login',
            description: errMsg
        })
        setTimeout(() => {
            router.push('/login');
        }, 4000)
    }

    useEffect(() => {
        if (!hasFetchedData.current) {
            if (errMsg) {
                errorPages();
            } else {
                redirect();
            }
            hasFetchedData.current = true;
        }
    }, [])

    return (
        <>
            {contextHolder}
            <div className="screen-layer h-screen flex justify-center items-center">
                <Spin size='large' />
            </div>
        </>
    );
}

export default Callback;