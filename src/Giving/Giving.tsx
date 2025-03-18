import type React from 'react';
import { motion } from "framer-motion";
import BG from '@/public/gallery/gallery4.jpeg';
import card1 from "@/public/card1.jpeg"
import { useGetGivingQuery, useGetOptionsQuery } from '@/app/api';
import { Banknote, CreditCard } from 'lucide-react';
import { useState } from 'react';


const Giving: React.FC = () => {

  const { data: Payments, isLoading } = useGetGivingQuery<any | undefined>(undefined);
  const { data: Options } = useGetOptionsQuery<any | undefined>(undefined);
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [amount, setAmount] = useState('');
  // const [code, setCode] = useState('');
  // const [copied, setCopied] = useState(false);
  // const [imagePreview, setImagePreview] = useState('')

  // useEffect(() => {
  //   const generateCode = () => {
  //     const randomCode = Math.floor(1000 + Math.random() * 9000);
  //     setCode(randomCode.toString());
  //   };
  //   generateCode();
  // }, []);

  // const handleCopy = async () => {
  //   await navigator.clipboard.writeText(code);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

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
            Each gift sows seeds of transformation, cultivating hope in our shared spiritual journey.
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
                {Options?.data?.map((option: any, index: number) => (
                  <motion.div
                    key={index}
                    onClick={() => setSelectedMethod(option.name)}
                    className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-purple-500 ${selectedMethod.toLowerCase().trim() === option?.name?.toLowerCase().trim() ? 'bg-purple-500 text-white' : 'bg-white text-black'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className='font-medium'>{option.name}</p>
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
                {Payments?.data?.map((option: any, index: number) => (
                  <motion.div
                    key={index}
                    onClick={() => setSelectedOption(option.name)}
                    className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-purple-500 flex flex-col items-center justify-center ${selectedOption.toLowerCase().trim() === option?.name?.toLowerCase().trim() ? 'bg-purple-500 text-white' : 'bg-white text-black'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={selectedOption.toLowerCase().trim() === option?.name?.toLowerCase().trim() ? ' text-yellow-200' : 'text-purple-500'}>{option?.name.toLowerCase().trim() === 'transfer' ? <Banknote className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}</div>
                    <p className='font-medium'>{option.name}</p>
                  </motion.div>
                ))}
              </div>
              <p className='text-gray-500 mt-4'>
                Nisl dolor sit amet eget tristique adipiscing tellus tristique
              </p>
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

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="font-semibold mb-3">Account Details</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bank Name:</span>
                        <span className="font-medium">Just worship Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Number:</span>
                        <span className="font-medium">1234 5678 9012</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Name:</span>
                        <span className="font-medium">Just worship</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Please include &apos;<span className='font-bold text-purple-500'>{selectedMethod || 'Just Worship'}</span>&apos; in your transfer narration
                      </p>
                    </div>
                  </div>

                  {/* <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Amount
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
            </div> */}

                  {/* <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload transfer receipt
              </label>
              <div className="relative rounded-md shadow-sm">
                <img src={imagePreview || '/src/public/photo1.png'} className='w-20 h-20'/>
                <input
                  type="file"
                  accept='image/*, .pdf'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter amount"
                />
              </div>
            </div> */}



                  {/* <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Narration Code
              </label>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-mono text-lg">{code}</span>
                <button
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-purple-600 flex items-center gap-1"
                >
                  {copied ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                  <span className="text-sm">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Please include this code in your transfer narration
              </p>
            </div> */}

                  {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              disabled={!amount}
            >
              Confirm Transfer
            </motion.button> */}
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
      </div>
    </div>
  );
};

export default Giving;