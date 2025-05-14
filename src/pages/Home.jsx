import React from 'react';
import Hero from '../components/home/Hero';
import FeatureSection from '../components/home/FeatureSection';
import AudienceSection from '../components/home/AudienceSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ServicesSection from '../components/home/ServicesSection';

const Home = () => {
    
    return (
        <div>
            <Hero/>
            <FeatureSection/>
            <AudienceSection/>
            <ServicesSection/>
            <TestimonialsSection/>
        </div>
    );
};

export default Home;