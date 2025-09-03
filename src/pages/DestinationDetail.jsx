import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

// ---------- YOUR KEYS (copied here, NOT required in this file but included) ----------
const OPENWEATHER_KEY = "0a61a8c7a62ccbd5806b5dfd1e85ca0f";
const UNSPLASH_KEY = "ncyXwQNsNcF4Her80ECnNpNjcctWf9V_K2CXBRazsco";
// -------------------------------------------------------------------------------

export default function DestinationDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to find the destination in the lastSearch or in savedTrips
    const last = JSON.parse(localStorage.getItem("lastSearch")) || [];
    const saved = JSON.parse(localStorage.getItem("savedTrips")) || [];
    const found = [...last, ...saved].find((d) => String(d.id) === String(id));

    if (found) {
      setDestination(found);
      setLoading(false);
      return;
    }

    // If not found, show not-found (no automatic remote fetch here because id is not a city name)
    setDestination(null);
    setLoading(false);
  }, [id]);

  const handleSave = () => {
    if (!destination) return;
    const trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    if (!trips.find((t) => String(t.id) === String(destination.id))) {
      trips.push(destination);
      localStorage.setItem("savedTrips", JSON.stringify(trips));
      alert("Trip saved!");
    } else {
      alert("Trip already saved.");
    }
  };

  if (loading) return <Loader />;

  if (!destination) {
    return (
      <div>
        <button onClick={() => nav(-1)} className="text-sm text-blue-600 mb-4">
          ← Back
        </button>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold">Destination not found</h2>
          <p className="text-gray-600 mt-2">
            The destination data isn't available. Go back and perform a search, or open a saved trip.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => nav(-1)} className="text-sm text-blue-600 mb-4">
        ← Back
      </button>

      <h1 className="text-2xl font-bold">{destination.name}</h1>

      <img
        src={destination.image}
        alt={destination.name}
        className="w-full max-h-96 object-cover rounded-lg my-4"
      />

      <p className="text-gray-600">
        Weather: {destination.temp}°C — {destination.weather}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Trip
        </button>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            destination.name
          )}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}
