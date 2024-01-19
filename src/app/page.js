
import Categories from './component/categories'


export default function Home() {
  return (
    <main className="home-container">
      <div className="searching">
        <div className="container m-auto">
          <div className="content">
            <h1 className={`text-[1.5rem] lg:text-[2.875rem] font-montserrat font-[700]`}>Welcome to Maxibook.</h1>
            <p className="text-[14px] lg:text-[16px] mt-[8px] lg:mt-[16px]">All you can read is free! Get millions of documents you need here</p>
            <form className='form-search'>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Anything here..." required />
                  <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </form>
            <span className="text-[14px] lg:text-[20px] font-[600] pt-[16px]">or</span>
            <span className="text-[14px] lg:text-[20px] font-[600] pt-[8px]">Browse categories</span>
          </div>
        </div>
      </div>
      <Categories/>
      <div className="start-to-search">
        <div className="container m-auto">
          <div className="content">
            <h2 className="font-montserrat">Start exploring millions of fascinating documents</h2>
            <p>Find specialized knowledge on any topic, and answers you won't find anywhere else</p>
            <button type="button" class="btn-light mt-[16px] w-[180px] font-[700] text-[16px] text-black">Let's Go</button>
          </div>
        </div>
      </div>
    </main>
  )
}
