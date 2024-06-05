"use client"
import { useState } from "react";
import BreadCumb from "@/app/component/breadcumb";
import Sidebar from "@/app/component/sidebar";

const About = () => {
    const [menu, setMenu] = useState([
        {
            name: 'Home',
            urlPath: '/',
            isIcon: false
        },
        {
            name: 'About Us',
            urlPath: null,
            isIcon: true
        }
    ])
    return (
        <>
            <div className="screen-layer pt-[120px]">
                <BreadCumb menu={menu} />
                <div className="flex gap-[16px] about-page">
                    <div className="w-[20%]">
                        <Sidebar/>
                    </div>
                    <div className="w-[80%] flex-col items-start">
                        <div className="content">
                            <div className="title">
                                <h1>About Maxibook</h1>
                            </div>
                            <div className="desc">
                                <div>Kami percaya bahwa "Pengetahuan adalah kekuatan", "Pengetahuan akan membawa kesuksesan", dan "Pengetahuan harus disebarkan". Karena itu, tujuan kami adalah untuk membangun platform berbagi dokumen untuk semua orang di mana Anda bisa menemukan apa yang Anda perlukan tanpa biaya apa pun."</div>
                                <div> <h2>why should you choose us:</h2>
                                    <ul>
                                        <li>Platform kami dibangun dengan penelitian yang terpercaya dan terlengkap</li>
                                        <li>Kami membuat jalan untuk memudahkan Anda dalam menemukan jawaban yang diperlukan dengan cepat, perluas penelitian Anda melalui sistem rekomendasi kami dan dapatkan wawasan mendalam tentang topik penelitian yang sedang tren.</li>
                                        <li>Kami menyediakan penyimpanan tak terbatas</li>
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

export default About;