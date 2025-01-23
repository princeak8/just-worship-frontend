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
            className="w-full text-white"
            style={{
                background: `url(${Background})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="w-full h-full bg-black bg-opacity-90 p-10">
                <section className="container space-y-4 text-center py-20">
                    <div className="leading-10">
                        <h2 className="text-4xl uppercase">Gallery</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laborum at cum veritatis omnis modi aperiam
                            libero voluptatum sequi expedita facilis.
                        </p>
                    </div>
                    <div className='flex items-center gap-4 py-10'>
                        <div className='border border-white rounded-full flex items-center p-1 px-4'><Search /> <input type='text' placeholder='Search...' className='p-2 bg-transparent focus:outline-none' /></div>
                        <div className='border border-white rounded-full flex items-center p-1 px-4'>
                            <select className='p-2 bg-transparent focus:outline-none'>
                                <option>Location</option>
                            </select>
                        </div>
                        <div className='border border-white rounded-full flex items-center p-1 px-4'>
                            <select className='p-2 bg-transparent focus:outline-none'>
                                <option>Select by Event</option>
                            </select>
                        </div>
                        <div className='border border-white rounded-full flex items-center p-1 px-4'>
                            <select className='p-2 bg-transparent focus:outline-none' >
                                <option>Select by Year</option>
                            </select>
                        </div>
                        <div className='border border-white rounded-full flex items-center justify-center p-1 px-4'>
                            <select className='p-2 bg-transparent focus:outline-none'>
                                <option>Sort by</option>
                            </select>
                        </div>
                    </div>
                    <section className="flex flex-wrap gap-4">
                        {GalleryImages.map((image, index) => (
                            <img
                                key={index}
                                src={image.image}
                                alt={`Gallery ${index + 1}`}
                                style={{
                                    width: customWidths[index % customWidths.length],
                                    height: '200px',
                                    objectFit: 'cover',
                                }}
                                className="rounded-lg"
                            />
                        ))}
                    </section>
                </section>
            </div>
        </div>
    );
}
