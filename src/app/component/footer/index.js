const Footer = () => {
    return (
        <footer class="bg-white dark:bg-gray-900">
            <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div class="md:flex md:justify-between">
                    <div class="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" class="flex items-center">
                            <span className={`text-[40px] select-none font-montserrat font-[700] outline-0`}>Maxibook.</span>
                        </a>
                    </div>
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">About</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <a href="https://flowbite.com/" class="hover:underline">Maxibook</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" class="hover:underline">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Support</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Help / FAQ</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div class="sm:flex sm:items-center sm:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Maxibook™</a>. All Rights Reserved.
                    </span>
                    <div class="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white h-[16px] w-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16">
                                <path color="currentColor" d="M8,0C3.582,0,0,3.582,0,8c0,4.01,2.954,7.321,6.803,7.901V10.12H4.824V8.016h1.979V6.618c0-2.317,1.13-3.334,3.054-3.334	c0.923,0,1.411,0.069,1.641,0.099v1.836h-1.312c-0.817,0-1.104,0.775-1.104,1.65v1.148h2.396l-0.326,2.104H9.082v5.798l0,0.001	C12.987,15.389,16,12.05,16,8C16,3.582,12.418,0,8,0z"></path>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 h-[16px] w-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M16,2.105l-0.274-0.222c0,0-1.109,0.747-1.752,0.814c-0.619-0.657-1.503-1.064-2.483-1.064c-1.88,0-3.405,1.511-3.405,3.374	c0,0.263,0.031,0.52,0.088,0.769c-2.829-0.14-4.578-1.79-6.256-3.832L1.201,2.272c0,0-0.457,1.339-0.457,2.766	c0,3.841,3.03,6.143,4.179,6.693c-1.294,1.139-4.401,0.984-4.401,0.984L0,13.337C0,13.337,1.885,15,5.22,15	c6.262,0,9.689-4.615,9.689-9.604c0-0.146-0.005-0.292-0.013-0.434C15.653,4.105,16,3.214,16,2.105z"></path>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 h-[16px] w-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 50 50">
                                <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;