import type React from 'react';
import { motion } from "framer-motion";
import Avatar from '@/public/card1.jpeg';
import Avatar2 from '@/public/about.png';
import { useGetAboutQuery, useGetGalleryQuery, useGetTeamQuery } from '@/app/api';
import background from '../public/giving.jpeg';
import worship from '../public/praise.jpeg';
import logo from '@/public/logo.png';
import { useEffect, useState } from 'react';
import image1 from '@/public/card1.jpeg';
import image2 from '@/public/card2.jpeg';
import image3 from '@/public/card3.jpeg';
import image4 from '@/public/card4.jpeg';
import vector from '@/public/Vector.png';
import vector2 from '@/public/Vector 2.png';
import vector3 from '@/public/Vector 3.png';
import { ArrowRight, ChevronDown, ChevronLeft } from 'lucide-react';

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

const Giving: React.FC = () => {
  const { data: about, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const { data, isLoading: load } = useGetGalleryQuery<StockData[] | any | undefined>(undefined);
  const [Gallery, setGallery] = useState<any>([]);
  const [searchparams, setSearchParams] = useState('');
  const [modal, setModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Determine if we're on mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleModal = (index: any) => {
    setModal((prevIndex) => (prevIndex === index ? null : index));
  };

  const search = () => {
    if (!data?.data) return [];
    return data.data.filter((item: Stock) =>
      item.title.toLowerCase().includes(searchparams.toLowerCase().trim())
    );
  };

  // If using gallery data in future...
  // useEffect(() => {
  //   setGallery(search());
  // }, [data?.data, searchparams]);

  useEffect(() => {
    setGallery([image1, image2, image3, image4, image1, image2, image3, image4, image1, image2]);
  }, []);

  const events = [
    {
      id: 1,
      title: "Just Worship: The Pentecost",
      subtitle: "Part One Act",
      date: "June 23, 2025",
      time: "5:00PM",
      location: "UNN Enugu Campus",
      imageUrl: image1,
      badge: "8TH NOV | 7PM",
      venue: "MICHAEL OKPARA SQUARE"
    },
    {
      id: 2,
      title: "Just Worship: The Pentecost",
      subtitle: "Part One Act",
      date: "June 23, 2025",
      time: "5:00PM",
      location: "UNN Enugu Campus",
      imageUrl: image2,
      badge: "9PM"
    },
    {
      id: 3,
      title: "Just Worship: The Pentecost",
      subtitle: "Part One Act",
      date: "June 23, 2025",
      time: "5:00PM",
      location: "UNN Enugu Campus",
      imageUrl: image3,
      badge: "GET READY"
    }
  ];

  const Questions = [
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis..."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <section
        className="w-full h-screen text-white"
        style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
        <div className="w-full h-screen flex items-end bg-black bg-opacity-70">
          <div className="container p-4 flex">
            <div className="h-20vh mb-40 lg:mb-20">
              <p className="font-bold text-xl">Giving</p>
              <div className="mt-6 space-y-4">
                <motion.h1
                  className="uppercase text-xl lg:text-4xl overflow-hidden font-[Aberto]"
                  initial={{ y: isMobile ? 100 : 500 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.8, ease: [0.6, 0.01, -0.05, 0.95] }}
                >
                  Be a part in advancing the kingdom of heaven
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto sm:px-6 lg:px-4 py-24 p-4">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-7/12">
              <motion.h2
                className="text-3xl mb-2 font-[DM Sans] font-semibold"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Your generosity in God’s house keeps flouring
              </motion.h2>
              <motion.p
                className="text-lg text-gray-700 mb-12"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Lorem ipsum dolor sit amet consectetur. In curabitur sed massa blandit laoreet. Aliquam arcu faucibus lacus varius eleifend. Elit pulvinar lorem ac et nisl a volutpat consectetur. Nec tortor fringilla est natoque. Lorem ipsum dolor sit amet consectetur. In curabitur sed massa blandit laoreet. Aliquam arcu faucibus lacus varius eleifend.
              </motion.p>
              <div className="grid gap-2">
                <div>
                  <motion.p
                    className="text-lg mb-6 font-semibold"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    Modes Of Giving - Give to Just Worship
                  </motion.p>
                  <div className="grid grid-cols-1 sm:grid-cols-7 gap-6">
                    <div className="lg:col-span-4 gap-4 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-orange-500 rounded-lg h-28 text-white flex items-end justify-end relative"
                      >
                        <img src={vector} className="absolute flex pr-20" alt="vector" />
                        <div className="flex items-end justify-between p-4 h-full w-full">
                          <p>Partnership</p>
                          <ArrowRight />
                        </div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-blue-500 rounded-lg h-28 text-white flex items-end justify-end relative"
                      >
                        <img src={vector2} className="absolute flex pr-40" alt="vector2" />
                        <div className="flex items-end justify-between p-4 h-full w-full">
                          <p>Tithes & Offerings</p>
                          <ArrowRight />
                        </div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-blue-800 rounded-lg h-28 text-white flex items-end justify-end relative"
                      >
                        <img src={vector3} className="absolute flex pr-20" alt="vector3" />
                        <div className="flex items-end justify-between p-4 h-full w-full">
                          <p>Donations</p>
                          <ArrowRight />
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="lg:col-span-3 rounded-lg h-80 sm:h-full text-center text-white flex items-center justify-center bg-black bg-opacity-50 relative"
                      style={{
                        background: `url(${logo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '20rem',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="bg-black bg-opacity-[93%] rounded-lg w-full h-full text-white flex items-center justify-center">
                        <div className="flex items-end justify-between p-4 h-full w-full uppercase">
                          <p>Give now</p>
                          <ArrowRight />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              className="w-full lg:w-5/12 bg-gray-800 rounded-2xl flex flex-col justify-between overflow-hidden"
              style={{
                background: `url(${worship})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
            </motion.div>
          </div>
        </div>
      </div>

      <section

        className="container mx-auto py-16 border-t border-t-black border-b border-b-black">
        <motion.div
          initial={{ x: 500 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-medium">Choose a giving option</h2>
            <div className="flex border border-gray-200 rounded-full overflow-hidden">
              <button className="flex-1 py-4 bg-gray-100 font-medium text-sm border-r border-r-black">Partnership</button>
              <button className="flex-1 py-4 text-sm">Tithes & Offerings</button>
              <button className="flex-1 py-4 text-sm border-l border-l-black">Partnership</button>
            </div>
            <p className="text-sm text-gray-700">Partner with Just Worship to help bring the gospel to the world.</p>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-medium">Choose how you want to give</h2>
            <div className="flex border border-gray-200 rounded-full overflow-hidden">
              <button className="flex-1 py-4 bg-gray-100 font-medium text-sm border-r border-r-black">Debit Card</button>
              <button className="flex-1 py-4 text-sm">Credit Card</button>
              <button className="flex-1 py-4 text-sm border-l border-l-black">Bank Transfer</button>
            </div>
            <p className="text-sm text-gray-700">Give using your debit, credit card or checking account.</p>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-medium">Enter an amount</h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full py-3 px-8 rounded-full border border-gray-200"
              />
            </div>
            <p className="text-sm text-gray-700">Enter a desired amount to give.</p>
          </div>

          <button className="w-full py-4 bg-gray-200 rounded-full font-medium">Give Now</button>
        </motion.div>
      </section>

      <section className="container mx-auto sm:px-6 lg:px-4 py-24 p-4">
        <div className="max-w-4xl">
          <motion.div
            className="w-full"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl mb-4 font-[DM Sans]"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              FAQs
            </motion.h2>
            {Questions.map((question, index) => (
              <section key={index} className="z-10">
                <div
                  className="border-b py-2 mt-2 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleModal(index)}
                >
                  {question.question} {modal === index ? <ChevronLeft /> : <ChevronDown />}
                </div>
                <motion.div
                  className="bg-purple-300 bg-opacity-20 backdrop-blur-md text-justify"
                  initial={{ overflowY: 'hidden', height: 0 }}
                  animate={modal === index ? { height: 'auto' } : { overflowY: 'hidden', height: 0 }}
                  transition={{ duration: 0.5, type: 'tween' }}
                >
                  <div className="contain px-5 lg:px-20 py-[30px]">
                    {question.answer}
                  </div>
                </motion.div>
              </section>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Giving;
