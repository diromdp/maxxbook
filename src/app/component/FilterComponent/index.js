import Link from 'next/link';
import { Select, Skeleton } from 'antd';

const FilterComponent = ({ data, font, isLoading }) => {

    const dataLanguage = [
        {
            value: 'ID',
            label: 'Indonesia'
        },
        {
            value: 'EN',
            label: 'English'
        }
    ];
    const dataLength = [
        {
            value: '3',
            label: '1-3 pages'
        },
        {
            value: '100',
            label: '4-100 pages'
        },
    ];
    const dataType = [
        {
            value: 'PDF',
            label: 'PDF'
        },
        {
            value: 'MS word',
            label: 'MS Word'
        },
        {
            value: 'Presentation',
            label: 'Presentation'
        },
        {
            value: 'Spreadsheet',
            label: 'Spreadsheet'
        },
    ]

    return (
        <div className="filter-container">
            {
                isLoading ?
                    <>
                        <div className="item-filter">
                            <Select
                                placeholder="Length"
                                options={dataLength}
                            />
                        </div>
                        <div className="item-filter">
                            <Select
                                placeholder="File Type"
                                options={dataType}
                            />
                        </div>
                        <div className="item-filter">
                            <Select
                                placeholder="Language"
                                options={dataLanguage}
                            />
                        </div>
                        <div className="item-filter">
                            <Link className={`${font}`} href={"/"}>Clear all</Link>
                        </div>
                    </> :
                    <>
                        <div className="item-filter">
                            <Skeleton className="filter-loading" active paragraph={{ rows: 0 }} />
                        </div>
                        <div className="item-filter">
                            <Skeleton className="filter-loading" active paragraph={{ rows: 0 }} />
                        </div>
                        <div className="item-filter">
                            <Skeleton className="filter-loading" active paragraph={{ rows: 0 }} />
                        </div>
                        <div className="item-filter">
                            <Skeleton className="filter-loading" active paragraph={{ rows: 0 }} />
                        </div>

                    </>
            }
        </div>
    );
}

export default FilterComponent;