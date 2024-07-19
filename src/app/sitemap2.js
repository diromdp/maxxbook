import { getLocale } from "next-intl/server";



export default async function sitemap2() {

    const allDocument = documents.data.data;
    const locale = getLocale();
    return allDocument.map((document) => ({
      url: `${BaseUrl}/${locale}/document/${document.slug}`,
      lastModified: document.upload.updated_at,
    }))
  }
  