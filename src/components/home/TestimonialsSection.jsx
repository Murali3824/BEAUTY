import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: 'Sophia Williams',
        role: 'Regular Client',
        quote: 'Their facial treatments have completely transformed my skin. The staff is not only professional but truly caring about your beauty goals.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        rating: 5
    },
    {
        id: 2,
        name: 'Olivia Patel',
        role: 'Bridal Package Client',
        quote: 'My wedding day was perfect thanks to Beauty Haven! From the trial to the big day, they listened carefully to my vision and executed it flawlessly.',
        image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1095&q=80',
        rating: 5
    },
    {
        id: 3,
        name: 'Emma Thompson',
        role: 'VIP Member',
        quote: "I've tried salons across the city, but none compare to the level of service and expertise found at Beauty Haven. Their nail art is unmatched.",
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
        rating: 5
    }
];

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="py-24 bg-gradient-to-br from-beauty-cream/30 via-white to-beauty-blush/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-beauty-charcoal">
                        Client <span className="text-beauty-rose italic">Experiences</span>
                    </h2>
                    <div className="w-24 h-px bg-beauty-gold mx-auto my-6"></div>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-lato">
                        Discover what our clients have to say about their transformative beauty experiences at Beauty Haven.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-lg shadow-lg p-8 relative"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 text-center">
                                <div className="flex justify-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-beauty-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="font-lato text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                                <h4 className="font-cormorant text-xl font-semibold text-beauty-charcoal">{testimonial.name}</h4>
                                <p className="text-beauty-rose text-sm font-lato">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;