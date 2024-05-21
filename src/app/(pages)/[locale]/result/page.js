import React from 'react';
import ResultShow from '../../../component/result';

export const metadata = {
    title: 'Documentation',
    description: 'Documentation',
}
export default function result({searchParams}) {

    const query = searchParams.query?? '';
     
    return (
        <>
            <div className="result-page">
                <ResultShow QueryParams={query} />
            </div>
        </>
    );
}