import type React from 'react';
import { motion } from "framer-motion";
import BG from '@/public/gallery/gallery4.jpeg';
import Avatar from '@/public/card1.jpeg';
import { useGetAboutQuery, useGetTeamQuery } from '@/app/api';

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

interface TeamData {
  data: TeamMember[]
}

interface TeamMember {
  id?: string;
  name: string;
  position: string;
  biography: string;
  photo:{
    url: string;
  } 
}


const AboutUs: React.FC = () => {

  const { data: about, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);


  return (
    <div className="min-h-screen bg-gray-100 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden">
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
              About Us
            </motion.h1>
          </header>
        </motion.div>
      </motion.section>

      <motion.section 
        className="container py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={Avatar}
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Who We Are
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-4 text-justify"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {about?.data?.vision}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="container py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-4 text-justify"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {about?.data?.mission}
            </motion.p>
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/2 order-first lg:order-last"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={Avatar}
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="container px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team?.data?.map((member: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{once: true}}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <motion.img
                src={member?.photo?.url}
                alt={member.name}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="p-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{member?.position}</p>
                <p className="text-base text-gray-700">{member?.biography}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;