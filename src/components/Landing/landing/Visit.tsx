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
import { useGetAboutQuery } from '@/app/api';
import {useNavigate} from 'react-router-dom';

interface AboutSection {
    id: string;
    vision: string;
    visionPhoto:{
    url: string;
    }
    mission?: string;
    missionPhoto:{
        url: string;
        }
  }

export default function Visit() {
    const navigate = useNavigate()
    const { data: about, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
    const Cards = [
        {
            image: card1,
            name: 'Music',
            alt: "image 1"
        },
        {
            image: card2,
            name: 'Events',
            alt: "image 2"
        },
        {
            image: card3,
            name: 'Store',
            alt: "image 3"
        },
        {
            image: card4,
            name: 'Giving',
            alt: "image 4"
        },
        {
            image: card5,
            name: 'Volunteers',
            alt: 'image 5'
        },
    ];

    const routeToAboutPage = () =>{
        return navigate('/about')
    }

    return (
        <div className="w-full p-10 overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50">
            <section className="container space-y-4">
                <h2 className='font-semibold text-xl'>Where would you like to visit?</h2>
                <section className="hidden container lg:grid grid-cols-5 gap-4">
                    {Cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className='h-80 rounded-2xl w-64 border-2 border-yellow-500 bg-cover bg-center'
                            style={{ backgroundImage: `url(${card.image})` }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.5, once: true }}
                            viewport={{ once: true }}
                        >
                            <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-10 text-xl text-white font-bold'>
                                <p className='uppercase'>{card.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </section>

                <div className="relative lg:hidden my-10">
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
                </div>

                <section className='w-full text-md lg:text-lg'>
                    <motion.h2
                        className='h1 text-center my-6 pt-8 lg:my-20 text-xl lg:text-5xl font-bold lg:font-normal uppercase bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
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
                                Read More
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
                                src="https://www.youtube.com/embed/_DcrrrlE3Og?si=SsZqNElJHR2p5Xjo"
                                title="Introductory Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='w-full h-full object-cover'
                            />
                        </motion.div>

                    </div>
                </section>
            </section>
        </div>
    );
}