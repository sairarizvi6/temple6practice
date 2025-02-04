/*export type Product = {
    description: ReactI18NextChildren | Iterable<ReactI18NextChildren>
    discountPercentage: ReactI18NextChildren | Iterable<ReactI18NextChildren>
    discountPercentage: any
    _id: Key | null | undefined
    title: string
    productImage: any
    id: string
    name: string
    category: string
    price: number
    originalPrice?: number
    image: string
    tag?: {
      type: 'discount' | 'new'
      value?: string
    }
  }*/
    export type Product = {
      _id: string;
      title: string;
      price: number;
      discountpercentage: number;
      tags: string[];
      productImage: {
        asset: {
          _ref: string;
        };
      };
      description: string;
      available: boolean;
    };
