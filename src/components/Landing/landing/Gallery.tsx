import Background from '../../../public/galleryBG.jpeg';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useGetGalleryQuery } from '@/app/api';
import { useEffect, useState } from 'react';

interface StockData {
    data: Stock[]
  }
  
  interface Stock {
    id?: string;
    title: string;
    event: string;
    photo:{
      url: string;
    } 
  }

export default function Gallery() {
const { data, isLoading } = useGetGalleryQuery<StockData[] | any | undefined>(undefined);
const [Gallery, setGallery] = useState([])
const [searchparams, setSearchParams] = useState('')

const search = () => {
    if (!data?.data) return [];
    return data.data.filter((item: Stock) =>
        item.title.toLowerCase().includes(searchparams.toLowerCase().trim())
    );
};

useEffect(() => {
    setGallery(search());
}, [data?.data, searchparams]);


    const customWidths = ['450px', '450px', '450px', '335px', '335px', '335px', '335px'];

    return (
        <div
            className="w-full text-white overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50"
            style={{
                background: `url(${Background})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="w-full h-full bg-black bg-opacity-90 p-10">
                <section className="container space-y-4 text-center lg:py-20">
                    <div className="lg:leading-10">
                        <h2 className="text-xl lg:text-5xl font-bold lg:font-normal uppercase bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Gallery</h2>
                        <p>
                        A Tapestry of Worship, Woven with Faith, Fellowship, and Divine Purpose
                        </p>
                    </div>
                    <div className='flex flex-wrap lg:flex-nowrap items-center gap-4 py-10'>
                        <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                            <Search />
                            <input type='text' value={searchparams} onChange={(e) => setSearchParams(e.target.value)} placeholder='Search...' className='p-2 py-1 bg-transparent focus:outline-none w-full' />
                        </div>
                        <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                            <select className='p-2 bg-transparent focus:outline-none w-full'>
                                <option>Location</option>
                            </select>
                        </div>
                        <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                            <select className='p-2 bg-transparent focus:outline-none w-full'>
                                <option>Select by Event</option>
                            </select>
                        </div>
                        <div className='flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto'>
                            <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                                <select className='p-2 bg-transparent focus:outline-none w-full'>
                                    <option>Select by Year</option>
                                </select>
                            </div>
                            <div className='border border-white rounded-full flex items-center justify-center p-1 px-4 w-full lg:w-auto'>
                                <select className='p-2 bg-transparent focus:outline-none w-full'>
                                    <option>Sort by</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <section className="grid md:grid-cols-2 lg:flex !w-full flex-wrap gap-4 ">
                        {Gallery?.map((image: any, index: number) => (
                            <motion.div key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: index * 0.5 }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={image.photo.url}
                                    alt={`Gallery ${index + 1}`}
                                    style={{
                                        width: customWidths[index % customWidths.length],
                                        height: '200px',
                                        objectFit: 'cover',
                                    }}
                                    className="rounded-lg"
                                />
                            </motion.div>
                        ))}
                    </section>
                </section>
            </div>
        </div>
    );
}
