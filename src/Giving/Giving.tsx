import type React from 'react';
import { motion } from "framer-motion";
import BG from '@/public/gallery/gallery4.jpeg';
import card1 from "@/public/card1.jpeg"
import { useGetAboutQuery, useGetTeamQuery } from '@/app/api';
import { Banknote, CreditCard } from 'lucide-react';

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


const Giving: React.FC = () => {

  const { data: about, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);

  const Options = ['Partnership', 'Tithe & Offering', 'Donations'];
  const Payments = [
    { name: 'Debit Card', icon: <CreditCard className="w-8 h-8" /> },
    { name: 'Credit Card', icon: <CreditCard className="w-8 h-8" /> },
    { name: 'Bank Transfer', icon: <Banknote className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden">
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
              Giving
            </motion.h1>
          </header>
        </motion.div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
            "Each gift sows seeds of transformation, cultivating hope in our shared spiritual journey."
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-10 text-justify leading-10'>
          <motion.div
            className='overflow-hidden h-full rounded-lg shadow-lg'
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={card1} alt='Introductory video' className='h-full w-full object-cover' />
          </motion.div>

          <div className='lg:space-y-12 lg:leading-12'>
            <motion.div
              className='text-center lg:leading-12 lg:space-y-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h1 className='font-semibold text-center text-lg lg:text-2xl my-4 text-gray-800'>
                Choose an option
              </h1>
              <div className='grid grid-cols-3 gap-2'>
                {Options.map((option, index) => (
                  <motion.div
                    key={index}
                    className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-purple-500'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className='text-gray-700 font-medium'>{option}</p>
                  </motion.div>
                ))}
              </div>
              <p className='text-gray-500 mt-4'>
                Nisl dolor sit amet eget tristique adipiscing tellus tristique
              </p>
            </motion.div>

            <motion.div
              className='text-center leading-12 space-y-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h1 className='font-semibold text-center text-lg lg:text-2xl my-4 text-gray-800'>
                Choose how you want to give
              </h1>
              <div className='grid grid-cols-3 gap-2'>
                {Payments.map((option, index) => (
                  <motion.div
                    key={index}
                    className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-purple-500 flex flex-col items-center justify-center'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className='text-purple-600'>{option.icon}</div>
                    <p className='text-gray-700 font-medium mt-2'>{option.name}</p>
                  </motion.div>
                ))}
              </div>
              <p className='text-gray-500 mt-4'>
                Nisl dolor sit amet eget tristique adipiscing tellus tristique
              </p>
            </motion.div>

            <motion.div
              className='text-center leading-12 space-y-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h1 className='font-semibold text-center text-lg lg:text-2xl my-4 text-gray-800'>
                Enter an Amount
              </h1>
              <div className='shadow text-center border border-gray-300 rounded-lg overflow-hidden bg-white'>
                <input
                  type='text'
                  placeholder='Enter amount'
                  className='w-full focus:outline-none p-3 text-gray-700 placeholder-gray-400'
                />
              </div>
              <p className='text-gray-500 mt-4'>
                Nisl dolor sit amet eget tristique adipiscing tellus tristique
              </p>
            </motion.div>

            <motion.button
              className='btn bg-black text-white w-full rounded-full p-3 font-bold my-4 transition-all flex items-center justify-center !rounded-md'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Give Now
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Giving;