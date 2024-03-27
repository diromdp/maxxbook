"use client"
import { useState } from "react";
import BreadCumb from "@/app/component/breadcumb";
import Sidebar from "@/app/component/sidebar";

const TermCondition = () => {
    const [menu, setMenu] = useState([
        {
            name: 'Home',
            urlPath: '/',
            isIcon: false
        },
        {
            name: 'Terms of Use',
            urlPath: null,
            isIcon: true
        }
    ])
    return (
        <>
            <div className="mx-auto w-full max-w-screen-xl pt-[120px]">
                <BreadCumb menu={menu} />
                <div className="flex gap-[16px] contact-page">
                    <div className="w-[20%]">
                        <Sidebar />
                    </div>
                    <div className="w-[80%] flex-col items-start">
                        <div className="content">
                            <div className="title">
                                <h1>Terms of Use </h1>
                            </div>
                            <div className="desc">
                                <div>These Terms of Use apply to the use of the Maxibook website. By accessing of using the Websites, you expressly agree to the Terms of Use without any further declaration being required. If you do not agree to these Terms of Use, please do not use the website.
                                    <br /> <br />
                                    Maxibook reserves the right to change, modify, add or remove portions of these Terms of Use at any time and without prior notice, upon its sole discretion. Please check these Terms of Use from time to time for any modifications. Your continued use of the website will mean that you have accepted and agreed to the changes.
                                </div>
                                <div>
                                    <h2>Content and Scope of Use.</h2>
                                    <ul>
                                        <li>All content accessible on the website, including text, graphics, images, photographs, trademarks, logos, videos, user interfaces, visual interfaces applications, programs, computer code and other information (collectively, the “Content”), including but not limited to the design, layout, “look insight” and arrangement of such Content, is shared by 123dok, 123dok’s members or its licensors and is protected by copyright, trademark and other intellectual property and unfair competition laws.

                                        </li>
                                        <li>You may solely for private, educational, personal, scientific, or research purposes access, browse, view, display, search, download and print the Content.

                                        </li>
                                        <li>Our website provides you with the ability to add, modify or remove any content, articles, data, photographs, images, illustrations, or other information which being uploaded by you.

                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2>General prohibitions</h2>
                                    <ul>
                                        <li>You may not
                                        </li>
                                        <li>systematically download any Content, use routines designed to continuously and automatically search and index the Content (full text and meta data), such as web-crawling or spider programs or engage in any activity likely to burden the website,
                                        </li>
                                        <li>directly or indirectly use or assist any third party to use the Content for any commercial or monetary purposes including without limitation any sale, resale, loan, transfer or upload of the Content to a commercial entity’s internet website,
                                        </li>
                                        <li>
                                            use the website to publish, distribute or advertise any promotional material or other forms of solicitation to other users or any other services facilitation of any activities that are prohibited by law.
                                        </li>
                                        <li>post, upload, publish, submit or transmit any Content that: (i) infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy; (ii) violates, or encourages any conduct that would violate, any applicable law or regulation or would give rise to civil liability; (iii) is fraudulent, knowingly false, misleading or deceptive; (iv) is defamatory, obscene, pornographic, vulgar or offensive; (v) promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group; (vi) is violent or threatening or promotes violence or actions that are threatening to any person or entity; or (vii) promotes illegal or harmful activities or substances.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermCondition;