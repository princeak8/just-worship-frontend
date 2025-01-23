import event1 from '../../../public/events/event1.jpeg'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Events() {

    const Events = [
        {
            image: event1,
            src: 'Event Name'
        },
        {
            image: event1,
            src: 'Event Name'
        },
        {
            image: event1,
            src: 'Event Name'
        },
    ]
    return (
        <div className="w-full p-10">
            <section className=" space-y-4">
                <section className='w-full space-y-4'>
                    <div className="leading-10 flex flex-col items-center justify-center text-center ">
                        <h2 className="text-4xl uppercase">Upcoming Events</h2>
                        <p className=' w-5/12'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laborum at cum veritatis omnis modi aperiam
                            libero voluptatum sequi expedita facilis.
                        </p>
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1.1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className='grid grid-cols-2 gap-10 text-justify leading-10 overflow-x-hidde w-full'
                    >
                        {Events.map((event, index) => (
                            <SwiperSlide key={index} className='overflow-hidden h-[45rem] rounded-lg' style={{background: `url(${event.image}) no-repeat`, backgroundSize: "cover"}}>
                                <div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            </section>
        </div>
    )
}
