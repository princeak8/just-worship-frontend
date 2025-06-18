import type React from 'react';
import { motion } from "framer-motion";
import Avatar from '@/public/card1.jpeg';
import Avatar2 from '@/public/about.png';
import { useGetAboutQuery, useGetGalleryQuery, useGetGivingQuery, useGetOptionsQuery, useGetTeamQuery } from '@/app/api';
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
import { ArrowRight, Banknote, ChevronDown, ChevronLeft, CreditCard, InfoIcon, Search } from 'lucide-react';
import card1 from '@/public/card1.jpeg';
import QRCode from "react-qr-code";
import { Questions } from '@/utils/faq';

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
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const { data, isLoading: load } = useGetGalleryQuery<StockData[] | any | undefined>(undefined);
  const [Gallery, setGallery] = useState<any>([]);
  const [searchparams, setSearchParams] = useState('');
  const [modal, setModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const { data: Payments, isLoading } = useGetGivingQuery<any | undefined>(undefined);
  const { data: Options } = useGetOptionsQuery<any | undefined>(undefined);
  const [selectedMethod, setSelectedMethod] = useState('tithe & offering')
  const [selected, setSelected] = useState<any>({})
  const [selectedOption, setSelectedOption] = useState('transfer')
  const [amount, setAmount] = useState('');

  // const Options = ['Partnership', 'Tithe & Offering', 'Donations'];
  // const Payments = [
  //     { name: 'Debit Card', icon: <CreditCard className="w-6 h-6" /> },
  //     { name: 'Credit Card', icon: <CreditCard className="w-6 h-6" /> },
  //     { name: 'Bank Transfer', icon: <Banknote className="w-6 h-6" /> },
  // ];

  useEffect(() => {
    if (Options?.data) {
      const found = Options.data.find(
        (p: any) => p?.name.toLowerCase().trim() === selectedMethod.toLowerCase().trim()
      );
      setSelected(found);
    }
  }, [Options, selectedMethod]);

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

      {/* <div className="container mx-auto sm:px-6 lg:px-4 py-24 p-4">
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
                Partner with Us in Advancing God’s Kingdom Through Worship
              </motion.h2>
              <motion.p
                className="text-lg text-gray-700 mb-12"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Your generosity fuels the mission of just Worship International Music Outreach spreading the gospel through powerful worship, inspiring lives, and impacting world. Every seed sown helps bring the message of hope to countless hearts.
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
                        <img loading="lazy" src={vector} className="absolute flex pr-20" alt="vector" />
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
                        <img loading="lazy" src={vector2} className="absolute flex pr-40" alt="vector2" />
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
                        <img loading="lazy" src={vector3} className="absolute flex pr-20" alt="vector3" />
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
      </div> */}

      {/* <section

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
      </section> */}

      <div className="w-full p-10 overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50">
        <section className="container space-y-4">
          <section className='w-full'>
            <div className="lg:leading-10 text-center flex flex-col items-center justify-center my-5 lg:my-10">
              <motion.h2
                className="text-xl lg:text-5xl font-bold lg:font-normal uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Giving
              </motion.h2>
              <motion.p
                className='lg:w-5/12 text-gray-600'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Be a part in advancing the kingdom of Heaven.
              </motion.p>
            </div>

            <div className='flex justify-center w-full gap-10 text-justify leading-10'>
            <div className='lg:space-y-12 lg:leading-12'>
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
                  {Payments?.data?.map((option: any, index: number) => (
                    <motion.div
                      key={index}
                      // onClick={() => setSelectedOption(option.name)}
                      // className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-purple-500 flex flex-col items-center justify-center ${selectedOption.toLowerCase().trim() === option?.name?.toLowerCase().trim() ? 'bg-purple-500 text-white' : 'bg-white text-black'}`}
                      className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border- flex flex-col items-center justify-center text-sm lg:text-base ${option?.name?.toLowerCase().trim() !== 'transfer' ? 'cursor-not-allowed bg-white text-black' : 'bg-[#BA833C] text-white'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={selectedOption.toLowerCase().trim() === option?.name?.toLowerCase().trim() ? '' : 'text-[#BA833C]'}>{option?.name.toLowerCase().trim() === 'transfer' ? <Banknote className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}</div>
                      <p className='font-medium'>{option?.name}</p>
                    </motion.div>
                  ))}
                </div>
                {/* <p className='text-gray-500 mt-4'>
                  Nisl dolor sit amet eget tristique adipiscing tellus tristique
                </p> */}
              </motion.div>
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
                  {Options?.data?.map((option: any, index: number) => (
                    <motion.div
                      key={index}
                      onClick={() => { setSelected(option); setSelectedMethod(option?.name) }}
                      className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-[#BA833C] text-sm lg:text-base ${selectedMethod.toLowerCase().trim() === option?.name?.toLowerCase().trim() ? 'bg-[#BA833C] text-white' : 'bg-white text-black'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <p className='font-medium'>{option?.name}</p>
                    </motion.div>
                  ))}
                </div>
                {/* <p className='text-gray-500 mt-4'>
                                    Nisl dolor sit amet eget tristique adipiscing tellus tristique
                                </p> */}
              </motion.div>

              {/* {selectedOption.toLowerCase().trim() === 'transfer' ? ( */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Bank Transfer Instructions
                  </h1>

                  {selected?.accounts?.length > 0 ? (
                    selected?.accounts?.map((account: any, index: number) => (
                      <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-4">
                          <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              <Banknote className="w-5 h-5 text-[#BA833C]" />
                              {account?.bank ? "Bank Account Details" : "Digital Payment Details"}
                            </h2>
                          </div>

                          {account?.bank ? (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Bank Name</label>
                                <p className="font-medium text-gray-900">
                                  {account?.bank?.name || 'Not specified'}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Account Number</label>
                                <p className="font-medium text-gray-900">
                                  {account?.number || '-'}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Account Name</label>
                                <p className="font-medium text-gray-900">
                                  {account?.name || '-'}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center space-y-4">
                              <div className="space-y-2 w-full">
                                <label className="text-xs font-medium text-gray-500">Account Name</label>
                                <p className="font-medium text-gray-900">
                                  {account?.name || 'Not specified'}
                                </p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center">
                                {account?.url && (
                                  <QRCode
                                    value={account?.url}
                                    size={160}
                                    className="p-2 bg-white rounded-md"
                                    fgColor="#BA833C"
                                  />
                                )}
                                <p className="text-xs text-gray-500 mt-3 text-center">
                                  Scan QR code to view payment details
                                </p>
                              </div>
                            </div>
                          )}

                          {/* <div className="mt-6 p-3 bg-purple-50 rounded-lg flex items-start gap-3">
                            <InfoIcon className="w-5 h-5 text-purple-600 shrink-0" />
                            <span className="text-sm text-gray-700">
                              Please include{' '}
                              <strong className="font-semibold text-purple-600">
                                {selectedMethod || 'Just Worship'}
                              </strong>{' '}
                              in your transfer narration
                            </span>
                          </div> */}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full py-12 px-6 bg-gray-50 rounded-xl text-center">
                      <div className="max-w-xs mx-auto space-y-4">
                        <Search className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-gray-500 italic">
                          No account details available for{' '}
                          <span className="text-gray-700 not-italic font-medium">
                            {selectedMethod}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
              {/* ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                                        Enter Amount
                                    </h1>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Amount
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                                        disabled={!amount}
                                    >
                                        Give Now
                                    </motion.button>
                                </motion.div>
                            )} */}
            </div>
            </div>
          </section>
        </section>
      </div>

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
                  className="bg-[#F8DA94] bg-opacity-20 backdrop-blur-md text-justify"
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
