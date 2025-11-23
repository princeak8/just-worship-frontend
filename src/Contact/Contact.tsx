import type React from 'react';
import { motion } from "framer-motion";
import { useContact_messageMutation, useGetAboutQuery, useGetGalleryQuery, useGetTeamQuery, useSubscribeMutation } from '@/app/api';
import background from '../public/contact.jpeg'
import logo from '@/public/logo.png'
import { useEffect, useState } from 'react';
import image1 from '@/public/card1.jpeg'
import image2 from '@/public/card2.jpeg'
import image3 from '@/public/card3.jpeg'
import image4 from '@/public/card4.jpeg'
import { ChevronDown, ChevronLeft, Loader2 } from 'lucide-react';
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


const ContactUs: React.FC = () => {

  const { data: about, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const { data, isLoading: load } = useGetGalleryQuery<StockData[] | any | undefined>(undefined);
  const [contact_message, { isLoading: loading2 }] = useContact_messageMutation()
  const [subscribe, { isLoading: loading3 }] = useSubscribeMutation()
  const [Gallery, setGallery] = useState<any>([])
  const [searchparams, setSearchParams] = useState('')
  const [modal, setModal] = useState(null)
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [alertModal, setAlertModal] = useState(false)
  // const [name2, setName2] = useState('')
  const [email2, setEmail2] = useState('')
  const [subAlertModal, setSubAlertModal] = useState(false)  

  const toggleModal = (index: any) => {
    setModal((prevIndex) => (prevIndex === index ? null : index));
  };

  const search = () => {
    if (!data?.data) return [];
    return data?.data.filter((item: Stock) =>
      item?.title.toLowerCase().includes(searchparams.toLowerCase().trim())
    );
  };

  // useEffect(() => {
  //   setGallery(search());
  // }, [data?.data, searchparams]);

  useEffect(() => {
    setGallery([image1, image2, image3, image4, image1, image2, image3, image4, image1, image2])
  }, [])

  const onSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    const data = {
      type,
      name,
      email,
      subject,
      message,
    }

    try {
      await contact_message(data).unwrap()
      setAlertModal(true)
      setType('')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err) {
      console.log(err)
    }

  }

  const onSubscribe = async (e: React.FormEvent) => {

    e.preventDefault()
    const data = {
      // name: name2,
      email: email2,
    }

    try {
      await subscribe(data).unwrap()
      setSubAlertModal(true)
      // setName2('')
      setEmail2('')
    } catch (err) {
      console.log(err)
    }

  }


  return (
    <div className="min-h-screen bg-gray-100 ">
      {alertModal && (
        <section className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center'>
          <div className='rounded-lg bg-white p-6 shadow-xl transform transition-all max-w-lg w-full mx-4'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <img
              loading="lazy"
                src={logo}
                className='w-16 mb-4 animate-scale-in'
                alt="Success icon"
              />
              <h3 className='text-xl font-semibold text-gray-800'>
                Message Received!
              </h3>
              <p className='text-gray-600 mb-4'>
                Thank you for contacting us. We'll get back to you shortly.
              </p>
              <button
                onClick={() => setAlertModal(false)}
                className='w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors'
              >
                Close
              </button>
            </div>
          </div>
        </section>
      )}
      {subAlertModal && (
        <section className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center'>
          <div className='rounded-lg bg-white p-6 shadow-xl transform transition-all max-w-md w-full mx-4'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <img
              loading="lazy"
                src={logo}
                className='w-16 mb-4 animate-scale-in'
                alt="Success icon"
              />
              <h3 className='text-xl font-semibold text-gray-800'>
                Welcome Aboard
              </h3>
              <p className='text-gray-600 mb-4'>
                Thank you for subscribing to our weekly News Channel
              </p>
              <button
                onClick={() => setSubAlertModal(false)}
                className='w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors'
              >
                Close
              </button>
            </div>
          </div>
        </section>
      )}
      <section className='w-full h-screen text-white' style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat, no-repeat", backgroundSize: "cover" }}>
        <div className='w-full h-screen flex items-end bg-black bg-opacity-70'>
          <div className='container p-4 flex'>
            <div className='h-20vh mb-40 lg:mb-20'>
              <p className='font-bold text-xl'>Contact Us</p>
              <div className='mt-6 space-y-4'>
                <motion.h1 className='uppercase text-xl lg:text-4xl overflow-hidden font-[Aberto]'
                  initial={{ y: 500 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2 }}
                >
                  we are here for you
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto lg:px-4 sm:px-6 lg:px-8 py-24   p-4 overflow-hidden">
        <motion.div
          className="w-full"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl mb-2 font-[DM Sans"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            How can we help?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            We’d love to hear from you!
          </motion.p>
          <div className='w-full lg:flex gap-10  overflow-hidden space-y-10 lg:space-y-0 '>
            <motion.form onSubmit={onSubmit}
              className="space-y-4 w-full lg:w-8/12"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-3 px-4 border border-gray-300 rounded-2xl"
                  required
                >
                  <option value={''}>Select inquiry type</option>
                  <option value={'appreciation'}>Testimony</option>
                  <option value={'testimony'}>Prayers</option>
                  <option value={'testimony'}>Request</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-2 px-4 border border-gray-300 rounded-2xl"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full p-2 px-4 border border-gray-300 rounded rounded-2xl"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full p-2 px-4 border border-gray-300 rounded rounded-2xl"
                  required
                />
              </div>

              <div>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message..."
                  rows={6}
                  className="w-full p-2 px-4 border border-gray-300 rounded resize-none rounded-2xl"
                  required
                ></textarea>
              </div>

              <div className="pt-2">
                {loading2 ? (
                  <button
                    className="flex items-center justify-center text-center px-8 py-3 text-white rounded-full w-40 bg-gray-800 transition cursor-wait"
                  >
                    <Loader2 className='animate-spin' />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-black text-white rounded-full w-40 hover:bg-gray-800 transition"
                  >
                    Submit
                  </button>
                )}
              </div>
            </motion.form>

            <motion.div
              className="w-full lg:w-5/12 bg-gray-200 px-10 py-20 rounded-2xl flex flex-col justify-between overflow-hidden"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-xl mb-2"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Subscribe to our newsletter now for more updates!
              </motion.h2>
              <motion.p>
                Get the latest resources, event dates, new music, books, merchandise and more directly into your inbox.
              </motion.p>
              {/* <div>
                <input
                  type="text"
                  id="name"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-2 px-4 border border-gray-300 rounded rounded-2xl my-3"
                  required
                />
              </div> */}
              <div>
                <input
                  type="email"
                  id="email"
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full p-2 px-4 border border-gray-300 rounded rounded-2xl"
                  required
                />
              </div>

              {loading3 ?(
                <div className="pt-2">
                <button
                  onClick={onSubscribe}
                  className="px-8 py-3 bg-gray-700 text-white rounded-lg w-40  transition cursor-wait flex items-center justify-center"
                >
                  <Loader2 className='animate-spin' />
                </button>
              </div>
              ):(
                <div className="pt-2">
                <button
                  onClick={onSubscribe}
                  className="px-8 py-3 bg-gray-700 text-white rounded-lg w-40 hover:bg-black transition"
                >
                  Subscribe
                </button>
              </div>
              )}

            </motion.div>
          </div>
        </motion.div>
      </div>


      <section className='container mx-auto lg:px-4 sm:px-6 lg:px-8 lg:py-24  p-4'>
        <div className='max-w-4xl '>
          <motion.div
            className="w-full"
            initial={{ x: 50, opacity: 0 }}
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
              <section key={index} className='z-10'>
                <div className='border-b py-2 mt-2 flex items-center justify-between cursor-pointer' onClick={() => toggleModal(index)} >{question?.question} {modal === index ? <ChevronLeft /> : <ChevronDown />}</div>
                <motion.div className='bg-[#F8DA94] bg-opacity-20 backdrop-blur-md text-justify'
                  initial={{ overflowY: 'hidden', height: 0 }}
                  animate={modal === index ? { height: 'auto' } : { overflowY: 'hidden', height: 0 }}
                  transition={{ duration: 0.5, type: 'tween' }}
                >
                  <div className='contain px-5 lg:px-20 py-[30px]'>
                    {question?.answer}
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

export default ContactUs;
