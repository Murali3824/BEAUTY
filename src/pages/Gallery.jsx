import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Gallery categories and images
const galleryCategories = [
    { id: 'all', name: 'All' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'haircare', name: 'Hair Styling' },
    { id: 'bridal', name: 'Bridal' },
    { id: 'nails', name: 'Nail Art' },
    { id: 'makeup', name: 'Makeup' }
];

const galleryImages = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        category: 'skincare',
        title: 'Luxury Facial Treatment'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
        category: 'haircare',
        title: 'Modern Hair Styling'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1595421548002-2d26fcd7bb36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        category: 'bridal',
        title: 'Elegant Bridal Makeup'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        category: 'nails',
        title: 'Creative Nail Art'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
        category: 'makeup',
        title: 'Professional Makeup Application'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        category: 'skincare',
        title: 'Relaxing Facial Massage'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        category: 'bridal',
        title: 'Complete Bridal Beauty'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        category: 'makeup',
        title: 'Evening Glam Makeup'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1530863208199-b52df4c101c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        category: 'haircare',
        title: 'Precision Hair Cutting'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        category: 'nails',
        title: 'Luxury Manicure Treatment'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        category: 'skincare',
        title: 'Advanced Skin Treatment'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1526045478516-99145907023c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        category: 'bridal',
        title: 'Wedding Day Styling'
    }
];

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    // Filter images based on active category
    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    // Handle lightbox open/close
    const openLightbox = (id) => setSelectedImage(id);
    const closeLightbox = () => setSelectedImage(null);

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
                            Our <span className="text-beauty-rose italic">Beauty Gallery</span>
                        </h1>
                        <div className="w-24 h-px bg-beauty-gold mx-auto my-6"></div>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto font-lato">
                            Explore our portfolio of beauty transformations and the artistry of our skilled professionals.
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {galleryCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-lato transition-colors ${activeCategory === category.id
                                    ? 'bg-beauty-rose text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredImages.map((image) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                key={image.id}
                                className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
                                onClick={() => openLightbox(image.id)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end">
                                    <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="font-cormorant text-xl font-medium">{image.title}</h3>
                                        <p className="font-lato text-sm text-gray-200 capitalize">{image.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Lightbox */}
                    {selectedImage !== null && (
                        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                            <div className="relative w-full max-w-4xl">
                                <button
                                    onClick={closeLightbox}
                                    className="absolute -top-12 right-0 text-white hover:text-beauty-rose"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                {galleryImages.find(img => img.id === selectedImage) && (
                                    <div>
                                        <img
                                            src={galleryImages.find(img => img.id === selectedImage)?.src}
                                            alt={galleryImages.find(img => img.id === selectedImage)?.title}
                                            className="w-full h-auto max-h-[80vh] object-contain"
                                        />
                                        <div className="text-white p-4 text-center">
                                            <h3 className="font-cormorant text-2xl">
                                                {galleryImages.find(img => img.id === selectedImage)?.title}
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Gallery;
