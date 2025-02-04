/*import ProductCard from './ProductCard'
import { Product } from '../types/product'
import Link from 'next/link'

const ShopProducts = () => {
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
    {
      id: '5',
      name: 'Grifo',
      category: 'Night lamp',
      price: 1500000,
      image: '/f5.png',
    },
    {
      id: '6',
      name: 'Muggo',
      category: 'Small mug',
      price: 150000,
      image: '/f6.png',
      tag: {
        type: 'new'
      }
    },
    {
      id: '7',
      name: 'Pingky',
      category: 'Cute bed set',
      price: 7000000,
      originalPrice: 14000000,
      image: '/f7.png',
      tag: {
        type: 'discount',
        value: '-50%'
      }
    },
    {
      id: '8',
      name: 'Potty',
      category: 'Minimalist flower pot',
      price: 500000,
      image: '/f7.png',
      tag: {
        type: 'new'
      }
    },
    {
        id: '9',
        name: 'Potty',
        category: 'Minimalist flower pot',
        price: 500000,
        image: '/f7.png',
        tag: {
          type: 'new'
        }
      },
      {
        id: '10',
        name: 'Potty',
        category: 'Minimalist flower pot',
        price: 500000,
        image: '/f3.png',
        tag: {
          type: 'new'
        }
      },
      {
        id: '11',
        name: 'Potty',
        category: 'Minimalist flower pot',
        price: 500000,
        image: '/f3.png',
        tag: {
          type: 'new'
        }
      },
      {
        id: '12',
        name: 'Potty',
        category: 'Minimalist flower pot',
        price: 500000,
        image: '/f2.png',
        tag: {
          type: 'new'
        }
      },
      {
        id: '13',
        name: 'Potty',
        category: 'Minimalist flower pot',
        price: 500000,
        image: '/f6.png',
        tag: {
          type: 'new'
        }
      },
      {
        id: '14',
        name: 'Potty',
        category: 'Minimalist flower pot',
        price: 500000,
        image: '/f7.png',
        tag: {
          type: 'new'
        }
      },
      {
        id: '15',
        name: 'Potty',
        category: 'Minimalist flower pot',
        price: 500000,
        image: '/f2.png',
        tag: {
          type: 'new'
        }
      },
      {
        id: '16',
        name: 'Potty',
        category: 'Minimalist flower pot',
        price: 500000,
        image: '/f2.png',
        tag: {
          type: 'new'
        }
      },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8 md:px-12 lg:px-16 space-y-4">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Our Products</h2>
      <div className="grid grid-cols-1 gap-7 justify-center items-center sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link href="/shop" >
        <button className="rounded-sm border border-[#B88E2F] px-8 py-4 text-sm font-medium text-[#B88E2F] hover:border-gray-400 hover:text-gray-900 mt-2 ">
          Show More
        </button>
        </Link>
      </div>
    </div>
  )
}

export default ShopProducts;*/



//new
import React from "react";
import Image from "next/image";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { BsFillGridFill, BsViewList } from "react-icons/bs";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { GoArrowSwitch } from "react-icons/go";
import { IoShareSocialSharp } from "react-icons/io5";
import { Any } from "next-sanity";
// import AddToCart from "@/components/addtocart2";

const formatPrice = (price: number) => {
  const priceStr = price.toString();
  const formatted = priceStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return formatted;
};

const ShopProducts = async () => {
  let products = [];
  try {
    // Fetch products from Sanity
    const query = `*[_type == "product"] {
      _id,
      title,
      "productImage": productImage.asset->url,
      price,
      tags,
      discountPercentage,
      isNew
    }`;
    products = await client.fetch(query);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
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
          {products.length > 0 ? (
            products.map((product: (Any)) => (
              <div
                key={product._id}
                className="relative bg-white border p-4 group hover:bg-gray-300 transition-colors mx-auto w-full max-w-[270px] h-auto overflow-hidden"
              >
                {(product.discount || product.isNew) && (
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 text-white text-sm font-bold rounded-full ${product.discountPercentage ? "bg-red-500" : "bg-green-500"}`}
                  >
                    {product.discount || "NEW"}
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
            ))
          ) : (
            <h1 className="text-center text-red-600 items-center text-xl">Products not found</h1>
          )}
        </div>

        <div className="flex gap-5 mt-10 mb-8 items-center justify-center text-center">
          <h1 className="bg-peach hover:bg-brown rounded px-5 py-2">1</h1>
          <h1 className="bg-peach hover:bg-brown rounded px-5 py-2">2</h1>
          <h1 className="bg-peach hover:bg-brown rounded px-5 py-2">3</h1>
          <h1 className="bg-peach hover:bg-brown rounded px-5 py-2">Next</h1>
        </div>

        
      </div>
    </>
  );
};

export default ShopProducts;
