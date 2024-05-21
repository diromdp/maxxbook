"use client";
import { ChangeEvent, useEffect, useTransition, useCallback, useState} from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const Header = () => {
    const [isPending, startTransition] = useTransition();
    const [initMenuSticky, setInitMenuSticky] = useState(true);
    const [menuSticky, setMenuSticky] = useState(false)
    const [y, setY] = useState(0);

    const router = useRouter();
    const localActive = useLocale();

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
          router.replace(`/${nextLocale}`);
        });
    };

    const handleNavigation = useCallback((e) => {
        const window = e.currentTarget;

        console.log(`handleNavigation`)

        if (y >= window.scrollY) {
           if (y < 30) {
              setInitMenuSticky(true)
           } else {
              setMenuSticky(true)
              setInitMenuSticky(false)
           }
        } else if (y <= window.scrollY) {

           setMenuSticky(false)
           setInitMenuSticky(false)
        }

        setY(window.scrollY);
     },
     [y]
  );



  useEffect(() => {
    if (typeof window !== "undefined") {
       setY(window.scrollY);
       window.addEventListener("scroll", handleNavigation);
       return () => {
          window.removeEventListener("scroll", handleNavigation);
       }
    };
 }, [handleNavigation]);

    
  
    return (
        <div className={`z-50 w-full  transform ${initMenuSticky ? 'menu-inisticky' : menuSticky ? 'menu-sticky' : 'menu-unsticky'} top-0`}>
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="header">
                    <Link href={'/'} className="header-logo">
                        <span className={`text-[20px] lg:text-[28px] xl:text-[40px] select-none font-montserrat font-[700] outline-0`}>Maxibook.</span>
                    </Link>
                    <div className="header-login">
                        <label className='border-2 rounded'>
                            <p className='sr-only'>change language</p>
                            <select
                                defaultValue={localActive}
                                className='bg-transparent py-2'
                                onChange={onSelectChange}
                                disabled={isPending}
                            >
                                <option value='en'>English</option>
                                <option value='id'>Indonesian</option>
                            </select>
                        </label>
                        <Link href={"/login"} className="btn-primary text-[18px] h-[40px]">Login <div className="animation"></div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;