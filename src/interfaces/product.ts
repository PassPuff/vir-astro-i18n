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

export default interface Product {
  id: number;
  documentId: string;
  name: string;
  description: string;
  orderPrice: number;
  stockPrice: number;
  newPrice: number;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  imageMain: imageArr;
}
