import event1 from '../../../public/events/event1.jpeg';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Calendar, CircleArrowLeft, CircleArrowRight, Users } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useGetEventQuery } from '@/app/api';

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

export default function Events() {
    const { data: events, isLoading } = useGetEventQuery<GetEvent[] | any | undefined>(undefined);

    const bookEvent = () => {
        console.log('Book Event function is still ungoing construction...')
    }
    const viewEvent = () => {
        console.log('View Event function is still ungoing construction...')
    }

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
                                                <p className="text-sm text-white flex items-center gap-2 bg-purple-500 p-1 px-2 rounded-md w-14"><Users size={15} className='' />{event?.bookings?.length}</p>
                                                <p className="bg-red-600 px-3 py-1 rounded-md inline-block text-sm font-semibold flex gap-2 w-32"><Calendar size={15} /> {event.date}</p>
                                            </div>
                                            <p className="text-md mt-2">{event?.content}</p>

                                            <div className="mt-4 flex gap-2 lg:gap-4">
                                                <button onClick={bookEvent} className="px-2 lg:px-4 py-1 lg:py-2 bg-white text-black font-semibold rounded-md">Book Now</button>
                                                <button onClick={viewEvent} className="px-2 lg:px-4 py-1 lg:py-2 border border-white text-white font-semibold rounded-md">View Details</button>
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
                </div>
            )}
        </>
    );
}
