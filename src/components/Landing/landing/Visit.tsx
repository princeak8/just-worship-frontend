import card1 from '../../../public/card1.jpeg';
import card2 from '../../../public/card2.jpeg';
import card3 from '../../../public/card3.jpeg';
import card4 from '../../../public/card4.jpeg';
import card5 from '../../../public/card5.jpeg';
import { motion } from 'motion/react';
import { Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useGetAboutQuery, useGetYoutubeQuery } from '@/app/api';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface AboutSection {
    id: string;
    vision: string;
    visionPhoto: {
        url: string;
    }
    mission?: string;
    missionPhoto: {
        url: string;
    }
}

interface ApiResponse {
    statusCode: number;
    data: any;
}

interface Youtube {
    title: string;
    videoUrl: string
}

export default function Visit() {
    const navigate = useNavigate()
    const { data: about, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
    const { data: Youtube, isLoading: load } = useGetYoutubeQuery<ApiResponse | any>(undefined);
    const [youtube, setYoutube] = useState<Youtube | null>(null)

    useEffect(() => {
        if (Youtube) {
            setYoutube(Youtube?.data)
        }
    }, [Youtube]);

    const embedUrl = youtube?.videoUrl
        ? youtube.videoUrl.includes('youtu.be/')
            ? youtube.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')
            : youtube.videoUrl.includes('watch?v=')
                ? youtube.videoUrl.replace('watch?v=', 'embed/')
                : youtube.videoUrl
        : '';

    const Cards = [
        {
            image: card1,
            name: 'Music',
            alt: "image 1",
            href: "/events"
        },
        {
            image: card2,
            name: 'Events',
            alt: "image 2",
            href: "/events"
        },
        {
            image: card3,
            name: 'Store',
            alt: "image 3",
            href: "/store"
        },
        {
            image: card4,
            name: 'Giving',
            alt: "image 4",
            href: "/giving"
        },
        {
            image: card5,
            name: 'Volunteers',
            alt: 'image 5',
            href: "/giving"
        },
    ];

    const routeToAboutPage = () => {
        return navigate('/about')
    }

    return (
        <div className="w-full p-10 overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50">
            <section className="container space-y-4">
                <h2 className='font-semibold text-xl'>Where would you like to visit?</h2>
                <section className=" container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {Cards?.map((card, index) => (
                        <motion.a
                            key={index}
                            href={card.href}
                            className='h-40 lg:h-80 rounded-2xl border-2 border-yellow-500 bg-cover bg-center'
                            style={{ backgroundImage: `url(${card?.image})` }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.5, once: true }}
                            viewport={{ once: true }}
                        >
                            <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-4 lg:pb-10 lg:text-xl text-white font-bold'>
                                <p className='uppercase'>{card?.name}</p>
                            </div>
                        </motion.a>
                    ))}
                </section>

                {/* <div className="relative lg:hidden my-10">
                    <Swiper
                        modules={[Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1.2}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="w-full"
                    >
                        {Cards.map((card, index) => (
                            <SwiperSlide key={index} className="relative rounded-lg overflow-hidden h-[200px] md:h-[400px] lg:h-[900px]" style={{ background: `url(${card.image})`, backgroundSize: 'cover' }}>
                                <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-10 text-xl text-white font-bold'>
                                    <p className='uppercase'>{card.name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div> */}

                <section className='w-full text-md lg:text-lg'>
                    <motion.h2
                        className='h1 text-center my-6 pt-8 lg:my-20 text-xl lg:text-5xl font-normal uppercase
                         '
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Just worship international
                    </motion.h2>

                    <div className='grid lg:grid-cols-2 gap-10 text-justify lg:leading-10'>
                        <motion.div
                            className='space-y-4'
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p>
                                {about?.data?.vision}
                            </p>
                            <motion.button
                                className='border-2 border-black bg-transparent rounded-full p-1 px-4 hover:bg-black hover:text-white transition-all'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={routeToAboutPage}
                            >
                                <a href='/about'>
                                    Read More
                                </a>
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className='overflow-hidden lg:h-[25rem] rounded-lg'
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <iframe
                                width="100%"
                                height="100%"
                                src={embedUrl}
                                title="YouTube Preview"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                    </div>
                </section>
            </section>
        </div>
    );
}