import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import serviceDetails from "../data/serviceDetails";

// Simple utility function to replace cn from "@/lib/utils"
const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

// Button Component
const buttonVariants = (variant, size) => {
    const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
    };
    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
    };
    return cn(base, variants[variant] || variants.default, sizes[size] || sizes.default);
};

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants(variant, size), className)} ref={ref} {...props} />;
});
Button.displayName = "Button";

// Card Components
const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// ScrollArea Components
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <div className="h-full w-full rounded-[inherit]">{children}</div>
        <div className="flex touch-none select-none h-full w-2.5 border-l border-l-transparent p-[1px]">
            <div className="relative flex-1 rounded-full bg-border" />
        </div>
    </div>
));
ScrollArea.displayName = "ScrollArea";

// Accordion Components
const Accordion = ({ children, ...props }) => <div {...props}>{children}</div>;

const AccordionItem = React.forwardRef(({ className, value, children, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props}>
        {children}
    </div>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
    <div className="flex">
        <button
            ref={ref}
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    </div>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className)}
        {...props}
    >
        <div className={cn("pb-4 pt-0")}>{children}</div>
    </div>
));
AccordionContent.displayName = "AccordionContent";

const ServiceCategory = () => {
    const { category } = useParams();
    const categoryDetails = serviceDetails[category];
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const navigate = useNavigate();

    const handleBookTreatment = () => {
        if (activeTreatment) {
            navigate(`/book/${category}/${activeTreatment.id}`);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!categoryDetails) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">Service Category Not Found</h1>
                    <Link to="/services" className="mt-4 text-beauty-rose hover:underline">
                        Back to All Services
                    </Link>
                </div>
            </div>
        );
    }

    const activeTreatment = selectedTreatment
        ? categoryDetails.treatments.find((t) => t.id === selectedTreatment)
        : categoryDetails.treatments[0];

    return (
        <div className="min-h-screen bg-white">
            <section className="pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <Link to="/services" className="text-beauty-charcoal hover:text-beauty-rose flex items-center font-lato">
                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back to All Services
                        </Link>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-12">
                        <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                            <img src={categoryDetails.heroImage} alt={categoryDetails.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-8">
                                    <h1 className="font-cormorant text-4xl md:text-5xl font-medium text-white">{categoryDetails.title} Services</h1>
                                    <p className="text-white/80 font-lato mt-2 max-w-2xl">{categoryDetails.description}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Side: Treatment List */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-1">
                            <Card className="shadow-md h-full">
                                <CardHeader className="border-b">
                                    <CardTitle className="font-cormorant text-2xl text-beauty-charcoal">Our {categoryDetails.title} Treatments</CardTitle>
                                    <CardDescription className="font-lato">Select a treatment to view details</CardDescription>
                                </CardHeader>
                                <ScrollArea className="h-[500px] p-4">
                                    <Accordion type="single" collapsible className="w-full">
                                        {categoryDetails.treatments.map((treatment) => (
                                            <AccordionItem key={treatment.id} value={treatment.id} className={`border-b transition-all ${selectedTreatment === treatment.id ? "bg-beauty-cream" : ""}`}>
                                                <div className="flex items-center cursor-pointer py-4 px-1" onClick={() => setSelectedTreatment(treatment.id)}>
                                                    <div className="flex-1">
                                                        <h3 className="font-cormorant text-lg font-medium text-beauty-charcoal">{treatment.name}</h3>
                                                        <div className="flex items-center mt-1">
                                                            <span className="text-sm text-beauty-rose font-lato">${treatment.price}+</span>
                                                            <span className="mx-2 text-gray-300">•</span>
                                                            <span className="text-sm text-gray-500 font-lato">{treatment.duration}</span>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-beauty-rose hover:text-beauty-rose/80 hover:bg-beauty-cream/10"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedTreatment(treatment.id);
                                                        }}
                                                    >
                                                        View
                                                    </Button>
                                                </div>
                                                <AccordionContent className="text-sm text-gray-600 font-lato pb-4">{treatment.description}</AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </ScrollArea>
                            </Card>
                        </motion.div>

                        {/* Right Side: Treatment Details & Specialists */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-2">
                            {activeTreatment && (
                                <div className="grid grid-cols-1 gap-8">
                                    <Card className="shadow-md">
                                        <CardHeader>
                                            <CardTitle className="font-cormorant text-2xl text-beauty-charcoal">{activeTreatment.name}</CardTitle>
                                            <div className="flex items-center">
                                                <span className="bg-beauty-cream/20 text-beauty-rose px-3 py-1 rounded-full text-sm font-lato">${activeTreatment.price}+</span>
                                                <span className="mx-2 text-gray-300">•</span>
                                                <span className="text-gray-500 text-sm font-lato">Duration: {activeTreatment.duration}</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 font-lato mb-6">{activeTreatment.description}</p>
                                            <div className="mb-6">
                                                <h4 className="font-cormorant text-xl font-medium text-beauty-charcoal mb-3">Treatment Benefits</h4>
                                                <ul className="list-disc list-inside text-gray-600 font-lato space-y-2">
                                                    <li>Professional expertise with premium products</li>
                                                    <li>Customized approach for your specific needs</li>
                                                    <li>Relaxing environment with attentive care</li>
                                                    <li>Long-lasting, beautiful results</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-cormorant text-xl font-medium text-beauty-charcoal mb-3">Our {categoryDetails.title} Specialists</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    <div className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100">
                                                        <div className="w-16 h-16 rounded-full overflow-hidden">
                                                            <img
                                                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                                                                alt="Specialist"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-cormorant text-lg font-medium text-beauty-charcoal">Sarah Johnson</h5>
                                                            <p className="text-beauty-rose text-sm font-lato">Senior {categoryDetails.title} Expert</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100">
                                                        <div className="w-16 h-16 rounded-full overflow-hidden">
                                                            <img
                                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                                                alt="Specialist"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-cormorant text-lg font-medium text-beauty-charcoal">Emily Parker</h5>
                                                            <p className="text-beauty-rose text-sm font-lato">{categoryDetails.title} Specialist</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <h5 className="font-cormorant text-lg font-medium text-beauty-charcoal mb-3">Previous Work</h5>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <div className="aspect-square rounded-md overflow-hidden">
                                                            <img src={categoryDetails.heroImage} alt="Previous work" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="aspect-square rounded-md overflow-hidden">
                                                            <img src={categoryDetails.heroImage} alt="Previous work" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="aspect-square rounded-md overflow-hidden">
                                                            <img src={categoryDetails.heroImage} alt="Previous work" className="w-full h-full object-cover" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Button
                                        className="bg-beauty-rose hover:bg-beauty-rose/80 text-white px-8 py-6 text-lg"
                                        onClick={handleBookTreatment}
                                        aria-label={`Book ${activeTreatment.name} treatment`}
                                    >
                                        Book This Treatment
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="mt-20 bg-beauty-cream/10 p-8 rounded-lg shadow-md"
                        id="appointment"
                    >
                        <h2 className="font-cormorant text-3xl font-medium text-beauty-charcoal mb-6 text-center">
                            Book Your <span className="text-beauty-rose italic">{categoryDetails.title}</span> Appointment
                        </h2>
                        <div className="text-center mb-8">
                            <p className="font-lato text-gray-600">
                                Ready to experience our {categoryDetails.title.toLowerCase()} treatments? Book your appointment now or contact us for personalized advice.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <Button className="bg-beauty-rose hover:bg-beauty-rose/80 text-white mr-4">Book Online Now</Button>
                            <Button variant="outline" className="border-beauty-rose text-beauty-rose hover:bg-beauty-rose/10">
                                Call Us: (123) 456-7890
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServiceCategory;