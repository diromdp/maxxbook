
const BreadCumb = ({ menu }) => {
    return (
        <>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {
                        menu && menu.map((item, index) => {

                            if (item.isIcon) {
                                return (
                                    <li key={index}>
                                        <div className="flex items-center">
                                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                            {
                                                item.urlPath ? <a href={item.urlPath} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{item.name}</a>
                                                    : <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{item.name}</span>
                                            }
                                        </div>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={index} className="inline-flex items-center">
                                        <a href={item.urlPath} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                            {item.name}
                                        </a>
                                    </li>
                                )
                            }

                        })
                    }
                </ol>
            </nav>
        </>
    );
}

export default BreadCumb;