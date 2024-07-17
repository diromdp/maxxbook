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

  console.log(documentsData.length)

  const AllDocumentEnglish = documentsData.map((document) => ({
    url: `https://maxibook.com/en/document/${document.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))
  const AllDocumentIndonesia = documentsData.map((document) => ({
    url: `https://maxibook.com/id/document/${document.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))
  return [
    {
      url: 'https://maxibook.com/en',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.com/id',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.com/id/explorer',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.com/en/explorer',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.com/en/result',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.com/id/result',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.com/id/catagories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.com/en/catagories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://maxibook.com/en/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.com/en/contact-us',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.com/id/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.com/id/contact-us',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.com/id/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.com/id/terms-condition',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.com/en/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxibook.com/en/terms-condition',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...AllDocumentEnglish,
    ...AllDocumentIndonesia
  ]
}
