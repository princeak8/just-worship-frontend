import type React from 'react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useGetAboutQuery, useGetGalleryQuery, useGetTeamQuery } from '@/app/api';

import image1 from '@/public/books.png';
import image2 from '@/public/merch.png';
import image3 from '@/public/music.png';
import image4 from '@/public/card4.jpeg';
import foot from '@/public/foot.png';
import logo from '@/public/logo.png';
import { ChevronLeft, ChevronRight, ShoppingCart, User } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  imageUrl: any;
}

const Store: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = [
    {
      id: 1,
      title: "Books",
      imageUrl: image1,
      borderColor: "border-blue-400"
    },
    {
      id: 2,
      title: "Merch",
      imageUrl: image2,
      borderColor: "border-yellow-400"
    },
    {
      id: 3,
      title: "Music",
      imageUrl: image3,
      borderColor: "border-orange-400"
    }
  ];

  useEffect(() => {
    const productData = [
      {
        id: 1,
        title: "Praise and Worship Manual",
        price: "$19.99",
        category: "Books",
        imageUrl: image1
      },
      {
        id: 2,
        title: "The Power Of Worship",
        price: "$21.99",
        category: "Books",
        imageUrl: image2
      },
      {
        id: 3,
        title: "Spiritual Awakening",
        price: "$18.99",
        category: "Books",
        imageUrl: image3
      },
      {
        id: 4,
        title: "Divine Melodies",
        price: "$22.99",
        category: "Books",
        imageUrl: image4
      },
      {
        id: 5,
        title: "Just Worship Black Tee",
        price: "$24.99",
        category: "Shirts",
        imageUrl: image1
      },
      {
        id: 6,
        title: "Worship Leader Gold Tee",
        price: "$29.99",
        category: "Shirts",
        imageUrl: image2
      },
      {
        id: 7,
        title: "Faith Over Fear Tee",
        price: "$24.99",
        category: "Shirts",
        imageUrl: image3
      },
      {
        id: 8,
        title: "Worship Musician Tee",
        price: "$24.99",
        category: "Shirts",
        imageUrl: image4
      },
      {
        id: 9,
        title: "Live Worship Album Vol.1",
        price: "$12.99",
        category: "Music",
        imageUrl: image1
      },
      {
        id: 10,
        title: "Instrumental Worship",
        price: "$11.99",
        category: "Music",
        imageUrl: image2
      },
      {
        id: 11,
        title: "Spontaneous Worship",
        price: "$9.99",
        category: "Music",
        imageUrl: image3
      },
      {
        id: 12,
        title: "Just Worship Live",
        price: "$14.99",
        category: "Music",
        imageUrl: image4
      }
    ];

    setProducts(productData);
    setFilteredProducts(productData);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery, products]);

  return (
    <div className="min-h-screen bg-white pt-40">
      <div className="w-full py-6">
        <div className="container mx-auto px-4 space-y-4">
          <h1 className="text-center text-xl lg:text-4xl font-bold uppercase font-[DM Sans]">Just Worship International Store</h1>
          <p className="text-center text-md lg:text-2xl ">GET WHAT YOU NEED</p>
        </div>
      </div>

      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                className={`relative h-[35rem] overflow-hidden rounded-xl`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
                <img
                loading="lazy"
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-3xl font-bold">
                  {product.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-black rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className='flex items-center gap-2 text-sm'><User size={30} className='border border-black rounded-full p-1' /> Account</div>
              <div className='flex items-center gap-2 text-sm'><ShoppingCart size={30} className='border border-black rounded-full p-1' /> Cart</div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container mx-auto px-4 space-y-14">
          {activeCategory === 'All' || activeCategory === 'Books' ? (
            <div className="mb-8  ">
              <div className='flex items-center justify-between border-b border-b-black mb-8'>
                <h2 className="text-lg font-bold ">Book Store</h2>
                <div className='flex text-yellow-800 cursor-pointer'>
                  View all
                  <ChevronRight />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts
                  .filter(product => product.category === 'Books')
                  .map(product => (
                    <div key={product.id} className="group">
                      <div className="bg-gray-100 mb-2 aspect-[3/4] overflow-hidden">
                        <img
                        loading="lazy"
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-sm font-medium">{product.title}</h3>
                      <p className="text-sm text-gray-600">{product.price}</p>
                      {/* <button className="mt-1 text-xs text-gray-500 hover:text-black">Add to cart</button> */}
                    </div>
                  ))}
              </div>
            </div>
          ) : null}

          {activeCategory === 'All' || activeCategory === 'Shirts' ? (
            <div className="mb-8">
              <div className='flex items-center justify-between border-b border-b-black mb-8'>
                <h2 className="text-lg font-bold ">Merch Store</h2>
                <div className='flex text-yellow-800 cursor-pointer'>
                  View all
                  <ChevronRight />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts
                  .filter(product => product.category === 'Shirts')
                  .map(product => (
                    <div key={product.id} className="group">
                      <div className="bg-gray-100 mb-2 aspect-square overflow-hidden">
                        <img
                        loading="lazy"
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-sm font-medium">{product.title}</h3>
                      <p className="text-sm text-gray-600">{product.price}</p>
                      {/* <button className="mt-1 text-xs text-gray-500 hover:text-black">Add to cart</button> */}
                    </div>
                  ))}
              </div>
            </div>
          ) : null}

          {activeCategory === 'All' || activeCategory === 'Music' ? (
            <div className="mb-8">
              <div className='flex items-center justify-between border-b border-b-black mb-8'>
                <h2 className="text-lg font-bold ">Music Store</h2>
                <div className='flex text-yellow-800 cursor-pointer'>
                  View all
                  <ChevronRight />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts
                  .filter(product => product.category === 'Music')
                  .map(product => (
                    <div key={product.id} className="group">
                      <div className="bg-gray-100 mb-2 aspect-square overflow-hidden">
                        <img
                        loading="lazy"
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-sm font-medium">{product.title}</h3>
                      <p className="text-sm text-gray-600">{product.price}</p>
                      {/* <button className="mt-1 text-xs text-gray-500 hover:text-black">Add to cart</button> */}
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section style={{ background: `url(${foot})`, backgroundRepeat: 'no-repeat, no-repeat', backgroundSize: 'cover' }} className='w-full h-[20rem] lg:h-[45rem] mt-20'>
        <div className='w-full h-full bg-black bg-opacity-60 flex items-center lg:items-end text-white text-xl lg:text-4xl  font-[DM Sans]'>
          <div className='container space-y-4 py-28 px-4'>
            <h1>GET GOD INSPIRED BOOKS.</h1>
            <h1>GET DIFFERENT MERCH FOR ALL AGES.</h1>
            <h1>GET GOD INSPIRED MUSIC.</h1>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Store;