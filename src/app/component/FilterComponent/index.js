import { useState, useEffect } from 'react';
import { Select, Skeleton } from 'antd';
import { useLocale } from 'next-intl';
import { setCategoryFilterState } from "../../store/reducer/categoryFilterSlice";
import { useAppDispatch, useAppSelector } from "../../store";


const FilterComponent = ({ DataFetchCategory, isLoading, getDocument}) => {
    const dispatch = useAppDispatch();
    const categoryFilterState = useAppSelector((state) => state.documents.categoryFilterState);
    const [selectedId, setSelectedId] = useState();
    let optionsCategory = [];
    const locale = useLocale();
    DataFetchCategory && DataFetchCategory.map((item) => {
        const category = {
            value: item.id,
            label: locale == 'en' ? item.name : item.name_id
        }
        optionsCategory.push(category);
    })

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const clearSelected = () => {
        dispatch(setCategoryFilterState({...categoryFilterState, category_id: ''}));
        setSelectedId(null);
        getDocument('');

    }
    const onChange = (value) => {
        dispatch(setCategoryFilterState({...categoryFilterState, category_id: value}));
        setSelectedId(value);
        getDocument(value);
    }

    useEffect(() => {
        //setSelectedId(categoryFilterState.category_id ? categoryFilterState.category_id : null);
    }, []);

    return (
        <div className="filter-container mb-[32px]">
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