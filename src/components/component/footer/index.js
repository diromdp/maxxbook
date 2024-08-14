import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const Footer = () => {
    const t = useTranslations('Homepage');
    const locale = useLocale();

    return (
        <footer className="bg-[#F4F8FE] border border-t border-[#e3e6ef]">
            <div className="screen-layer px-[24px] py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link prefetch={false} href="/" className="flex items-center">
                            <span className={`text-[40px] select-none font-league_spartan font-[700] outline-0`}>Maxibook.</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{t('about')}</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link prefetch={false} href={`/${locale}/about`} className="hover:underline">Maxibook</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link prefetch={false} href={`/${locale}/privacy-policy`} className="hover:underline">{t('privacy policy')}</Link>
                                </li>
                                <li>
                                    <Link prefetch={false} href={`/${locale}/terms-condition`} className="hover:underline">{t('term and conditions')}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="/" className="hover:underline">Maxibook</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {/* <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white h-[16px] w-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16">
                                <path color="currentColor" d="M8,0C3.582,0,0,3.582,0,8c0,4.01,2.954,7.321,6.803,7.901V10.12H4.824V8.016h1.979V6.618c0-2.317,1.13-3.334,3.054-3.334	c0.923,0,1.411,0.069,1.641,0.099v1.836h-1.312c-0.817,0-1.104,0.775-1.104,1.65v1.148h2.396l-0.326,2.104H9.082v5.798l0,0.001	C12.987,15.389,16,12.05,16,8C16,3.582,12.418,0,8,0z"></path>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 h-[16px] w-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M16,2.105l-0.274-0.222c0,0-1.109,0.747-1.752,0.814c-0.619-0.657-1.503-1.064-2.483-1.064c-1.88,0-3.405,1.511-3.405,3.374	c0,0.263,0.031,0.52,0.088,0.769c-2.829-0.14-4.578-1.79-6.256-3.832L1.201,2.272c0,0-0.457,1.339-0.457,2.766	c0,3.841,3.03,6.143,4.179,6.693c-1.294,1.139-4.401,0.984-4.401,0.984L0,13.337C0,13.337,1.885,15,5.22,15	c6.262,0,9.689-4.615,9.689-9.604c0-0.146-0.005-0.292-0.013-0.434C15.653,4.105,16,3.214,16,2.105z"></path>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 h-[16px] w-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 50 50">
                                <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                            </svg>
                        </a> */}
                        <a href="https://whatsapp.com/channel/0029Vae1f7C35fM52lajxZ0l" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 h-[16px] w-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path d="M19.077,4.928C17.191,3.041,14.683,2.001,12.011,2c-5.506,0-9.987,4.479-9.989,9.985 c-0.001,1.76,0.459,3.478,1.333,4.992L2,22l5.233-1.237c1.459,0.796,3.101,1.215,4.773,1.216h0.004 c5.505,0,9.986-4.48,9.989-9.985C22.001,9.325,20.963,6.816,19.077,4.928z M16.898,15.554c-0.208,0.583-1.227,1.145-1.685,1.186 c-0.458,0.042-0.887,0.207-2.995-0.624c-2.537-1-4.139-3.601-4.263-3.767c-0.125-0.167-1.019-1.353-1.019-2.581 S7.581,7.936,7.81,7.687c0.229-0.25,0.499-0.312,0.666-0.312c0.166,0,0.333,0,0.478,0.006c0.178,0.007,0.375,0.016,0.562,0.431 c0.222,0.494,0.707,1.728,0.769,1.853s0.104,0.271,0.021,0.437s-0.125,0.27-0.249,0.416c-0.125,0.146-0.262,0.325-0.374,0.437 c-0.125,0.124-0.255,0.26-0.11,0.509c0.146,0.25,0.646,1.067,1.388,1.728c0.954,0.85,1.757,1.113,2.007,1.239 c0.25,0.125,0.395,0.104,0.541-0.063c0.146-0.166,0.624-0.728,0.79-0.978s0.333-0.208,0.562-0.125s1.456,0.687,1.705,0.812 c0.25,0.125,0.416,0.187,0.478,0.291C17.106,14.471,17.106,14.971,16.898,15.554z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;