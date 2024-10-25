interface WeatherCardProps {
  weatherData: any;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">{weatherData.name} Weather</h2>
      <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
      <p>Feels like: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
      <p>Condition: {weatherData.weather[0].main}</p>
    </div>
  );
};

export default WeatherCard;
