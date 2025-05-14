import React from 'react';
import { Calendar, CheckCircle, Home, CreditCard } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card flex flex-col items-center text-center animate-slide-up">
      <div className="bg-beautyluxe-pink p-4 rounded-full mb-4">
        <div className="text-pink-500">{icon}</div>
      </div>
      <h3 className="text-xl font-playfair font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <Calendar size={28} />,
      title: 'Easy Booking',
      description:
        'Book appointments with just a few taps. Choose your preferred time and services with our user-friendly interface.',
    },
    {
      icon: <CheckCircle size={28} />,
      title: 'Verified Beauticians',
      description:
        'All our makeup artists are professionally trained and verified, ensuring quality service every time.',
    },
    {
      icon: <Home size={28} />,
      title: 'Doorstep Services',
      description:
        'No need to travel. Our beauticians come to you, saving your time and making beauty convenient.',
    },
    {
      icon: <CreditCard size={28} />,
      title: 'Safe Payments',
      description:
        'Secure and flexible payment options including cash, cards, and digital wallets for your peace of mind.',
    },
  ];

  return (
    <section className=" bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Beautyluxe</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've designed our app to make beauty services accessible and convenient for everyone in small towns.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;