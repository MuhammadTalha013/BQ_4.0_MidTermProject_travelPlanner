import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between">
        <h1 className="font-bold text-lg">Travel Planner</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/saved">Saved Trips</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}
