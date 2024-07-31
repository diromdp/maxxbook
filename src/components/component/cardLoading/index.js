
import { Skeleton } from "@/components/ui/skeleton"

const CardLoading = () => {
    return ( 
        <div className="result-show-item">
            <div className={`image-cover`}>
                <Skeleton className="h-[174px] w-[132px] mt-[24px]" />
            </div>
            <div className="description">
                <Skeleton className="h-[16px] mb-[8px]" />
                <Skeleton className="h-[16px] mb-[8px]" />
                <Skeleton className="h-[16px]" />
            </div>
        </div>
    );
}
 
export default CardLoading;