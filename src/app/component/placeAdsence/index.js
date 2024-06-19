

const PlaceAdsance = ({ type, className }) => {
    return (
        <div className={className}>
            {type === 'Small square' ? (
                <div className="w-[200px] h-[200px] shadow-md flex justify-center items-center">
                    This is a addsance of google
                </div>
            ) : type === 'Large rectangle' ? (
                <div className="w-full lg:w-[336px] h-[280px] shadow-md flex justify-center items-center">
                    This is a addsance of google

                </div>
            ) : type === 'Leaderboard' ? (
                <div className="w-full lg:w-[768px] h-[90px] shadow-md flex justify-center items-center">
                    This is a addsance of google

                </div>
            ) : type === 'Panorama' ? (
                <div className="w-full lg:w-[980px] h-[120px] shadow-md flex justify-center items-center">
                    This is a addsance of google

                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default PlaceAdsance;