import type React from 'react';
import { motion } from "framer-motion";
import BG from '@/public/gallery/gallery4.jpeg';
import Avatar from '@/public/card1.jpeg';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO',
    description: 'John has over 10 years of experience in the tech industry.',
    imageUrl: Avatar,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO',
    description: 'Jane is passionate about innovation and technology.',
    imageUrl: Avatar,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    role: 'Design Lead',
    description: 'Alice specializes in user experience and interface design.',
    imageUrl: Avatar,
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 lg:px-4 sm:px-6 lg:px-8 py-24">
      <section className='h-60 flex items-center mb-12' style={{backgroundImage: `url(${BG})`, backgroundSize: 'cover'}}>
        <div className='slant w-7/12 bg-black bg-opacity-50 h-full flex items-center lg:px-40 text-white'>
          <header className="text-center p-2">
            <h1 className="text-lg lg:text-4xl font-bold mb-3">About Us</h1>
          </header>
        </div>
      </section>

      <section className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <img
              src={Avatar}
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus inventore dolorem ratione illo quidem quia earum aliquam, at, facere veritatis veniam natus dolore rerum, quam totam amet quisquam nemo possimus numquam quas fugiat minus animi officiis tempore. Fugit libero repudiandae numquam quae non assumenda unde eum dolor? Rerum, quos accusamus.
            </p>
            <p className="text-lg text-gray-700">
              Our goal is to empower businesses and individuals by providing cutting-edge services and products that make a real difference. We believe in building long-term relationships with our clients and helping them achieve their goals.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus inventore dolorem ratione illo quidem quia earum aliquam, at, facere veritatis veniam natus dolore rerum, quam totam amet quisquam nemo possimus numquam quas fugiat minus animi officiis tempore. Fugit libero repudiandae numquam quae non assumenda unde eum dolor? Rerum, quos accusamus.
            </p>
            <p className="text-lg text-gray-700">
              Our goal is to empower businesses and individuals by providing cutting-edge services and products that make a real difference. We believe in building long-term relationships with our clients and helping them achieve their goals.
            </p>
          </div>
          <div className="w-full lg:w-1/2 order-first lg:order-last">
            <img
              src={Avatar}
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.5 }}
              viewport={{once: true}}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                <p className="text-base text-gray-700">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;