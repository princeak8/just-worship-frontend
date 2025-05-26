import Background from '../public/galleryBG.jpeg';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useGetGalleryQuery } from '@/app/api';
import { useEffect, useState } from 'react';
import SkeletonLoader from '@/SkeletonLoader';
import { LazyImage } from '@/utils/LazyImage';

interface StockData {
    data: Stock[]
}

interface Event {
    id: string;
    name: string;
    date: string;
    bookings: string;
    content: string;
    coverPhoto: {
        url: string;
    }
}

interface Stock {
    id?: string;
    title: string;
    event: Event;
    location: string;
    year: string;
    photo: {
        url: string;
    }
}

export default function Gallery() {
    const [perPage] = useState(50)
    const { data, isLoading } = useGetGalleryQuery<StockData[] | any | undefined>({perPage});
    const [Gallery, setGallery] = useState([])
    const [searchparams, setSearchParams] = useState('')

    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    if (isLoading) {
        <>
            <SkeletonLoader className={`w-[450px],  h-[200px]`} />
            <SkeletonLoader className={`w-[450px],  h-[200px]`} />
            <SkeletonLoader className={`w-[450px],  h-[200px]`} />
        </>
    }


    const search = () => {
        if (!data?.data) return [];
        return data?.data?.filter((item: Stock) => {
            // item.title.toLowerCase().includes(searchparams.toLowerCase().trim())
            const matchesTitle = item.title.toLowerCase().includes(searchparams.toLowerCase().trim());
            const matchesEvent = selectedEvent ? item?.event?.name === selectedEvent : true;
            const matchesLocation = selectedLocation ? item?.location === selectedLocation : true;
            const matchesYear = selectedYear ? item?.year === selectedYear : true;

            return matchesTitle && matchesEvent && matchesLocation && matchesYear;
        });
    };

    const events = Array.from(
        new Set(data?.data?.map((item: Stock) => item?.event?.name).filter(Boolean))
    );

    const locations = Array.from(
        new Set(data?.data?.map((item: Stock) => item?.location).filter(Boolean))
    );

    const years = Array.from(
        new Set(data?.data?.map((item: Stock) => item?.year).filter(Boolean))
    );

    useEffect(() => {
        setGallery(search());
    }, [data?.data, searchparams, selectedEvent, selectedLocation, selectedYear]);


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
                        <h2 className="text-xl lg:text-5xl font-bold lg:font-normal uppercase text-white">Gallery</h2>
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
                            <select className='p-2 bg-transparent focus:outline-none w-full text-[#BA833C]'
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="">All Locations</option>
                                {locations?.map((loc, i) => (
                                    <option key={i} value={loc as string}>{loc as string}</option>
                                ))}
                            </select>
                        </div>
                        <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                            <select className='p-2 bg-transparent focus:outline-none w-full text-[#BA833C]'
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                            >
                                <option value="">All Events</option>
                                {events?.map((event, i) => (
                                    <option key={i} value={event as string}>{event as string}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto'>
                            <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                                <select className='p-2 bg-transparent focus:outline-none w-full text-[#BA833C]'
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option value="">All Years</option>
                                    {years.map((year, i) => (
                                        <option key={i} value={year as number}>{year as number}</option>
                                    ))}
                                </select>
                            </div>
                            {/* <div className='border border-white rounded-full flex items-center justify-center p-1 px-4 w-full lg:w-auto'>
                                <select className='p-2 bg-transparent focus:outline-none w-full'>
                                    <option>Sort by</option>
                                </select>
                            </div> */}
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
                                <LazyImage
                                    src={image.photo.url}
                                    alt={image.title}
                                    width={parseInt(customWidths[index % customWidths.length], 10)}
                                    height={200}
                                />
                            </motion.div>
                        ))}
                    </section>
                </section>
            </div>
        </div>
    );
}
