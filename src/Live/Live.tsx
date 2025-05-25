/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { motion } from "framer-motion";
import { useGetAboutQuery, useGetGalleryQuery, useGetLiveQuery, useGetTeamQuery } from '@/app/api';
import background from '../public/live.jpeg'
import { useEffect, useState } from 'react';
import image1 from '@/public/live2.jpeg'
import image2 from '@/public/card2.jpeg'
import image3 from '@/public/card3.jpeg'
import image4 from '@/public/card4.jpeg'
import { Calendar, ConciergeBell, Search } from 'lucide-react';
import SkeletonLoader from '@/SkeletonLoader';

interface LiveData {
  id: string;
  title: string;
  date: string
  time?: string;
  url: string;
  minister?: string;
  description?: string;
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


const Live: React.FC = () => {

  const { data: live, isLoading } = useGetLiveQuery<LiveData | any | undefined>(undefined);
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const { data, isLoading: load } = useGetGalleryQuery<StockData[] | any | undefined>(undefined);

  const events = [
    {
      id: 2,
      imageUrl: image1,
      title: "4 Days of Prayer",
      subtitle: "Pastor Chidi Ani",
    },
    {
      id: 2,
      imageUrl: image1,
      title: "4 Days of Prayer",
      subtitle: "Pastor Chidi Ani",
    },
    {
      id: 2,
      imageUrl: image1,
      title: "4 Days of Prayer",
      subtitle: "Pastor Chidi Ani",
    },
    {
      id: 2,
      imageUrl: image1,
      title: "4 Days of Prayer",
      subtitle: "Pastor Chidi Ani",
    },
  ];

  // const [currentLive, setCurrentLive] = useState(live?.data.length ? live.data[0] : null);
  const [currentLive, setCurrentLive] = useState<LiveData | null>(null);

useEffect(() => {
  if (!isLoading && live?.data?.length) {
    setCurrentLive(live.data[0]);
  }
}, [isLoading, live]);

  console.log("lll: ", currentLive)
  console.log('live', `https://www.youtube.com/embed/${getYouTubeVideoId(currentLive?.url ?? '')}`);

  function getYouTubeVideoId(url: string): string | null {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
  
      // Case: youtu.be/<id>
      if (hostname === 'youtu.be') {
        return parsedUrl.pathname.slice(1);
      }
  
      // Case: youtube.com/watch?v=<id>
      if (parsedUrl.searchParams.has('v')) {
        return parsedUrl.searchParams.get('v');
      }
  
      // Case: youtube.com/embed/<id> or /live/<id>
      const pathSegments = parsedUrl.pathname.split('/');
      const possibleId = pathSegments[pathSegments.length - 1];
  
      if (possibleId && possibleId.length === 11) {
        return possibleId;
      }
  
      return null;
    } catch {
      return null;
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 ">
      <section className='w-full h-screen text-white' style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat, no-repeat", backgroundSize: "cover" }}>
        <div className='w-full h-screen flex items-end bg-gradient-to-t from-black to-'>
          <div className='container p-4 flex'>
            <div className='h-20vh mb-40 lg:mb-20'>
              <p className='font-bold text-xl'>Live</p>
              <div className='mt-6 space-y-4'>
                <motion.h1 className='uppercase text-xl lg:text-4xl overflow-hidden font-[Aberto]'
                  initial={{ y: 500 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2 }}
                >
                  Join us Live from anywhere around the world
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#181D21] text-white'>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:px-4 sm:px-6 lg:px-8 py-14 overflow-x-hidden">
          <motion.div
            className="w-full text-center"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >

            <div className="grid grid-cols-1 gap-8 lg:mt-12 p-4">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className='overflow-hidden lg:h-[40rem] rounded-lg'
                >
                  <iframe
                    width="100%"
                    height="1000%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentLive?.url ?? '')}`}
                    title="Introductory Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className='w-full h-full object-cover'
                  />
                </div>

                <section className='w-full lg:flex items-center justify-between gap-6'>
                  <div className="lg:w-6/12 p-4 py-8 text-start overflow-hidden">
                    <h3 className="text-lg font-semibold">{currentLive?.title ?? 'The Pentecost - Annual Worship Experience 2024'}</h3>
                    {/* <div className="text-xs mb-3">Pastor Chidi Ani</div> */}
                    <div className="text-xs mb-3 flex gap-2 items-center"><Calendar /> {currentLive?.date ?? ''}</div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-justify">{currentLive?.description ?? 'Live Description'}</span>
                    </div>
                  </div>

                  <div className="lg:w-4/12 p-4 py-8 text-center bg-[#252C31] overflow-hidden shadow-md rounded-2xl space-y-4">

                    <h3 className="text-lg font-semibold flex flex-col items-center"><ConciergeBell /> Latest Resources</h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">Subscribe to get the latest events, sermons, live streams, etc directly into your mail. Never miss an update from us. </span>
                    </div>

                    <motion.button
                      className="text-black text-sm py-2 px-4 rounded-full border border-white w-full bg-gray-300"
                      whileHover={{ backgroundColor: '#111827', color: '#fff' }}
                      transition={{ duration: 0.3 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </section>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className='bg-[#282828] text-white p-4'>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden">
          <motion.div
            className="w-full text-center"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-xl font-bold mb-6 text-start"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              More LIVE Streams
            </motion.h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                <SkeletonLoader className={'w-full h-48'} />
                <SkeletonLoader className={'w-full h-48'} />
                <SkeletonLoader className={'w-full h-48'} />
                <SkeletonLoader className={'w-full h-48'} />
              </div>
            ) : (
              live?.data ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                  {live?.data?.map((live: any, index: number) => (
                    <motion.div
                      key={live.id}
                      className="overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="relative" onClick={ () => setCurrentLive(live)}>
                        <img
                        loading="lazy"
                          src={live.coverPhoto.url}
                          alt={live.title}
                          className="w-full h-48 rounded-2xl object-cover"
                        />
                      </div>

                      <div className="p-2 text-start space-y-2">
                        <h3 className="text-md font-semibold">{live.title}</h3>
                        <div className="text-xs mb-3">{live.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className='flex gap-2'><Search />No Live Stream available at the moment</p>
              ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Live;