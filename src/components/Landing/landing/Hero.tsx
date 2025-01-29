import { ArrowDown } from 'lucide-react'
import background from '../../../public/background.jpeg'
import { motion } from "motion/react"

export default function Hero() {
  return (
    <section className='w-full h-screen text-white' style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat, no-repeat", backgroundSize: "cover" }}>
      <div className='w-full h-screen flex items-end bg-black bg-opacity-70'>
        <div className='container p-4 flex'>
          <div className='lg:w-5/12 h-20vh mb-40 lg:mb-20'>
            <p>Revival is here...</p>
            <div className='mt-16 space-y-4'>
              <motion.h1 className='uppercase text-xl lg:text-5xl overflow-hidden'
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                transition={{ duration: 2 }}
              >
                A worship expereince like never before.
              </motion.h1>

              <p className=''>Encounter the divine presence of God through intimate Praise and Worship.</p>
                <motion.button className="btn bg-white text-black font-bold p-4 rounded-full z-10">
                  Find us now
                </motion.button>
            </div>
          </div>
          <div className='flex items-end pb-20 justify-end  w-7/12'>
            <motion.div className=''
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <ArrowDown />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
