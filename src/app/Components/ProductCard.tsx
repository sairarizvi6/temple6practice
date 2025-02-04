/*import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { BsFillGridFill, BsViewList } from "react-icons/bs";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { GoArrowSwitch } from "react-icons/go";
import { IoShareSocialSharp } from "react-icons/io5";

interface Product {
  _id: string;
  title: string;
  productImage: string;
  price: number;
  tags?: string[];
  discountPercentage?: number;
  isNew?: boolean;
}

// Format the price to add commas for easier readability
const formatPrice = (price: number) => {
  const priceStr = price.toString();
  const formatted = priceStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return formatted;
};

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
    setLoading(true);
    setError(null)
      try {
        // Fetch products from Sanity, filtering for furniture
        const query = `*[_type == "product" && category == "furniture"] {
          _id,
          title,
          "productImage": productImage.asset->url,
          price,
          tags,
          discountPercentage,
          isNew
        }`;
        const fetchedProducts: Product[] = await client.fetch(query);
        setProducts(fetchedProducts);
      } catch (error: any) {
        setError(error?.message || "Error fetching products");
        setProducts([]);
        console.error("Error fetching products:", error);
      }
        setLoading(false);
    };
    fetchProducts();
  }, []);

  if(loading) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center bg-peach py-10">
          <div className="flex justify-between items-center w-full h-2 max-w-4xl p-4">
              <h2 className="text-center text-xl font-semibold">Loading Products...</h2>
          </div>
        </div>
    </div>
    )
  }

  if(error) {
    return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center bg-peach py-10">
          <div className="flex justify-between items-center w-full h-2 max-w-4xl p-4">
          <h2 className="text-center text-xl font-semibold text-red-500">{error}</h2>
        </div>
      </div>
    </div>
    )
  }

  if(!products || products.length === 0){
        return (
          <div className="min-h-screen">
            <div className="flex flex-col items-center bg-peach py-10">
              <div className="flex justify-between items-center w-full h-2 max-w-4xl p-4">
                <h2 className="text-center text-xl font-semibold">No products found</h2>
              </div>
            </div>
        </div>
        )
    }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center bg-peach py-10">
        <div className="flex justify-between items-center w-full h-2 max-w-4xl p-4">
          <div className="lg:flex gap-3 space-x-4">
            <HiMiniAdjustmentsHorizontal className="w-[20px] h-[20px]" />
            <h1 className="font-[400px] text-[20px] leading-[30px] w-12 h-[30px] mt-[-9px]">
              Filter
            </h1>
            <BsFillGridFill className="w-[18px] h-[18px]" />
            <BsViewList className="w-[20px] h-[20px]" />
          </div>

          <div className="lg:w-[40px] border-[1px] rotate-90 text-black "></div>
          <div className="text-center text-sm">
            <span className=" lg:px-2 py-1 lg:ml-[-180px]">
              Showing 1-16 of 32 results
            </span>
          </div>
          <div className="lg:flex space-x-4 lg:mr-[-98px]">
            <label className="flex items-center space-x-1">
              <span>Show</span>
              <select className="border lg:px-2 py-1">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </label>

            <label className="lg:flex lg:items-center lg:space-x-2  ">
              <span>Sort By</span>
              <select className="border lg:px-2 py-1">
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                </select>
                </label>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-12 mt-8 lg:px-24 justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div
                  key={product._id}
                  className="relative bg-white border p-4 group hover:bg-gray-300 transition-colors mx-auto w-full max-w-[270px] h-auto overflow-hidden"
                >
                  {(product.discountPercentage || product.isNew) && (
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 text-white text-sm font-bold rounded-full ${product.discountPercentage ? "bg-red-500" : "bg-green-500"}`}
                    >
                      {product.discountPercentage ? `${product.discountPercentage}% off` : "NEW"}
                    </div>
                  )}

                  <Image
                    src={product.productImage || "/placeholder-image.jpg"}
                    alt={product.title}
                    width={301}
                    height={301}
                    className="w-full h-[301px] object-cover mb-4"
                  />

                  <h2 className="text-xl text-[#3A3A3A] font-semibold mb-2">{product.title}</h2>
                  <p className="text-gray-700 text-sm line-clamp-1 mb-2">{product.tags?.join(", ")}</p>
                  <div className="text-sm font-medium mb-4">
                      <span className="text-[#3A3A3A] font-semibold">Rs. {formatPrice(product.price)}</span>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-transform duration-200 ease-in-out">
                    <Link href={`/shop/${product._id}`}>
                      <h1 className="bg-white text-yellow-600 font-bold py-2 px-4 rounded shadow mb-2 hover:shadow-lg hover:bg-gray-300 transition-shadow">
                        View Detail
                      </h1>
                    </Link>
                    <div className="flex justify-center space-x-2 text-white text-sm mt-2">
                      <button className="hover:text-black flex items-center">
                        <IoShareSocialSharp /> Share
                      </button>
                      <Link href={"/product-comparision"}>
                        <button className="hover:text-black flex items-center">
                          <GoArrowSwitch /> Compare
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex gap-5 mt-10 mb-8 items-center justify-center text-center">
            <h1 className="bg-peach hover:bg-brown rounded px-5 py-2">1</h1>
            <h1 className="bg-peach hover:bg-brown rounded px-5 py-2">2</h1>
            <h1 className="bg-peach hover:bg-brown rounded px-5 py-2">3</h1>
            <h1 className="bg-peach hover:bg-brown rounded px-5 py-2">Next</h1>
          </div>
      </div>
  );
};

export default ProductCard;*/

import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import { Heart, Share2, LayoutGrid } from 'lucide-react';
import { Product } from '../types/product';
import { urlFor } from '@/sanity/lib/image';

type ProductCardProps = {
  product: Product;
};

 const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return `price: ${price.toLocaleString()}`;
  };

  // Ensure that product.productImage is not undefined or null before trying to use it
  const imageUrl = product.productImage ? urlFor(product.productImage).url() : '/path/to/default-image.jpg'; // Fallback image

  // Use a fallback alt text if product.title is missing or undefined
  const altText = product.title || 'Product image'; // Fallback alt text

  console.log('Image URL:', imageUrl); // Log to verify the image URL is correct

  return (
    <Link href="/product">
      <div className="group relative flex flex-col">
        <div className="relative aspect-square w-[95%] overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={altText}  // Use the altText variable here
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            priority // Optional: if you want to load the image with higher priority
            />
           
          <div className="absolute inset-x-0 bottom-0 bg-white/75 p-4 opacity-0 transition-opacity-50 group-hover:opacity-100">
            <button className="w-full rounded bg-black py-2 text-sm font-medium text-white hover:bg-black/90">
              Add to cart
            </button>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm text-gray-700">
              <button className="flex items-center gap-1 hover:text-black">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="flex items-center gap-1 hover:text-black">
                <LayoutGrid className="h-4 w-4" />
                Compare
              </button>
              <button className="flex items-center gap-1 hover:text-black">
                <Heart className="h-4 w-4" />
                Like
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;