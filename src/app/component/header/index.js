import Link from 'next/link'
import { Dropdown } from 'antd';
import { FiChevronDown  } from "react-icons/fi";


const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="/">
                EN
            </a>
        )
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="/">
                ID
            </a>
        )
    },
];
const Header = () => {
    return (
        <div className="shadow-[0_6px_11px_rgba(64,68,77,.06)] fixed top-0 w-full z-[999] bg-white">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="header">
                    <Link href={'/'} className="header-logo">
                        <span className={`text-[20px] lg:text-[28px] xl:text-[40px] select-none font-montserrat font-[700] outline-0`}>Maxibook.</span>
                    </Link>
                    <div className="header-login">
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <Link href={'/'} className="flex juctify-center items-center">
                                EN
                                <FiChevronDown />
                            </Link>
                        </Dropdown>
                        <Link href="/" className="btn-primary text-[18px]">Login <div className="animation"></div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;