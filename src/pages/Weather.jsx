
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, MapPin, Search, Heart, Wind, Eye, Thermometer, Droplets, Gauge } from 'lucide-react';
import WeatherCard from '../components/weather/WeatherCard';
import ForecastCard from '../components/weather/ForecastCard';
import HourlyForecast from '../components/weather/HourlyForecast';
import LocationSearch from '../components/weather/LocationSearch';
import FavoriteLocations from '../components/weather/FavoriteLocations';
import { weatherService } from '../services/weatherService';

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get user's current location on app load
    getCurrentLocationWeather();
    loadFavorites();
  }, []);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherData(null, latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Default to London if geolocation fails
          fetchWeatherData('London');
        }
      );
    } else {
      fetchWeatherData('London');
    }
  };

  const fetchWeatherData = async (location, lat = null, lon = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherService.getCurrentWeather(location, lat, lon);
      const forecastData = await weatherService.getForecast(location, lat, lon);
      const hourlyData = await weatherService.getHourlyForecast(location, lat, lon);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(hourlyData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery.trim());
    }
  };

  const addToFavorites = (location) => {
    const newFavorite = {
      id: Date.now(),
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon
    };
    
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('weatherFavorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Weather App</h1>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="bg-white/20 border-white/30 hover:bg-white/30"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <Input
                type="text"
                placeholder="Search by city name or zip code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button type="submit" className="bg-white/20 hover:bg-white/30 border-white/30">
                <Search className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={getCurrentLocationWeather}
                variant="outline"
                className="bg-white/20 border-white/30 hover:bg-white/30"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Current Location
              </Button>
            </form>
          </CardContent>
        </Card>

        {loading && (
          <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading weather data...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mb-8 bg-red-500/20 backdrop-blur-md border-red-500/30">
            <CardContent className="p-6">
              <p className="text-white">{error}</p>
            </CardContent>
          </Card>
        )}

        {currentWeather && (
          <div className="space-y-8">
            {/* Current Weather */}
            <WeatherCard 
              weather={currentWeather} 
              onAddToFavorites={addToFavorites}
              darkMode={darkMode}
            />

            {/* Tabs for different forecasts */}
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md">
                <TabsTrigger value="daily" className="text-white data-[state=active]:bg-white/20">
                  7-Day Forecast
                </TabsTrigger>
                <TabsTrigger value="hourly" className="text-white data-[state=active]:bg-white/20">
                  Hourly Forecast
                </TabsTrigger>
                <TabsTrigger value="favorites" className="text-white data-[state=active]:bg-white/20">
                  Favorites
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-4">
                {forecast && <ForecastCard forecast={forecast} darkMode={darkMode} />}
              </TabsContent>

              <TabsContent value="hourly" className="space-y-4">
                {hourlyForecast && <HourlyForecast forecast={hourlyForecast} darkMode={darkMode} />}
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <FavoriteLocations 
                  favorites={favorites}
                  setFavorites={setFavorites}
                  onLocationSelect={fetchWeatherData}
                  darkMode={darkMode}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
