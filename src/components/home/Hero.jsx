import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const artists = [
    { name: 'Sophia Ellis', rating: 5.0, specialty: 'Bridal' },
    { name: 'James Harlow', rating: 4.9, specialty: 'Editorial' },
    { name: 'Amara Lee', rating: 4.8, specialty: 'Special FX' },
  ];

  return (
    <section className="min-h-screen flex items-center pt-20 lg:pt-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-beauty-cream/20 via-white to-beauty-blush/30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(216,180,254,0.15)_0%,rgba(255,255,255,0)_20%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.10)_0%,rgba(255,255,255,0)_25%)]"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-beauty-rose/10 rounded-full blur-lg"></div>
      <div className="absolute -bottom-32 -left-16 w-96 h-96 bg-beauty-mauve/10 rounded-full blur-lg"></div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 animate-fade-in">
            <div className="mb-4 flex items-center">
              <div className="h-1 w-12 bg-gradient-to-r from-beauty-gold to-beauty-rose rounded-full mr-3"></div>
              <span className="text-sm uppercase tracking-widest text-beauty-charcoal/80 font-medium">Professional Beauty Services</span>
            </div>

            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-beauty-charcoal">
              Artistry at Your <span className="relative">
                Doorstep
                <span className="absolute bottom-1 left-0 w-full h-1 bg-gold -z-10 rounded-full"></span>
              </span>
            </h1>

            <p className="font-lato text-base md:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Bringing professional beauty experiences to small towns. Beautyluxe connects you with verified makeup artists in your area, eliminating the need for travel.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                type="button"
                onMouseEnter={() => setHoveredButton('learn')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => navigate('/services')}
                className="relative font-lato font-medium py-3 md:py-4 px-8 md:px-10 rounded-md transition-all duration-500 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-beauty-rose"
                aria-label="Discover beauty services"
              >
                <span className="absolute inset-0 bg-pink-400 transition-all duration-500 group-hover:scale-105"></span>
                <div className="absolute inset-0 border border-white/20 rounded-md"></div>
                <span className="relative text-white flex items-center">
                  <span>Discover Services</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${hoveredButton === 'learn' ? 'translate-x-1' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>

              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredButton('download')}
                onMouseLeave={() => setHoveredButton(null)}
                className="relative font-lato font-medium py-3 md:py-4 px-8 md:px-10 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-beauty-rose"
                aria-label="Download the Beautyluxe app"
              >
                <span className="absolute inset-0 bg-white border border-beauty-rose/30 rounded-md shadow-sm"></span>
                <span className="relative text-beauty-charcoal flex items-center">
                  <span>Download App</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${hoveredButton === 'download' ? 'translate-x-1' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
              </a>
            </div>

            <div className="mt-12 flex items-center" aria-describedby="reviews">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-rose-400 flex items-center justify-center text-white font-medium text-xs"
                    aria-hidden="true"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="ml-4" id="reviews">
                <div className="flex items-center text-yellow-500 text-sm">
                  <Star size={16} fill="currentColor" strokeWidth={0} aria-label="Star rating" />
                  <Star size={16} fill="currentColor" strokeWidth={0} aria-label="Star rating" />
                  <Star size={16} fill="currentColor" strokeWidth={0} aria-label="Star rating" />
                  <Star size={16} fill="currentColor" strokeWidth={0} aria-label="Star rating" />
                  <Star size={16} fill="currentColor" strokeWidth={0} aria-label="Star rating" />
                  <span className="ml-2 text-beauty-charcoal font-medium text-sm">4.9/5.0</span>
                </div>
                <div className="text-xs text-gray-500">Based on 2,400+ reviews</div>
              </div>
            </div>
          </div>

          {/* Right Content - Mobile App Mockup */}
          <div className="w-full lg:w-1/2 flex justify-center pt-8 lg:pt-0">
            <div className="relative phone-mockup">
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-beauty-gold/10 rounded-full blur-lg"></div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-beauty-mauve/10 rounded-full blur-lg"></div>

              {/* Phone mockup container */}
              <div className="relative z-10 bg-gradient-to-br from-beauty-charcoal to-black rounded-[40px] p-3 shadow-xl shadow-beauty-charcoal/10 border border-white/10">
                {/* Phone screen */}
                <div className="bg-white rounded-[32px] overflow-hidden w-64 sm:w-72 md:w-80">
                  {/* Status bar */}
                  <div className="bg-beauty-charcoal text-white pt-3 pb-1 px-4 flex justify-between items-center text-xs">
                    <div>9:41</div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-beauty-gold"></div>
                      <div className="w-3 h-3 rounded-full bg-beauty-rose"></div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="bg-gradient-to-r from-beauty-charcoal to-beauty-charcoal/90 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="w-7 h-7 rounded-full bg-beauty-gold/80 flex items-center justify-center mr-2">
                          <span className="text-white font-bold text-xs">B</span>
                        </div>
                        <div className="text-white font-cormorant font-bold text-lg">Beautyluxe</div>
                      </div>
                      <div className="bg-white/10 rounded-full p-1.5">
                        <Search size={16} className="text-white" aria-label="Search artists" />
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center text-white">
                      <MapPin size={14} className="mr-2 text-beauty-gold" aria-label="Location pin" />
                      <div>
                        <div className="text-xs text-white/80">Current Location</div>
                        <div className="text-sm font-medium">Fairview, New Valley</div>
                      </div>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-beauty-charcoal">Available Artists</div>
                      <div className="text-xs text-beauty-rose font-medium">View All</div>
                    </div>

                    {/* Artist cards */}
                    <div className="space-y-3">
                      {artists.map((artist, i) => (
                        <div
                          key={i}
                          className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center"
                          role="listitem"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-beauty-rose to-beauty-mauve flex items-center justify-center text-white font-bold text-xs mr-3">
                            {artist.name.charAt(0)}
                            {artist.name.split(' ')[1].charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-beauty-charcoal">{artist.name}</div>
                            <div className="flex items-center">
                              <div className="text-yellow-500 text-xs flex items-center">
                                <Star size={10} fill="currentColor" aria-label="Artist rating" />
                                <span className="ml-1">{artist.rating}</span>
                              </div>
                              <div className="mx-1.5 w-1 h-1 rounded-full bg-gray-300"></div>
                              <div className="text-xs text-gray-500">{artist.specialty}</div>
                            </div>
                          </div>
                          <div className="bg-beauty-rose/10 text-beauty-rose text-xs font-medium px-3 py-1.5 rounded-full">
                            Book
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* App navigation */}
                    <div className="mt-4 bg-white border-t pt-3 flex justify-around">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-beauty-rose/20 flex items-center justify-center">
                          <Search size={12} className="text-beauty-rose" aria-label="Explore" />
                        </div>
                        <div className="text-[10px] mt-1 text-beauty-charcoal font-medium">Explore</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <Calendar size={12} className="text-gray-500" aria-label="Bookings" />
                        </div>
                        <div className="text-[10px] mt-1 text-gray-500">Bookings</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <Clock size={12} className="text-gray-500" aria-label="History" />
                        </div>
                        <div className="text-[10px] mt-1 text-gray-500">History</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -right-20 top-20 w-12 h-12 rounded-2xl bg-white shadow-lg shadow-beauty-rose/10 border border-beauty-rose/20 flex items-center justify-center rotate-12">
                <Star size={24} className="text-beauty-gold" fill="currentColor" aria-hidden="true" />
              </div>
              <div className="absolute -left-20 bottom-40 w-14 h-14 rounded-2xl bg-white shadow-lg shadow-beauty-rose/10 border border-beauty-rose/20 flex items-center justify-center -rotate-12 p-2">
                <div className="w-full h-full bg-gradient-to-br from-beauty-rose/80 to-beauty-mauve/80 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-mockup {
          animation: slideUp 1s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;