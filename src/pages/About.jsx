import React, { useEffect } from 'react';
import { motion } from 'framer-motion';


const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h1 className="font-cormorant text-4xl md:text-5xl font-medium text-beauty-charcoal mb-4">
              About <span className="text-beauty-rose italic">Beauty Haven</span>
            </h1>
            <div className="w-24 h-px bg-beauty-gold mx-auto my-6"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto font-lato">
              Your journey to beauty excellence begins with us. Discover the story behind Beauty Haven and our commitment to exceptional care and service.
            </p>
          </motion.div>

          {/* Our Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          >
            <div className="order-2 lg:order-1">
              <h2 className="font-cormorant text-3xl font-medium text-beauty-charcoal mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 font-lato mb-6">
                Beauty Haven was founded in 2010 with a simple yet powerful vision: to create a sanctuary where beauty meets exceptional service and personalized care. What began as a small studio with three dedicated professionals has grown into a premier beauty destination with a team of experts across all beauty disciplines.
              </p>
              <p className="text-gray-600 font-lato mb-6">
                Our journey has been defined by an unwavering commitment to quality, continuous education, and embracing innovations in beauty and wellness. We believe beauty treatments are not just about aesthetics—they're about fostering confidence, self-care, and wellness.
              </p>
              <p className="text-gray-600 font-lato">
                With over a decade of experience, thousands of satisfied clients, and numerous industry accolades, Beauty Haven has established itself as a trusted name in the beauty industry. Every treatment, product, and service is selected with our clients' needs in mind, ensuring a truly personalized experience.
              </p>
            </div>
            <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Beauty Haven Salon Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-cormorant text-3xl font-medium text-beauty-charcoal mb-6 text-center">
              Our Values
            </h2>
            <div className="w-16 h-px bg-beauty-gold mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-beauty-cream/10 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-beauty-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-beauty-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-cormorant text-xl font-medium text-beauty-charcoal mb-2">Excellence</h3>
                <p className="text-gray-600 font-lato">We strive for excellence in every service, product, and client interaction, never compromising on quality.</p>
              </div>
              
              <div className="bg-beauty-cream/10 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-beauty-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-beauty-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="font-cormorant text-xl font-medium text-beauty-charcoal mb-2">Personalization</h3>
                <p className="text-gray-600 font-lato">We believe in tailored experiences that honor the uniqueness of each client's beauty and wellness needs.</p>
              </div>
              
              <div className="bg-beauty-cream/10 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-beauty-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-beauty-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-cormorant text-xl font-medium text-beauty-charcoal mb-2">Innovation</h3>
                <p className="text-gray-600 font-lato">We continuously evolve our practices, embracing new technologies and techniques in the beauty industry.</p>
              </div>
            </div>
          </motion.div>

          {/* Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-cormorant text-3xl font-medium text-beauty-charcoal mb-6 text-center">
              Meet Our Expert Team
            </h2>
            <div className="w-16 h-px bg-beauty-gold mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-cormorant text-xl font-medium text-beauty-charcoal">Sarah Johnson</h3>
                <p className="text-beauty-rose font-lato mt-1">Founder & Director</p>
                <p className="text-gray-600 font-lato mt-2">With 15+ years in the beauty industry, Sarah's vision and expertise guide our team to excellence.</p>
              </div>
              
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" 
                    alt="Emily Parker" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-cormorant text-xl font-medium text-beauty-charcoal">Emily Parker</h3>
                <p className="text-beauty-rose font-lato mt-1">Lead Esthetician</p>
                <p className="text-gray-600 font-lato mt-2">Emily's advanced training in skincare has helped countless clients achieve their best skin ever.</p>
              </div>
              
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="Michael Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-cormorant text-xl font-medium text-beauty-charcoal">Michael Chen</h3>
                <p className="text-beauty-rose font-lato mt-1">Hair Stylist</p>
                <p className="text-gray-600 font-lato mt-2">Michael's creative vision and technical mastery have made him a favorite among our clients.</p>
              </div>
              
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80" 
                    alt="Olivia Reed" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-cormorant text-xl font-medium text-beauty-charcoal">Olivia Reed</h3>
                <p className="text-beauty-rose font-lato mt-1">Makeup Artist</p>
                <p className="text-gray-600 font-lato mt-2">Olivia's work has been featured in magazines and her bridal makeup is in high demand.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About;