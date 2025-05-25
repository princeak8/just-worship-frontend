import { useGetGivingQuery, useGetOptionsQuery } from '@/app/api';
import card1 from '../../../public/card1.jpeg';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, Search, InfoIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

export default function Giving() {
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
      const found = Options?.data?.find(
        (p: any) => p?.name?.toLowerCase().trim() === selectedMethod?.toLowerCase().trim()
      );
      setSelected(found);
    }
  }, [Options, selectedMethod]);

  // console.log('payments: ', Options)

  return (
    <div className="w-full p-10 overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50">
      <section className="container space-y-4">
        <section className='w-full'>
          <div className="lg:leading-10 text-center flex flex-col items-center justify-center my-5 lg:my-10">
            <motion.h2
              className="text-xl lg:text-5xl font-bold lg:font-normal uppercase text-black"
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

          <div className='grid lg:grid-cols-2 gap-10 text-justify leading-10'>
            <motion.div
              className='overflow-hidden h-full rounded-lg shadow-lg'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img loading="lazy" src={card1} alt='Introductory video' className='h-full w-full object-cover' />
            </motion.div>

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
                      className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border- flex flex-col items-center justify-center ${option?.name?.toLowerCase().trim() !== 'transfer' ? 'cursor-not-allowed bg-white text-black' : 'bg-[#BA833C] text-white'}`}
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
                      className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-[#BA833C] ${selectedMethod.toLowerCase().trim() === option?.name?.toLowerCase().trim() ? 'bg-[#BA833C] text-white' : 'bg-white text-black'}`}
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
  );
}