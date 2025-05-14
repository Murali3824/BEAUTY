import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import serviceDetails from "../data/serviceDetails"; // Import serviceDetails

// Utility function to combine class names
const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

// Button variants
const buttonVariants = {
    default: "bg-beauty-rose text-white hover:bg-beauty-rose/90",
    outline: "border border-beauty-rose text-beauty-rose hover:bg-beauty-rose/10",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "hover:bg-gray-100",
    link: "text-beauty-rose underline-offset-4 hover:underline"
};

// Button component
const Button = ({
    className,
    variant = "default",
    size = "default",
    children,
    ...props
}) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
                buttonVariants[variant],
                {
                    "h-10 px-4 py-2": size === "default",
                    "h-9 px-3": size === "sm",
                    "h-11 px-8": size === "lg"
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

// Input component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

// Simplified Calendar component
const Calendar = ({ selected, onSelect, disabled }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() - 1);
            return newMonth;
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + 1);
            return newMonth;
        });
    };

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const isDateEqual = (date1, date2) => {
        if (!date1 || !date2) return false;
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };

    const isDateDisabled = (date) => {
        if (!date) return true;
        if (disabled) {
            return disabled(date);
        }
        return false;
    };

    return (
        <div className="p-3">
            <div className="flex justify-center pt-1 relative items-center mb-4">
                <button
                    onClick={handlePrevMonth}
                    className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="text-sm font-medium">
                    {monthNames[month]} {year}
                </div>
                <button
                    onClick={handleNextMonth}
                    className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div key={index} className="h-8 w-8 mb-1">
                        {day && (
                            <button
                                disabled={isDateDisabled(day)}
                                onClick={() => !isDateDisabled(day) && onSelect(day)}
                                className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors",
                                    isDateEqual(day, selected)
                                        ? "bg-beauty-rose text-white"
                                        : "hover:bg-gray-100",
                                    isDateDisabled(day) && "opacity-30 cursor-not-allowed"
                                )}
                            >
                                {day.getDate()}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main BookTreatment component
const BookTreatment = () => {
    const { category, treatment } = useParams(); // Extract category and treatment from URL
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch category and treatment details
    const categoryDetails = serviceDetails[category];
    const treatmentData = categoryDetails?.treatments.find(t => t.id === treatment);

    // Handle case where category or treatment is not found
    if (!categoryDetails || !treatmentData) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-beauty-charcoal">Treatment Not Found</h1>
                <Button
                    onClick={() => navigate('/services')}
                    className="mt-4 bg-beauty-rose hover:bg-beauty-rose/90 text-white"
                >
                    Back to Services
                </Button>
            </div>
        );
    }

    const [currentStep, setCurrentStep] = useState("details");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: undefined,
        time: '',
        specialist: '',
        notes: '',
        acceptTerms: false,
        paymentMethod: 'credit'
    });

    // Mock toast function
    const toast = (props) => {
        console.log("Toast:", props);
    };

    // Available time slots
    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    // Available specialists
    const specialists = [
        { id: 'sarah', name: 'Sarah Johnson' },
        { id: 'emily', name: 'Emily Parker' },
        { id: 'michael', name: 'Michael Chen' },
        { id: 'olivia', name: 'Olivia Reed' }
    ];

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        setFormData(prev => ({ ...prev, date }));
    };

    // Handle payment method selection
    const handlePaymentMethodSelect = (method) => {
        setFormData(prev => ({ ...prev, paymentMethod: method }));
    };

    // Form validation
    const validateCurrentStep = () => {
        switch (currentStep) {
            case 'details':
                if (!formData.name || !formData.email || !formData.phone) {
                    toast({
                        title: "Missing Information",
                        description: "Please fill in all required fields.",
                        variant: "destructive"
                    });
                    return false;
                }
                return true;

            case 'date':
                if (!formData.date || !formData.time || !formData.specialist) {
                    toast({
                        title: "Missing Information",
                        description: "Please select a date, time, and specialist.",
                        variant: "destructive"
                    });
                    return false;
                }
                return true;

            case 'payment':
                if (!formData.acceptTerms) {
                    toast({
                        title: "Terms & Conditions",
                        description: "Please accept our terms and conditions.",
                        variant: "destructive"
                    });
                    return false;
                }
                return true;

            default:
                return true;
        }
    };

    // Handle next step
    const handleNextStep = () => {
        if (!validateCurrentStep()) return;

        if (currentStep === 'details') setCurrentStep('date');
        else if (currentStep === 'date') setCurrentStep('payment');
        else if (currentStep === 'payment') {
            // In a real application, you would process payment here
            setCurrentStep('confirmation');

            // Show success toast
            toast({
                title: "Booking Confirmed!",
                description: `Your appointment for ${treatmentData.name} has been scheduled for ${formData.date?.toLocaleDateString()} at ${formData.time}.`,
            });
        }
    };

    // Handle previous step
    const handlePreviousStep = () => {
        if (currentStep === 'date') setCurrentStep('details');
        else if (currentStep === 'payment') setCurrentStep('date');
    };

    // Return to services page
    const handleReturnToServices = () => {
        navigate('/services');
    };

    return (
        <div className="min-h-screen bg-white">
            <main className="pt-8 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-medium text-beauty-charcoal mb-4 text-center">
                            Book Your <span className="text-beauty-rose italic">{treatmentData.name}</span>
                        </h1>
                        <div className="w-24 h-px bg-beauty-gold mx-auto my-6"></div>
                    </div>

                    {/* Booking Progress */}
                    <div className="mb-10">
                        <div className="flex flex-col md:flex-row justify-center items-center">
                            <div className={`flex flex-col items-center ${currentStep === 'details' ? 'opacity-100' : 'opacity-60'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${currentStep === 'details' ? 'bg-beauty-rose' : 'bg-beauty-rose/60'}`}>1</div>
                                <span className="mt-2 text-sm">Your Details</span>
                            </div>

                            <div className="w-16 h-px md:w-32 bg-beauty-rose/30 my-4 md:my-0"></div>

                            <div className={`flex flex-col items-center ${currentStep === 'date' ? 'opacity-100' : 'opacity-60'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${currentStep === 'date' ? 'bg-beauty-rose' : 'bg-beauty-rose/60'}`}>2</div>
                                <span className="mt-2 text-sm">Date & Time</span>
                            </div>

                            <div className="w-16 h-px md:w-32 bg-beauty-rose/30 my-4 md:my-0"></div>

                            <div className={`flex flex-col items-center ${currentStep === 'payment' || currentStep === 'confirmation' ? 'opacity-100' : 'opacity-60'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-beauty-rose' : 'bg-beauty-rose/60'}`}>3</div>
                                <span className="mt-2 text-sm">Payment</span>
                            </div>
                        </div>
                    </div>

                    {/* Treatment Summary */}
                    <div className="bg-beauty-cream/10 p-6 rounded-lg mb-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h2 className="text-2xl font-medium text-beauty-charcoal">
                                    {treatmentData.name}
                                </h2>
                                <p className="text-gray-600">{categoryDetails.title} Treatment</p>
                            </div>

                            <div className="mt-4 md:mt-0 flex items-center">
                                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                                    <span className="text-beauty-charcoal font-medium">${treatmentData.price}</span>
                                </div>
                                <div className="ml-4 text-gray-600">
                                    <span>{treatmentData.duration}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Steps */}
                    {currentStep === 'details' && (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-medium text-beauty-charcoal mb-6">
                                Your Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
                                        Full Name*
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                                        Email Address*
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                                        Phone Number*
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button
                                    onClick={handleNextStep}
                                    className="bg-beauty-rose hover:bg-beauty-rose/90"
                                >
                                    Next: Select Date & Time
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 'date' && (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-medium text-beauty-charcoal mb-6">
                                Choose Date & Time
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-medium text-beauty-charcoal mb-4">
                                        Select a Date
                                    </h3>
                                    <div className="border rounded-lg p-4">
                                        <Calendar
                                            selected={formData.date}
                                            onSelect={handleDateSelect}
                                            disabled={(date) => {
                                                // Disable dates in the past and Sundays (assuming salon is closed)
                                                return date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                                    date.getDay() === 0;
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-8">
                                        <h3 className="text-xl font-medium text-beauty-charcoal mb-4">
                                            Select a Time
                                        </h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, time }))}
                                                    className={`py-2 px-4 text-center rounded-md border transition-colors ${formData.time === time
                                                            ? 'bg-beauty-rose text-white border-beauty-rose'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-medium text-beauty-charcoal mb-4">
                                            Choose a Specialist
                                        </h3>
                                        <select
                                            name="specialist"
                                            value={formData.specialist}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        >
                                            <option value="">Select a specialist</option>
                                            {specialists.map((specialist) => (
                                                <option key={specialist.id} value={specialist.id}>
                                                    {specialist.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-6">
                                        <label htmlFor="notes" className="block text-sm text-gray-600 mb-1">
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Any special requests or information we should know..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <Button
                                    onClick={handlePreviousStep}
                                    variant="outline"
                                    className="border-beauty-rose text-beauty-rose hover:bg-beauty-rose/10"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNextStep}
                                    className="bg-beauty-rose hover:bg-beauty-rose/90"
                                >
                                    Next: Payment
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 'payment' && (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-medium text-beauty-charcoal mb-6">
                                Payment Information
                            </h2>

                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-beauty-charcoal mb-4">
                                    Choose Payment Method
                                </h3>

                                <div className="space-y-4">
                                    <div
                                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'credit'
                                                ? 'border-beauty-rose bg-beauty-rose/5'
                                                : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                        onClick={() => handlePaymentMethodSelect('credit')}
                                    >
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.paymentMethod === 'credit' ? 'border-beauty-rose' : 'border-gray-300'
                                            }`}>
                                            {formData.paymentMethod === 'credit' && (
                                                <div className="w-3 h-3 rounded-full bg-beauty-rose"></div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h4 className="font-medium text-beauty-charcoal">Credit / Debit Card</h4>
                                            <p className="text-sm text-gray-500">Pay securely with your card</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>

                                    <div
                                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'paypal'
                                                ? 'border-beauty-rose bg-beauty-rose/5'
                                                : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                        onClick={() => handlePaymentMethodSelect('paypal')}
                                    >
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.paymentMethod === 'paypal' ? 'border-beauty-rose' : 'border-gray-300'
                                            }`}>
                                            {formData.paymentMethod === 'paypal' && (
                                                <div className="w-3 h-3 rounded-full bg-beauty-rose"></div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h4 className="font-medium text-beauty-charcoal">PayPal</h4>
                                            <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                                        </div>
                                        <div className="w-16 h-6 bg-gray-200 rounded"></div>
                                    </div>

                                    <div
                                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'cash'
                                                ? 'border-beauty-rose bg-beauty-rose/5'
                                                : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                        onClick={() => handlePaymentMethodSelect('cash')}
                                    >
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.paymentMethod === 'cash' ? 'border-beauty-rose' : 'border-gray-300'
                                            }`}>
                                            {formData.paymentMethod === 'cash' && (
                                                <div className="w-3 h-3 rounded-full bg-beauty-rose"></div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h4 className="font-medium text-beauty-charcoal">Pay at Salon</h4>
                                            <p className="text-sm text-gray-500">Pay with cash or card when you arrive</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {formData.paymentMethod === 'credit' && (
                                <div className="mb-8 border-t border-gray-200 pt-6">
                                    <h3 className="text-xl font-medium text-beauty-charcoal mb-4">
                                        Card Details
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="cardName" className="block text-sm text-gray-600 mb-1">
                                                Name on Card
                                            </label>
                                            <Input
                                                id="cardName"
                                                name="cardName"
                                                placeholder="Full name as displayed on card"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="cardNumber" className="block text-sm text-gray-600 mb-1">
                                                Card Number
                                            </label>
                                            <Input
                                                id="cardNumber"
                                                name="cardNumber"
                                                placeholder="XXXX XXXX XXXX XXXX"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expDate" className="block text-sm text-gray-600 mb-1">
                                                    Expiration Date
                                                </label>
                                                <Input
                                                    id="expDate"
                                                    name="expDate"
                                                    placeholder="MM/YY"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="cvv" className="block text-sm text-gray-600 mb-1">
                                                    CVV
                                                </label>
                                                <Input
                                                    id="cvv"
                                                    name="cvv"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-beauty-charcoal mb-4">
                                    Booking Summary
                                </h3>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">{treatmentData.name}</span>
                                            <span className="text-beauty-charcoal">${treatmentData.price}.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Service fee</span>
                                            <span className="text-beauty-charcoal">$5.00</span>
                                        </div>
                                        <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                                            <span className="font-medium text-beauty-charcoal">Total</span>
                                            <span className="font-medium text-beauty-charcoal">${treatmentData.price + 5}.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                                        className="mt-1"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        I agree to the <a href="#" className="text-beauty-rose hover:underline">Terms and Conditions</a> and
                                        acknowledge the <a href="#" className="text-beauty-rose hover:underline">Cancellation Policy</a>.
                                    </span>
                                </label>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <Button
                                    onClick={handlePreviousStep}
                                    variant="outline"
                                    className="border-beauty-rose text-beauty-rose hover:bg-beauty-rose/10"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNextStep}
                                    className="bg-beauty-rose hover:bg-beauty-rose/90"
                                >
                                    Complete Booking
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 'confirmation' && (
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h2 className="text-3xl font-medium text-beauty-charcoal mb-4">
                                Booking Confirmed!
                            </h2>

                            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                                Your {treatmentData.name} appointment has been successfully booked.
                                We look forward to seeing you soon!
                            </p>

                            <div className="bg-beauty-cream/10 p-6 rounded-lg mb-8 max-w-lg mx-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                    <div>
                                        <h3 className="font-lato text-sm text-gray-500">Treatment</h3>
                                        <p className="font-lato text-beauty-charcoal">{treatmentData.name}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-lato text-sm text-gray-500">Date & Time</h3>
                                        <p className="font-lato text-beauty-charcoal">
                                            {formData.date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {formData.time}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-lato text-sm text-gray-500">Duration</h3>
                                        <p className="font-lato text-beauty-charcoal">{treatmentData.duration}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-lato text-sm text-gray-500">Specialist</h3>
                                        <p className="font-lato text-beauty-charcoal">
                                            {specialists.find(s => s.id === formData.specialist)?.name || 'Not specified'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <p className="text-sm text-gray-600 mb-2">
                                    We've sent a confirmation email to:
                                </p>
                                <p className="font-medium text-beauty-charcoal">{formData.email}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button
                                    onClick={handleReturnToServices}
                                    variant="outline"
                                    className="border-beauty-rose text-beauty-rose hover:bg-beauty-rose/10"
                                >
                                    Browse More Services
                                </Button>
                                <Button
                                    onClick={() => navigate('/')}
                                    className="bg-beauty-rose hover:bg-beauty-rose/90"
                                >
                                    Return to Home
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BookTreatment;