"use client"
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { AdminProvider } from './adminContex';
import HeaderContent from "@/components/componentAdmin/header";
import SideMenu from "@/components/componentAdmin/sideMenu";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button } from 'antd';
import Lottie from 'react-lottie';
import * as loadingData from '../../../lottie/loading-3.json';


const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }) {
    const [cookies] = useCookies(['token']);
    const [isLoggingState, setIsloggingState] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const router = useRouter()
    const isLogging = cookies.token ? cookies.token : null;
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
    };


    useEffect(() => {
        if (!isLogging || isLogging === "undefined") {
            router.push('/login-admin', undefined, { shallow: true })

            setIsloggingState(false)
        } else {
          setIsloggingState(true)
        }
    })
    return (
        <>
            <AdminProvider>
                {
                    isLoggingState ?
                        <main className="admin-layout">
                            <Layout>
                                <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
                                    <SideMenu />
                                </Sider>
                                <Layout>
                                    <Header style={{ padding: 0, background: '#f6f7f2' }}>
                                        <Button
                                            type="text"
                                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                            onClick={() => setCollapsed(!collapsed)}
                                            style={{
                                                fontSize: '16px',
                                                width: 64,
                                                height: 64,
                                            }}
                                        />
                                        <HeaderContent />
                                    </Header>
                                    <Content
                                        style={{
                                            margin: '24px 16px',
                                            padding: 24,
                                            minHeight: 280,
                                            background: '#fff',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <div className="admin-layout">
                                            {children}
                                        </div>
                                    </Content>
                                </Layout>
                            </Layout>
                        </main> :
                        <div className="h-screen w-screen">
                            <div className="w-full h-full flex justify-center items-center">
                                <Lottie options={defaultOptions}
                                    height={400}
                                    width={400} />
                            </div>
                        </div>
                }

            </AdminProvider>
        </>


    )
} 