import { client } from "@/sanity/lib/client";
import Link from "next/link"; // Import Link from next/link
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useState, useEffect } from 'react';

async function fetchProducts(): Promise<Product[]> {
    const query = `*[_type == "product"] {
    _id,
    title,
    price,
    discountPercentage,
    tags,
    productImage {
      asset {
        _ref
      }
    },
    description,
    available
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (e: any) {
              setError(e?.message || "Failed to fetch products");
              setProducts([]);
            }
            setLoading(false);
        };
        loadProducts();
    }, []);


    if(loading){
      return (
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-16">
          <h2 className="text-center text-xl font-semibold">Loading Products...</h2>
         </div>
      )
    }

    if (error) {
       return (
         <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-16">
            <h2 className="text-center text-xl font-semibold text-red-500">{error}</h2>
         </div>
       )
    }

    if(!products || products.length === 0){
      return (
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-16">
          <h2 className="text-center text-xl font-semibold">No products found!</h2>
         </div>
      )
    }


  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-16">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
        Our Products
      </h2>
      <div className="grid grid-cols-1 gap-7 justify-center items-center sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link href="/shop">
          <button className="rounded-sm border border-[#B88E2F] px-8 py-4 text-sm font-medium text-[#B88E2F] hover:border-gray-400 hover:text-gray-900">
            Show More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;