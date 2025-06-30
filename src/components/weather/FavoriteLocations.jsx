
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Trash2 } from 'lucide-react';

const FavoriteLocations = ({ favorites, setFavorites, onLocationSelect, darkMode }) => {
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return (
      <Card className={`bg-white/10 backdrop-blur-md border-white/20 ${darkMode ? 'bg-gray-800/50' : ''}`}>
        <CardContent className="p-8 text-center">
          <p className="text-white/80">No favorite locations yet. Add some by clicking the heart icon on any weather card!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-white/10 backdrop-blur-md border-white/20 ${darkMode ? 'bg-gray-800/50' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white">Favorite Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4" />
                  <span className="font-semibold">{favorite.name}</span>
                </div>
                <Button
                  onClick={() => removeFavorite(favorite.id)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-red-500 hover:bg-white/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-white/80 text-sm mb-3">{favorite.country}</p>
              <Button
                onClick={() => onLocationSelect(favorite.name)}
                variant="outline"
                size="sm"
                className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                View Weather
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteLocations;
