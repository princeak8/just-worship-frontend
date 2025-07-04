import type React from 'react';
import { motion } from "framer-motion";
import Avatar from '@/public/card1.jpeg';
import Avatar2 from '@/public/about.png';
import { useGetAboutQuery, useGetGalleryQuery, useGetTeamQuery } from '@/app/api';
import background from '../public/about2.jpg'
import worship from '@/public/worship-school.jpeg'
import logo from '@/public/logo.png'
import { useEffect, useState } from 'react';
import image1 from '@/public/card1.jpeg'
import image2 from '@/public/card2.jpeg'
import image3 from '@/public/card3.jpeg'
import image4 from '@/public/card4.jpeg'
import SkeletonLoader from '@/SkeletonLoader';
import { Loader2, X } from 'lucide-react';
import InteractiveMap from '@/components/ui/InteractiveMap';

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


const AboutUs: React.FC = () => {

  const { data: about, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const { data, isLoading: load } = useGetGalleryQuery<StockData[] | any | undefined>(undefined);
  const [Gallery, setGallery] = useState<any>([])
  const [searchparams, setSearchParams] = useState('')
  const [selected, setSelected] = useState(false);
  const [selectedMember, setSelectedMember] = useState<object | any>({
    id: -1,
    name: '',
    position: '',
    biography: '',
  });
  const [selectedCountry, setSelectedCountry] = useState<string>('Nigeria');
  const [selectedCity, setSelectedCity] = useState<string>('');

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
    setGallery(search)
  }, [search])

  const customWidths = ['450px', '450px', '450px', '335px', '335px', '335px', '335px'];


  return (
    <div className="min-h-screen bg-gray-100 ">
      <section className='w-full h-screen text-white' style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat, no-repeat", backgroundSize: "cover" }}>
        <div className='w-full h-screen flex items-end bg-black bg-opacity-70'>
          <div className='container p-4 flex'>
            <div className='h-20vh mb-40 lg:mb-20'>
              <p className='font-bold text-xl'>About</p>
              <div className='mt-6 space-y-4'>
                <motion.h1 className='uppercase text-xl lg:text-4xl overflow-hidden font-[Aberto]'
                  initial={{ y: 500 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2 }}
                >
                  Just Worship International
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className=' py-10'>
          <SkeletonLoader className={'container w-full h-60 my-4'} />
          <SkeletonLoader className={'w-full h-[40rem] my-4'} />
          <div className='container grid lg:grid-cols-2 gap-4 my-4'>
            <SkeletonLoader className={'w-full h-60 my-4'} />
            <SkeletonLoader className={'w-full h-60 my-4'} />
          </div>
          <SkeletonLoader className={' container w-full h-[40rem] my-4'} />
          <SkeletonLoader className={'w-full h-[40rem] my-4'} />
        </div>
      ) : (
        <>
          {(about?.data?.header || about?.data?.content) && (
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden p-4">
              <motion.div
                className="w-full text-center"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-3xl font-semibold mb-6"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {about?.data?.header}
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-700 mb-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {about?.data?.content}
                </motion.p>
              </motion.div>
            </div>
          )}

          {about?.data?.pastorBio && (
            <motion.section
              className="py-12 px-4 sm:px-6 lg:px-8 bg-[#181D21] text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:gap-40 lg:px-4 sm:px-6 lg:px-8 overflow-hidden">
                <motion.div
                  className="w-full lg:w-2/6"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.img
                    // src={Avatar2}
                    loading="lazy"
                    src={about?.data?.pastorPhoto?.url || Avatar}
                    alt="About Us"
                    className="hidden lg:flex lg:w-full max-h-[40rem] rounded-lg shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div
                  className="w-full lg:w-3/6"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    className="text-[24px] mb-6 font-[Aboreto] uppercase"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {about?.data?.pastorTitle}
                  </motion.h2>
                  <motion.p
                    className="text-lg mb-4 text-justify font-[DM Sans]"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-justify whitespace-pre-line">
                      {about?.data?.pastorBio}
                    </p>
                  </motion.p>
                </motion.div>

              </div>
            </motion.section>
          )}

          <motion.section
            className={`container  px-4 sm:px-6 lg:px-8 lg:py-12 ${about?.data?.pastorBio ? 'lg:py-12' : ''}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-28 sm:px-6 lg:px-2  overflow-x-hidden text-center ${about?.data?.pastorBio ? 'py-24' : ''}`}>
              <motion.div
                className="w-full"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-3xl font-semibold mb-6 uppercase flex flex-col items-center"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className='w-30'>
                    The Vision
                    <div className='w-full h-1 bg-gradient-to-r from-[#BA833C] to-[#F8DA94] mt-2' />
                  </div>
                </motion.h2>
                <motion.p
                  className="text-md text-gray-700 mb-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {about?.data?.vision}
                </motion.p>
              </motion.div>

              <motion.div
                className="w-full"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-3xl font-semibold mb-6 uppercase flex flex-col items-center"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className='w-30'>
                    Our Mission
                    <div className='w-full h-1 bg-gradient-to-r from-[#BA833C] to-[#F8DA94] mt-2' />
                  </div>
                </motion.h2>
                <motion.p
                  className="text-md text-gray-700 mb-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {about?.data?.mission}
                </motion.p>
              </motion.div>

            </div>
          </motion.section>

          <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 py-4 overflow-x-hidden">
            <motion.div
              className="w-full text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl font-semibold mb-2"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                JUST WORSHIP CAMPUSES
              </motion.h2>
              <motion.p
                className="text-lg mb-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Visit our campuses in Nigeria and Belgium.
              </motion.p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button 
                  onClick={() => {
                    setSelectedCountry('Nigeria');
                    setSelectedCity('');
                  }}
                  className={`px-8 py-2 rounded-full border transition ${
                    selectedCountry === 'Nigeria' 
                      ? 'bg-[#BA833C] text-white border-[#BA833C]' 
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Nigeria Campus
                </button>
                <button 
                  onClick={() => {
                    setSelectedCountry('Belgium');
                    setSelectedCity('');
                  }}
                  className={`px-8 py-2 rounded-full border transition ${
                    selectedCountry === 'Belgium' 
                      ? 'bg-[#BA833C] text-white border-[#BA833C]' 
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Belgium Campus
                </button>
              </div>

              <div className="mb-6 relative">
                <InteractiveMap selectedCountry={selectedCountry} selectedCity={selectedCity} />
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {selectedCountry === 'Nigeria' && (
                  <div className="text-center">
                    <button 
                      onClick={() => setSelectedCity('New Layout Campus')}
                      className={`px-8 py-2 rounded-full border transition cursor-pointer ${
                        selectedCity === 'New Layout Campus' 
                          ? 'bg-[#BA833C] text-white border-[#BA833C]' 
                          : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      New Layout Campus
                    </button>
                    <p className="text-sm text-gray-600 mt-2">38 Edinburgh Road, Opposite Urban Girls Secondary School, New Layout</p>
                  </div>
                )}
                {selectedCountry === 'Belgium' && (
                  <div className="text-center">
                    <button 
                      onClick={() => setSelectedCity('Mechelen Campus')}
                      className={`px-8 py-2 rounded-full border transition cursor-pointer ${
                        selectedCity === 'Mechelen Campus' 
                          ? 'bg-[#BA833C] text-white border-[#BA833C]' 
                          : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      Mechelen Campus
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Thomas Moore University, C3 Campus de vest Mechelen, Belgium</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.section
            className="py-16 bg-gray-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className="text-3xl font-semibold text-center mb-12 "
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Meet Our Team
              </motion.h2>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
                {team?.data?.map((member: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <motion.div className="overflow-hidden">
                      <motion.img
                      loading="lazy"
                        src={member?.photo?.url}
                        alt={member.name}
                        className="w-full object-cover transform group-hover:scale-105 transition-transform duration-300 max-h-80 object-cover object-top"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div
                      className="p-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h2>
                      <p className="text-sm text-[#BA833C] font-medium mb-4">{member?.position}</p>
                      <p className="text-base text-gray-600 leading-relaxed line-clamp-4">{member?.biography}</p>
                      <motion.button
                        className="text-sm py-2 px-4 rounded-full border border-[#181D21]"
                        whileHover={{ scale: 1.05, backgroundColor: '#181D21', color: '#fff' }}
                        transition={{ duration: 0.3 }}
                        onClick={() => { setSelectedMember(member); setSelected(true) }}
                      >
                        Read more
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            className="bg-[#181D21] lg:h-[616px] text-white"
            style={{
              background: `url(${worship})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat, no-repeat'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className='bg-black bg-opacity-30'>
              <div className=' '>
                <div className="container flex flex-col items-center lg:grid lg:grid-cols-2 px-4 py-12 max-w-6xl mx-auto " >
                  <div className="text-center mb-8 flex flex-col items-center justify-center">
                    <div className="lg:flex items-center justify-center gap-2 mb-2">
                      <div className='flex items-center justify-center'>
                        <img loading="lazy" src={logo} alt="Just Worship Logo" className="w-24" />
                      </div>
                      <h2 className="text-4xl uppercase font-[Aboreto]">WORSHIP SCHOOL</h2>
                    </div>
                    <p className="text-lg uppercase mb-4">2025-2026 APPLICATIONS NOW OPEN!</p>
                    <button className="px-6 py-2 bg-[#BA833C] text-white rounded hover:bg-amber-600 transition mb-10">
                      Apply Today
                    </button>
                  </div>

                  <div className="w-full max-w-sm bg-white rounded-md shadow-md p-6 text-black">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone number
                        </label>
                        <div className="flex">
                          <select className="w-full p-2 border border-gray-300 rounded-l">
                            <option value="Nigeria">Nigeria</option>
                            <option value="SouthAfrica">South Africa</option>
                            <option value="UK">United Kingdom</option>
                          </select>
                        </div>
                        <div className="mt-1">
                          <input
                            type="tel"
                            id="phone"
                            placeholder="+234"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[#BA833C] text-white font-medium rounded hover:bg-amber-600 transition"
                      >
                        Request for more info
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className='py-4 bg-[#181D21]'>
                <div className="container w-full text-center ">
                  <div className="md:flex justify-between items-center gap-4 px-4 lg:px-40">
                    <div className='font-[Aboreto]'>
                      <p className="lg:text-2xl uppercase mb-1">APPLICATIONS</p>
                      <p className="lg:text-2xl uppercase mb-1">NOW OPEN</p>
                    </div>
                    <div>
                      <p className="text-sm">2025-2026 SCHOOL YEAR</p>
                    </div>
                    <button className="px-6 py-2 bg-[#BA833C] text-white rounded hover:bg-amber-600 transition">
                      Apply Today
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </motion.section>

          <div
            className="w-full overflow-x-hidden   p-4"
          />

          {/* <div
            className="w-full overflow-x-hidden  p-4"
          >
            <div className="w-full h-full p-10">
              <section className="container space-y-4 text-center lg:py-20">
                <section className={`grid md:grid-cols-2 lg:flex flex-wrap gap-4 ${Gallery.length === 1 && 'grid-cols-1'} `}>
                  {Gallery?.map((image: any, index: number) => (
                    <motion.div key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: index * 0.5 }}
                      viewport={{ once: true }}
                    >
                      <img
                        src={image.photo.url}
                        // src={image}
                        alt={`Gallery ${index + 1}`}
                        style={{
                          width: customWidths[index % customWidths.length],
                          height: '200px',
                          objectFit: 'cover',
                        }}
                        className="rounded-lg"
                      />
                    </motion.div>
                  ))}
                </section>
              </section>
            </div>
          </div> */}
        </>
      )}

      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto pt-20 md:pt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        style={{ pointerEvents: selected ? 'auto' : 'none' }}
      >
        <motion.div
          className="bg-[#080806] rounded-xl max-w-xl w-full shadow-2xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: selected ? 1 : 0.95 }}
        >
          <div className="relative p-8">
            <button
              onClick={() => setSelected(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X />
            </button>

            <div className="flex flex-col items-center gap-6">
              <motion.div
                className="relative w-32 h-32 rounded-full border-2 border-[#BA833C] overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                loading="lazy"
                  src={selectedMember.photo?.url || Avatar}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold text-white">{selectedMember.name}</h3>
                <p className="text-[#BA833C] font-medium">{selectedMember.position}</p>
              </div>

              <div className="w-full max-h-[30rem] overflow-y-auto pr-4">
                <p className="text-white/80 text-center leading-relaxed whitespace-pre-line">
                  {selectedMember.biography}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default AboutUs;