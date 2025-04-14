import type React from 'react';
import { motion } from "framer-motion";
import Avatar from '@/public/card1.jpeg';
import Avatar2 from '@/public/about.png';
import { useGetAboutQuery, useGetGalleryQuery, useGetTeamQuery } from '@/app/api';
import background from '../public/contact.jpeg'
import map from '../public/maps.svg'
import worship from '@/public/worship-school.jpeg'
import logo from '@/public/logo.png'
import { useEffect, useState } from 'react';
import image1 from '@/public/card1.jpeg'
import image2 from '@/public/card2.jpeg'
import image3 from '@/public/card3.jpeg'
import image4 from '@/public/card4.jpeg'
import { ChevronDown, ChevronLeft } from 'lucide-react';

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
  const [Gallery, setGallery] = useState<any>([])
  const [searchparams, setSearchParams] = useState('')
  const [modal, setModal] = useState(null)

  const Questions = [
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta officia mollitia sequi officiis animi placeat doloribus eveniet eum debitis, quod odit eligendi quae ad reiciendis laborum odio vero obcaecati ab eius delectus ratione? Aperiam eligendi quam beatae possimus! Ea provident labore molestiae totam dolore magni, sit quam et cupiditate possimus! Maiores iure magni ad explicabo nam assumenda dolor eum et nostrum eveniet. Dolores, libero quos quisquam dolorum sit explicabo perspiciatis corrupti est alias quae necessitatibus itaque iusto beatae quod commodi, maiores eos. Consectetur, blanditiis! Ex facilis itaque, voluptatem accusamus autem nisi exercitationem pariatur, natus id, magni molestias quis quidem!"
    },
  ];

  const toggleModal = (index: any) => {
    setModal((prevIndex) => (prevIndex === index ? null : index));
  };

  const search = () => {
    if (!data?.data) return [];
    return data.data.filter((item: Stock) =>
      item.title.toLowerCase().includes(searchparams.toLowerCase().trim())
    );
  };

  // useEffect(() => {
  //   setGallery(search());
  // }, [data?.data, searchparams]);

  useEffect(() => {
    setGallery([image1, image2, image3, image4, image1, image2, image3, image4, image1, image2])
  }, [])

  const customWidths = ['450px', '450px', '450px', '335px', '335px', '335px', '335px'];


  return (
    <div className="min-h-screen bg-gray-100 ">
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

      <div className="container mx-auto lg:px-4 sm:px-6 lg:px-8 py-24  p-4 overflow-hidden">
        <motion.div
          className="w-full"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl mb-2 font-[DM Sans]"
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
          <div className='w-full lg:flex gap-10  overflow-hidden '>
            <motion.form
              className="space-y-4 w-full lg:w-8/12"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <select
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-2xl"
                  required
                >
                  <option>Select inquiry type</option>
                  <option>inquiry type 1</option>
                  <option>inquiry type 2</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded-2xl"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-300 rounded rounded-2xl"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full p-2 border border-gray-300 rounded rounded-2xl"
                  required
                />
              </div>

              <div>
                <textarea
                  id="message"
                  placeholder="Message..."
                  rows={6}
                  className="w-full p-2 border border-gray-300 rounded resize-none rounded-2xl"
                  required
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-black text-white rounded-full w-40 hover:bg-gray-800 transition"
                >
                  Submit
                </button>
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
              <div>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full p-2 border border-gray-300 rounded rounded-2xl"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full p-2 border border-gray-300 rounded rounded-2xl"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gray-700 text-white rounded-lg w-40 hover:bg-black transition"
                >
                  Subscribe
                </button>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>


    <section className='container mx-auto lg:px-4 sm:px-6 lg:px-8 py-24  p-4'>
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
            <div className='border-b py-2 mt-2 flex items-center justify-between cursor-pointer' onClick={() => toggleModal(index)} >{question.question} {modal === index ? <ChevronLeft /> : <ChevronDown />}</div>
            <motion.div className='bg-purple-300 bg-opacity-20 backdrop-blur-md text-justify'
              initial={{ overflowY: 'hidden', height: 0 }}
              animate={modal === index ? { height: 'auto' } : { overflowY: 'hidden', height: 0 }}
              transition={{ duration: 0.5, type: 'tween' }}
            >
              <div className='contain px-5 lg:px-20 py-[30px]'>
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

export default ContactUs;
