import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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


const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-h-screen bg-white">
            <section className="pt-28 pb-16 bg-gradient-to-br from-beauty-cream/30 via-white to-beauty-blush/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h1 className="font-cormorant text-5xl md:text-6xl font-medium text-beauty-charcoal">
                            Our <span className="text-beauty-rose italic">Complete</span> Services
                        </h1>
                        <div className="w-24 h-px bg-beauty-gold mx-auto my-6"></div>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-lato">
                            Explore our full range of beauty and wellness services designed to pamper,
                            rejuvenate, and enhance your natural beauty.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.5 }}
                                className="group"
                            >
                                <Link to={`/services/${category.id}`}>
                                    <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-500 h-[400px] bg-white">
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10"></div>

                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

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
                                                        Book Now
                                                        <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
