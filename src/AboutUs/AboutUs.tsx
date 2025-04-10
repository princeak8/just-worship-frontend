import type React from 'react';
import { motion } from "framer-motion";
import Avatar from '@/public/card1.jpeg';
import Avatar2 from '@/public/about.png';
import { useGetAboutQuery, useGetGalleryQuery, useGetTeamQuery } from '@/app/api';
import background from '../public/about_hero.jpeg'
import map from '../public/maps.svg'
import worship from '@/public/worship-school.jpeg'
import logo from '@/public/logo.png'
import { useEffect, useState } from 'react';
import image1 from '@/public/card1.jpeg'
import image2 from '@/public/card2.jpeg'
import image3 from '@/public/card3.jpeg'
import image4 from '@/public/card4.jpeg'

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

  const search = () => {
    if (!data?.data) return [];
    return data.data.filter((item: Stock) =>
      item.title.toLowerCase().includes(searchparams.toLowerCase().trim())
    );
  };

  // useEffect(() => {
  //   setGallery(search());
  // }, [data?.data, searchparams]);

  useEffect(()=>{
    setGallery([ image1, image2, image3, image4,  image1, image2, image3, image4,  image1, image2])
  },[])

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

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:px-4 sm:px-6 lg:px-8 py-24 overflow-x-hidden p-4">
        <motion.div
          className="w-full text-center"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Just Worship International is a Christian worship outreach team dedicated to spreading the gospel through praise and worship
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 mb-4 text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quos enim unde nihil odio? Maxime quis totam officiis omnis tempora possimus consequatur nisi! Molestiae rerum sapiente repudiandae animi? Molestiae cupiditate accusantium numquam explicabo ab doloribus nesciunt quis odit neque magnam deserunt, magni, officiis natus modi reprehenderit obcaecati vero at quae sequi. Neque veritatis at maxime totam? Molestias inventore eum architecto placeat rerum perspiciatis, quae blanditiis sapiente quam doloribus corrupti! Itaque recusandae ratione beatae consequuntur delectus quam hic assumenda culpa odio, tenetur voluptatibus illo ex, dolores officiis obcaecati eligendi omnis! Excepturi veritatis delectus quidem quaerat esse sequi provident in corrupti impedit.
            {/* {about?.data?.vision} */}
          </motion.p>
        </motion.div>
      </div>


      <motion.section
        className="lg:py-12 px-4 sm:px-6 lg:px-8 bg-[#181D21] lg:h-[616px] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:gap-40 lg:px-4 sm:px-6 lg:px-8 pt-24 lg:py-24 overflow-x-hidden">
          <motion.div
            className="w-full lg:w-3/6"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-[24px] mb-6 font-[Aboreto]"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              LEAD PASTOR
            </motion.h2>
            <motion.p
              className="text-lg mb-4 text-justify font-[DM Sans]"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, fugiat, dolorum facere omnis sunt earum vero perferendis dolor molestiae dolore a voluptatum! Quos quasi facilis exercitationem! Obcaecati repellendus tempora quas nobis nostrum enim veniam molestiae, est maiores vitae repudiandae sunt culpa. Magnam reiciendis officia iusto repudiandae voluptate deleniti rerum, quod porro. Modi, iusto iste! Excepturi, dolore laborum ratione, esse itaque, sint mollitia temporibus in dolorem at tenetur! Similique voluptas sequi asperiores. Adipisci similique id placeat ad maiores, sunt dicta dignissimos?
              {/* {about?.data?.vision} */}
            </motion.p>
          </motion.div>
          <motion.div
            className="w-full lg:w-2/6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img
            src={Avatar2}
              // src={about?.data?.visionPhoto?.url || Avatar}
              alt="About Us"
              className="w-full  lg:h-[29rem] rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.section>


      <motion.section
        className="container lg:py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-28 sm:px-6 lg:px-2 py-24 overflow-x-hidden text-center">
          <motion.div
            className="w-full"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl font-bold mb-6 uppercase"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              THE VISION
            </motion.h2>
            <motion.p
              className="text-md text-gray-700 mb-4 text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In facilis neque iste tempora, fugit quas ratione quod. Nam, facilis quos.
              {/* {about?.data?.vision} */}
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
              className="text-3xl font-bold mb-6 uppercase"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="text-md text-gray-700 mb-4 text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio assumenda illum excepturi sint cumque ut corporis! Tenetur dolorem perspiciatis amet.
              {/* {about?.data?.mission} */}
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
            className="text-3xl font-bold mb-2"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            JUST WORSHIP LOCATIONS
          </motion.h2>
          <motion.p
            className="text-lg mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Find a location near you.
          </motion.p>

          <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div className="px-8 py-2 hover:text-gray-500">Nigeria</div>
            <div className="px-8 py-2 hover:text-gray-500">South Africa</div>
            <div className="px-8 py-2 hover:text-gray-500">United Kingdom</div>
          </div>

          <div className="mb-6">
            <img src={map} alt="World Map with Nigeria Highlighted" className="w-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="px-8 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 transition">Lagos</button>
            <button className="px-8 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 transition">Enugu</button>
            <button className="px-8 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 transition">Abuja</button>
            <button className="px-8 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 transition">Port Harcourt</button>
            <button className="px-8 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 transition">Calabar</button>
            <button className="px-8 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 transition">Anambra</button>
          </div>
        </motion.div>
      </div>

      <motion.section
        className="bg-[#181D21] h-[616px] text-white"
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
            <div className="container grid lg:grid-cols-2 px-4 py-12 max-w-6xl mx-auto" >
              <div className="text-center mb-8 flex flex-col items-center justify-center">
                <div className="lg:flex items-center justify-center gap-2 mb-2">
                  <div className='w-full flex items-center justify-center'>
                  <img src={logo} alt="Just Worship Logo" className="w-24" />
                  </div>
                  <h2 className="text-4xl uppercase font-[Aboreto]">WORSHIP SCHOOL</h2>
                </div>
                <p className="text-lg uppercase mb-4">2025-2026 APPLICATIONS NOW OPEN!</p>
                <button className="px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition mb-10">
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
                    className="w-full py-2 px-4 bg-amber-500 text-white font-medium rounded hover:bg-amber-600 transition"
                  >
                    Request for more info!
                  </button>
                </form>
              </div>
              </div>
            </div>
            <div className='py-4 bg-[#181D21]'>
            <div className="container w-full text-center ">
              <div className="flex justify-between items-center px-40">
                <div className='font-[Aboreto]'>
                  <p className="text-2xl uppercase mb-1">APPLICATIONS</p>
                  <p className="text-2xl uppercase mb-1">NOW OPEN</p>
                </div>
                <div>
                  <p className="text-sm">2025-2026 SCHOOL YEAR</p>
                </div>
                <button className="px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition">
                  Apply Today
                </button>
              </div>
            </div>
            </div>
          </div>

      </motion.section>

      <div
        className="w-full overflow-x-hidden  p-4"
      >
        <div className="w-full h-full p-10">
          <section className="container space-y-4 text-center lg:py-20">
            <section className="grid md:grid-cols-2 lg:flex flex-wrap gap-4 ">
              {Gallery?.map((image: any, index: number) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.5 }}
                  viewport={{ once: true }}
                >
                  <img
                    // src={image.photo.url}
                    src={image}
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

    </div>
  );
};

export default AboutUs;