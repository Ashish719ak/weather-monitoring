import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

interface CitySelectorProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onSelectCity,
}) => {
  const [customCity, setCustomCity] = useState<string>("Delhi");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCity(e.target.value);
  };

  const handleCustomCitySelect = () => {
    if (customCity.trim() !== "") {
      onSelectCity(customCity);
      setCustomCity(""); // Clear input after submitting
    }
  };

  return (
    <div className="mb-2">
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Enter a city"
          value={customCity}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-2 py-1 mr-2"
        />
        <Button onClick={handleCustomCitySelect}>Search</Button>
      </div>
      {/* Predefined City Buttons */}
      <div className="mb-2">
        {cities.map((cityName) => (
          <Button
            key={cityName}
            className="m-2"
            onClick={() => onSelectCity(cityName)}
            variant={selectedCity === cityName ? "default" : "outline"}
          >
            {cityName}
          </Button>
        ))}
      </div>

      {/* Custom City Input */}
    </div>
  );
};

export default CitySelector;
