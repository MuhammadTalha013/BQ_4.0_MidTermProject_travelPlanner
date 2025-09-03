import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";
import Loader from "../components/Loader";

// ---------- YOUR KEYS (copied here as requested) ----------
const OPENWEATHER_KEY = "0a61a8c7a62ccbd5806b5dfd1e85ca0f";
const UNSPLASH_KEY = "ncyXwQNsNcF4Her80ECnNpNjcctWf9V_K2CXBRazsco";
// -----------------------------------------------------------

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      // Unsplash image (1st result)
      const unsplashRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&client_id=${UNSPLASH_KEY}&per_page=1`
      );
      const unsplashJson = await unsplashRes.json();
      const image =
        unsplashJson.results?.[0]?.urls?.regular ||
        `https://picsum.photos/seed/${encodeURIComponent(query)}/800/600`;

      // OpenWeather: current weather by city name
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          query
        )}&appid=${OPENWEATHER_KEY}&units=metric`
      );
      const weatherJson = await weatherRes.json();

      if (weatherJson.cod === 200) {
        // create a destination object
        const dest = {
          id: String(Date.now()),            // unique id used in routing
          name: weatherJson.name,
          temp: Math.round(weatherJson.main.temp),
          weather: weatherJson.weather[0].description,
          image,
        };

        setResults([dest]);

        // Save last search to localStorage so detail page can read it
        // We save an array (could store multiple in future)
        localStorage.setItem("lastSearch", JSON.stringify([dest]));
      } else {
        setResults([]);
        // You can show an alert or set an error state here
      }
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {!loading && results.length === 0 && (
        <p className="text-center text-gray-500">No results yet. Try searching!</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {results.map((item) => (
          <DestinationCard key={item.id} destination={item} />
        ))}
      </div>
    </div>
  );
}
