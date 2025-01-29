import event1 from '../../../public/events/event1.jpeg';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Events() {
    const events = [
        {
            image: event1,
            title: "Just Worship UNEC",
            subtitle: "WORSHIP | PRAISE | REVIVAL",
            time: "9PM TILL DAWN",
            tagline: "MARANATHA COME LORD JESUS!",
            description: "Lorem ipsum dolor sit amet consectetur. Gravida sit dignissim pellentesque ut lectus.",
        },
        {
            image: event1,
            title: "Another Event",
            subtitle: "MUSIC | WORD | PRAYER",
            time: "7PM TILL MIDNIGHT",
            tagline: "EXPERIENCE THE GLORY",
            description: "Lorem ipsum dolor sit amet consectetur. Gravida sit dignissim pellentesque ut lectus.",
        },
        {
            image: event1,
            title: "Third Event",
            subtitle: "HEALING | DELIVERANCE | WORSHIP",
            time: "10PM TILL DAWN",
            tagline: "COME AND BE BLESSED",
            description: "Lorem ipsum dolor sit amet consectetur. Gravida sit dignissim pellentesque ut lectus.",
        },
    ];

    const bookEvent = () =>{
        console.log('Book Event function is still ungoing construction...')
    }
    const viewEvent = () =>{
        console.log('View Event function is still ungoing construction...')
    }

    return (
        <div className="w-full p-10 overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50">
            <section className="space-y-4">
                <div className="text-center">
                <h2 className="text-xl lg:text-5xl font-bold lg:font-normal uppercase bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Upcoming Events</h2>
                    <p className="lg:w-1/2 mx-auto text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum at cum veritatis omnis modi aperiam libero voluptatum sequi expedita facilis.
                    </p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={30}
                        slidesPerView={1.2}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        className="w-full"
                    >
                        {events.map((event, index) => (
                            <SwiperSlide key={index} className="relative rounded-lg overflow-hidden h-[200px] md:h-[400px] lg:h-[900px]">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="bg-red-600 px-3 py-1 rounded-md inline-block text-sm font-semibold">{event.time}</p>
                                    <h3 className="text-3xl font-bold">{event.title}</h3>
                                    <p className="text-lg">{event.subtitle}</p>
                                    <p className="text-sm mt-2">{event.description}</p>

                                    <div className="mt-4 flex gap-2 lg:gap-4">
                                        <button onClick={bookEvent} className="px-2 lg:px-4 py-1 lg:py-2 bg-white text-black font-semibold rounded-md">Book Now</button>
                                        <button onClick={viewEvent} className="px-2 lg:px-4 py-1 lg:py-2 border border-white text-white font-semibold rounded-md">View Details</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className="hidden lg:flex swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-8 border-2 border-blue-500 shadow-md rounded-full">
                        <CircleArrowLeft size={32} className="text-gray-700" />
                    </button>
                    <button className="hidden lg:flex swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-8 border-2 border-blue-500 shadow-md rounded-full overflow-hidden">
                        <CircleArrowRight size={10} className=" text-red-500" />
                    </button>
                </div>
            </section>
        </div>
    );
}
