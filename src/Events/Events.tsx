import type React from 'react';
import {motion} from "motion/react"

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
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 py-28">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Upcoming Events</h1>
        <p className="text-lg text-gray-600">Check out our exciting lineup of events!</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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