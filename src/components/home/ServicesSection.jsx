import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Facial treatments, microdermabrasion & advanced skin therapies',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    icon: '✧',
  },
  {
    id: 'haircare',
    name: 'Hair Styling',
    description: 'Cuts, coloring, treatments & styling for all hair types',
    image: 'https://as1.ftcdn.net/jpg/02/05/11/10/1000_F_205111021_gre7YqLCBCJFeZNVZ00V6Z1vrREtJ47p.jpg',
    icon: '✧',
  },
  {
    id: 'body',
    name: 'Body Treatments',
    description: 'Relaxing massages, scrubs, wraps & rejuvenating therapies',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    icon: '✧',
  },
  {
    id: 'bridal',
    name: 'Bridal Services',
    description: 'Complete bridal packages for your special day',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    icon: '✧',
  },
  {
    id: 'nails',
    name: 'Nail Artistry',
    description: 'Manicures, pedicures, nail art & specialized nail treatments',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    icon: '✧',
  },
  {
    id: 'makeup',
    name: 'Makeup Services',
    description: 'Professional makeup application for all occasions',
    image: 'https://media.istockphoto.com/id/1020255986/photo/a-beautiful-bride-makeup-artist-applies-makeup-wedding-morning-of-the-bride.jpg?s=612x612&w=0&k=20&c=4jLNtfmP4FxQa8s4GtuFaHIrknauKRVwuV_YaEbzVhY=',
    icon: '✧',
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-beauty-rose/10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-beauty-gold/5 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <span className="font-lato text-beauty-gold text-sm tracking-widest uppercase">Bespoke Services</span>
            <div className="flex items-center justify-center mt-2">
              <div className="h-px w-10 bg-beauty-gold opacity-50"></div>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium text-beauty-charcoal px-4">
                Our <span className="text-beauty-rose italic">Signature</span> Offerings
              </h2>
              <div className="h-px w-10 bg-beauty-gold opacity-50"></div>
            </div>
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto font-lato">
            Indulge in our curated beauty experiences designed to enhance your natural beauty and provide ultimate relaxation.
          </p>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group"
              onClick={() => navigate(`/services/${category.id}`)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-500 h-[400px] bg-white">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10"></div>

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col p-6 justify-end z-20">
                  <div className="backdrop-blur-sm bg-white/30 p-5 rounded-lg transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-cormorant text-2xl font-semibold text-white">
                        {category.name}
                      </h3>
                      <span className="text-beauty-gold text-2xl">{category.icon}</span>
                    </div>
                    <p className="text-white/90 font-lato text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center text-white text-sm font-medium">
                        Explore Services
                        <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => navigate('/services')}
            className="font-lato inline-flex items-center justify-center text-beauty-charcoal border-b-2 border-beauty-gold hover:text-beauty-rose transition-colors duration-300 pb-1 group"
          >
            View All Services
            <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
