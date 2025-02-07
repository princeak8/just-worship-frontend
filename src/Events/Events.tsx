import type React from 'react';
import {motion} from "motion/react"
import BG from '@/public/gallery/gallery4.jpeg'

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Tech Conference 2023',
    date: '2023-11-15',
    description: 'Join us for the biggest tech conference of the year!',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
  },
  {
    id: 2,
    title: 'Art Exhibition',
    date: '2023-12-01',
    description: 'Explore the latest in contemporary art.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
  },
  {
    id: 3,
    title: 'Music Festival',
    date: '2024-01-20',
    description: 'A weekend of live music and performances.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
  },
];

const Events: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 lg:px-4 sm:px-6 lg:px-8 py-24">
       <motion.section 
        className='h-60 flex items-center mb-12 overflow-hidden' 
        style={{backgroundImage: `url(${BG})`, backgroundSize: 'cover'}}
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
        {events.map((event, index) => (
            <motion.div key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.5 }}
            viewport={{once: true}}

            
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{event.date}</p>
              <p className="text-base text-gray-700">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;