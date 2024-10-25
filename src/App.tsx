import React, { useState, useEffect } from "react";
import axios from "axios";
import CitySelector from "./components/CitySelector";
import WeatherCard from "./components/WeatherCard";
import { WeatherChart } from "./components/WeatherChart"; // Assuming you're using react-chartjs-2

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState("Delhi");
  const [temperatureTrends, setTemperatureTrends] = useState<
    { time: string; temperature: number }[]
  >([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=746ec82cfbd4054e1922b4db62801cb7`
        );
        setWeatherData(response.data);

        // Fetch current temperature and time
        const newTemp = (response.data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
        const time = new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Update the temperature trends with time
        setTemperatureTrends((prev) => [
          ...prev,
          { time, temperature: parseFloat(newTemp) },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
    // Refresh weather data every 5 minutes
    const intervalId = setInterval(fetchWeather, 5 * 60 * 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [city]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 items-center text-center">
            Weather Monitoring
          </h1>

          {/* City Selector */}
          <CitySelector selectedCity={city} onSelectCity={setCity} />

          {/* Weather Data */}
          {weatherData && <WeatherCard weatherData={weatherData} />}

          {/* Temperature Trend Chart */}
          <div className="mt-4">
            {temperatureTrends.length > 0 && (
              <WeatherChart data={temperatureTrends} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
