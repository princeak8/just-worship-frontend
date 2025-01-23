import { ArrowDown } from 'lucide-react'
import background from '../../../public/background.jpeg'

export default function Hero() {
  return (
    <section className='w-full h-screen text-white' style={{backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat, no-repeat", backgroundSize: "cover"}}>
      <div className='w-full h-screen flex items-end bg-black bg-opacity-20'>
        <div className='container flex'>
        <div className='w-5/12 h-20vh mb-20'>
        <p>Revival is here...</p>
        <div className='mt-16 space-y-4'>
        <h1 className='uppercase text-5xl'>A worship expereince like never before.</h1>
        <p>Encounter the divine presence of God through intimate Praise and Worship.</p>
        <button className='bg-white text-black font-bold text-xl p-4 rounded-full '>Find us now</button>
        </div>
      </div>
      <div className='flex items-end pb-20 justify-end  w-7/12'>
        <ArrowDown />
      </div>
      </div>
      </div>
    </section>
  )
}
