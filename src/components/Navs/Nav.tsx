import logo from '../../public/logo.png';
export default function Nav() {
    return (
        <div className="fixed w-full bg-black bg-opacity-60 backdrop-blur-lg text-white text-lg px-28 p-2 z-10">
            <div className="container flex text-white items-center justify-between">
                <img src={logo} alt='Logo' className='w-28' />
                <div className='flex gap-20'>
                <a href='#' className='hover:text-yellow-500'>About</a>
                <a href='#' className='hover:text-yellow-500'>Events</a>
                <a href='#' className='hover:text-yellow-500'>LIVE</a>
                <a href='#' className='hover:text-yellow-500'>Store</a>
                <a href='#' className='hover:text-yellow-500'>Giving</a>
                <a href='#' className='hover:text-yellow-500'>Contact us</a>
                </div>
            </div>
        </div>
    )
}
