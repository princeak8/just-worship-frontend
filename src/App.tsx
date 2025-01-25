import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Navs/Nav";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Navs/Footer";
import Background from './public/background.jpeg';
import Logo from './public/logo.png'
import {motion} from 'motion/react'

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-red-500 flex justify-center items-center" style={{background: `url(${Background}), no-repeat`, backgroundSize: 'cover'}}>
        <div className="w-full h-screen bg-black bg-opacity-70 flex items-center justify-center">
          <motion.div initial={{scale: 1}} animate={{scale: 2}} transition={{duration: 2, repeat: Infinity, repeatType: 'mirror'}}>
            <img src={Logo} className="w-44"/>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </section>
  );
};

export default App;
