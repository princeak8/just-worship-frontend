import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../public/logo.png';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-black bg-opacity-60 backdrop-blur-lg text-white text-lg lg:px-28 lg:py-2 z-50">
            <div className="container hidden lg:flex items-center justify-between">
                <a href='/' ><img src={logo} alt="Logo" className="w-24" /></a>
                <div className="flex gap-10">
                    <a href="/about" className="hover:text-yellow-500 transition">About</a>
                    <a href="/events" className="hover:text-yellow-500 transition">Events</a>
                    <a href="#" className="hover:text-yellow-500 transition">LIVE</a>
                    <a href="/store" className="hover:text-yellow-500 transition">Store</a>
                    <a href="#" className="hover:text-yellow-500 transition">Giving</a>
                    <a href="/contact" className="hover:text-yellow-500 transition">Contact us</a>
                    <a href="/login" className="hover:bg-yellow-500 transition bg-purple-500 p-2 px-4 rounded-lg ">Login</a>
                </div>
            </div>

            <div className="lg:hidden flex items-center justify-between px-6 py-4">
            <a href='/' ><img src={logo} alt="Logo" className="w-24" /></a>

                <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none z-50">
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            <div className={`fixed top-0 left-0 w-8/12 h-screen bg-purple-950 p-10 pt-4 transform transition-transform duration-300 space-y-10 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden z-40`}>
            <a href='/' ><img src={logo} alt="Logo" className="w-24" /></a>
                <div className="flex flex-col space-y-6">
                    <a href="/about" className="text-xl hover:text-yellow-500 transition" onClick={() => setIsOpen(false)}>About</a>
                    <a href="/events" className="text-xl hover:text-yellow-500 transition" onClick={() => setIsOpen(false)}>Events</a>
                    <a href="#" className="text-xl hover:text-yellow-500 transition" onClick={() => setIsOpen(false)}>LIVE</a>
                    <a href="/store" className="text-xl hover:text-yellow-500 transition" onClick={() => setIsOpen(false)}>Store</a>
                    <a href="#" className="text-xl hover:text-yellow-500 transition" onClick={() => setIsOpen(false)}>Giving</a>
                    <a href="/contact" className="text-xl hover:text-yellow-500 transition" onClick={() => setIsOpen(false)}>Contact us</a>
                    <a href="/login" className="hover:bg-yellow-500 transition bg-purple-500 p-2 px-4 rounded-lg " onClick={() => setIsOpen(false)}>Login</a>
                </div>
            </div>
        </nav>
    );
}
