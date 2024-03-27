import Link from "next/link";

const AdminLogin = () => {
    return (
        <>
            <div class="flex min-h-screen">
                <div class="flex flex-row w-full">
                    <div class='hidden lg:flex flex-col justify-between bg-[#ffe85c] lg:p-8 lg:max-w-sm xl:max-w-lg'>
                        <div class="flex items-center justify-start space-x-3">
                            <Link href={'/'}>
                                <span className={`text-[20px] lg:text-[28px] xl:text-[40px] select-none font-montserrat font-[700] outline-0`}>Maxibook.</span>
                            </Link>
                        </div>
                        <p class="font-medium">© 2024 Maxibook</p>
                    </div>
                    <div class="flex flex-1 flex-col items-center justify-center px-10 relative">
                        <div class="flex lg:hidden justify-between items-center w-full py-4">
                            <div class="flex items-center justify-start space-x-3">
                                <Link href={'/'}>
                                    <span className={`text-[20px] select-none font-montserrat font-[700] outline-0`}>Maxibook.</span>
                                </Link>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span>Not a member? </span>
                                <a href="#" class="underline font-medium text-[#070eff]">
                                    Sign up now
                                </a>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                            <form className="">
                                <h3 className="mb-3 text-4xl font-extrabold text-dark-slate-900 text-center">Sign In</h3>
                                <p className="mb-4 text-slate-700 text-center">Enter your email and password</p>
                                <Link href={'/'} className="flex     items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-slate-900 bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:ring-slate-200">
                                    <img
                                        className="h-5 mr-2"
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                        alt=""
                                    />
                                    Sign in with Google
                                </Link>
                                <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-slate-500 grow" />
                                    <p className="mx-4 text-slate-600">or</p>
                                    <hr className="h-0 border-b border-solid border-slate-500 grow" />
                                </div>
                                <label htmlFor="email" className="mb-2 text-sm text-start text-slate-900">
                                    Email*
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="mail@loopple.com"
                                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-400 mb-7 placeholder:text-slate-700 bg-slate-200 text-dark-slate-900 rounded-2xl"
                                />
                                <label htmlFor="password" className="mb-2 text-sm text-start text-slate-900">
                                    Password*
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter a password"
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-slate-400 placeholder:text-slate-700 bg-slate-200 text-dark-slate-900 rounded-2xl"
                                />
                                <div className="flex flex-row justify-between mb-8">
                                    <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            defaultChecked=""
                                            defaultValue=""
                                            className="sr-only peer"
                                        />
                                        <div className="w-5 h-5 bg-white border-2 rounded-sm border-slate-500 peer peer-checked:border-0 peer-checked:bg-sky-500">
                                            <img
                                                className=""
                                                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                                                alt="tick"
                                            />
                                        </div>
                                        <span className="ml-3 text-sm font-normal text-slate-900">
                                            Keep me logged in
                                        </span>
                                    </label>
                                    <a
                                        href="javascript:void(0)"
                                        className="mr-4 text-sm font-medium text-purple-blue-500"
                                    >
                                        Forget password?
                                    </a>
                                </div>
                                <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-sky-600 focus:ring-4 focus:bg-sky-100 bg-sky-300">
                                    Sign In
                                </button>
                                <p className="text-sm leading-relaxed text-slate-900 text-center">
                                    Not registered yet?{" "}
                                    <a href="javascript:void(0)" className="font-bold  text-slate-700">
                                        Create an Account
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;