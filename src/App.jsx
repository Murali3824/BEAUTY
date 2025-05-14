import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import LoginSignup from './components/LoginSignup';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceCategory from './components/ServiceCategory';
import Gallery from './pages/Gallery';
import About from './pages/About';
import BookTreatment from './components/BookTreatment';
// import AboutSection from './pages/AboutSection'; // You'll need to create this
// import GallerySection from './pages/GallerySection'; // You'll need to create this

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-fuchsia-200 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-playfair font-bold text-3xl text-black">
                Beauty<span className="text-pink-400">luxe</span>
              </span>
            </div>
          </div>
          <p className="text-gray-600">Loading amazing beauty experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 overflow-hidden">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-fuchsia-500 text-white p-3 rounded-full shadow-lg z-40 hover:bg-fuchsia-600 transition-all duration-300 opacity-80 hover:opacity-100"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home/>
          }
        />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:category" element={<ServiceCategory />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/book/:category/:treatment" element={<BookTreatment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;