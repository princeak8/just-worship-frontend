import card1 from '../../../public/card1.jpeg';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, ArrowRight } from 'lucide-react'; // Icons for payment options

export default function Giving() {
    const Options = ['Partnership', 'Tithe & Offering', 'Donations'];
    const Payments = [
        { name: 'Debit Card', icon: <CreditCard className="w-6 h-6" /> },
        { name: 'Credit Card', icon: <CreditCard className="w-6 h-6" /> },
        { name: 'Bank Transfer', icon: <Banknote className="w-6 h-6" /> },
    ];

    return (
        <div className="w-full p-10 overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50">
            <section className="container space-y-4">
                <section className='w-full'>
                    <div className="lg:leading-10 text-center flex flex-col items-center justify-center my-5 lg:my-10">
                        <motion.h2
                            className="text-xl lg:text-5xl font-bold lg:font-normal uppercase bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
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
                                className='btn bg-black text-white w-full rounded-full p-3 font-bold my-4 transition-all flex items-center justify-center'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Give Now
                            </motion.button>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}