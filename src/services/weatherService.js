
import axios from 'axios';

const API_KEY = 'your-openweather-api-key'; // Users need to add their API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  async getCurrentWeather(location, lat = null, lon = null) {
    try {
      let url = `${BASE_URL}/weather?appid=${API_KEY}&units=metric`;
      
      if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
      } else if (location) {
        // Check if location is a zip code (contains only numbers)
        if (/^\d+$/.test(location)) {
          url += `&zip=${location}`;
        } else {
          url += `&q=${location}`;
        }
      }

      const response = await axios.get(url);
      return this.formatCurrentWeather(response.data);
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  async getForecast(location, lat = null, lon = null) {
    try {
      let url = `${BASE_URL}/forecast?appid=${API_KEY}&units=metric`;
      
      if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
      } else if (location) {
        if (/^\d+$/.test(location)) {
          url += `&zip=${location}`;
        } else {
          url += `&q=${location}`;
        }
      }

      const response = await axios.get(url);
      return this.formatForecast(response.data);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }

  async getHourlyForecast(location, lat = null, lon = null) {
    // Using the same 5-day forecast API but extracting hourly data
    try {
      const forecast = await this.getForecast(location, lat, lon);
      return forecast.list.slice(0, 24); // Get next 24 hours
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);
      throw error;
    }
  }

  formatCurrentWeather(data) {
    return {
      location: {
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      current: {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        uvi: data.uvi || 0 // Not available in current weather, would need separate call
      }
    };
  }

  formatForecast(data) {
    const dailyData = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date: new Date(item.dt * 1000),
          temperatures: [],
          conditions: [],
          humidity: [],
          windSpeed: [],
          precipitation: 0
        };
      }
      
      dailyData[date].temperatures.push(item.main.temp);
      dailyData[date].conditions.push({
        main: item.weather[0].main,
        icon: item.weather[0].icon,
        description: item.weather[0].description
      });
      dailyData[date].humidity.push(item.main.humidity);
      dailyData[date].windSpeed.push(item.wind.speed);
      
      if (item.rain) {
        dailyData[date].precipitation += item.rain['3h'] || 0;
      }
    });

    const forecast = Object.values(dailyData).map(day => ({
      date: day.date,
      high: Math.round(Math.max(...day.temperatures)),
      low: Math.round(Math.min(...day.temperatures)),
      condition: day.conditions[0], // Use first condition of the day
      humidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length),
      windSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b) / day.windSpeed.length),
      precipitation: Math.round(day.precipitation)
    }));

    return {
      location: {
        name: data.city.name,
        country: data.city.country
      },
      list: data.list.map(item => ({
        dt: item.dt,
        date: new Date(item.dt * 1000),
        temperature: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        condition: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        precipitation: item.rain ? item.rain['3h'] || 0 : 0
      })),
      forecast
    };
  }

  getWeatherIcon(iconCode) {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '🌨️', '13n': '🌨️',
      '50d': '🌫️', '50n': '🌫️'
    };
    
    return iconMap[iconCode] || '☀️';
  }
}

export const weatherService = new WeatherService();
