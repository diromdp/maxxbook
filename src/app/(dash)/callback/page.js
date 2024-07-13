"use client";
import { Spin } from 'antd';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from "../../store";
import { setAuthSlice } from "../../store/reducer/authSlice";
import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { useSearchParams } from 'next/navigation';

const Callback = () => {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const expires = searchParams.get('expires');
    const errMsg = searchParams.get('errMsg');

    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

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
        if (errMsg == null) {
            redirect();
        } else {
            errorPages();
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