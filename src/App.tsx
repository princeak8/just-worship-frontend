import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Navs/Nav";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Navs/Footer";
import Background from './public/background.jpeg';
import Logo from './public/logo.png';
import { motion } from 'motion/react';
import Login from "./components/Auth/Login";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfContentLoaded = () => {
      const images = document.querySelectorAll("img");
      let allImagesLoaded = true;

      images.forEach((img) => {
        if (!img.complete) {
          allImagesLoaded = false;
        }
      });

      if (allImagesLoaded) {
        setLoading(false);
      }
    };

    checkIfContentLoaded();

    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("load", checkIfContentLoaded);
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", checkIfContentLoaded);
      });
    };
  }, []);

  if (loading) {
    return (
      <div
        className="w-full h-screen bg-red-500 flex justify-center items-center"
        style={{ background: `url(${Background}) no-repeat`, backgroundSize: 'cover' }}
      >
        <div className="w-full h-screen bg-black bg-opacity-70 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 2 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
          >
            <img src={Logo} alt="Logo" className="w-44" />
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
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </section>
  );
};

export default App;