import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { urlAPI, BaseUrl } from "@/lib/constant";


const Categories = dynamic(() => import('../../component/categories'), {
   ssr: false,
})
const HomeSearch = dynamic(() => import('../../component/homeSearch'), {
   ssr: false,
})

export async function generateMetadata() {
   const headersList = headers();
   const pathname = headersList.get("referer");
   const ogImage = '/image/og-image.png'; // Or use a dynamic path

   try {
      const response = await fetch(`${BaseUrl}/api/public/settings?keys=seo.title_home,seo.description_home,seo.title_home_id,seo.description_home_id`,
         {
            headers: {
               'Content-Type': 'application/json',
               'Accept': "application/json",
            },
         }
      );

      const data = await response.json();
      const detailSEO = data.data;
      
      if (detailSEO != undefined || detailSEO && detailSEO.length > 0) {
         const selectedTitle = detailSEO && detailSEO.filter(x => x.key === 'seo.title_home')
         const selectedDesc = detailSEO && detailSEO.filter(x => x.key === 'seo.description_home')
         const selectedTitleID = detailSEO && detailSEO.filter(x => x.key === 'seo.title_home_id')
         const selectedDescID = detailSEO && detailSEO.filter(x => x.key === 'seo.description_home_id')
         const locale = await getLocale();

         if (locale === 'en') {
            if (selectedTitle.length > 0 && selectedDescID.length > 0) {
               return {
                  title: selectedTitle[0].value,
                  description: selectedDesc[0].value,
                  twitter: {
                     card: 'summary_large_image',
                     title: selectedTitle[0].value,
                     url: pathname,
                     description: selectedDesc[0].value,
                     images: [{ url: ogImage }],
                  },
                  openGraph: {
                     title: selectedTitle[0].value,
                     description: selectedDesc[0].value,
                     images: [{ url: ogImage }],
                     url: pathname,
                     type: 'website',
                  },
               }
            }
         } else {
            if (selectedTitleID.length > 0 && selectedDescID.length > 0) {
               return {
                  title: selectedTitleID[0].value,
                  description: selectedDescID[0].value,
                  twitter: {
                     card: 'summary_large_image',
                     title: selectedTitleID[0].value,
                     url: pathname,
                     description: selectedDescID[0].value,
                     images: [{ url: ogImage }],
                  },
                  openGraph: {
                     title: selectedTitleID[0].value,
                     description: selectedDescID[0].value,
                     url: pathname,
                     type: 'website',
                     images: [{ url: ogImage }],
                  },
               }
            }

         }
      }

   } catch (error) {
      console.log(error)
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
                  <HomeSearch isHome={true} />
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
                  <Link href={`/${locale}/explorer`} className="btn-light text-center mt-[16px] w-[180px] font-[700] text-[16px] text-black">{t('btn start')}</Link>
               </div>
            </div>
         </div>
      </main>
   )
}
