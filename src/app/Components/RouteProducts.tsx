/*import ProductCard from './ProductCard'
import { Product } from '../types/product'
import Link from 'next/link'

const RouteProducts = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Slytherine',
      category: 'Stylish cafe chair',
      price: 2500000,
      originalPrice: 3500000,
      image: '/f1.png',
      tag: {
        type: 'discount',
        value: '-30%'
      }
    },
    {
      id: '2',
      name: 'Leviosa',
      category: 'Stylish cafe chair',
      price: 2500000,
      image: '/f7.png',
    },
    {
      id: '3',
      name: 'Lolito',
      category: 'Luxury big sofa',
      price: 7000000,
      originalPrice: 14000000,
      image: '/f3.png',
      tag: {
        type: 'discount',
        value: '-50%'
      }
    },
    {
      id: '4',
      name: 'Respira',
      category: 'Outdoor bar table and stool',
      price: 500000,
      image: '/f4.png',
      tag: {
        type: 'new'
      }
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-16">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Related Products</h2>
      <div className="grid grid-cols-1 gap-7 justify-center items-center sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
      <Link href="/product" >
        <button className="rounded-sm border border-[#B88E2F] px-8 py-4 text-sm font-medium text-[#B88E2F] hover:border-gray-400 hover:text-gray-900">
          Show More
        </button>
        </Link>
      </div>
    </div>
  )
}

export default RouteProducts;*/

import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  description: string;
  productImage: string;
  price: number;
  tags: string[];
  discountPercentage?: number;
  isNew?: boolean;
  tag?: {
    type: string;
    value: string;
  };
}

const RouteProducts = () => {
  const products: Product[] = [
    {
      _id: '1',
      title: 'Slytherine',
      description: 'A stylish cafe chair.',
      productImage: '/images/f1.png',
      price: 2500000,
      tags: ['chair', 'cafe'],
      discountPercentage: 30,
      isNew: false,
      tag: { type: 'discount', value: '-30%' }
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="relative w-full h-[300px]">
              <Image 
                src={product.productImage} 
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mt-4">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-medium mt-2">Price: ${product.price.toLocaleString()}</p>
            {product.tag && (
              <span className="discount-tag bg-[#B88E2F] text-white px-2 py-1 rounded-sm text-sm mt-2 inline-block">
                {product.tag.value}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link href="/product">
          <button className="rounded-sm border border-[#B88E2F] px-8 py-4 text-sm font-medium text-[#B88E2F] hover:border-green-500">
            Show More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RouteProducts;