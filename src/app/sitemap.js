import { urlAPI, BaseUrl } from "../lib/constant";


async function getData() {
  const data = await fetch(`${urlAPI}backend/documents?perPage=${1000}&is_random=${1}`, {
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
  const documentsData = documents.data;

  const AllDocumentEnglish = documentsData.map((document) => ({
    url: `https://maxibook.co/en/document/${document.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))
  const AllDocumentIndonesia = documentsData.map((document) => ({
    url: `https://maxibook.co/id/document/${document.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))
  return [
    {
      url: 'https://maxibook.co/en',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.co/id',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.co/id/explorer',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.co/en/explorer',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.co/en/result',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.co/id/result',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.co/id/catagories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.co/en/catagories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.co/en/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.co/en/contact-us',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.co/id/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.co/id/contact-us',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.co/id/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.co/id/terms-condition',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.co/en/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.co/en/terms-condition',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...AllDocumentEnglish,
    ...AllDocumentIndonesia
  ]
}
