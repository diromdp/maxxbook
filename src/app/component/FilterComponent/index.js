import { useState } from 'react';
import { Select, Skeleton } from 'antd';
import { useLocale } from 'next-intl';

const FilterComponent = ({ FilterDocument, DataFetchCategory, isLoading, setFilterDocuments, filterDocuments }) => {

    const [selectedId, setSelectedId] = useState(null);
    let optionsCategory = [];
    const locale = useLocale();
    DataFetchCategory.map((item) => {
        const category = {
            value: item.id,
            label: locale == 'en' ? item.name : item.name_id
        }
        optionsCategory.push(category);
    })

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const clearSelected = () => {
        setSelectedId(null)
    }
    const onChange = (value) => {
        setSelectedId(value)
        console.log(value);
    }
    return (
        <div className="filter-container">
            {
                !isLoading ?
                    <>
                        <div className="item-filter">
                            <Select
                                showSearch
                                placeholder="Select a Category"
                                options={optionsCategory}
                                onChange={onChange}
                                filterOption={filterOption}
                                value={selectedId}
                            />
                        </div>
                        {
                            selectedId &&
                            <div className="item-filter">
                                <div onClick={clearSelected} className={'text-sm font-[500] leading-2 text-[#596280] cursor-pointer underline'}>Clear all</div>
                            </div>
                        }

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