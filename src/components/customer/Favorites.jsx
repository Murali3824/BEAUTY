import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      // Mock data if none exists
      const mockFavorites = [
        { id: 1, name: 'Luxury Facial', category: 'Spa', price: 120, provider: 'Beauty Bliss' },
        { id: 2, name: 'Hair Coloring', category: 'Salon', price: 80, provider: 'Style Studio' },
        { id: 3, name: 'Deep Tissue Massage', category: 'Spa', price: 100, provider: 'Relax Haven' },
      ];
      setFavorites(mockFavorites);
      localStorage.setItem('favorites', JSON.stringify(mockFavorites));
    }
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleViewDetails = (category, id) => {
    navigate(`/services/${category.toLowerCase()}/${id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold font-playfair mb-6">My Favorites</h2>
      {favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium text-lg font-lato">{favorite.name}</h3>
                  <p className="text-sm text-muted-foreground font-lato">{favorite.category} by {favorite.provider}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewDetails(favorite.category, favorite.id)}
                    className="text-sm text-blush-pink hover:text-beauty-rose hover:underline font-lato"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="text-charcoal hover:text-blush-pink"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground font-lato">Price</p>
                  <p className="text-sm font-lato">${favorite.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-lato">Category</p>
                  <p className="text-sm font-lato">{favorite.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground font-lato">No favorite services found</p>
          <button
            onClick={() => navigate('/services')}
            className="mt-4 px-4 py-2 bg-blush-pink text-white rounded-md hover:bg-beauty-rose font-lato"
          >
            Explore Services
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;