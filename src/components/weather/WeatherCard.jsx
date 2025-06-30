
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Wind, Eye, Thermometer, Droplets, Gauge, Sunrise, Sunset } from 'lucide-react';
import { weatherService } from '../../services/weatherService';

const WeatherCard = ({ weather, onAddToFavorites, darkMode }) => {
  const { location, current } = weather;

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={`bg-white/10 backdrop-blur-md border-white/20 ${darkMode ? 'bg-gray-800/50' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              {location.name}, {location.country}
              <Button
                onClick={() => onAddToFavorites(location)}
                variant="ghost"
                size="sm"
                className="text-white hover:text-red-500 hover:bg-white/10"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </CardTitle>
            <p className="text-white/80 capitalize">{current.description}</p>
          </div>
          <div className="text-right">
            <div className="text-6xl mb-2">
              {weatherService.getWeatherIcon(current.icon)}
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {current.condition}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temperature */}
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">
              {current.temperature}°C
            </div>
            <p className="text-white/80">
              Feels like {current.feelsLike}°C
            </p>
          </div>

          {/* Weather Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white">
              <Wind className="h-5 w-5 text-blue-300" />
              <span>Wind: {current.windSpeed} m/s</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Droplets className="h-5 w-5 text-blue-300" />
              <span>Humidity: {current.humidity}%</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Gauge className="h-5 w-5 text-blue-300" />
              <span>Pressure: {current.pressure} hPa</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Eye className="h-5 w-5 text-blue-300" />
              <span>Visibility: {current.visibility} km</span>
            </div>
          </div>

          {/* Sun Times */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white">
              <Sunrise className="h-5 w-5 text-yellow-300" />
              <span>Sunrise: {formatTime(current.sunrise)}</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Sunset className="h-5 w-5 text-orange-300" />
              <span>Sunset: {formatTime(current.sunset)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
