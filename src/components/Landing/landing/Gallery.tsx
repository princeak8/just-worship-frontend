import Background from '../../../public/galleryBG.jpeg';
import gallery1 from '../../../public/gallery/gallery1.jpeg';
import gallery2 from '../../../public/gallery/gallery2.jpeg';
import gallery3 from '../../../public/gallery/gallery3.jpeg';
import gallery4 from '../../../public/gallery/gallery4.jpeg';
import gallery5 from '../../../public/gallery/gallery5.jpeg';
import gallery6 from '../../../public/gallery/gallery6.jpeg';
import gallery7 from '../../../public/gallery/gallery7.jpeg';
import gallery8 from '../../../public/gallery/gallery8.jpeg';
import gallery9 from '../../../public/gallery/gallery9.jpeg';
import gallery10 from '../../../public/gallery/gallery10.jpeg';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function Gallery() {
    const GalleryImages = [
        { image: gallery1 },
        { image: gallery2 },
        { image: gallery3 },
        { image: gallery4 },
        { image: gallery5 },
        { image: gallery6 },
        { image: gallery7 },
        { image: gallery8 },
        { image: gallery9 },
        { image: gallery10 },
    ];

    const customWidths = ['450px', '450px', '450px', '335px', '335px', '335px', '335px'];

    return (
        <div
            className="w-full text-white overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50"
            style={{
                background: `url(${Background})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="w-full h-full bg-black bg-opacity-90 p-10">
                <section className="container space-y-4 text-center lg:py-20">
                    <div className="lg:leading-10">
                        <h2 className="text-xl lg:text-5xl font-bold lg:font-normal uppercase bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Gallery</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laborum at cum veritatis omnis modi aperiam
                            libero voluptatum sequi expedita facilis.
                        </p>
                    </div>
                    <div className='flex flex-wrap lg:flex-nowrap items-center gap-4 py-10'>
                        <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                            <Search />
                            <input type='text' placeholder='Search...' className='p-2 py-1 bg-transparent focus:outline-none w-full' />
                        </div>
                        <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                            <select className='p-2 bg-transparent focus:outline-none w-full'>
                                <option>Location</option>
                            </select>
                        </div>
                        <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                            <select className='p-2 bg-transparent focus:outline-none w-full'>
                                <option>Select by Event</option>
                            </select>
                        </div>
                        <div className='flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto'>
                            <div className='border border-white rounded-full flex items-center p-1 px-4 w-full lg:w-auto'>
                                <select className='p-2 bg-transparent focus:outline-none w-full'>
                                    <option>Select by Year</option>
                                </select>
                            </div>
                            <div className='border border-white rounded-full flex items-center justify-center p-1 px-4 w-full lg:w-auto'>
                                <select className='p-2 bg-transparent focus:outline-none w-full'>
                                    <option>Sort by</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <section className="grid md:grid-cols-2 lg:flex !w-full flex-wrap gap-4 space-y-4">
                        {GalleryImages.map((image, index) => (
                            <motion.div key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: index * 0.5 }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={image.image}
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
        </div>
    );
}
