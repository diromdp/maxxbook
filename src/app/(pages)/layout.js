import Header from '@/app/component/header';
import Footer from '@/app/component/footer';


export default function PagesLayout({ children }) {
    return (
        <div className='flex flex-col h-screen justify-between'>
            <Header />
            <div className='flex-grow'>
                {children}
            </div>
            <Footer />
        </div>
    )
}