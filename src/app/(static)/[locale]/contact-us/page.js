"use client"
import { useState } from "react";
import BreadCumb from "@/app/component/breadcumb";
import Sidebar from "@/app/component/sidebar";


const ContactUs = () => {
    const [menu, setMenu] = useState([
        {
            name: 'Home',
            urlPath: '/',
            isIcon: false
        },
        {
            name: 'Contact Us',
            urlPath: null,
            isIcon: true
        }
    ])
    return (
        <div className="mx-auto w-full max-w-screen-xl pt-[120px]">
            <BreadCumb menu={menu} />
            <div className="flex gap-[16px] contact-page">
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-[80%] flex-col items-start">
                    <div className="content">
                        <div className="title">
                            <h1>Contact Us Maxibook</h1>
                        </div>
                        <div className="desc">
                            <div>Silakan hubungi bagian dukungan pelanggan untuk instruksi lebih lanjut: (Waktu kerja: 24/7)</div>
                            <div>Email: <b>infohijra4@gmail.com</b> </div>
                            <div>No. Whatsap: <b>+6281932622629</b> </div>
                            <div>Alamat: <b>Jl. H. Shibi 3, RT.5/RW.2, Srengseng Sawah, South Jakarta City, Jakarta</b></div>
                        </div>
                        <div className="googlemap">
                            <iframe
                                className="google-iframe"
                                title={"Maxibook"}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2141.398698034589!2d106.8357595716977!3d-6.350808165822227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec39d21587cd%3A0xb00808a789734eec!2sJl.%20H.%20Shibi%203%2C%20RT.5%2FRW.2%2C%20Srengseng%20Sawah%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1706375844493!5m2!1sen!2sid"
                                style={{ border: 0 }}
                                allowFullScreen
                                aria-hidden="false"
                                tabIndex="0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;