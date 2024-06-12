import React from 'react';
import ResultShow from '../../../component/result';
import { urlAPI } from "../../../../lib/constant";
import { headers } from "next/headers";

async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=seo.title_result%2Cseo.description_seo_result`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }
    return data.json()
}

export async function generateMetadata() {
    const headersList = headers();
    const pathname = headersList.get("referer");
    const detailSEO = await getDetails();
    return {
        title: detailSEO.length > 0 ? detailSEO[0].value : '',
        description: detailSEO.length > 0 ? detailSEO[1].value : '',
        twitter: {
            card: 'summary_large_image',
            title: detailSEO.length > 0 ? detailSEO[0].value : '',
            url: pathname,
            description: detailSEO.length > 0 ? detailSEO[1].value : '',
        },
        openGraph: {
            title: detailSEO.length > 0 ? detailSEO[0].value : '',
            description: detailSEO.length > 0 ? detailSEO[1].value : '',
            url: pathname,
            type: 'website',
        },
    }
}

export default function result({ searchParams }) {

    const query = searchParams.query ?? '';
    return (
        <>
            <div className="result-page">
                <ResultShow QureyParams={query} />
            </div>
        </>
    );
}