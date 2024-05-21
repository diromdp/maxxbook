import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FileProtectOutlined,
    PieChartOutlined,
    UserOutlined,
    BankOutlined,
    FilePdfOutlined,
    SettingOutlined,
    MoneyCollectOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import {BaseUrl} from '../../../lib/constant';

const SideMenu = () => {
    const router = useRouter();

    const [openKeys, setOpenKeys] = useState([router.pathname]);
    const [current, setCurrent] = useState(router.pathname);

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const Items = [
        getItem(
            'Dashboard',
            ['/admin'],
            <PieChartOutlined />,
        ),
        getItem(
            'Users',
            [
                '/admin/user',
            ],
            <UserOutlined />,
            [
                getItem(
                    "Create User",
                    '/admin/user/add',
                ),
                getItem(
                    "List Users",
                    '/admin/user',
                ),
            ],
        ),
        getItem(
            'Documents',
            [
                '/admin/document',
            ],
            <FilePdfOutlined />,
            [
                getItem(
                    "Create Document",
                    '/admin/document/add',
                ),
                getItem(
                    "List Documents",
                    '/admin/document',
                ),
            ],
        ),
        getItem(
            'Category',
            [
                '/admin/category',
                '/admin/category/subcategory',
            ],
            <FileProtectOutlined />,
            [
                getItem(
                    "Create Category",
                    '/admin/category/add',
                ),
                getItem(
                    "Create SubCategory",
                    '/admin/subcategory/add',
                ),
                getItem(
                    "List Categories",
                    '/admin/category',
                ),
                getItem(
                    'List Subcategories',
                    '/admin/subcategory',
                ),
            ],
        ),
        getItem(
            'Bank',
            [
                '/admin/bank',
            ],
            <BankOutlined />,
            [
                getItem(
                    "Create Bank",
                    '/admin/bank/add',
                ),
                getItem(
                    "List Bank",
                    '/admin/bank',
                ),
            ],
        ),
        getItem(
            'Withdrawal',
            ['/admin/withdrawal'],
            <MoneyCollectOutlined />,
        ),
        getItem(
            'Setting',
            ['/admin/setting'],
            <SettingOutlined />,
        ),
    ]
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (Items.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const handleMenuClick = (e) => {
        router.push(`${BaseUrl}/${e.key}`);
        setCurrent(e.key);
    };
    useEffect(() => {
        if (router) {
            if (current !== router.pathname) {
                setCurrent(router.pathname);
            }
        }
    }, [router, current]);
    return (
        <div className="sideMenu">
            <div className="logo">
                <Link href={'/admin'} className="header-logo">
                    <span className={`text-[20px] lg:text-[28px] xl:text-[30px] select-none font-montserrat font-[700] outline-0 text-white`}>Maxibook.</span>
                </Link>
            </div>
            <div className="content-menu">
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={handleMenuClick}
                    defaultOpenKeys={openKeys}
                    defaultSelectedKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={Items}
                />
            </div>
        </div>
    );
}

export default SideMenu;