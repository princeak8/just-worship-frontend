import type React from 'react';
import { motion } from "framer-motion";
import { useBookEventMutation, useGetEventQuery, useGetGalleryQuery, useGetTeamQuery } from '@/app/api';
import background from '../public/events.jpeg';
import { useEffect, useState } from 'react';
import image1 from '@/public/card1.jpeg';
import image2 from '@/public/card2.jpeg';
import image3 from '@/public/card3.jpeg';
import image4 from '@/public/card4.jpeg';
import SkeletonLoader from '@/SkeletonLoader';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Loader2 } from 'lucide-react';

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

interface BookingFormData {
  name: string;
  email: string;
}

const textVariant = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 60, damping: 15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      delay: i * 0.2
    }
  })
};

const buttonHover = {
  whileHover: { scale: 1.05, backgroundColor: '#111827' }
};

const Events: React.FC = () => {
  const [bookEvent] = useBookEventMutation()
  const { data: events, isLoading } = useGetEventQuery<AboutSection | any | undefined>(undefined);
  const { data: team, isLoading: loading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const { data, isLoading: load } = useGetGalleryQuery<StockData[] | any | undefined>(undefined);
  const [Gallery, setGallery] = useState<any>([]);
  const [searchParams, setSearchParams] = useState('');
  const [selected, setSelected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<object | any>({
    id: -1,
    url: '',
    name: '',
    content: '',
    date: '',
    time: '',
    location: '',

  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loader, setLoader] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>();

  const onSubmitBooking = async (data: BookingFormData) => {
    if (!selectedEvent) {
      alert('No event selected.');
      return;
    }

    const formdata = new FormData();
    formdata.append('eventId', selectedEvent.id);
    formdata.append('name', data.name);
    formdata.append('email', data.email);

    setLoader(true)

    try {
      await bookEvent(formdata).unwrap();
      setBookingSuccess(true);
      reset();
      setTimeout(() => { setBookingSuccess(false); setSelected(false) }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setLoader(false)
    }
  };


  const search = () => {
    if (!data?.data) return [];
    return data?.data.filter((item: Stock) =>
      item?.title.toLowerCase().includes(searchParams.toLowerCase().trim())
    );
  };

  useEffect(() => {
    setGallery([image1, image2, image3, image4, image1, image2, image3, image4, image1, image2]);
  }, []);

  const event = [
    {
      id: 1,
      name: "Just Worship: The Pentecost",
      content: "Part One Act",
      date: "June 23, 2025",
      time: "5:00PM",
      location: "UNN Enugu Campus",
      imageUrl: image1,
      badge: "8TH NOV | 7PM",
      venue: "MICHAEL OKPARA SQUARE"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <section
        className='w-full h-screen text-white'
        style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
      >
        <div className='w-full h-screen flex items-end bg-black bg-opacity-70'>
          <div className='container p-4 flex'>
            <div className='h-20vh mb-40 lg:mb-20'>
              <p className='font-bold text-xl'>Events</p>
              <div className='mt-6 space-y-4'>
                <motion.h1
                  className='uppercase text-xl lg:text-4xl overflow-hidden font-[Aberto]'
                  variants={textVariant}
                  initial="hidden"
                  animate="visible"
                >
                  TOURS, EVENTS, TEACHINGS, Ministry, and prAYER
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {events?.data?.filter((event: any) => event?.featured)?.length > 0 && (
        <section className='bg-[#181D21] text-white'>
          <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden">
            <motion.div className="w-full text-center p-4">
              <motion.h2
                className="text-xl font-bold mb-6 text-start"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                custom={0}
                viewport={{ once: true }}
              >
                Featured
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {events.data.filter((event: any) => event.featured).map((event: any, index: number) => (
                  <motion.div
                    key={event.id}
                    className="bg-[#252C31] overflow-hidden shadow-md"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={index}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <img
                        loading="lazy"
                        src={event.coverPhoto.url}
                        alt={event.name}
                        className="w-full h-96 object-cover"
                      />
                    </div>

                    <div className="p-4 py-8 text-start">
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <div className="text-xs mb-3">{event.content}</div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm">{event.date}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm">{event.time}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-sm">{event.location}</span>
                      </div>

                      <div className='w-full flex items-center justify-start'>
                        <motion.button
                          className="text-white text-sm py-2 px-4 rounded-full border border-white"
                          whileHover={buttonHover.whileHover}
                          transition={{ duration: 0.3 }}
                          onClick={() => { setSelectedEvent(event); setSelected(true) }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className='p-4'>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden">
          <motion.div
            className="w-full text-center"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-xl font-bold mb-6 text-start"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: true }}
            >
              All Events
            </motion.h2>

            {isLoading && (
              <section className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                <SkeletonLoader className={'w-full h-[30rem] border '} />
                <SkeletonLoader className={'w-full h-[30rem] border '} />
                <SkeletonLoader className={'w-full h-[30rem] border '} />
              </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {events?.data?.map((event: any, index: number) => (
                <motion.div
                  key={event.id}
                  className="overflow-hidden shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img
                    loading="lazy"
                      src={event.coverPhoto.url}
                      alt={event.name}
                      className="w-full h-80 object-cover"
                    />
                  </div>

                  <div className="p-4 py-8 text-start">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <div className="text-xs mb-3 line-clamp-2">{event.content}</div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm">{event.date || "-"}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm">{event.time || "-"}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-sm">{event.location || "-"}</span>
                    </div>

                    <div className='w-full flex items-center justify-start'>
                      <motion.button
                        className="text-sm py-2 px-4 rounded-full border border-[#181D21]"
                        whileHover={{ scale: 1.05, backgroundColor: '#181D21', color: '#fff' }}
                        transition={{ duration: 0.3 }}
                        onClick={() => { setSelectedEvent(event); setSelected(true) }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

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
          <form onSubmit={handleSubmit(onSubmitBooking)} className="">
            {selectedEvent?.coverPhoto?.url && (
              <div className="relative group">
                <div className="overflow-hidden aspect-video overflow-hidden">
                  <img
                  loading="lazy"
                    src={selectedEvent?.coverPhoto?.url}
                    alt="Event cover"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="gap-4 bg-[#080806] p-4 space-y-4">
              {selectedEvent?.name && <h2 className="text-3xl font-bold text-white border-b border-b-2 border-b-[#363636] pb-6">{selectedEvent?.name}</h2>}
              {selectedEvent?.content && (
                <div className='border-b border-b-2 border-b-[#363636] pb-6'>
                  <h2 className="text-lg font-semibold text-white uppercase">Detail</h2>
                  <p className="text-gray-400 text-sm mt-1 ">{selectedEvent?.content}</p>
                </div>
              )}
              {selectedEvent?.featured && (
                <div className='border-b border-b-2 border-b-[#363636] pb-6'>
                  <h2 className="text-lg font-semibold text-white uppercase">Featuring</h2>
                  <p className="text-gray-400 text-sm mt-1 ">{selectedEvent.content}</p>
                </div>
              )}
              {selectedEvent?.location && (
                <div className='border-b border-b-2 border-b-[#363636] pb-6'>
                  <h2 className="text-lg font-semibold text-white uppercase">Location</h2>
                  <p className="text-gray-400 text-sm mt-1 ">{selectedEvent?.location}</p>
                </div>
              )}
              {(selectedEvent?.date || selectedEvent?.time) && (
                <div className='border-b border-b-2 border-b-[#363636] pb-6'>
                  <h2 className="text-lg font-semibold text-white uppercase">{selectedEvent?.date && 'Date'} {(selectedEvent?.date && selectedEvent?.time) && '&'} {selectedEvent?.time && 'Time'}</h2>
                  <p className="text-gray-400 text-sm mt-1 flex gap-2 items-center">
                    <Calendar />
                    {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {selectedEvent?.time && (
                    <p className="text-gray-400 text-sm mt-1 flex items-center">
                      <Clock />
                      {selectedEvent?.time}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* <div className="grid gap-4 bg-[#080806] p-4 border-b border-b-white">
              <h2 className="text-xl font-bold text-white">{selectedEvent.name}</h2>
              <p className="text-gray-200 text-sm mt-1 line-clamp-2">{selectedEvent.content}</p>

              <h2 className="text-xl font-bold text-white">{selectedEvent.name}</h2>
              <p className="text-gray-200 text-sm mt-1 line-clamp-2">{selectedEvent.content}</p>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{selectedEvent.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <svg className="w-5 h-5 text-[#fdc500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{selectedEvent.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{selectedEvent.location}</p>
                </div>
              </div>
            </div> */}

            {bookingSuccess && (
              <div className="bg-green-50 border border-green-200 mx-4 p-4 rounded-lg mb-6 flex items-center gap-3 z-">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700">Booking confirmed</span>
              </div>
            )}

            <div className="space-y-4 p-4">
              <h2 className='text-white text-2xl font-semibold'>Register</h2>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full bg-[#080806] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-white"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full bg-[#080806] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-white"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4">
              <button
                type="button"
                onClick={() => { setSelectedEvent({}); setSelected(false) }}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              {loader ? (
                <motion.button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Loader2 className='animate-spin' />
                </motion.button>
              ) : (

                <motion.button
                  type="submit"
                  className="px-6 py-2.5 bg-[#BA833C] text-white rounded-lg hover:text-black hover:bg-[#F8DA94] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Events;