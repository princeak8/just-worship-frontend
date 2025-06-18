import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Navs/Nav";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Navs/Footer";
import Background from "./public/background.jpeg";
import Logo from "./public/logo.png";
import { motion } from "motion/react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Layout from "./Dashboard/Layout";
import Home from "./Dashboard/dashboard/Home";
import Events from "./Events/Events";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./Contact/Contact";
import Store from "./Store/Store";
import Report from "./Dashboard/dashboard/R&A/Report";
import HomeCMS from "./Dashboard/dashboard/CMS/Home/HomeCMS";
import CreateHome from "./Dashboard/dashboard/CMS/Home/CreateHome";
import Cookies from "js-cookie";
import AboutCMS from "./Dashboard/dashboard/CMS/About/AboutCMS";
import TeamCMS from "./Dashboard/dashboard/CMS/Team/TeamCMS";
import EditAbout from "./Dashboard/dashboard/CMS/About/EditAbout";
import AddTeam from "./Dashboard/dashboard/CMS/Team/AddTeam";
import StoreCMS from "./Dashboard/dashboard/CMS/Store/StoreCMS";
import AddItem from "./Dashboard/dashboard/CMS/Store/AddItem";
import ContactCMS from "./Dashboard/dashboard/CMS/Contact/ContactCMS";
import EditContact from "./Dashboard/dashboard/CMS/Contact/EditContact";
import EventCMS from "./Dashboard/dashboard/CMS/Event/EventCMS";
import UserProfileSettings from "./Dashboard/dashboard/Setting/Settings";
import CreateEvent from "./Dashboard/dashboard/CMS/Event/CreateEvent";
import GalleryCMS from "./Dashboard/dashboard/CMS/Gallery/GalleryCMS";
import AddImage from "./Dashboard/dashboard/CMS/Gallery/AddImage";
import Giving from "./Giving/Giving";
import GivingCMS from "./Dashboard/dashboard/CMS/Giving/GivingCMS";
import Live from "./Live/Live";
import LiveCMS from "./Dashboard/dashboard/CMS/Live/LiveCMS";
import CreateLive from "./Dashboard/dashboard/CMS/Live/CreateLive";
import MessagesCMS from "./Dashboard/dashboard/CMS/Messages/MessagesCMS";
import EditMessages from "./Dashboard/dashboard/CMS/Messages/EditMessages";
import Gallery from "./Gallery/Gallery";
import EditYoutube from "./Dashboard/dashboard/CMS/About/EditYoutube";

const isUserAuthenticated = () => {
  return Cookies.get("token") !== undefined;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // console.log("path: ", location.pathname);

  useEffect(() => {
    const checkIfContentLoaded = () => {
      const images = document.querySelectorAll("img");
      let allImagesLoaded = true;

      images.forEach((img) => {
        if (!img?.complete) {
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

  // console.log("isAuth: ", isUserAuthenticated());

  if (location.pathname.startsWith('/dashboard') && !isUserAuthenticated()) {
    // return window.location.replace('/login');
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div
        className="w-full h-screen bg-red-500 flex justify-center items-center"
        style={{ background: `url(${Background}) no-repeat`, backgroundSize: "cover" }}
      >
        <div className="w-full h-screen bg-black bg-opacity-70 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 2 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          >
            <img loading="lazy" src={Logo} alt="Logo" className="w-44" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ConditionalNav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/live" element={<Live />} />
        <Route path="/giving" element={<Giving />} />
        <Route path="/store" element={<Store />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="report" element={<Report />} />
          <Route path="cms/home" element={<HomeCMS />} />
          <Route path="cms/home/create" element={<CreateHome />} />
          <Route path="cms/home/:id" element={<CreateHome />} />
          <Route path="cms/about" element={<AboutCMS />} />
          <Route path="cms/edit_youtube" element={<EditYoutube />} />
          <Route path="cms/about/:id" element={<EditAbout />} />
          <Route path="cms/team" element={<TeamCMS />} />
          <Route path="cms/team/add" element={<AddTeam />} />
          <Route path="cms/team/:id" element={<AddTeam />} />
          <Route path="cms/store" element={<StoreCMS />} />
          <Route path="cms/store/add" element={<AddItem />} />
          <Route path="cms/store/:id" element={<AddItem />} />
          <Route path="cms/contact" element={<ContactCMS />} />
          <Route path="cms/contact/:id" element={<EditContact />} />
          <Route path="cms/events" element={<EventCMS />} />
          <Route path="cms/events/add" element={<CreateEvent />} />
          <Route path="cms/events/:id" element={<CreateEvent />} />
          <Route path="cms/giving" element={<GivingCMS />} />
          <Route path="cms/gallery" element={<GalleryCMS />} />
          <Route path="cms/gallery/add" element={<AddImage />} />
          <Route path="cms/gallery/:id" element={<AddImage />} />
          <Route path="cms/live" element={<LiveCMS />} />
          <Route path="cms/live/add" element={<CreateLive />} />
          <Route path="cms/live/:id" element={<CreateLive />} />
          <Route path="cms/messages" element={<MessagesCMS />} />
          <Route path="cms/messages/create" element={<EditMessages />} />

          <Route path="setting" element={<UserProfileSettings />} />
        </Route>
      </Routes>
      <ConditionalFooter />
    </>
  );
};

const ConditionalNav = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return !isDashboardRoute ? <Nav /> : null;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return !isDashboardRoute ? <Footer /> : null;
};

export default App;
