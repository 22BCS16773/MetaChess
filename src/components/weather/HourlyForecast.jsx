
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { weatherService } from '../../services/weatherService';

const HourlyForecast = ({ forecast, darkMode }) => {
  const formatHour = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={`bg-white/10 backdrop-blur-md border-white/20 ${darkMode ? 'bg-gray-800/50' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white">24-Hour Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {forecast.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/10 rounded-lg p-3 text-center min-w-[100px] hover:bg-white/20 transition-colors"
            >
              <div className="text-white/80 text-sm mb-2">
                {formatHour(hour.date)}
              </div>
              <div className="text-2xl mb-2">
                {weatherService.getWeatherIcon(hour.icon)}
              </div>
              <div className="text-white font-semibold mb-1">
                {hour.temperature}°
              </div>
              <div className="text-white/70 text-xs space-y-1">
                <div>💧 {hour.humidity}%</div>
                <div>💨 {Math.round(hour.windSpeed)} m/s</div>
                {hour.precipitation > 0 && (
                  <div>🌧️ {hour.precipitation}mm</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
