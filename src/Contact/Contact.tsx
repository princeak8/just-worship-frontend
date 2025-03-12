import type React from 'react';
import { motion } from "framer-motion";
import BG from '@/public/gallery/gallery4.jpeg';
import MapImage from '@/public/mapsample.jpg';
import { useGetContactQuery } from '@/app/api';

interface ContactData {
  id: string | null;
  address: string | null;
  email: string | null;
  phoneNumber: string | null;
}

const ContactUs: React.FC = () => {
  const { data, isLoading } = useGetContactQuery<ContactData | any | undefined>(undefined);
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
              Contact Us
            </motion.h1>
          </header>
        </motion.div>
      </motion.section>

      <motion.section
        className="container pb-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          <motion.div
            className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-8"
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
              Send Us a Message
            </motion.h2>
            <motion.form
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </motion.div>
              <motion.div
                className="mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </motion.div>
              <motion.div
                className="mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                className="bg-black rounded-lg p-4 px-10 text-white w-full py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-8"
            initial={{ x: 50, opacity: 0 }}
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
              Contact Information
            </motion.h2>
            <div className="space-y-6">
              {[
                { title: "Address", content: data?.data?.address },
                { title: "Phone", content: data?.data?.phoneNumber },
                { title: "Email", content: data?.data?.email },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item?.title}</h3>
                  <p className="text-lg text-gray-700">{item?.content}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Location
          </motion.h2>
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={MapImage}
              alt="Map"
              className="w-full h-96 object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactUs;