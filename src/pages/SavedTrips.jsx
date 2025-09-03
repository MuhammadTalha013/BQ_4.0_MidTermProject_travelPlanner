import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedTrips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedTrips")) || [];
    setTrips(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = trips.filter((t) => String(t.id) !== String(id));
    setTrips(updated);
    localStorage.setItem("savedTrips", JSON.stringify(updated));
  };

  const openTrip = (trip) => {
    // Put this trip into lastSearch so the detail page can read it
    localStorage.setItem("lastSearch", JSON.stringify([trip]));
    navigate(`/destination/${trip.id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saved Trips</h1>

      {trips.length === 0 ? (
        <p className="text-gray-500">You don’t have any saved trips yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white p-4 rounded shadow">
              <img
                src={trip.image}
                alt={trip.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-semibold">{trip.name}</h2>
              <p className="text-gray-600">
                {trip.temp}°C — {trip.weather}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => openTrip(trip)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Open
                </button>
                <button
                  onClick={() => handleRemove(trip.id)}
                  className="text-red-500 px-3 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
