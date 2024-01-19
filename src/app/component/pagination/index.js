import { Pagination, Skeleton } from 'antd';


const PaginationComponent = ({ defaultCurrent, total, onShowSizeChange, isLoading }) => {

    return (
        <div className="pagination-container">
            {
                !isLoading ? <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={defaultCurrent}
                    total={total}
                /> :
                <Skeleton className="pagination-loading" active paragraph={{ rows: 0 }} />
            }

        </div>);
}

export default PaginationComponent;