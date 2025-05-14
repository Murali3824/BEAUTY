const serviceDetails = {
    skincare: {
        title: "Skincare",
        description:
            "Our expert estheticians provide personalized facial treatments to address your unique skin concerns and goals. From rejuvenating facials to advanced microdermabrasion, our skincare services will leave your skin glowing and revitalized.",
        heroImage:
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        treatments: [
            {
                id: "signature-facial",
                name: "Signature Facial",
                description:
                    "Our customized facial tailored to your skin type and concerns. Includes deep cleansing, exfoliation, extractions and personalized mask.",
                price: 95,
                duration: "60 minutes",
            },
            {
                id: "hydrating-facial",
                name: "Hydrating Facial",
                description:
                    "Intense moisture replenishment for dry or dehydrated skin. Features hyaluronic acid serums and a hydrating mask.",
                price: 110,
                duration: "75 minutes",
            },
            {
                id: "anti-aging",
                name: "Anti-Aging Treatment",
                description:
                    "Targeted treatment to reduce fine lines and improve skin elasticity. Includes specialized serums and lifting massage techniques.",
                price: 140,
                duration: "90 minutes",
            },
            {
                id: "microdermabrasion",
                name: "Microdermabrasion",
                description:
                    "Advanced exfoliation treatment to remove dead skin cells and promote cellular renewal for smoother, brighter skin.",
                price: 120,
                duration: "45 minutes",
            },
        ],
    },
    haircare: {
        title: "Hair Styling",
        description:
            "Our talented hair stylists are skilled in the latest cutting, coloring, and styling techniques. Whether you're looking for a subtle change or a dramatic transformation, we'll help you achieve the look you desire.",
        heroImage:
            "https://as1.ftcdn.net/jpg/02/05/11/10/1000_F_205111021_gre7YqLCBCJFeZNVZ00V6Z1vrREtJ47p.jpg",
        treatments: [
            {
                id: "haircut-style",
                name: "Haircut & Style",
                description:
                    "Precision haircut and professional styling tailored to your face shape and preferences.",
                price: 65,
                duration: "60 minutes",
            },
            {
                id: "color-refresh",
                name: "Color Refresh",
                description:
                    "Single-process color application to refresh your existing shade or cover grays.",
                price: 85,
                duration: "90 minutes",
            },
            {
                id: "highlights",
                name: "Partial Highlights",
                description:
                    "Dimensional color added to frame your face and add movement to your style.",
                price: 110,
                duration: "120 minutes",
            },
            {
                id: "keratin",
                name: "Keratin Treatment",
                description:
                    "Smoothing treatment that reduces frizz and adds shine to your hair.",
                price: 250,
                duration: "2-3 hours",
            },
        ],
    },
    body: {
        title: "Body Treatments",
        description:
            "Indulge in our luxurious body treatments designed to relax, rejuvenate, and revitalize. From soothing massages to invigorating scrubs, our therapists will help you achieve total relaxation and wellness.",
        heroImage:
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        treatments: [
            {
                id: "swedish-massage",
                name: "Swedish Massage",
                description:
                    "Classic relaxation massage using long, flowing strokes to reduce tension and promote wellbeing.",
                price: 90,
                duration: "60 minutes",
            },
            {
                id: "deep-tissue",
                name: "Deep Tissue Massage",
                description:
                    "Therapeutic massage targeting deeper muscle layers to release chronic tension and pain.",
                price: 110,
                duration: "60 minutes",
            },
            {
                id: "body-scrub",
                name: "Exfoliating Body Scrub",
                description:
                    "Full-body exfoliation treatment to remove dead skin cells and leave skin smooth and refreshed.",
                price: 85,
                duration: "45 minutes",
            },
            {
                id: "body-wrap",
                name: "Detoxifying Body Wrap",
                description:
                    "Purifying treatment to draw out impurities and hydrate the skin using natural clay and botanical extracts.",
                price: 120,
                duration: "75 minutes",
            },
        ],
    },
    bridal: {
        title: "Bridal Services",
        description:
            "Our bridal packages are designed to make you look and feel your absolute best on your special day. From hair and makeup trials to day-of styling, our experts will ensure you are radiant and camera-ready.",
        heroImage:
            "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        treatments: [
            {
                id: "bridal-trial",
                name: "Bridal Hair & Makeup Trial",
                description:
                    "Pre-wedding consultation and styling session to perfect your wedding day look.",
                price: 150,
                duration: "120 minutes",
            },
            {
                id: "bridal-day",
                name: "Bridal Day-Of Package",
                description:
                    "Complete hair styling and makeup application on your wedding day, including touch-ups.",
                price: 250,
                duration: "3 hours",
            },
            {
                id: "bridesmaid",
                name: "Bridesmaid Hair & Makeup",
                description:
                    "Professional styling for bridesmaids to complement the bride's look.",
                price: 150,
                duration: "90 minutes",
            },
            {
                id: "complete-package",
                name: "Complete Bridal Beauty Package",
                description:
                    "Comprehensive package including trial, pre-wedding facial and manicure, and day-of styling.",
                price: 450,
                duration: "Multiple appointments",
            },
        ],
    },
    nails: {
        title: "Nail Artistry",
        description:
            "Our nail services combine technical expertise with artistic flair. From classic manicures to intricate nail art, our technicians will ensure your nails are perfectly groomed and beautifully styled.",
        heroImage:
            "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        treatments: [
            {
                id: "classic-mani",
                name: "Classic Manicure",
                description:
                    "Nail shaping, cuticle care, hand massage, and polish application.",
                price: 35,
                duration: "45 minutes",
            },
            {
                id: "gel-mani",
                name: "Gel Manicure",
                description:
                    "Long-lasting gel polish application that stays shiny and chip-free for weeks.",
                price: 55,
                duration: "60 minutes",
            },
            {
                id: "spa-pedi",
                name: "Luxury Spa Pedicure",
                description:
                    "Relaxing foot soak, exfoliation, callus treatment, massage, and polish.",
                price: 65,
                duration: "75 minutes",
            },
            {
                id: "nail-art",
                name: "Custom Nail Art",
                description:
                    "Hand-painted designs, gems, or specialty finishes to create one-of-a-kind nail looks.",
                price: 20,
                duration: "30+ minutes (added to service)",
            },
        ],
    },
    makeup: {
        title: "Makeup Services",
        description:
            "Our makeup artists are skilled in enhancing your natural beauty for any occasion. Using premium products and techniques, we'll create a flawless look that matches your style and the event.",
        heroImage:
            "https://media.istockphoto.com/id/1020255986/photo/a-beautiful-bride-makeup-artist-applies-makeup-wedding-morning-of-the-bride.jpg?s=612x612&w=0&k=20&c=4jLNtfmP4FxQa8s4GtuFaHIrknauKRVwuV_YaEbzVhY=",
        treatments: [
            {
                id: "everyday",
                name: "Everyday Makeup",
                description:
                    "Natural-looking makeup application perfect for daily wear or casual events.",
                price: 65,
                duration: "45 minutes",
            },
            {
                id: "special-event",
                name: "Special Event Makeup",
                description:
                    "Polished makeup look designed for photographs and special occasions.",
                price: 85,
                duration: "60 minutes",
            },
            {
                id: "evening-glam",
                name: "Evening Glam",
                description:
                    "Dramatic makeup with intensified eyes, contouring, and long-lasting finish for evening events.",
                price: 100,
                duration: "75 minutes",
            },
            {
                id: "makeup-lesson",
                name: "Personalized Makeup Lesson",
                description:
                    "One-on-one instruction to learn techniques and products tailored to your features.",
                price: 120,
                duration: "90 minutes",
            },
        ],
    },
};

export default serviceDetails;