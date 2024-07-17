import { urlAPI, BaseUrl } from "../lib/constant";
import { getLocale } from "next-intl/server";


async function getData() {
    const data = await fetch(`${urlAPI}backend/documents`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });

    return data.json()
}

export default async function sitemap() {

    const documents = await getData();
    const allDocument = documents.data.data;
    const locale = getLocale();
    return allDocument.map((document) => ({
      url: `${BaseUrl}/${locale}/document/${document.slug}`,
      lastModified: document.upload.updated_at,
    }))
  }
  