
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { weatherService } from '../../services/weatherService';

const ForecastCard = ({ forecast, darkMode }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className={`bg-white/10 backdrop-blur-md border-white/20 ${darkMode ? 'bg-gray-800/50' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {forecast.forecast.map((day, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors"
            >
              <div className="text-white/80 text-sm mb-2">
                {formatDate(day.date)}
              </div>
              <div className="text-4xl mb-2">
                {weatherService.getWeatherIcon(day.condition.icon)}
              </div>
              <div className="text-white font-semibold mb-1">
                {day.high}° / {day.low}°
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs mb-2">
                {day.condition.main}
              </Badge>
              <div className="text-white/70 text-xs space-y-1">
                <div>💧 {day.humidity}%</div>
                <div>💨 {day.windSpeed} m/s</div>
                {day.precipitation > 0 && (
                  <div>🌧️ {day.precipitation}mm</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
