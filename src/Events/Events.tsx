import type React from 'react';
import { motion } from "framer-motion";
import Avatar from '@/public/card1.jpeg';
import Avatar2 from '@/public/about.png';
import { useGetAboutQuery, useGetEventQuery, useGetGalleryQuery, useGetTeamQuery } from '@/app/api';
import background from '../public/events.jpeg';
import map from '../public/maps.svg';
import worship from '@/public/worship-school.jpeg';
import logo from '@/public/logo.png';
import { useEffect, useState } from 'react';
import image1 from '@/public/card1.jpeg';
import image2 from '@/public/card2.jpeg';
import image3 from '@/public/card3.jpeg';
import image4 from '@/public/card4.jpeg';

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

interface TeamData {
  data: TeamMember[]
}

interface TeamMember {
  id?: string;
  name: string;
  position: string;
  biography: string;
  photo: {
    url: string;
  }
}

interface StockData {
  data: Stock[]
}

interface Stock {
  id?: string;
  title: string;
  event: string;
  photo: {
    url: string;
  }
}

// Define animation variants for a smoother, spring-based effect
const textVariant = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 60, damping: 15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      delay: i * 0.2
    }
  })
};

const buttonHover = {
  whileHover: { scale: 1.05, backgroundColor: '#111827' }
};

const Events: React.FC = () => {

  const { data: events, isLoading } = useGetEventQuery<AboutSection | any | undefined>(undefined);
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const { data, isLoading: load } = useGetGalleryQuery<StockData[] | any | undefined>(undefined);
  const [Gallery, setGallery] = useState<any>([]);
  const [searchparams, setSearchParams] = useState('');

  const search = () => {
    if (!data?.data) return [];
    return data.data.filter((item: Stock) =>
      item.title.toLowerCase().includes(searchparams.toLowerCase().trim())
    );
  };

  // For demo purposes, we use a static gallery list
  useEffect(()=>{
    setGallery([ image1, image2, image3, image4,  image1, image2, image3, image4,  image1, image2 ])
  },[]);

  const event = [
    {
      id: 1,
      name: "Just Worship: The Pentecost",
      content: "Part One Act",
      date: "June 23, 2025",
      time: "5:00PM",
      location: "UNN Enugu Campus",
      imageUrl: image1,
      badge: "8TH NOV | 7PM",
      venue: "MICHAEL OKPARA SQUARE"
    },
    {
      id: 2,
      name: "Just Worship: The Pentecost",
      content: "Part One Act",
      date: "June 23, 2025",
      time: "5:00PM",
      location: "UNN Enugu Campus",
      imageUrl: image2,
      badge: "9PM"
    },
    {
      id: 3,
      name: "Just Worship: The Pentecost",
      content: "Part One Act",
      date: "June 23, 2025",
      time: "5:00PM",
      location: "UNN Enugu Campus",
      imageUrl: image3,
      badge: "GET READY"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 ">
      <section 
        className='w-full h-screen text-white' 
        style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
        <div className='w-full h-screen flex items-end bg-black bg-opacity-70'>
          <div className='container p-4 flex'>
            <div className='h-20vh mb-40 lg:mb-20'>
              <p className='font-bold text-xl'>Events</p>
              <div className='mt-6 space-y-4'>
                <motion.h1 
                  className='uppercase text-xl lg:text-4xl overflow-hidden font-[Aberto]'
                  variants={textVariant}
                  initial="hidden"
                  animate="visible"
                >
                  TOURS, EVENTS, TEACHINGS, Ministry, and prAYER 
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#181D21] text-white'>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden">
          <motion.div className="w-full text-center p-4">
            <motion.h2
              className="text-xl font-bold mb-6 text-start"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: true }}
            >
              Featured
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {event.map((event, index) => (
                <motion.div 
                  key={event.id}
                  className="bg-[#252C31] overflow-hidden shadow-md"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img 
                      src={event.imageUrl} 
                      alt={event.name} 
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  
                  <div className="p-4 py-8 text-start">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <div className="text-xs mb-3">{event.content}</div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-sm ">{event.location}</span>
                    </div>

                    <div className='w-full flex items-center justify-start'>
                      <motion.button 
                        className="text-white text-sm py-2 px-4 rounded-full border border-white"
                        whileHover={buttonHover.whileHover}
                        transition={{ duration: 0.3 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className='p-4'>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden">
          <motion.div
            className="w-full text-center"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-xl font-bold mb-6 text-start"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: true }}
            >
              All Events
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {events?.data?.map((event: any, index: number) => (
                <motion.div 
                  key={event.id}
                  className="overflow-hidden shadow-md"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img 
                      src={event?.coverPhoto?.url} 
                      alt={event?.name} 
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  
                  <div className="p-4 py-8 text-start">
                    <h3 className="text-lg font-semibold">{event?.name}</h3>
                    <div className="text-xs mb-3">{event?.content}</div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm">{event?.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm">{event?.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-sm ">{event?.location}</span>
                    </div>

                    <div className='w-full flex items-center justify-start'>
                      <motion.button 
                        className="text-sm py-2 px-4 rounded-full border border-[#181D21]"
                        whileHover={{ scale: 1.05, backgroundColor: '#181D21', color: '#fff' }}
                        transition={{ duration: 0.3 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Events;
