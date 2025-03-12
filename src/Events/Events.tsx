import type React from 'react';
import { motion } from "motion/react"
import BG from '@/public/gallery/gallery4.jpeg'
import { useGetEventQuery } from '@/app/api';
import { Users } from 'lucide-react';

interface GetEvent {
  data: Event[]
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

const Events: React.FC = () => {
  const { data, isLoading } = useGetEventQuery<GetEvent[] | any | undefined>(undefined);
  return (
    <div className="min-h-screen bg-gray-100 lg:px-4 sm:px-6 lg:px-8 py-24">
      <motion.section
        className='h-60 flex items-center mb-12 overflow-hidden'
        style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className='slant w-7/12 bg-black bg-opacity-50 h-full flex items-center lg:px-40 text-white'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <header className="text-center p-2">
            <motion.h1
              className="text-lg lg:text-4xl font-bold mb-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Upcoming Events
            </motion.h1>
          </header>
        </motion.div>
      </motion.section>
      {/* <section className='h-60 flex items-center mb-12' style={{backgroundImage: `url(${BG})`, backgroundSize: 'cover'}}>
        <div className='slant w-7/12 bg-black bg-opacity-50 h-full flex items-center lg:px-40 text-white'>
        <header className="text-center p-2">
          <h1 className="text-lg lg:text-4xl font-bold mb-3">Upcoming Events</h1>
        </header>
        </div>
      </section> */}

      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {data?.data.map((event: any, index: number) => (
          <motion.div key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.5 }}
            viewport={{ once: true }}


            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={event.coverPhoto?.url}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className='flex items-center justify-between mb-2'>
                <p className="text-sm text-gray-500">{event.date}</p>
                <p className="text-sm text-white flex items-center gap-2 bg-purple-500 p-1 px-2 rounded-md"><Users size={15} className='' />{event.bookings.length}</p>
              </div>
              <p className="text-base text-gray-700 text-justify">{event.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;