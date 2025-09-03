import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Search destination..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Search
      </button>
    </form>
  );
}
