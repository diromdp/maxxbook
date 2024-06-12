import Categories from '../../component/categories'
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import HomeSearch from '../../component/homeSearch';
import { urlAPI } from "../../../lib/constant";
import { headers } from "next/headers";


async function getDetails() {
   const data = await fetch(`${urlAPI}backend/settings?keys=seo.title_home%2Cseo.description_home`, {
      method: 'get',
      headers: {
         'Content-Type': 'application/json',
         'Accept': "application/json",
      },
   });

   if (!data.ok) {
      throw new Error('Failed to fetch data')
   }
   return data.json()
}

export async function generateMetadata() {
   const headersList = headers();
   const pathname = headersList.get("referer");

   const detailSEO = await getDetails();
   return {
      title: detailSEO.length > 0 ? detailSEO[0].value : '',
      description: detailSEO.length > 0 ? detailSEO[1].value : '',
      twitter: {
         card: 'summary_large_image',
         title: detailSEO.length > 0 ? detailSEO[0].value : '',
         url: pathname,
         description: detailSEO.length > 0 ? detailSEO[1].value : '',
      },
      openGraph: {
         title: detailSEO.length > 0 ? detailSEO[0].value : '',
         description: detailSEO.length > 0 ? detailSEO[1].value : '',
         url: pathname,
         type: 'website',
      },
   }
}


export default function Home() {
   const t = useTranslations('Homepage');
   const locale = useLocale();
   return (
      <main className="home-container">
         <div className="searching">
            <div className="container m-auto">
               <div className="content">
                  <h1 className={`text-[1.5rem] lg:text-[2.875rem] font-montserrat font-[700]`}>{t('title')}.</h1>
                  <p className="text-[14px] lg:text-[16px] mt-[8px] lg:mt-[16px]">{t('description')}</p>
                  <HomeSearch />
                  <span className="text-[14px] lg:text-[20px] font-[600] pt-[16px]">{t('or')}</span>
                  <span className="text-[14px] lg:text-[20px] font-[600] pt-[8px]">{t('browser')}</span>
               </div>
            </div>
         </div>
         <Categories />
         <div className="start-to-search">
            <div className="container m-auto">
               <div className="content">
                  <h2 className="font-montserrat">{t('start explore')}</h2>
                  <p>{t('start desc')}</p>
                  <Link href={`/${locale}/result`} className="btn-light text-center mt-[16px] w-[180px] font-[700] text-[16px] text-black">{t('btn start')}</Link>
               </div>
            </div>
         </div>
      </main>
   )
}
