import React from 'react';
import { Users, BadgePercent } from 'lucide-react';

const AudienceCard = ({
  icon,
  title,
  description,
  benefits,
  buttonText,
  onClick,
}) => {
  return (
    <div className="audience-card bg-white p-8 rounded-lg shadow-md flex flex-col h-full animate-slide-up">
      <div className="flex items-center mb-6">
        <div className="bg-beautyluxe-pink p-3 rounded-full mr-4">
          <div className="text-pink-500">{icon}</div>
        </div>
        <h3 className="text-xl font-playfair font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="mb-6 flex-grow">
        <h4 className="font-medium mb-3 text-gray-700">Key Benefits:</h4>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span className="text-gray-600">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onClick}
        className="font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-sm bg-beautyluxe-pink hover:bg-opacity-90 text-black w-full"
      >
        {buttonText}
      </button>
    </div>
  );
};

const AudienceSection = ({ scrollToSection }) => {
  const handleCustomerClick = () => {
    scrollToSection('cta');
  };

  const handleArtistClick = () => {
    scrollToSection('cta');
  };

  return (
    <section id="audience" className=" bg-beautyluxe-gray/50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beautyluxe bridges the gap between beauty enthusiasts and skilled
            makeup artists in small towns, creating opportunities for both.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AudienceCard
            icon={<Users size={28} />}
            title="Beauty Enthusiasts"
            description="For women aged 18-50 in small towns looking for professional beauty services without traveling to big cities."
            benefits={[
              'Access to professional makeup artists in your town',
              'No need to travel for quality beauty services',
              'Personalized makeup sessions for any occasion',
              'Flexible scheduling to fit your busy life',
            ]}
            buttonText="Download App"
            onClick={handleCustomerClick}
          />
          <AudienceCard
            icon={<BadgePercent size={28} />}
            title="Makeup Professionals"
            description="For skilled makeup artists looking to expand their client base and grow their business in small-town markets."
            benefits={[
              'Connect with new clients in your area',
              'Set your own schedule and pricing',
              'Showcase your portfolio to local clients',
              'Receive secure payments and build your reputation',
            ]}
            buttonText="Partner With Us"
            onClick={handleArtistClick}
          />
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;