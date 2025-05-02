import event1 from '../../../public/events/event1.jpeg';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Calendar, CircleArrowLeft, CircleArrowRight, Clock, Loader2, Users } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useBookEventMutation, useGetEventQuery } from '@/app/api';
import { useState } from 'react';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';

interface GetEvent {
    data: Event[]
}

interface Event {
    id: string;
    name: string;
    date: string;
    bookings: string;
    content: string;
    coverPhoto: {
        url: string;
    }
}

interface BookingFormData {
    name: string;
    email: string;
}

export default function Events() {
    const { data: events, isLoading } = useGetEventQuery<GetEvent[] | any | undefined>(undefined);
    const [bookEvent] = useBookEventMutation()
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


    return (
        <>
            {events?.data && (
                <div className="w-full p-10 overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50">
                    <section className="space-y-4">
                        <div className="text-center">
                            <h2 className="text-xl lg:text-5xl font-bold lg:font-normal uppercase">Upcoming Events</h2>
                            <p className="lg:w-1/2 mx-auto text-gray-600">
                                We warmly invite you to worship with us, take part in uplifting ministries, and join hands in fellowship as we celebrate God’s love together.
                            </p>
                        </div>

                        <div className="relative">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}
                                slidesPerView={events?.data?.length === 1 ? 1 : 1.1}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                className="w-full"
                            >
                                {events?.data?.map((event: any, index: number) => (
                                    <SwiperSlide key={index} className="relative rounded-lg overflow-hidden h-[200px] md:h-[400px] lg:h-[900px]">
                                        <img
                                            src={event?.coverPhoto?.url}
                                            alt={event?.title}
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

                                        <div className="absolute bottom-6 left-6 text-white">

                                            <h3 className="text-3xl font-bold">{event?.title}</h3>
                                            <p className="text-lg">{event?.subtitle}</p>
                                            <div className='flex flex-col mb-2 space-y-4'>
                                                <p className="text-sm text-white flex items-center gap-2 bg-[#BA833C] p-1 px-2 rounded-md w-14"><Users size={15} className='' />{event?.bookings?.length}</p>
                                                <p className="w-[9rem] bg-red-600 px-3 py-2 rounded-md inline-block text-sm font-semibold flex gap-2 "><Calendar size={15} /> {new Date(event.date).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</p>
                                            </div>
                                            <p className="text-md mt-2">{event?.content}</p>

                                            <div className="mt-4 flex gap-2 lg:gap-4">
                                                <button onClick={() => { setSelectedEvent(event); setSelected(true) }} className="px-2 lg:px-4 py-1 lg:py-2 bg-white hover:bg-transparent border border-2 border-white hover:text-white text-black font-semibold rounded-md">Book Now</button>
                                                {/* <button onClick={viewEvent} className="px-2 lg:px-4 py-1 lg:py-2 border border-white text-white font-semibold rounded-md">View Details</button> */}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {events?.data?.length > 1 && (
                                <>
                                    <button className="hidden lg:flex swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-8 border-2 border-blue-500 shadow-md rounded-full">
                                        <CircleArrowLeft size={32} className="text-gray-700" />
                                    </button>
                                    <button className="hidden lg:flex swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-8 border-2 border-blue-500 shadow-md rounded-full overflow-hidden">
                                        <CircleArrowRight size={10} className=" text-red-500" />
                                    </button>
                                </>
                            )}
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
            )}
        </>
    );
}
