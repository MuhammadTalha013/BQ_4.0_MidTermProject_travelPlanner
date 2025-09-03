import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DestinationDetail from "./pages/DestinationDetail";
import SavedTrips from "./pages/SavedTrips";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/saved" element={<SavedTrips />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
