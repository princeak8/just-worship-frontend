import card1 from '../../../public/card1.jpeg'
import card2 from '../../../public/card2.jpeg'
import card3 from '../../../public/card3.jpeg'
import card4 from '../../../public/card4.jpeg'
import card5 from '../../../public/card5.jpeg'
import {motion} from 'motion/react'
export default function Visit() {
    const Cards = [
        {
            image: card1,
            name: 'Music',
            alt: "image 1"
        },
        {
            image: card2,
            name: 'Events',
            alt: "image 2"
        },
        {
            image: card3,
            name: 'Store',
            alt: "image 3"
        },
        {
            image: card4,
            name: 'Giving',
            alt: "image 4"
        },
        {
            image: card5,
            name: 'Volunteers',
            alt: 'image 5'
        },
    ]
    return (
        <div className="w-full p-10">
            <section className="container space-y-4">
                <h2 className='font-semibold text-xl'>Where would you like to visit?</h2>
                <section className="grid grid-cols-5">
                    {Cards.map((card, index)=>(
                        <motion.div key={index} className='h-80 rounded-2xl w-64 border-2 border-yellow-500 ' style={{ background: `url(${card.image})`, backgroundSize: '30rem' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.5, once: true }}
                        viewport={{once: true}}
            
                        >
                            <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-10 text-xl text-white font-bold'>
                                <p className='uppercase'>{card.name}</p>
                            </div>
                        </motion.div>
                    ))}
                    {/* <div className='h-80 rounded-2xl w-64 border-2 border-yellow-500 ' style={{ background: `url(${card1})`, backgroundSize: '30rem' }}>
                        <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-10 text-xl text-white font-bold'>
                            <p className='uppercase'>Music</p>
                        </div>
                    </div>
                    <div className='h-80 rounded-2xl w-64 border-2 border-yellow-500 ' style={{ background: `url(${card2})`, backgroundSize: '17rem' }}>
                        <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-10 text-xl text-white font-bold'>
                            <p className='uppercase'>Events</p>
                        </div>
                    </div>
                    <div className='h-80 rounded-2xl w-64 border-2 border-yellow-500 ' style={{ background: `url(${card3})`, backgroundSize: '19rem' }}>
                        <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-10 text-xl text-white font-bold'>
                            <p className='uppercase'>Store</p>
                        </div>
                    </div>
                    <div className='h-80 rounded-2xl w-64 border-2 border-yellow-500 ' style={{ background: `url(${card4})`, backgroundSize: '30rem' }}>
                        <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-10 text-xl text-white font-bold'>
                            <p className='uppercase'>Giving</p>
                        </div>
                    </div>
                    <div className='h-80 rounded-2xl w-64 border-2 border-yellow-500 ' style={{ background: `url(${card5})`, backgroundSize: '30rem' }}>
                        <div className='w-full rounded-2xl h-full bg-black bg-opacity-60 flex items-end justify-start p-4 pb-10 text-xl text-white font-bold'>
                            <p className='uppercase'>Volunteers</p>
                        </div>
                    </div> */}
                </section>

                <section className='w-full '>
                    <h2 className='text-4xl text-center my-20 '>Just worship international</h2>
                    <div className='grid grid-cols-2 gap-10 text-justify leading-10'>
                        <div className='space-y-4'>
                        <p>Just worship international
                            Just Worship International is a Christian worship outreach team dedicated to spreading the gospel through music and worship. Lorem ipsum dolor sit amet consectetur. Gravida sit dignissim pellentesque ut lectus. Eu orci arcu leo commodo tincidunt id. Amet vestibulum morbi quis consequat cras ut nulla.
                            </p>

                            <p>Nisl dolor sit amet eget tristique adipiscing tellus tristique posuere. Lorem ipsum dolor sit amet consectetur. Gravida sit dignissim pellentesque ut lectus. Eu orci arcu leo commodo tincidunt id. consequat cras ut nulla. dcuj c
                            Just Worship
                            Watch Later
                            Share
                            Read More
                            YouTube</p>
                            <button className='border-2 border-black bg-transparent rounded-full p-2 px-4'>Read More</button>
                            </div>
                            <div className='overflow-hidden h-[25rem] rounded-lg'>
                                <img src={card1} alt='Introductory video' />
                            </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
