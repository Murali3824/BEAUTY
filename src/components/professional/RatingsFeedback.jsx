import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Flag, ThumbsUp, Search, Filter, ChevronDown } from 'lucide-react';

const RatingsFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [stats, setStats] = useState({
    average: 4.8,
    total: 0,
    distribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
  });
  
  useEffect(() => {
    // Load reviews from localStorage or initialize with mock data
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      // Mock reviews data
      const mockReviews = [
        { 
          id: 1, 
          date: '2025-05-20', 
          service: 'Haircut & Styling', 
          customer: 'Alice Brown', 
          rating: 5, 
          comment: 'Absolutely amazing service! Very professional and I love my new haircut. Will definitely be coming back for future services.',
          response: ''
        },
        { 
          id: 2, 
          date: '2025-05-15', 
          service: 'Facial', 
          customer: 'Bob Smith', 
          rating: 4, 
          comment: 'Great service, very relaxing experience. My skin feels refreshed and clean.',
          response: 'Thank you for your feedback, Bob! We are glad you enjoyed your facial treatment.'
        },
        { 
          id: 3, 
          date: '2025-05-10', 
          service: 'Manicure', 
          customer: 'Carol Davis', 
          rating: 5, 
          comment: 'Best manicure I\'ve ever had! The attention to detail was impressive.',
          response: ''
        },
        { 
          id: 4, 
          date: '2025-05-05', 
          service: 'Hair Coloring', 
          customer: 'Dave Wilson', 
          rating: 3, 
          comment: 'The color came out a bit different than what I expected, but it still looks nice.',
          response: 'We appreciate your feedback, Dave. We would love to have you back to make any adjustments needed to achieve your perfect look.'
        },
        { 
          id: 5, 
          date: '2025-04-30', 
          service: 'Massage', 
          customer: 'Eva Green', 
          rating: 5, 
          comment: 'So relaxing! The massage technique was perfect for my sore muscles.',
          response: ''
        },
        { 
          id: 6, 
          date: '2025-04-25', 
          service: 'Waxing', 
          customer: 'Frank Moore', 
          rating: 4, 
          comment: 'Professional service, quick and relatively painless.',
          response: ''
        }
      ];
      setReviews(mockReviews);
      localStorage.setItem('reviews', JSON.stringify(mockReviews));
    }
  }, []);
  
  useEffect(() => {
    // Calculate statistics whenever reviews change
    if (reviews.length > 0) {
      // Calculate distribution
      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      reviews.forEach(review => {
        distribution[review.rating] += 1;
      });
      
      // Calculate average
      const total = reviews.length;
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      const average = sum / total;
      
      setStats({ average, total, distribution });
    }
  }, [reviews]);
  
  const addResponse = (id, response) => {
    const updatedReviews = reviews.map(review => 
      review.id === id ? { ...review, response } : review
    );
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };
  
  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => {
      const matchesSearch = 
        review.service.toLowerCase().includes(searchQuery.toLowerCase()) || 
        review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOrder === 'highest') {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });

  const [activeReview, setActiveReview] = useState(null);
  const [responseText, setResponseText] = useState('');
  
  const handleResponseSubmit = (id) => {
    addResponse(id, responseText);
    setActiveReview(null);
    setResponseText('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold font-serif mb-6">Ratings & Feedback</h2>
      
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2">Overall Rating</h3>
          <div className="text-4xl font-bold text-gray-800 mb-1">{stats.average.toFixed(1)}</div>
          <div className="flex text-yellow-500 mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                className={`h-5 w-5 ${star <= Math.round(stats.average) ? 'fill-current' : ''}`} 
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Based on {stats.total} reviews</p>
        </div>
        
        <div className="col-span-2 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center">
                <div className="flex text-yellow-500 w-24">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= rating ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-pink-400 h-2.5 rounded-full" 
                      style={{ 
                        width: `${stats.total > 0 ? (stats.distribution[rating] / stats.total) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-500">
                  {stats.distribution[rating]} ({stats.total > 0 ? 
                    Math.round((stats.distribution[rating] / stats.total) * 100) : 0}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-3 md:space-y-0">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 w-full md:w-64"
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <span>Rating: {filterRating === 'all' ? 'All' : `${filterRating} ★`}</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            {/* Filter dropdown would go here */}
          </div>
          
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
              <span>Sort: {
                sortOrder === 'newest' ? 'Newest' :
                sortOrder === 'oldest' ? 'Oldest' :
                sortOrder === 'highest' ? 'Highest Rated' :
                'Lowest Rated'
              }</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            {/* Sort dropdown would go here */}
          </div>
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h4 className="font-semibold">{review.customer}</h4>
                  <div className="flex items-center mb-1">
                    <div className="flex text-yellow-500 mr-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= review.rating ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">for {review.service}</span>
                  </div>
                  <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <p className="mb-4 text-gray-700">{review.comment}</p>
              
              {review.response ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-sm mb-1">Your Response:</p>
                  <p className="text-sm text-gray-700">{review.response}</p>
                </div>
              ) : (
                activeReview === review.id ? (
                  <div className="border-t pt-4 mt-4">
                    <h5 className="font-medium text-sm mb-2">Write a response:</h5>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      className="w-full border rounded-lg p-3 mb-3"
                      rows="3"
                      placeholder="Thank the customer and address their feedback..."
                    ></textarea>
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => {
                          setActiveReview(null);
                          setResponseText('');
                        }}
                        className="px-4 py-2 border rounded-lg"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleResponseSubmit(review.id)}
                        className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500"
                      >
                        Submit Response
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={() => setActiveReview(review.id)}
                      className="flex items-center text-pink-400 hover:text-pink-500"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Respond
                    </button>
                  </div>
                )
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews found</p>
          </div>
        )}
      </div>
      
      {/* Tips Section */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Tips for Managing Feedback</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 text-pink-400 mr-2 mt-0.5" />
            <p className="text-gray-700">Respond promptly to all reviews, especially negative ones.</p>
          </div>
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 text-pink-400 mr-2 mt-0.5" />
            <p className="text-gray-700">Always be professional and courteous in your responses.</p>
          </div>
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 text-pink-400 mr-2 mt-0.5" />
            <p className="text-gray-700">Use feedback to improve your services and address any recurring issues.</p>
          </div>
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 text-pink-400 mr-2 mt-0.5" />
            <p className="text-gray-700">Encourage satisfied clients to leave reviews to build your reputation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsFeedback;
