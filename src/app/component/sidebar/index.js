import Link from "next/link";

const Sidebar = () => {
    return (<>
        <div className="panel-sidebar">
            <div className="panel-sidebar-container">
                <ul>
                    <li>
                        <Link href={'/about'} className="">About Us</Link>
                    </li>
                    <li>
                        <Link href={'/contact-us'}>Contact Us</Link>
                    </li>
                    <li>
                        <Link href={'/privacy-policy'}>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href={'/terms-condition'}>Terms Condition</Link>
                    </li>
                </ul>
            </div>
        </div>
    </>);
}

export default Sidebar;