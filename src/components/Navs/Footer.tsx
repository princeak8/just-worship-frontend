import { Apple, Facebook, Instagram, LucideYoutube, Twitter, Youtube } from 'lucide-react';
import Background from '../../public/galleryBG.jpeg';
import Logo from '../../public/logo.png'

export default function Footer() {
  return (
      <div className="w-full text-white"
      style={{
        background: `url(${Background})`,
        backgroundSize: 'cover',
    }}
      >

        <div className="w-full h-full p-10 py-32 bg-black bg-opacity-90 backdrop-blur-lg" >
          <section className="container space-y-4 grid grid-cols-7 gap-6 border-b py-10 border-white">
              <div className="w-full col-span-2 text-justify space-y-2">
              <img src={Logo} className='w-20'/>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati quae at accusantium culpa nihil deserunt dicta qui esse in magni, ipsam veniam amet recusandae error porro quam doloribus assumenda atque.</p>
              </div>
              <div className="leading-10 ">
                  <h2 className='font-semibold text-xl'>About</h2>
                  <ul>
                    <a href='#'><li>Mission</li></a>
                    <a href='#'><li>Vission</li></a>
                    <a href='#'><li>Worship School</li></a>
                    <a href='#'><li>Leadership</li></a>
                    <a href='#'><li>Archives</li></a>
                  </ul>
              </div>
              <div className="leading-10 ">
                  <h2 className='font-semibold text-xl'>Connect</h2>
                  <ul>
                    <a href='#'><li>Events</li></a>
                    <a href='#'><li>Live</li></a>
                    <a href='#'><li>Store</li></a>
                    <a href='#'><li>Contact Us</li></a>
                  </ul>
              </div>
              <div className="leading-10 ">
                  <h2 className='font-semibold text-xl'>Finance</h2>
                  <ul>
                    <a href='#'><li>Giving</li></a>
                  </ul>
              </div>
              <div className="leading-10 ">
                  <ul>
                    <a href='#' ><li className='flex items-center gap-2'><Facebook className='border border-white rounded-full p-1'/> Facebook</li></a>
                    <a href='#' ><li className='flex items-center gap-2'><Youtube className='border border-white rounded-full p-1'/> YouTube</li></a>
                    <a href='#' ><li className='flex items-center gap-2'><Instagram className='border border-white rounded-full p-1'/> Instagram</li></a>
                    <a href='#' ><li className='flex items-center gap-2'><Twitter className='border border-white rounded-full p-1'/> Twitter</li></a>
                  </ul>
              </div>
              <div className="leading-10 ">
                  <ul>
                  <a href='#' ><li className='flex items-center gap-2'><Apple className='border border-white rounded-full p-1'/> Apple Music</li></a>
                    <a href='#' ><li className='flex items-center gap-2'><Instagram className='border border-white rounded-full p-1'/> Spotify</li></a>
                    <a href='#' ><li className='flex items-center gap-2'><LucideYoutube className='border border-white rounded-full p-1'/> YT Music</li></a>
                  </ul>
              </div>
          </section>
          <section className='container py-2 w-full flex justify-between'>
            <p>Copyright @ 2025 Just Worship int&apos;l</p>
            <p className='uppercase'>All Rights Reserved</p>
          </section>
          
        </div>
      </div>
  )
}
