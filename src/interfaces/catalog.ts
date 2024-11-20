interface imageFormats {
  thumbnail?: { url: string };
  small?: { url: string };
}

interface imageArr {
  url: string;
  width: number;
  height: number;
  formats?: imageFormats;
}

export default interface Catalog {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  orderPrice: number;
  stockPrice: number;
  newPrice: number;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: imageArr;
}
