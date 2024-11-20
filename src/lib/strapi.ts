import type Product from "../interfaces/product";
import type Catalog from "../interfaces/catalog";

interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */

export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const res = await fetch(url.toString());
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}

/**
 * Getting a list of products
 * @param locale - Language code for data localization
 */
export async function getProducts(locale: string) {
  return await fetchApi<Product[]>({
    endpoint: "products",
    query: {
      populate: "imageMain",
      locale: locale || "en", // Язык по умолчанию - английский
    },
    wrappedByKey: "data",
  });
}

/**
 * Getting the list of categories
 * @param locale - Language code for data localization
 */
export async function getCategories(locale: string) {
  return await fetchApi<Catalog[]>({
    endpoint: "categories",
    query: {
      populate: "image",
      locale,
    },
    wrappedByKey: "data",
  });
}

/**
 * Getting product by slug
 * @param slug - Unique product identifier
 * @param locale - Language code for data localization
 */
export async function getProductBySlug(slug: string, locale: string) {
  return await fetchApi({
    endpoint: "products",
    query: {
      filters: `slug=${slug}`,
      populate: "imageMain,price,category",
      locale,
    },
    wrappedByKey: "data",
  });
}
