
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin } from 'lucide-react';

const LocationSearch = ({ onLocationSelect, darkMode }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      // This would typically call a geocoding API
      // For now, we'll simulate some suggestions
      const mockSuggestions = [
        { name: searchQuery, country: 'Sample Country', lat: 0, lon: 0 }
      ];
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect(query.trim());
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search city or zip code..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {suggestions.length > 0 && (
        <Card className={`absolute top-full left-0 right-0 mt-2 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardContent className="p-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onLocationSelect(suggestion.name);
                  setQuery('');
                  setSuggestions([]);
                }}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {suggestion.name}, {suggestion.country}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationSearch;
