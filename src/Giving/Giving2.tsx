import type React from 'react';
import { motion } from "framer-motion";
import Avatar from '@/public/card1.jpeg';
import Avatar2 from '@/public/about.png';
import { useGetAboutQuery, useGetGalleryQuery, useGetGivingQuery, useGetOptionsQuery, useGetTeamQuery, useBankAccountsQuery } from '@/app/api';
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
import GivingForm from '@/components/GivingForm';
import BankAccounts from '@/components/BankAccounts';

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
  let { data: accounts, isLoading: loadingAccounts } = useBankAccountsQuery< any | undefined>(undefined);
  if(!loadingAccounts) accounts = accounts?.data;
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

  console.log("accounts", accounts);

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

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                      Bank Accounts {/* Bank Transfer Instructions */}
                    </h1>

                    {selected?.accounts?.length > 0 ? (
                      <div className='flex flex-row'>
                        {selected?.accounts?.map((account: any, index: number) => (
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
                        ))}
                      </div>
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
                
              </div>
              
            </div>
            <GivingForm />
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
